/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Bot {

    constructor(x,y){
        this.brain = new NeuralNetwork(4,[10,10,10],2);
        this.bird = new Bird(x,y);
    }

    update () {
        this.bird.update ();
    }

    play () {

        // grabbing inputs
        var bird_height = this.bird.position.y;
        bird_height /= height;
        var nextwall_top = game.nextWall.ytop;
        nextwall_top /= height;
        var nextwall_bottom = game.nextWall.ybottom;
        nextwall_bottom /= height;
        var bird_velocity = this.bird.velocity.y;
        bird_velocity /= this.bird.maxSpeed;

        var inputs = [bird_height, nextwall_top, nextwall_bottom, bird_velocity];
        
        // determining a decision based on inputs
        var decision = this.brain.feedForward(inputs);

        // jump 
        if (decision[0] > decision[1]){
            this.bird.jump ();
        } 

        // else do nothing
        
    }

    copy () {
        var bot = new Bot (this.bird.position.x, this.bird.position.y);
        bot.brain = this.brain.copy ();
        return bot;
    }

    mutate (rate) {
        this.brain.mutate (rate);
    }

    train(){

        var training_data = [
            {
                inputs: [0.8145,0.225,0.6,1],
                target: [1,0]
            },
            {
                inputs: [0.8895000000000001,0.3475,0.7225,1],
                target: [1,0]
            },
            {
                inputs: [0.50,0.435,0.81,0.3],
                target: [0,1]
            },
            {
                inputs: [0.7895,0.435,0.81,1],
                target: [1,0]
            },
            {
                inputs: [0.902,0.435,0.81,1],
                target: [1,0]
            },
            {
                inputs: [0.2484999999999998,0.4775,0.8525,1],
                target: [0,1]
            },
            {
                inputs: [0.3484999999999998,0.4775,0.8525,1],
                target: [0,1]
            },
            {
                inputs: [0.70,0.4175,0.7925,1],
                target: [1,0]
            },
            {
                inputs: [0.50,0.4175,0.7925,1],
                target: [0,1]
            },
            {
                inputs: [0.35474999999999995,0.0275,0.4025,0.6799999999999995],
                target: [1,0]
            }
        ];

        for(var i = 0; i < 100; ++i){
            var data = random(training_data);
            this.brain.train(data.inputs, data.target);
        }

    }

    show () {
        this.bird.show ();
    }

}