module.exports= () => {
  var t = new TimelineLite();
  var $imgs = document.getElementsByClassName('workposter');
  t
  .set($imgs, {autoAlpha: 0})
  .set($imgs[0], {autoAlpha: 1});

  var workre= /worklink/g;
  var backcolors = ["#D44633", "#10A56F", "#5C8E81", "#C97C78", "#48606B", "#616168"];

  var handleMouseOver = (e) =>{
    if(workre.test(e.target.id)){
      var $icon = (e.target.children[0]);
      var t= new TimelineLite();
      t
      .to($icon, 0.2, {color: backcolors[+e.target.id.slice(-1) - 1], autoAlpha: 1}, 0)
      .to(e.target, 0.2, {scale:1.1, rotation:-45, ease:Power3.easeIn}, 0);
    }
  }

  var handleExit = (e) =>{
    if(/worklink/g.test(e.target.id)) {
      var t= new TimelineLite();
      t
      .to(e.target.children[0], 0.3, {color: "#FFF"}, 0)
      .to(e.target, 0.3, {scale: 1, rotation:0}, 0);
    }
  }

  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleExit);
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
  if(callback)
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
  if(callback)
    callback();
}

module.exports.animateUp = animateUp;
module.exports.animateDown= animateDown;