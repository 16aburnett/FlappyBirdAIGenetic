/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Wall{

  constructor(x, ytop, ybottom){

      this.x = x;
      this.ytop = ytop;
      this.ybottom = ybottom;
      this.width = 50;
      this.color = 'lime';
      this.velocityx = -1.5;

  }


  update(){

    this.x += this.velocityx;

  }


  // Draws the wall to the screen  
  show(){

    //fill(50, 255, 75);
    fill(this.color);
    rect(this.x, 0, this.width, this.ytop);
    rect(this.x, this.ybottom, this.width, height - this.ybottom);

  }

  equals (wall){  
    return wall.x == this.x;
  }


}