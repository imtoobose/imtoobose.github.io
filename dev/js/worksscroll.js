module.exports= () => {
  var t = new TimelineLite();
  var $imgs = document.getElementsByClassName('workposter');

  t
  .set($imgs, {autoAlpha: 0})
  .set($imgs[0], {autoAlpha: 1});
}

var animateUp = ($out, $in, callback) => {
  var t= new TimelineLite();

  var
  $indesc  = ($in.getElementsByClassName('workdescription'))[0],
  $outdesc = ($out.getElementsByClassName('workdescription'))[0];

  t
  .set($in, {y: '-100%', autoAlpha:1})
  .set($indesc, {autoAlpha: 0})
  .to($out, 0.5, {y: '100%'}, 0)
  .to($in, 0.5, {y: '+=100%'}, 0)
  .to($outdesc, 0.3, {autoAlpha: 0}, 0.2)
  .to($indesc, 0.3, {autoAlpha: 1}, 0.2);
  
  callback();
}

var animateDown = ($out, $in, callback) => {
  var t= new TimelineLite();
  var
  $indesc  = ($in.getElementsByClassName('workdescription'))[0],
  $outdesc = ($out.getElementsByClassName('workdescription'))[0];

  t
  .set($in, {y: '100%', autoAlpha: 1})
  .set($indesc, {autoAlpha: 0})
  .to($out, 0.5, {y: '-100%'}, 0)
  .to($in, 0.5, {y: '-=100%'}, 0)
  .to($outdesc, 0.3, {autoAlpha: 0}, 0)
  .to($indesc, 0.3, {autoAlpha: 1}, 0.2);
  
  callback();
}

module.exports.animateUp = animateUp;
module.exports.animateDown= animateDown;