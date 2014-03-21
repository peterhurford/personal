/* 
Previous selector helper function for the "mac dock" style footer

CSS can select the next element, but cannot automatically select the previous element, so we close the gap here with JS.

Adapted from GirlieMac <http://girliemac.com/blog/2010/06/02/simulating-macos-dock-like-menu-with-css3/>.
*/

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