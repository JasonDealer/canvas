let square = document.querySelector('.square');
let round = document.querySelector('.round');
let canvas = document.querySelector('.canvas');
let wrapper = document.querySelector('.wrapper');
let figures = document.querySelector('.figures');
let massFig = document.querySelectorAll(".figure");
  
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

    /////////////

    document.addEventListener('click', function(e) {
        const items = document.querySelectorAll('.draggable');
        const target = e.target;
      Array.from(items).forEach(item => {
          item.classList.remove('active');
      });
      if(event.target.classList.contains('draggable')) {
        event.target.classList.add('active');
      }
    });