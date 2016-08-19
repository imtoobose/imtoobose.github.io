//----Globals----
//COBJ     : object of CanvasClass from canvashome. Initlialized if and after
//           the canvas is inserted
//ANIM     : Holds return type of window.requestAnimationFrame
//PAUSED   : Control start and stop of animation with a boolean. 0= NO 1= YES
//LINEDIST : The minimum distance between two nodes to form a connection
//MOUSEPOS : X and Y coordinates of the mouse at any time
window.mobilecheck = require('./js/mobilecheck');
var 
  can      = require('./js/canvashome'),
  lineDraw = require('./js/canvashome').lineDraw,
  COBJ     = undefined,
  ANIM     = null,
  ACTIVE   = 1,
  PAUSED   = 1, 
  LINEDIST = 70*70,
  MOUSEPOS = {"x": -1, "y": -1},
  views    = document.getElementsByClassName('view'),
  navs     = document.getElementsByClassName('navelem');

//----Update mouse position on mousemove
var mousePos = (e) => {
  MOUSEPOS.x= e.clientX;
  MOUSEPOS.y= e.clientY;
}

//----Utility function to find the distance between
//two points on a Cartesian grid
var distancebetween = (p1, p2) =>  (p1.x-p2.x)*(p1.x-p2.x)+ (p1.y-p2.y)*(p1.y-p2.y);

//---For handling clicks on the Nav menu
var handleNavClick = (e) => {
  for(var i = 0; i< navs.length; i++) {
    navs[i].classList.remove('activenav');
    views[i].classList.remove('activeview');
  }
  e.target.classList.add('activenav'); 
  var targ   = +e.target.id.slice(-1);
      ACTIVE = targ;
  views[targ-1].classList.add('activeview');

  if(targ==1 && !ANIM) startAnimation();
  else stopAnimation();
}

//----For moving up with the keyboard
var moveUp=()=>{
  if(!(ACTIVE==1)) {
    navs[ACTIVE-1].classList.remove('activenav');
    views[ACTIVE-1].classList.remove('activeview');
    ACTIVE-=1;
    navs[ACTIVE-1].classList.add('activenav');
    views[ACTIVE-1].classList.add('activeview');
  }
  if(ACTIVE==1 && !ANIM){
    startAnimation();
  }
}

//----moving down with keyboard
//----pause the animation so that there is minimal lag

var moveDown=()=>{
  if(!(ACTIVE==navs.length)){
    navs[ACTIVE-1].classList.remove('activenav');
    views[ACTIVE-1].classList.remove('activeview');
    ACTIVE += 1;
    navs[ACTIVE-1].classList.add('activenav');
    views[ACTIVE-1].classList.add('activeview');
    stopAnimation();
  }
}

var handleKeyDown = (e) =>{
  //up arrow
  if(e.keyCode==38){
    moveUp();
  }
  //down arrow
  else if(e.keyCode==40){
    moveDown();
  }
}

//---Insert Canvas Element
var initCanvas = () =>{
  var 
    home       = document.getElementById('view1'),
    htmlcanvas = document.createElement('canvas');

  htmlcanvas.classList.add('homecanvas');
  htmlcanvas.id = "homecanvas";
  home.insertBefore(htmlcanvas, home.childNodes[0]);
}

var startAnimation = () =>{
  PAUSED = 0;
  ANIM   = window.requestAnimationFrame(animateGraph);
}

var stopAnimation = () =>{
  PAUSED = 1;
  ANIM   = null;
}

//----Animation logic----
var animateGraph = () =>{
  console.log('woo');
  COBJ.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var bubbles = COBJ.bubbles;

  //Draw the connecting nodes
  for(var i =0; i<COBJ.bubbles.length; i++){
    bubbles[i].draw();
  }

  //Find if two nodes are close enough to form a connection
  //If so draw a line between them
  for(i=0; i<COBJ.bubbles.length-1; i++){
    if(distancebetween(MOUSEPOS, bubbles[i])<200*200){
      for(var j=i+1; j<COBJ.bubbles.length; j++){
        if(distancebetween(bubbles[i], bubbles[j])<LINEDIST){
          lineDraw(bubbles[i], bubbles[j], COBJ);
        }
      }
    }
  }

  if (PAUSED === 0)
    window.requestAnimationFrame(animateGraph);
}

//----If not on mobile do this----//
if(!window.mobilecheck()){
  //Assign Navbar Listeners as well as keyboard ones
  if(navs){
    window.addEventListener('keydown', handleKeyDown);
    for(var i =0; i<navs.length; i++){
      navs[i].addEventListener('click', handleNavClick);
    }
  }
  
  window.addEventListener('mousemove', mousePos);

  document.getElementById("workbox1").classList.add('activeworks');

  /*---CANVAS STUFF----*/
  initCanvas();
  COBJ   = new can();
  startAnimation();
}