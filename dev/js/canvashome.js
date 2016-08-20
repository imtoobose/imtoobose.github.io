function randomInt(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

var options = {
  "nodes": 100,
  "linedistance": 70*70,
  "mousedistance": 200*200,
  "color": "rgba(55, 162, 135, 0.4)",
  "nodecolor": "rgba(90, 194, 168, 1)"
}

//draw line between two points
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

//The bubble or nodes that are used to
//join the lines

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
  constructor(id){
    this.canvashome = document.getElementById(id);
    this.ctx        = this.canvashome.getContext('2d');
    this.bubbles    = [];
    window.onresize = ()=> {
      this.changewidth();
      this.createBubble();
    }
    this.changewidth();
    this.createBubble();
  }

  //If width is changed, resize the canvas and recreate nodes
  changewidth (){
    this.canvashome.width= window.innerWidth;
    this.canvashome.height= window.innerHeight;
    options.nodes= Math.floor(this.canvashome.height*this.canvashome.width/2100);
  }

  //create the nodes with bubble class
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

//Interface to control and create animation

class Interface{
  constructor(id){
    //paused: boolean value: 0 = not paused, 1= paused
    //anim  : animation instance
    //mousepos : position of mouse at any point
    //cobj : instance of canvashome
    this.paused = 1;
    this.anim = null;
    this.mousepos = {
      "x":-1,
      "y":-1
    };

    this.initCanvas(id);
    this.cobj = new CanvasClass('homecanvas');

    window.addEventListener('mousemove', this.getMousePos.bind(this));
  }

  //get position of mouse on screen
  getMousePos(e){
    this.mousepos.x= e.clientX;
    this.mousepos.y= e.clientY;
  }

  //create a canvas element 
  initCanvas(id){
    var 
      home       = document.getElementById(id),
      htmlcanvas = document.createElement('canvas');
    htmlcanvas.classList.add('homecanvas');
    htmlcanvas.id = "homecanvas";
    home.insertBefore(htmlcanvas, home.childNodes[0]);
  }

  //get absolute difference between two points
  distancebetween(p1, p2){
    return (p1.x-p2.x)*(p1.x-p2.x)+ (p1.y-p2.y)*(p1.y-p2.y);
  }

  startAnimation(){
    this.paused= 0;
    this.anim = window.requestAnimationFrame(this.animateGraph.bind(this));
  }

  stopAnimation(){
    this.paused= 1;
    this.anim = null;
  }

  //main animation
  animateGraph(){
    this.cobj.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    var bubbles = this.cobj.bubbles;

    //Draw the nodes
    for(var i =0; i<this.cobj.bubbles.length; i++){
      bubbles[i].draw();
    }

    //Find if two nodes are close enough to form a connection
    //If so draw a line between them
    for(i=0; i<this.cobj.bubbles.length-1; i++){
      if(this.distancebetween(this.mousepos, bubbles[i])<options.mousedistance){
        for(var j=i+1; j<this.cobj.bubbles.length; j++){
          if(this.distancebetween(bubbles[i], bubbles[j])<options.linedistance){
            lineDraw(bubbles[i], bubbles[j], this.cobj);
          }
        }
      }
    }
    if (this.paused === 0)
      window.requestAnimationFrame(this.animateGraph.bind(this));
  }
}

module.exports= Interface;