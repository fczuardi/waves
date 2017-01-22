
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

// collision management
Events.on(engine, 'collisionStart', function(event){
    event.pairs.forEach(function(pair){
        var bodies = [pair.bodyA, pair.bodyB];
        var ripples = bodies.filter(function(body){return body.label.indexOf('Ripple') !== -1;});
        var boats = bodies.filter(function(body){return body.label.indexOf('Boat') !== -1;});
        var boat = boats.length ? boats[0] : null; 
        var ripple = ripples.length ? ripples[0] : null; 
        console.log({boat});
        console.log({ripple});

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
        console.log({forceX});
        console.log({forceY});
        window.queuedForce = { x: forceX, y: forceY };
        window.boatToForce = boat;
    })
});

Engine.run(engine);

module.exports = {
    engine
};

