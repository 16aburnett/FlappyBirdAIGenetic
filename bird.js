/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Bird{

    constructor(x,y){

        this.position = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);

        // radius
        this.size = 20;
        this.GRAVITY = 0.3;
        this.maxSpeed = 5;
        this.maxForce = 0.1;

        this.hitSomething = false;

        this.color = "rgba(255,255,255,.25)";

        
    }

    update(){

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);

        // Gravity 
        this.acceleration = createVector(0, this.GRAVITY);

        // Bird stops moving when it hits the bottom of the screen
        if (this.position.y + (this.size / 2) >= height){
            this.hitSomething = true;
        }

        


    }

    collision(walls){

        for(var i = 0; i < walls.length; ++i){

            var wall = walls[i];

            // test if within x 

            if (this.position.x + this.size > wall.x
                && this.position.x - this.size < wall.x + wall.width){

                    if(this.position.y + this.size > wall.ybottom){

                        this.hitSomething = true;

                    } else if (this.position.y - this.size < wall.ytop){

                        this.hitSomething = true;

                    }

            }

        }
    }

    jump(){

        var jump_force = createVector(0,-20);
        this.acceleration.add(jump_force);

    }


    // Draws the Bird to the screen
    show(){

        fill(this.color);
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.size * 2);

        // eye
        fill(255,0,0);
        ellipse(this.position.x+10,this.position.y, 5);

        
        // mouth 
        fill(0,0,0);
        ellipse(this.position.x+6,this.position.y + 7, 4);
        ellipse(this.position.x+7,this.position.y + 8, 4);
        ellipse(this.position.x+8,this.position.y + 8, 4);
        ellipse(this.position.x+9,this.position.y + 9, 4);
        ellipse(this.position.x+10,this.position.y + 10, 4);
        ellipse(this.position.x+11,this.position.y + 10, 4);
        ellipse(this.position.x+12,this.position.y + 10, 4);
        ellipse(this.position.x+13,this.position.y + 10, 4);
        ellipse(this.position.x+14,this.position.y + 10, 4);
        ellipse(this.position.x+15,this.position.y + 10, 4);
        ellipse(this.position.x+16,this.position.y + 10, 4);


        // eyebrow 
        ellipse(this.position.x+8,this.position.y - 7, 5);
        ellipse(this.position.x+9,this.position.y - 6, 5);
        ellipse(this.position.x+10,this.position.y - 5, 5);
        ellipse(this.position.x+11,this.position.y - 4, 5);
        ellipse(this.position.x+12,this.position.y - 3, 5);


    }

 
}