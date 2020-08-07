var small = document.getElementById('square');
var big = document.getElementById('canvas');
//* флаг перетаскивания
var isDrag = false;
//* ограничения, за которые нельзя вытащить small
var limits = {
  top: big.offsetTop,
  right: big.offsetWidth + big.offsetLeft - small.offsetWidth,
  bottom: big.offsetHeight + big.offsetTop - small.offsetHeight,
  left: big.offsetLeft
};

//* вкл/выкл режим перетаскивания
small.onmousedown = function(e) {
  isDrag = true;
}
document.onmouseup = function() {
  isDrag = false;
}
document.onmousemove = function(e) {
  if (isDrag) {
    move(e);
  }
}

//* вычисление координат
function move(e) {
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

//* размещение small
function relocate(newLocation) {
  small.style.left = newLocation.x + 'px';
  small.style.top = newLocation.y + 'px';
}