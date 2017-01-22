var Ripple = require('./ripple');
var FastClick = require('fastclick').FastClick;

// enable faster clicks on mobile
FastClick.attach(document.body);

// from http://stackoverflow.com/a/19048340
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }


function dropRock(event){
    console.log('a click');
    var mousePos = getMousePos(event.target, event);

    
}

module.exports = {
    dropRock
};

