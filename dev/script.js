var handleNavClick = (e) => {
  for(var i = 0; i< navs.length; i++) {
    navs[i].classList.remove('activenav');
  }
  e.target.classList.add('activenav');
  
  var targ= +e.target.id.slice(-1);
  for (i=0; i<views.length; i++){ 
    views[i].classList.remove('activeview');
  }
  views[targ-1].classList.add('activeview');
}

var 
  views = document.getElementsByClassName('view'),
  navs  = document.getElementsByClassName('navelem');

for(var i =0; i<navs.length; i++){
  navs[i].addEventListener('click', handleNavClick);
}