window.mobilecheck = require('./js/mobilecheck');
var 
  animation   = require('./js/canvashome'),
  worksscroll = require('./js/worksscroll'),
  ANIM        = null,
  ACTIVE      = 1,
  ACTIVEWORK  = 1,
  STARTED     = 0,
  LAST        = 'down',
  $imgs       = document.getElementsByClassName('workposter'),
  $views      = document.getElementsByClassName('view'),
  $navs       = document.getElementsByClassName('navelem');

//---For handling clicks on the Nav menu
var handleNavClick = (e) => {
  for(var i = 0; i< $navs.length; i++) {
    $navs[i].classList.remove('activenav');
    $views[i].classList.remove('activeview');
  }
  e.target.classList.add('activenav'); 
  var targ   = +e.target.id.slice(-1);
      ACTIVE = targ;
  $views[targ-1].classList.add('activeview');

  if(targ==1 && ANIM.paused==1){
    ANIM.startAnimation();
  }
  else{
    ANIM.stopAnimation();
  }
}

//----For moving up with the keyboard
var moveUp=()=>{
  if(STARTED==1 && ACTIVE==2 && ACTIVEWORK>=1){
    if(LAST=='down') {
      ACTIVEWORK-=1;
      LAST = 'up';
    }
    worksscroll.animateUp($imgs[ACTIVEWORK], $imgs[ACTIVEWORK-1], ()=>ACTIVEWORK-=1);
  }

  else if(!(ACTIVE==1)) {
    $navs[ACTIVE-1].classList.remove('activenav');
    $views[ACTIVE-1].classList.remove('activeview');
    ACTIVE-=1;
    $navs[ACTIVE-1].classList.add('activenav');
    $views[ACTIVE-1].classList.add('activeview');
  }

  if(ACTIVE==1 && ANIM.paused==1){
    ANIM.startAnimation();
  }
}

//----moving down with keyboard
//----pause the animation so that there is minimal lag

var moveDown=()=>{

  if(STARTED==1 && ACTIVE==2 && ACTIVEWORK<5){
    if(LAST=='up') {
      ACTIVEWORK +=1;
      LAST = 'down';
    }
    worksscroll.animateDown($imgs[ACTIVEWORK-1], $imgs[ACTIVEWORK], ()=> ACTIVEWORK+=1);
  }

  else if(!(ACTIVE==$navs.length)){
    $navs[ACTIVE-1].classList.remove('activenav');
    $views[ACTIVE-1].classList.remove('activeview');
    ACTIVE += 1;
    $navs[ACTIVE-1].classList.add('activenav');
    $views[ACTIVE-1].classList.add('activeview');
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
(function(){
  //Assign Navbar Listeners as well as keyboard ones
  if($navs){
    window.addEventListener('keydown', handleKeyDown);
    for(var i =0; i<$navs.length; i++){
      $navs[i].addEventListener('click', handleNavClick);
    }
  }

  var woopop = (count) => {
    if (count==3){
      STARTED = 1;
      document.getElementById('loadingall').style.display= "none";
      worksscroll();
    }
  }

  ANIM = new animation('view1');
  ANIM.startAnimation();

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
        images[this.index].children[0].style.display= "none";
        images[this.index].style.background = 'url('+this.src+') no-repeat center center';
      }
      imgsrcs[i].src = "./dist/assets/Works/image0"+ (i+1) + ".png";
    }
  }
}())}

else{
  (function(){
    document.getElementById('allofthis').classList.add('mobileview');
    var $imagesm = document.getElementsByClassName('workimg');
    var imgsrcs = new Array();
    for (var i=0;i<$imagesm.length; i++){
      imgsrcs[i]= new Image();
      imgsrcs[i].index = i;
      imgsrcs[i].onload = function(){
        $imagesm[this.index].src = this.src;
      }
      imgsrcs[i].src= './dist/assets/Works/image0'+(i+1)+'m.png';
    }
  }())
}

if (/MSIE 10|MSIE 9|rv:11.0|Edge\/\d./i.test(navigator.userAgent)) {
  document.getElementById('allofthis').style.overflow="hidden";
   window.alert('isIE10');
}