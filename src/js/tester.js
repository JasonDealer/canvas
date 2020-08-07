let square = document.querySelector('.square');
let round = document.querySelector('.round');
let figures = document.querySelector('.figures');  
let canvas = document.querySelector('.canvas');  
  
document.onmousedown = event => {
    
    function drag(element) {
        element.onmousedown = function(e) {
        
            let coords = getCoords(element);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;
        
            element.style.position = 'absolute';
            document.body.appendChild(element);
            moveAt(e);
        
            element.style.zIndex = 100;
        
            function moveAt(e) {
                element.style.left = e.pageX - shiftX + 'px';
                element.style.top = e.pageY - shiftY + 'px';
                var newLocation = {
                    x: limits.left,
                    y: limits.top
                  };
                  if (e.pageX > limits.right) {
                    newLocation.x = limits.right;
                  } else if (e.pageX > limits.left) {
                    newLocation.x = e.pageX;
                  }
                  if (e.pageY > limits.bottom) {
                    newLocation.y = limits.bottom;
                  } else if (e.pageY > limits.top) {
                    newLocation.y = e.pageY;
                  }
                  relocate(newLocation);
            }

            function relocate(newLocation) {
                element.style.left = newLocation.x + 'px';
                element.style.top = newLocation.y + 'px';
              }

            document.onmousemove = function(e) {
                moveAt(e);
            };    
        

            function copeing(i) {
                i.onmouseup = function() {
                    let copy = document.createElement('div');
                    if(element.classList.contains('square')) {
                        copy.classList.add('square');
                    }else if(element.classList.contains('round')) {
                        copy.classList.add('round');
                    }
                    copy.classList.add("figure");
                    copy.classList.add("draggable");
                    figures.appendChild(copy);
                    document.onmousemove = null;
                    element.onmouseup = null;
                };
            }
            copeing(element);
        };
        
        function getCoords(elem) {   // кроме IE8-
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
        element.ondragstart = function() {
            return false;
        };
    }

    if (event.target.classList.contains('square')) {
            drag(event.target);
        }else if(event.target.classList.contains('round')) {
            drag(event.target);
        } 
    };

    var elem = document.elementFromPoint(event.clientX, event.clientY);

    if(event.clientX < 300) {
        document.onmouseup = function() {
            elem.classList.add("red");
        };
    }

    var limits = {
  top: canvas.offsetTop,
  right: canvas.offsetWidth + canvas.offsetLeft - canvas.offsetWidth,
  bottom: canvas.offsetHeight + canvas.offsetTop - canvas.offsetHeight,
  left: canvas.offsetLeft
};