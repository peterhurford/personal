function addPrevClass (e) {
  var target = e.target;
    if(target.getAttribute('src')) { // check if it is img
      var li = target.parentNode.parentNode;
      var prevLi = li.previousElementSibling;
      if(prevLi) {
        prevLi.className = 'prev';
      }

      target.addEventListener('mouseout', function() { 
        prevLi.removeAttribute('class');
      }, false);
  }
}
if (window.addEventListener) {
  document.getElementById("buttons").addEventListener('mouseover', addPrevClass, false);
}