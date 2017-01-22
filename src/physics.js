
var Matter = require('matter-js');
var Ripple = require('./ripple');
var config = require('./config');

// matter-js aliases
var {
    Engine,
    World,
    Bodies,
    Body,
    Events
} = Matter;

var engine = Engine.create();

// zero gravity to simulate water viewed from top
engine.world.gravity.y = 0;

var boundaries = [
    Bodies.rectangle(400, 500, 800, 20, {isStatic: true}),
    Bodies.rectangle(400, 0, 800, 20, {isStatic: true}),
    Bodies.rectangle(0, 250, 20, 500, {isStatic: true}),
    Bodies.rectangle(800, 250, 20, 500, {isStatic: true}),

];

World.add(engine.world, boundaries);

// collision management
Events.on(engine, 'collisionStart', function(event){
    event.pairs.forEach(function(pair){
        var bodies = [pair.bodyA, pair.bodyB];
        var ripples = bodies.filter(function(body){return body.label.indexOf('Ripple') !== -1;});
        var boats = bodies.filter(function(body){return body.label.indexOf('Boat') !== -1;});
        var boat = boats.length ? boats[0] : null; 
        var ripple = ripples.length ? ripples[0] : null; 

        if (!boat || !ripple){
            return;
        }
        var maxForce = 0.005;
        var maxRadius = config.ripples.radiusSizes[2]; 
        var deltaX = boat.position.x - ripple.position.x;
        var deltaY = boat.position.y - ripple.position.y;
        var pX = deltaX / maxRadius;
        var pY = deltaY / maxRadius;
        var sX = deltaX < 0 ? -1 : 1;
        var sY = deltaY < 0 ? -1 : 1;
        var forceX = (1 - Math.abs(pX)) * maxForce * sX;
        var forceY = (1 - Math.abs(pY)) * maxForce * sY;
        window.queuedForce = { x: forceX, y: forceY };
        window.boatToForce = boat;
    })
});

Events.on(engine, 'beforeUpdate', function(event){
    if (window.queuedForce) {
        var boat = window.boatToForce;
        Body.applyForce(boat, boat.position, window.queuedForce);
        window.queuedForce = null;
    }
});

Engine.run(engine);

module.exports = {
    engine
};

