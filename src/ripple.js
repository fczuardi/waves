var Matter = require('matter-js');
var Graphics = require('pixi.js').Graphics;
var config = require('./config').ripples;

var { Body, Bodies, World } = Matter;
var { radiusSizes, stroke, fill } = config;

var Ripple = function(x, y, type, engine, stage) {
    var maxRadius = radiusSizes[type];
    this.body = Bodies.circle(x, y, maxRadius, {
        isSensor: true,
        isStatic: true
    });
 
    this.sprite = new Graphics()
        .lineStyle(stroke.width, stroke.color, stroke.opacity)
        .beginFill(fill.color, fill.opacity)
        .drawCircle(x, y, maxRadius)
        .endFill();

    World.add(engine.world, this.body);
    stage.addChildAt(this.sprite, 0);
    

}

module.exports = Ripple;

