var ball = document.getElementById('square');
let copy = document.createElement('div');
let figures = document.querySelector('.figures'); 

function drag(i) {
  i.onmousedown = function(e) {

    var coords = getCoords(i);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
  
    i.style.position = 'absolute';
    document.body.appendChild(i);
    moveAt(e);
  
    i.style.zIndex = 1000; // над другими элементами
  
    function moveAt(e) {
      i.style.left = e.pageX - shiftX + 'px';
      i.style.top = e.pageY - shiftY + 'px';
    }
  
    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    i.onmouseup = function() {
      document.onmousemove = null;
      i.onmouseup = null;
    };
  
  };
  i.ondragstart = function() {
    return false;
  };
  function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
}

}

function create() {
              copy.classList.add("square");
              copy.classList.add("figure");
              copy.classList.add("draggable");
              figures.appendChild(copy);
}

drag(ball, create());
