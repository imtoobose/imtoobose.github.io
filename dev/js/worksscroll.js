var t,
$imgs;
module.exports= () => {
  t = new TimelineLite();
  $imgs = document.getElementsByClassName('workbox');
  
  t
  .set($imgs, {top: "200%"})
  .set($imgs[0], {top:"0%"});

  var ACTIVE = 0;

  document.addEventListener('click', function(e){
    console.log(e.target.id);
    if(/workbox/.test(e.target.id)){
      console.log(ACTIVE);
      animate(ACTIVE, () => {
        ACTIVE+=1;
        console.log('yay');
      });
    }
  })
}

var animate = (active, callback) => {
  console.log($imgs[active], $imgs[active+1]);

  t
  .set($imgs[active], {top:'0'})
  .set($imgs[active+1], {top: '200%'})
  .to($imgs[active], 0.5, {top: '-200%', ease:Power3.easeInOut}, 0)
  .to($imgs[active+1], 0.5, {top: '-=200%', ease:Power3.easeInOut}, 0);
  
  console.log($imgs[active], $imgs[active+1]);
  callback();
}