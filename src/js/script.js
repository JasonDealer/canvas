//все работает кроме первых эл-тов

let round = document.querySelector('.round'),
    canvas = document.querySelector('.canvas'),
    wrapper = document.querySelector('.wrapper'),
    figures = document.querySelector('.figures'),
    massFig = document.querySelectorAll(".figure"),
    first = document.getElementById('first'),
    square = document.querySelector('.square');


function setActions(element) {

    let limits = {
      	top: canvas.offsetTop + 125,
      	right: canvas.offsetWidth + canvas.offsetLeft - element.offsetWidth / 2,
      	bottom: canvas.offsetHeight + canvas.offsetTop - element.offsetHeight / 2,
      	left: canvas.offsetLeft - 75
    };
	element.onmousedown = function(e) {
		let coords = getCoords(element);
		let shiftX = e.pageX - coords.left;
		let shiftY = e.pageY - coords.top;

		if(element.style.left < 150 + 'px') {
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
		}

		element.style.position = 'absolute';
/* 		if (element.classList.contains('square')) {
			document.body.appendChild(square);
		} else if (element.classList.contains('round')) {
			document.body.appendChild(round);
		} */
	/* document.body.appendChild(square); */
		moveAt(e);

		element.style.zIndex = 20; // над другими элементами

		function moveAt(e) {
			element.style.left = e.pageX - shiftX + 'px';
			element.style.top = e.pageY - shiftY + 'px';

	/*   element.classList.add('active'); */

			let newLocation = {
				x: limits.left,
				y: limits.top
			};
			if (e.pageX > limits.right && e.pageX < limits.right + 200) {
				newLocation.x = limits.right;
			} else if (e.pageX > limits.left) {
				newLocation.x = e.pageX;
			}
			if (e.pageY > limits.bottom && e.pageY < limits.bottom + 100) {
				newLocation.y = limits.bottom;
			} else if (e.pageY > limits.top) {
				newLocation.y = e.pageY;
			}
			relocate(newLocation);
			function relocate(newLocation) {
				element.style.left = newLocation.x - element.offsetWidth / 2 + 'px';
				element.style.top = newLocation.y - element.offsetHeight / 2 + 'px';
			}
		}

		document.onmousemove = function(e) {
			moveAt(e);
		};

/* 		function setActive(e) {
		e.classList.add('active');
		} */

		element.onmouseup = function() {

			if (event.clientX > limits.right + 5) {
				figures.removeChild(element);
			} else if(event.clientY > limits.bottom + 5) {
				figures.removeChild(element);
			}
			document.onmousemove = null;
			element.onmouseup = null;
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
//////////

/* 	massFig.forEach(item => {								
		item.classList.remove('active');
		item.style.zIndex = 5;
	});
	if(elem.classList.contains('draggable')) {
		elem.classList.add('active');
		elem.style.zIndex = 200;
	} */

///////////



//////////
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

//назначение класса активности

document.addEventListener('click', function(e) {
	const items = document.querySelectorAll('.draggable');
	Array.from(items).forEach(item => {
		item.classList.remove('active');
		item.style.zIndex = 5;
	});
	
	if(event.target.classList.contains('draggable')) {
		event.target.classList.add('active');
		event.target.style.zIndex = 200;
	}
});

/* function disableActive(e) {
  	e.classList.remove('active');
} */

/* let elt = document.getElementById('first');

elt.addEventListener('click', function(e) {
    if (e.target.classList.contains('draggable')) {
      e.target.classList.add('active');
    }
}); */

document.addEventListener('keyup', function(event) {
  	let active = document.querySelector('.active');
  	if (event.keyCode == 46) {
    	figures.removeChild(active);
  	}
});