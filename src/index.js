// Pirate Minigolf
//
// Global Game Jam 2017
//

var Physics = require('./physics');
var Renderer = require('./render');
var DebugRenderer = require('./debugRender');
var Ripple = require('./ripple');

var { canvas, stage, ticker } = Renderer;
document.body.appendChild(canvas);

var engine = Physics.engine;

var rippleP = new Ripple(50, 50, 0, engine, stage, ticker)
var rippleM = new Ripple(200, 100, 1, engine, stage, ticker)
var rippleG = new Ripple(450, 150, 2, engine, stage, ticker)

var debugRender = new DebugRenderer(engine);
debugRender.run();

