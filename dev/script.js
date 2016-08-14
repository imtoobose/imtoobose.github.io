var active= 1;

var handleNavClick = (e) => {
  for(var i = 0; i< navs.length; i++) {
    navs[i].classList.remove('activenav');
    views[i].classList.remove('activeview');
  }
  e.target.classList.add('activenav'); 
  var targ   = +e.target.id.slice(-1);
      active = targ;

  views[targ-1].classList.add('activeview');
}

var moveUp=()=>{
  if(!(active==1)) {
    navs[active-1].classList.remove('activenav');
    views[active-1].classList.remove('activeview');
    active-=1;
    navs[active-1].classList.add('activenav');
    views[active-1].classList.add('activeview');
  }
}

var moveDown=()=>{
  if(!(active==navs.length)){
    navs[active-1].classList.remove('activenav');
    views[active-1].classList.remove('activeview');
    active+=1;
    navs[active-1].classList.add('activenav');
    views[active-1].classList.add('activeview');
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

var 
  views = document.getElementsByClassName('view'),
  navs  = document.getElementsByClassName('navelem');
if(navs){
  window.addEventListener('keydown', handleKeyDown);
  for(var i =0; i<navs.length; i++){
    navs[i].addEventListener('click', handleNavClick);
  }
}
document.getElementById("workbox1").classList.add('activeworks');
