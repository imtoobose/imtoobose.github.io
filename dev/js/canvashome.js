function randomInt(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

var options = {
  "nodes": 100,
  "linedistance": 60*60,
  "color": "rgba(55, 162, 135, 0.4)",
  "nodecolor": "rgba(90, 194, 168, 1)"
}

var lineDraw = (p1, p2, c) => {
  var 
    x1= p1.x,
    x2= p2.x,
    y1= p1.y,
    y2= p2.y;
  c.ctx.beginPath();
  c.ctx.strokeStyle= options.color;
  c.ctx.moveTo(x1, y1);
  c.ctx.lineTo(x2, y2);
  c.ctx.stroke();
  c.ctx.closePath();
}

class Bubble{
  constructor(radius, x, y, ctx){
    this.x= x;
    this.y= y;
    if(Math.floor(Math.random()*3)<1){
      var sign =1;
    }
    else sign = -1;

    this.vx = sign*(0.05- (Math.random()*0.3));
    this.vy = sign*(0.05- (Math.random()*0.3));
    this.r= radius;
    this.ctx= ctx;
    this.draw();
  }

  draw(){
    var ctx= this.ctx;
    ctx.fillStyle= options.nodecolor;
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
    window.onresize = ()=> {
      this.changewidth();
      this.createBubble();
    }
    this.changewidth();
    this.createBubble();
  }
  changewidth (){
    this.canvashome.width= window.innerWidth;
    this.canvashome.height= window.innerHeight;
    options.nodes= Math.floor(this.canvashome.height*this.canvashome.width/2100);
  }
  createBubble(){
    if(!(options.nodes>0)) options.nodes= 200;
    this.bubbles=[];
    for(var i =0; i<options.nodes; i++){
      var b = new Bubble(randomInt(1,3),
                  randomInt(0, this.canvashome.width), 
                  randomInt(0, this.canvashome.height), 
                  this.ctx);
      this.bubbles.push(b);
    }
  }
}

module.exports= CanvasClass;
module.exports.lineDraw= lineDraw;