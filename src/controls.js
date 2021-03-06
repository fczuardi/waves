var Ripple = require('./ripple');
var FastClick = require('fastclick').FastClick;
var sounds = require('./sounds');

// enable faster clicks on mobile
FastClick.attach(document.body);

var Controls = function (rippleFactory) {
    this.rippleFactory = rippleFactory;

    // from http://stackoverflow.com/a/19048340
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    this.init = function (canvas) {
        canvas.addEventListener('click', this.dropRock);
    };

    this.dropRock = function (event) {
        console.log('a click');
        var mousePos = getMousePos(event.target, event);
        rippleFactory.create(mousePos.x, mousePos.y, 2);
        var rockSize = 2;
        switch (rockSize) {
            case 0:
                sounds.tinyRock.play();
                break;
            case 1:
                sounds.mediumRock.play();
                break;
            case 2:
                sounds.bigRock.play();
                break;
        }
        
    };
};

module.exports = Controls;

