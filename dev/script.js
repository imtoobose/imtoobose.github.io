window.mobilecheck = require('./js/mobilecheck');
var 
  animation  = require('./js/canvashome'),
  ANIM       = new animation('view1'),
  ACTIVE     = 1,
  views      = document.getElementsByClassName('view'),
  navs       = document.getElementsByClassName('navelem');

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

  if(targ==1 && ANIM.paused==1){
    ANIM.startAnimation();
  }
  else{
    ANIM.stopAnimation();
  }
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
  if(ACTIVE==1 && ANIM.paused==1){
    ANIM.startAnimation();
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
    ANIM.stopAnimation();
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

//----If not on mobile do this----//
if(!window.mobilecheck()){
  //Assign Navbar Listeners as well as keyboard ones
  if(navs){
    window.addEventListener('keydown', handleKeyDown);
    for(var i =0; i<navs.length; i++){
      navs[i].addEventListener('click', handleNavClick);
    }
  }

  document.getElementById("workbox1").classList.add('activeworks');
  ANIM.startAnimation();
}