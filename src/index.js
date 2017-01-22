// Pirate Minigolf
//
// Global Game Jam 2017
//

var Physics = require('./physics');
var Renderer = require('./render');
var DebugRenderer = require('./debugRender');
var Ripple = require('./ripple');
var Boat = require('./boat');

var { canvas, stage, ticker } = Renderer;
document.body.appendChild(canvas);

var engine = Physics.engine;

Pixi.loader
    .add([
        'img/boat-small.png'
    ])
    .load(game);

function game() {
    var rippleP = new Ripple(50, 50, 0, engine, stage, ticker);
    var rippleM = new Ripple(200, 100, 1, engine, stage, ticker);
    var rippleG = new Ripple(450, 150, 2, engine, stage, ticker);

    var boat = new Boat(
        100,
        100,
        Pixi.loader.resources['img/boat-small.png'].texture,
        engine,
        stage,
        ticker
    );

    var debugRender = new DebugRenderer(engine);
    debugRender.run();
}
