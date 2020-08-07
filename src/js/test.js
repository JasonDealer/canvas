var figure = document.querySelector('.figure');
let figures = document.querySelector('.figures');

function drag(element) {
element.onmousedown = function(e) {

  var coords = getCoords(element);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  element.style.position = 'absolute';
  document.body.appendChild(element);
  moveAt(e);

  element.style.zIndex = 2; // над другими элементами

  function moveAt(e) {
    element.style.left = e.pageX - shiftX + 'px';
    element.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  element.onmouseup = function() {
    document.onmousemove = null;
    element.onmouseup = null;
    let copy = document.createElement('div');
            copy.classList.add("square");
            copy.classList.add("figure");
            copy.classList.add("draggable");
            figures.appendChild(copy);
  };

};

element.ondragstart = function() {
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

if (event.target.classList.contains('square')) {
    /*         let squareCopy = document.createElement('div');
                squareCopy.classList.add("squareCopy");
                squareCopy.classList.add("draggable");
                figures.appendChild(squareCopy); */
        drag(event.target);
    }



/*   let figure = document.querySelector('.figure');
  let figures = document.querySelector('.figures');  
  
    document.onmousedown = event => {
    
    function drag(element) {
        element.onmousedown = function(e) {
        
          let coords = getCoords(element);
          let shiftX = e.pageX - coords.left;
          let shiftY = e.pageY - coords.top;
        
          element.style.position = 'absolute';
          document.body.appendChild(element);
          moveAt(e);
        
          element.style.zIndex = 2;
        
        function moveAt(e) {
            element.style.left = e.pageX - shiftX + 'px';
            element.style.top = e.pageY - shiftY + 'px';
        }

          document.onmousemove = function(e) {
            moveAt(e);
          };
        
          element.onmouseup = function() {
            let copy = document.createElement('div');
            copy.classList.add("squareCopy");
            copy.classList.add("figure");
            copy.classList.add("draggable");
            figures.appendChild(copy);
            document.onmousemove = null;
            element.onmouseup = null;
          };
        
        };
        
        element.ondragstart = function() {
          return false;
        };
        
        function getCoords(elem) {   // кроме IE8-
          let box = elem.getBoundingClientRect();
          return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
          };
        }
    }

    if (event.target.classList.contains('figure')) {
         let squareCopy = document.createElement('div');
            squareCopy.classList.add("squareCopy");
            squareCopy.classList.add("draggable");
            figures.appendChild(squareCopy);
            drag(event.target);
        }
    };
     */