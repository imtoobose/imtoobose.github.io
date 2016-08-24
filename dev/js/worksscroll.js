module.exports= () => {
  var t = new TimelineLite();
  var $imgs = document.getElementsByClassName('workbox');
  
  t
  .set($imgs, {autoAlpha: 0})
  .set($imgs[0], {autoAlpha: 1});

  var ACTIVE = 0;

  document.addEventListener('click', function(e){
    if(/workbox/.test(e.target.id)){
      if(ACTIVE!= $imgs.length-1){
        animate(ACTIVE, $imgs[ACTIVE], $imgs[ACTIVE+1] , () => ACTIVE+=1);
      }
    }
  })
}

var animate = (active, $out, $in, callback) => {
  console.log(active, $out, $in);
  var t= new TimelineLite();
  t.set($in, {y: '100%', autoAlpha: 1});

  t
  .to($out, 0.5, {y: '-100%'}, 0)
  .to($in, 0.5, {y: '-=100%'}, 0);
  
  console.log($out, $in);
  callback();
}