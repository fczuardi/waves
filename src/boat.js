var Matter = require('matter-js');
var Sprite = require('pixi.js').Sprite;
var config = require('./config').boat;

var { Body, Bodies, World } = Matter;
var {
    airFriction
} = config;

var Factory = function (texture, engine, stage, ticker) {
    this.texture = texture;
    this.engine = engine;
    this.stage = stage;
    this.ticker = ticker;

    this.create = function (x, y) {
        return new Boat(
            x,
            y,
            this.texture,
            this.engine,
            this.stage,
            this.ticker
        );
    };
};

var Boat = function (x, y, texture, engine, stage, ticker) {
    this.x = x;
    this.y = y;

    this.sprite = new Sprite(texture);
    this.sprite.position.set(x, y);
    this.sprite.anchor.set(0.5, 0.5);
    stage.addChild(this.sprite);

    this.body = Bodies.fromVertices(
        x,
        y,
        [
            {x: 22, y: 0},
            {x: 44, y: 43},
            {x: 22, y: 86},
            {x: 0, y: 43}
        ],
        {frictionAir: airFriction}
    );
    this.body.label = 'Boat';
    World.add(engine.world, this.body);

    this.step = (function () {
        this.sprite.position = this.body.position;
        this.sprite.rotation = this.body.angle;
    }).bind(this);

    ticker.add(this.step);
};

module.exports = Factory;
