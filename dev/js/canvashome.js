function randomInt(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

class Bubble{
  constructor(radius, x, y, ctx){
    this.x= x;
    this.y= y;
    this.vx = 0.1 - (Math.random()*0.5);
    this.vy = 0.1 - (Math.random()*0.5);
    this.r= radius;
    this.ctx= ctx;
    this.draw();
  }

  draw(){
    var ctx= this.ctx;
    ctx.fillStyle= "rgba(55, 162, 135, 0.2)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.closePath();
    this.bubbleanimate();
  }

  bubbleanimate(){
    if(this.y<0 || this.y>window.innerHeight){
      this.vy = - this.vy;
      this.vx = this.vx;
    }
    if(this.x<0|| this.x>window.innerWidth){
      this.vx= - this.vx;
      this.vy= this.vy;
    }
    this.y+= this.vy;
    this.x+= this.vx;
  }
}

class CanvasClass{
  constructor(){
    this.canvashome = document.getElementById('homecanvas');
    this.ctx        = this.canvashome.getContext('2d');
    this.bubbles    = [];
    this.changewidth();
  }
  changewidth (){
    this.canvashome.width= window.innerWidth;
    this.canvashome.height= window.innerHeight;
  }
  createBubble(){
    for(var i =0; i<200; i++){
      var b = new Bubble(randomInt(5, 8), randomInt(0, this.canvashome.width), randomInt(0, this.canvashome.height), this.ctx);
      this.bubbles.push(b);
    }
  }
}
module.exports= CanvasClass;