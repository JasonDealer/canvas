//Границы практически работают проблемы с позиционированием

let square = document.querySelector('.square'),
    round = document.querySelector('.round'),
    canvas = document.querySelector('.canvas'),
    wrapper = document.querySelector('.wrapper'),
    figures = document.querySelector('.figures'),
    massFig = document.querySelectorAll(".figure"),
    first = document.getElementById('first'),
    active = document.querySelector('.active');



function setActions(element) {
    let limits = {
      top: canvas.offsetTop,
      right: canvas.offsetWidth + canvas.offsetLeft - element.offsetWidth,
      bottom: canvas.offsetHeight + canvas.offsetTop - element.offsetHeight,
      left: canvas.offsetLeft
    };
element.onmousedown = function(e) {

let coords = getCoords(element);
let shiftX = e.pageX - coords.left;
let shiftY = e.pageY - coords.top;

element.style.position = 'absolute';
if (element.classList.contains('square')) {
    document.body.appendChild(square);
    } else if (element.classList.contains('round')) {
        document.body.appendChild(round);
    }
/* document.body.appendChild(square); */
moveAt(e);

element.style.zIndex = 1000; // над другими элементами

function moveAt(e) {
  element.style.left = e.pageX - shiftX + 'px';
  element.style.top = e.pageY - shiftY + 'px';
  var newLocation = {
    x: limits.left + 50 + 'px',
    y: limits.top + 50 + 'px'
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
  function relocate(newLocation) {
    element.style.left = newLocation.x + 'px';
    element.style.top = newLocation.y + 'px';
  }
}

document.onmousemove = function(e) {
moveAt(e);
};

element.onmouseup = function() {
/* document.onmousemove = null;
element.onmouseup = null; */
let copy = document.createElement('div');
if (element.classList.contains('square')) {
copy.classList.add('square');
element.classList.add('copy');
} else if (element.classList.contains('round')) {
copy.classList.add('round');
element.classList.add('copy');
}
copy.classList.add("draggable");
copy.classList.add("figure");
copy.classList.add("copy");
figures.append(copy);
setActions(copy);
document.onmousemove = null;
copy.onmouseup = null;
};

};

element.ondragstart = function() {
return false;
};
}
setActions(square);
setActions(round);
function getCoords(elem) {
let box = elem.getBoundingClientRect();
return {
top: box.top + pageYOffset,
left: box.left + pageXOffset
};
}

document.addEventListener('click', function(e) {
    const items = document.querySelectorAll('.draggable');
    const target = e.target;
  Array.from(items).forEach(item => {
      item.classList.remove('active');
  });
  if(event.target.classList.contains('figure')) {
    event.target.classList.add('active');
  } else if (event.target == first){
    first.classList.add('active');
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 46) {
    let oldChild = figures.removeChild(active);
    figures.removeChild(active);
  }
});