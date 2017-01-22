
var Matter = require('matter-js');
var Ripple = require('./ripple');

// matter-js aliases
var {
    Engine,
    World,
    Bodies,
    Body,
    Event
} = Matter;

var engine = Engine.create();

// zero gravity to simulate water viewed from top
engine.world.gravity.y = 0;

function addBody(body) {
	World.add(engine.world, body);
}

function startRipple(x, y) {
	var ripple = new Ripple(x, y);
	addBody(ripple.body);
}

module.exports = {
	engine,
	startRipple
};

