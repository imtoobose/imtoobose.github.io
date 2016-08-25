module.exports= () => {
  var t = new TimelineLite();
  var $imgs = document.getElementsByClassName('workposter');

  t
  .set($imgs, {autoAlpha: 0})
  .set($imgs[0], {autoAlpha: 1});
}

var animateUp = ($out, $in, callback) => {
  var t= new TimelineLite();
  t
  .set($in, {y: '-100%', autoAlpha:1})
  .to($out, 0.5, {y: '100%'}, 0)
  .to($in, 0.5, {y: '+=100%'}, 0);
  callback();
}

var animateDown = ($out, $in, callback) => {
  var t= new TimelineLite();
  t
  .set($in, {y: '100%', autoAlpha: 1})
  .to($out, 0.5, {y: '-100%'}, 0)
  .to($in, 0.5, {y: '-=100%'}, 0);
  callback();
}

module.exports.animateUp = animateUp;
module.exports.animateDown= animateDown;