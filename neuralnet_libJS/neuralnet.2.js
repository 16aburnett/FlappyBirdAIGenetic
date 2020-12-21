/**
 * Artificial Neural Network Library
 * @author Amy Burnett
 * @last_updated March 9 2019
 * @description 
 * creates a neural network that can generate a random guess based on given inputs. 
 * And can be trained to generalize on a given answer or set of answers. 
 * The neural network holds weights that allow it to map relationships between inputs and the desired outputs.
*/

/*************************************************************************/
// Global Variables 

/*************************************************************************/

class NeuralNetwork {

    /*************************************************************************/

    /**
     * Constructs a neural network with given node counts and random weights
     * @param {Number} inputCount number of input nodes 
     * @param {Array} hiddenCounts array defining the number of hidden layers and their node counts
     * @param {Number} outputCount number of output nodes 
     */
    constructor(inputCount, hiddenCounts, outputCount){

        this.inputCount = inputCount;
        this.hiddenCounts = hiddenCounts;
        this.outputCount = outputCount;

        this.weights = [];
        this.biases = [];
        this.layers = [];


        // case 1 : no hiddens 
        if (hiddenCounts.length == 0)
        {

            // weights
            var weights_io = new Matrix (outputCount, inputCount);
            weights_io.randomize();
            this.weights.push (weights_io);

            // bias
            // one bias for each layer
            // connected to each of the next layer
            var bias_io = new Matrix (outputCount, 1);
            bias_io.randomize ();
            this.biases.push (bias_io);

        }
        // case 2 : has hiddens 
        else 
        {

            // weights
            var weights_ih = new Matrix (hiddenCounts[0], inputCount);
            weights_ih.randomize ();
            this.weights.push (weights_ih);
    
            var prev_count = hiddenCounts[0];
            for (var i = 1; i < this.hiddenCounts.length; ++i)
            {
                var weights_hh = new Matrix (hiddenCounts[i], prev_count);
                weights_hh.randomize ();
                prev_count = hiddenCounts[i];
                this.weights.push (weights_hh);
            }
    
            var weights_ho = new Matrix (outputCount, prev_count);
            weights_ho.randomize ();
            this.weights.push (weights_ho);

            // bias
            // one bias for each layer
            // connected to each of the next layer
            this.biases = [];
            var bias_ih = new Matrix (hiddenCounts[0], 1);
            bias_ih.randomize ();
            this.biases.push (bias_ih);

            for (var i = 1; i < hiddenCounts.length; ++i)
            {
                var bias = new Matrix (hiddenCounts[i], 1);
                bias.randomize ();
                this.biases.push (bias);
            }

            var bias_ho = new Matrix (outputCount, 1);
            bias_ho.randomize ();
            this.biases.push (bias_ho);

        }

        // Layers
        var input_nodes = new Matrix (this.inputCount, 1);
        this.layers.push (input_nodes);

        for (var i = 0; i < hiddenCounts.length; ++i)
        {
            var hidden_nodes = new Matrix (hiddenCounts[i], 1);
            this.layers.push (hidden_nodes);
        }

        var output_nodes = new Matrix (this.outputCount, 1);
        this.layers.push (output_nodes);


        this.learning_rate = 0.1;

    }

    /*************************************************************************/

    /**
     * Uses the feed forward algorithm to generate an output from given inputs
     * @param {Array} inputsArr input to feed forward
     * @precondition array must match the number of input nodes 
     */
    feedForward(inputsArr){

        // Ensure inputs are valid 
        if(!inputsArr || !Array.isArray(inputsArr)){
            console.log("please enter a valid array of input");
            return;
        } 

        // convert input array to matrix 
        this.layers[0] = Matrix.fromArray(inputsArr);

        // PrevLayer to NextLayer Feed
        for (var i = 1; i < this.layers.length; ++i) 
        {
            // activation(weights * inputs + bias)
            this.layers[i] = Matrix.product(this.weights[i-1], this.layers[i-1]); // weighted sum
            this.layers[i].add(this.biases[i-1]);// adding bias
            this.layers[i].map(sigmoid); // applying activation function
        }

        // convert output into array 
        var output = this.layers[this.layers.length - 1].toArray();
        return output;

    }

    /*************************************************************************/

    /**
     * Training.
     * uses the feed forward algorithm and back propagation to change weights. 
     * weights are changed at a learning rate to more generalize on the desired outputs
     * @param {Array} inputs_arr input for the neural network 
     * @param {Array} answers_arr output for to match against neural network's guesses
     * @precondition input array and answers array must match the input nodes size and output nodes size respectively
     */
    train(inputs_arr, answers_arr){

        // Convert params to matrices 
        var inputs = Matrix.fromArray(inputs_arr);
        var outputs = Matrix.fromArray(this.feedForward(inputs_arr));
        var answers = Matrix.fromArray(answers_arr);

        // calculate error <output>
        // error = answer - output
        var output_errors = Matrix.subtract(answers, outputs);

        var prev_errors = output_errors;
        var prev_nodes = outputs;
        for (var i = this.weights.length - 1; i >= 0; --i)
        {
            // Calculate Previous Nodes' Errors
            var weights_t = Matrix.transpose(this.weights[i]);
            var hidden_errors = Matrix.product(weights_t, prev_errors);

            // Calculate Change in Weights
            var hidden_gradients = Matrix.multiply(prev_errors, Matrix.map(prev_nodes, dsigmoid));
            var hidden_nodes_t = Matrix.transpose(this.layers[i]);
            var delta_weights = Matrix.product(hidden_gradients, hidden_nodes_t);
            delta_weights.multiply(this.learning_rate);
            var delta_bias = Matrix.multiply(hidden_gradients, this.learning_rate);

            // Change Weights
            this.weights[i].add(delta_weights);
            this.biases[i].add(delta_bias);

            prev_errors = hidden_errors;
            prev_nodes = this.layers[i];

        }

    }
    
    /*************************************************************************/
    
    /**
     * @returns a copy of this neural network
     */
    copy ()  
    {
        // create new neural network with the same node counts
        var newNN = new NeuralNetwork(this.inputCount, this.hiddenCounts, this.outputCount);

        // copy weights from this to new neural network
        for (var i = 0; i < this.weights.length; ++i)
            newNN.weights[i] = this.weights[i].copy ();

        // copy biases from this to new neural network
        for (var i = 0; i < this.biases.length; ++i)
            newNN.biases[i] = this.biases[i].copy ();

        // return copied neural network 
        return newNN;
    }

    /*************************************************************************/
    
    /**
     * Randomly repicks new values for the matrix based on a given mutation rate. 
     * @param {Number} mutation_rate the rate at which a value could mutate
     */
    mutate (mutation_rate) 
    {
        // function for mutating 
        function mutate_function (val) 
        {
            // mutate 
            if (Math.random() < mutation_rate) 
                // rand number [-1,1]
                return Math.random() * 2 - 1;
            // do not mutate
            else 
                return val; 
        }

        // mutate weights
        for (var i = 0; i < this.weights.length; ++i)
            this.weights[i].map (mutate_function);

        // mutate biases
        for (var i = 0; i < this.biases.length; ++i)
            this.biases[i].map (mutate_function);
        
    }

    /*************************************************************************/


}


/*************************************************************************/
// ACTIVATION FUNCTIONS
// sigmoid:
// 1 / (1 + e^-x)
function sigmoid(x){
    return (1) / (1 + Math.pow(Math.E, -x));
}

// derivative of sigmoid 
// this is not the full derivative because 
// it is used after sigmoid is already applied
// dsigmoid(x) = sigmoid(x) / (1 - sigmoid(x));
function dsigmoid(x){
    return (x * (1 - x));
}