let round = document.querySelector('.round');
let square = document.querySelector('.square');
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
        
            element.style.zIndex = 100;
        
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
            };
        
        };
        
        function getCoords(elem) {   // кроме IE8-
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    }

    function dragOn(i) {
        i.ondragstart = function() {
            return false;
        };
    }

    if (event.target.classList.contains('square')) {
            dragOn(event.target, drag(event.target));
        }
    };


