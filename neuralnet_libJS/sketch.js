// Created By Amy Burnett

var nn = new NeuralNetwork(2, [20,20,20], 1);
function setup() {
    createCanvas(400, 400);
    background(0);
    noLoop();

    // 1 hidden node can only handle linear seperable 
    // problems so for AND that would be okay
    // but the XOR problem wouldnt work well 
    // even with 10,000 training cycles

    // XOR Problem
    var training_data = [
        {
            inputs: [1, 1],
            answers: [0]
        },
        {
            inputs: [1, 0],
            answers: [1]
        },
        {
            inputs: [0, 1],
            answers: [1]
        },
        {
            inputs: [0, 0],
            answers: [0]
        }
    ];

    for (var i = 0; i < 10000; ++i) {
        var data = random(training_data);
        nn.train(data.inputs, data.answers);
    }

    var outputs = nn.feedForward([1,1]);
    console.log(outputs);
    console.log(outputs[0] >= 0.5);
    
    outputs = nn.feedForward([1,0]);
    console.log(outputs);
    console.log(outputs[0] >= 0.5);

    outputs = nn.feedForward([0,1]);
    console.log(outputs);
    console.log(outputs[0] >= 0.5);
    
    outputs = nn.feedForward([0,0]);
    console.log(outputs);
    console.log(outputs[0] >= 0.5);
    


    // var outputs = nn.feedForward(inputs);


    // console.log(outputs.toString());

    // if(outputs[0] > 0.5) {
    //     console.log("yes");
    // } else {
    //     console.log("no");
    // }

}

function draw() {



}