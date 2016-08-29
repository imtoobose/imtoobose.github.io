var 
  animation   = require('./js/canvashome'),
  worksscroll = require('./js/worksscroll'),
  ANIM        = null,
  ACTIVE      = 1,
  ACTIVEWORK  = 1,
  STARTED     = 0,
  LAST        = 'down',
  SUBSOPEN    = 0,
  $imgs       = document.getElementsByClassName('workposter'),
  $views      = document.getElementsByClassName('view'),
  $subnavs    = document.getElementsByClassName('subelem'),
  $subs       = document.getElementById('subs'),
  $navs       = document.getElementsByClassName('navelem');

//---For handling clicks on the Nav menu
var handleNavClick = (e) => {
  if(/nav/gi.test(e.target.id)){
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

    var t;
    if(SUBSOPEN===0 && targ==2){
      t= new TimelineLite();
      t.to(subs, 0.3, {height: 70});
      SUBSOPEN=1;
    }

    else if(SUBSOPEN==1 && targ!=2){
      t = new TimelineLite();
      t.to(subs, 0.3, {height: 0});
      SUBSOPEN =0;
    }
  }
}

var handleSubNavClick = (e) =>{

  if(STARTED==1){
    var lastwork;
    var targ = e.target.id.slice(-1);
    for(var i=0; i<$subnavs.length; i++){
      $subnavs[i].classList.remove('activesub');
    }

    if(LAST=='up'){
      ACTIVEWORK+=1;
    } 

    lastwork = ACTIVEWORK;
    console.log(lastwork, ACTIVEWORK, LAST);

    if(lastwork===0) lastwork = 1;
    if(lastwork>5) lastwork = 5;

    ACTIVEWORK= +targ;
    $subnavs[ACTIVEWORK-1].classList.add('activesub');

    if(lastwork>ACTIVEWORK)
      worksscroll.animateUp($imgs[lastwork-1], $imgs[ACTIVEWORK-1]);
    else if(lastwork<ACTIVEWORK)
      worksscroll.animateDown($imgs[lastwork-1], $imgs[ACTIVEWORK-1]);
    LAST = 'click';
  }
}

//----For moving up with the keyboard
var moveUp=()=>{
  if(STARTED==1){
    var t;
    if(ACTIVE==3 && SUBSOPEN==0){
      t= new TimelineLite();
      t.to($subs, 0.3, {height: 70});
      SUBSOPEN = 1;
      if(ACTIVEWORK==5)
        $subnavs[4].classList.add('activesub');
    }

    if(ACTIVE==2 && ACTIVEWORK===0){
      t = new TimelineLite();
      SUBSOPEN = 0;
      t.to($subs, 0.3, {height: 0});
    }
  }

  if(STARTED==1 && ACTIVE==2 && ACTIVEWORK>=1){
    if(LAST=='down') {
      ACTIVEWORK-=1;
    }

    if(LAST=='click'){
      if(ACTIVEWORK>1) {
        ACTIVEWORK-=1;
      }

      else{
        ACTIVEWORK=0;
        LAST='up';
        moveUp();
        return;
      }
    }

    LAST = 'up';

    try{
      $subnavs[ACTIVEWORK].classList.remove('activesub');
      $subnavs[ACTIVEWORK-1].classList.add('activesub');
    }
    catch(e){
      $subnavs[$subnavs.length-1].classList.remove('activesub');
      $subnavs[$subnavs.length-2].classList.add('activesub');
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
  if(STARTED==1){
    var t;

    if(ACTIVE==1 && SUBSOPEN===0){
      t = new TimelineLite();
      SUBSOPEN = 1;
      t
      .to($subs, 0.3, {height: 70}, 0);
      if(ACTIVEWORK==1)
        $subnavs[0].classList.add('activesub');
    }

    else if(ACTIVE==2 && ACTIVEWORK==5){
      t= new TimelineLite();
      SUBSOPEN = 0;
      t.to($subs, 0.3, {height: 0});
    }
  }

  if(STARTED==1 && ACTIVE==2 && ACTIVEWORK<5){
    if(LAST=='up') {
      ACTIVEWORK +=1;
    }

    LAST = 'down';

    try{
      $subnavs[ACTIVEWORK-1].classList.remove('activesub');
      $subnavs[ACTIVEWORK].classList.add('activesub');
    }
    catch(e){
      $subnavs[0].classList.remove('activesub');
      $subnavs[1].classList.add('activesub');
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
if(window.innerWidth>768){
(function(){
  //Assign Navbar Listeners as well as keyboard ones
  if($navs){
    window.addEventListener('keydown', handleKeyDown);
    for(var i =0; i<$navs.length; i++){
      $navs[i].addEventListener('click', handleNavClick);
    }
    for(i =0; i<$subnavs.length; i++){
      $subnavs[i].addEventListener('click', handleSubNavClick);
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
  if(window.innerWidth>768){
    document.getElementById('allofthis').style.overflow="hidden";
    document.getElementById('emailname').style.width = "30vw";
  }
  else{
    document.getElementById('emailname').style.width = "100%";
  }  
}