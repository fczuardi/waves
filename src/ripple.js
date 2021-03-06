var Matter = require('matter-js');
var Graphics = require('pixi.js').Graphics;
var ease = require('eases/cubic-out');
var config = require('./config').ripples;

var { Body, Bodies, World } = Matter;
var {
    radiusSizes,
    tweenTimes,
    initialRadius,
    splashRate,
    stroke,
    fill
} = config;

var Factory = function (engine, stage, ticker) {
    this.engine = engine;
    this.stage = stage;
    this.ticker = ticker;

    this.create = function (x, y, type) {
        return new Ripple(
            x,
            y,
            type,
            this.engine,
            this.stage,
            this.ticker
        );
    };
};

var Ripple = function (x, y, type, engine, stage, ticker) {
    var maxRadius = radiusSizes[type];
    var initialScale = initialRadius / maxRadius;

    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.time = Date.now();
    this.radius = initialRadius;
    this.sprite = new Graphics();
    this.body = Bodies.circle(x, y, maxRadius, {
        isSensor: true,
        isStatic: true
    });
    this.body.label = 'Ripple' + type;
    Body.scale(this.body, initialScale, initialScale);

    World.add(engine.world, this.body);
    stage.addChildAt(this.sprite, 0);

    this.draw = (function () {
        this.sprite.clear();

        // third ripple
        if (type > 1 && this.radius > radiusSizes[1] / 2){
            this.sprite
                .lineStyle(stroke.width, stroke.color, this.alpha)
                .drawCircle(this.x, this.y, this.radius * 0.25);
        }
        // second ripple
        if (type > 0 && this.radius > radiusSizes[0] / 2){
            this.sprite
                .lineStyle(stroke.width, stroke.color, this.alpha)
                .drawCircle(this.x, this.y, this.radius * 0.5);
        }

        // main ripple
        this.sprite
            .lineStyle(stroke.width, stroke.color, this.alpha)
            .beginFill(fill.color, this.alpha * 0.5)
            .drawCircle(this.x, this.y, this.radius)
            .endFill();

        var nextScale = this.radius / this.body.circleRadius;
        Body.scale(this.body, nextScale, nextScale);
    }).bind(this);

    this.step = (function () {
        var deltaTime = Date.now() - this.time;
        var percentTime = deltaTime / tweenTimes[type];
        var percentStep = ease(percentTime);
        this.radius = percentStep * maxRadius;
        this.alpha = 1 - percentStep; 
        this.sprite.clear();
        if (percentStep > 1){
            // destroy the ripple
            stage.removeChild(this.sprite);
            World.remove(engine.world, this.body);
            ticker.remove(this.step);
            return;
        }
        this.draw();
    }).bind(this);

    // we could use either Pixi's ticker or Matter's Runner here
    // since they serve the same purpose, which is, to be a
    // wrapper for the requestAnimationFrame.
    // I choose to go with Pixi's tick event. I dont know why.
    ticker.add(this.step);

}

module.exports = Factory;

