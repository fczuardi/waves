var Matter = require("matter-js");
var config = require("./config");

var { Bodies, Composite, World } = Matter;

function FullStage(stage) {
  var { width, height } = config;
  var boundaryHeight = 20;
  var boundaryOptions = { isStatic: true };
  var map = Composite.create();
  var top = Bodies.rectangle(
    width / 2,
    1 - boundaryHeight / 2,
    width,
    boundaryHeight,
    boundaryOptions
  );
  var bottom = Bodies.rectangle(
    width / 2,
    height + boundaryHeight / 2 - 1,
    width,
    boundaryHeight,
    boundaryOptions
  );
  var left = Bodies.rectangle(
    1 - boundaryHeight / 2,
    height / 2 - 1,
    boundaryHeight,
    height,
    boundaryOptions
  );
  var right = Bodies.rectangle(
    width + boundaryHeight / 2 - 1,
    height / 2 - 1,
    boundaryHeight,
    height,
    boundaryOptions
  );

  Composite.add(map, top);
  Composite.add(map, bottom);
  Composite.add(map, left);
  Composite.add(map, right);

  return map;
}

function loadMap(map, engine) {
  World.add(engine.world, map);
}

module.exports = { FullStage, loadMap };
