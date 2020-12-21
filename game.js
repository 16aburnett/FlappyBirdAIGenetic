/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Game{

    constructor(){

        // bots 
        this.population = [];

        for (var i = 0; i < 200; ++i) {
            this.population.push(new Bot(50, height / 2));
        }
        // last bot alive 
        this.bestBot = this.population[this.population.length - 1]; 

        this.walls = [];
        this.nextWall;

        this.wall_gap = 150;
        
        // creates 5 walls
        for(var i = 0; i < 5; ++i){
            this.createWall();
        }
        this.nextWall = this.walls[0];

        this.score = 0;
        this.high_score = 0;
        this.generation = 0;

    }

    reset(){

        // bots 
        this.population = [];

        // create new population from the previous best bird
        for (var i = 0; i < 100; ++i) {
            // create bot 
            var bot = this.bestBot.copy ();
            // set pos to start point
            bot.bird.position = createVector (50, height / 2);
            // mutation
            bot.mutate (0.025);
            // add to population
            this.population.push (bot);
        }
        // add previous best bird to population
        this.bestBot = this.bestBot.copy ();
        this.population.push (this.bestBot);
        this.bestBot.bird.position = createVector(50, height / 2);
        this.bestBot.bird.color = "lime";

        this.walls = [];
        this.nextWall;

        this.wall_gap = 150;
        
        // creates 5 walls
        for(var i = 0; i < 5; ++i){
            this.createWall();
        }
        this.nextWall = this.walls[0];

        this.score = 0;
        this.generation++;
    }


    // handles all updates of the game
    update(){

        // for all the bots 
        for (var i = 0; i < this.population.length; ++i) {
            // if a bot hit something 
            if(!this.population[i].bird.hitSomething){
                this.population[i].update ();
                this.population[i].play ();
                this.population[i].bird.collision (this.walls);
            } else {
                // remove bot
                this.population.splice(i, 1); 
            }
        }
        
        // all bots died 
        if (this.population.length == 0) {
            this.reset ();
        } else {
            this.bestBot = this.population[this.population.length - 1];
        }
        
        this.nextWall.color = "red";
        this.determineNextWall();

        for(var i = 0; i < this.walls.length; ++i){
            this.walls[i].update();
        }

        this.generateWalls();

        // show score
        document.getElementById("score").innerHTML = this.score;

        // show gen
        document.getElementById("gen").innerHTML = this.generation;

        if (this.score > this.high_score) {
            this.high_score = this.score;
        }

        // speed up game 
        if (this.score % 10 === 0 && this.score != 0) {
            for(var i = 0; i < this.walls.length; ++i){
                this.walls[i].velocityx -= 0.005;
            }
        } 

        // show high score
        document.getElementById("high_score").innerHTML = this.high_score;

    }

    determineNextWall(){

        // if the bird has passed the previous current wall, then update new nextwall
        if (this.population[0].bird.position.x - this.population[0].bird.size > this.nextWall.x + this.nextWall.width){

            this.nextWall.color = "lime";
            
            // find current wall to get the next
            for(var i = 0; i < this.walls.length; ++i){
                if(this.walls[i].equals(this.nextWall)){
                    this.nextWall = this.walls[i + 1];
                    this.score++;
                    break;
                }
            }
        }

    }

    // handles wall creation and destruction 
    generateWalls(){

        // remove wall if off screen
        for(var i = 0; i < this.walls.length; ++i){

            // offscreen left 
            if(this.walls[i].x + this.walls[i].width < 0){

                // remove wall
                this.walls.splice(0,1);

                // add a new wall to the end 
                this.createWall();

            } 
            // otherwise, none of the other walls should be offscreen left
            else {

                break;

            }

        }

    }

    createWall(){

        // no walls 
        if(this.walls.length == 0){

            var y = floor(random(height - (this.wall_gap + 20)));
            var wall = new Wall(250, y, y + this.wall_gap);
            this.walls.push(wall);

        }

        // walls exist 
        else {

            var lastwall = this.walls[this.walls.length - 1];

            var y = floor(random(height - (this.wall_gap + 20)));
            var wall = new Wall(lastwall.x + (lastwall.width * 3), y, y + this.wall_gap);
            this.walls.push(wall);

        }

    }

    // tells the bird to jump
    flap(){
        for (var i = 0; i < this.population.length; ++i)
        {
            this.population[i].bird.jump();
        }
    }

    // Draw the game to the screen
    show(){

        // for all bots 
        for (var i = 0; i < this.population.length; ++i){
            this.population[i].show();
        }

        for(var i = 0; i < this.walls.length; ++i){
            this.walls[i].show();
        }

    }

}