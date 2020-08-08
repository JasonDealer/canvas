//Без границ, все остальное работает (за исключением выделения первого элемента)

let square = document.querySelector('.square');
let round = document.querySelector('.round');
let canvas = document.querySelector('.canvas');
let wrapper = document.querySelector('.wrapper');
let figures = document.querySelector('.figures');
let massFig = document.querySelectorAll(".figure");
let first = document.getElementById('first');
let active = document.querySelector('.active');


function setActions(element) {
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
  if (element.style.top >= 655 + 'px') {
      element.style.top = 655 + 'px';
      e.onmouseup = function() {
        document.onmousemove = null;
        e.onmouseup = null;
      };
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