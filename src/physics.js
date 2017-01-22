var Matter = require("matter-js");
var Ripple = require("./ripple");
var config = require("./config");

var { Engine, World, Bodies, Body, Events } = Matter;

var engine = Engine.create();

// zero gravity to simulate water viewed from top
engine.world.gravity.y = 0;

// collision management
Events.on(engine, "collisionStart", function(event) {
  event.pairs.forEach(function(pair) {
    var bodies = [ pair.bodyA, pair.bodyB ];
    var ripples = bodies.filter(function(body) {
      return body.label.indexOf("Ripple") !== -1;
    });
    var boats = bodies.filter(function(body) {
      return body.label.indexOf("Boat") !== -1;
    });
    var boat = boats.length ? boats[0] : null;
    var ripple = ripples.length ? ripples[0] : null;

    if (!boat || !ripple) {
      return;
    }
    var maxForce = 0.005;
    // get the first contact point to be use in the math
    var contact;
    for (i in pair.contacts) {
      contact = pair.contacts[i];
      break;
    }
    var maxRadius = config.ripples.radiusSizes[2];
    var deltaX = contact.vertex.x - ripple.position.x;
    var deltaY = contact.vertex.y - ripple.position.y;
    var pX = deltaX / maxRadius;
    var pY = deltaY / maxRadius;
    var sX = deltaX < 0 ? -1 : 1;
    var sY = deltaY < 0 ? -1 : 1;
    var forceX = (1 - Math.abs(pX)) * maxForce * sX;
    var forceY = (1 - Math.abs(pY)) * maxForce * sY;
    window.queuedForce = { x: forceX, y: forceY };
    window.boatToForce = boat;
    window.positionToForce = contact.vertex;
  });
});

Events.on(engine, "beforeUpdate", function(event) {
  if (window.queuedForce) {
    var boat = window.boatToForce;
    Body.applyForce(boat, window.positionToForce, window.queuedForce);
    window.queuedForce = null;
  }
});

Engine.run(engine);

module.exports = { engine };
