var Matter = require('matter-js');
var Graphics = require('pixi.js').Graphics;
var config = require('./config').ripples;

var { Body, Bodies, World } = Matter;
var {
    radiusSizes,
    initialRadius,
    stroke,
    fill
} = config;

var Ripple = function(x, y, type, engine, stage, ticker) {
    var maxRadius = radiusSizes[type];
    var initialScale = initialRadius / maxRadius;

    this.body = Bodies.circle(x, y, maxRadius, {
        isSensor: true,
        isStatic: true
    });
 
    this.sprite = new Graphics()
        .lineStyle(stroke.width, stroke.color, stroke.opacity)
        .beginFill(fill.color, fill.opacity)
        .drawCircle(x, y, initialRadius)
        .endFill();

    Body.scale(this.body, initialScale, initialScale);
    

    World.add(engine.world, this.body);
    stage.addChildAt(this.sprite, 0);
    
    // we could use either Pixi's ticker or Matter's Runner here
    // since they serve the same purpose, which is, to be a 
    // wrapper for the requestAnimationFrame. 
    // I choose to go with Pixi's tick event. I dont know why.
    ticker.add(function step(){
    })

}

module.exports = Ripple;

