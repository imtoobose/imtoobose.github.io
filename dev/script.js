window.mobilecheck = require('./js/mobilecheck');
var 
  animation  = require('./js/canvashome'),
  worksscroll = require('./js/worksscroll'),
  ANIM       = null,
  ACTIVE     = 1,
  ACTIVEWORK = 1,
  started    = 0,
  last       = 'down',
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
  if(started==1 && ACTIVE==2 && ACTIVEWORK>=1){
    console.log(ACTIVEWORK);
    if(last=='down') {
      ACTIVEWORK-=1;
      last = 'up';
    }
    worksscroll.animateUp($imgs[ACTIVEWORK], $imgs[ACTIVEWORK-1], ()=>ACTIVEWORK-=1);
  }

  else if(!(ACTIVE==1)) {
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
var $imgs = document.getElementsByClassName('workposter');

var moveDown=()=>{

  if(started==1 && ACTIVE==2 && ACTIVEWORK<5){
    console.log(ACTIVEWORK);
    if(last=='up') {
      ACTIVEWORK +=1;
      last = 'down';
    }
    worksscroll.animateDown($imgs[ACTIVEWORK-1], $imgs[ACTIVEWORK], ()=> ACTIVEWORK+=1);
  }

  else if(!(ACTIVE==navs.length)){
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

  ANIM = new animation('view1');
  ANIM.startAnimation();
  
  var woopop = (count) => {
    if (count==3){
      started = 1;
      worksscroll();
    }
  }

  window.onload=  () =>{
    var 
      count = 0,
      $scripts = [],
      $body    = document.getElementById('allofthis'),
      $links = ["https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js",
                'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js'];

    for(var s= 0; s<$links.length; s++){
      $scripts[s] = document.createElement('script');
      $scripts[s].onload = () => woopop(++count);
      $scripts[s].src = $links[s];
      $body.appendChild($scripts[s]);
    }

    var images = document.getElementsByClassName('workposter');

    var imgsrcs= new Array();
    for(var i = 0; i<images.length; i++){
      imgsrcs[i] = new Image();
      imgsrcs[i].index = i;
      imgsrcs[i].onload = function(){
        images[this.index].style.background = 'url('+this.src+') no-repeat center center';
      }
      imgsrcs[i].src = "./dist/assets/Works/image0"+ (i+1) + ".png";
    }
  }
}