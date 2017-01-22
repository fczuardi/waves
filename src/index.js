// Pirate Minigolf
//
// Global Game Jam 2017
//

var Physics = require('./physics');
var Renderer = require('./render');
var Controls = require('./controls');
var DebugRenderer = require('./debugRender');
var Boat = require('./boat');
var Ripple = require('./ripple');
var html = require('bel');

var demosLink = html`<p>
    <a href="demos.html">see some demos</a>, 
    <a href="https://github.com/fczuardi/waves">see the source</a>
</p>`;
document.body.appendChild(demosLink);

var { loader, canvas, stage, ticker } = Renderer;
document.body.appendChild(canvas);

var engine = Physics.engine;

loader
    .add([
        'img/boat-small.png'
    ])
    .load(game);

function game() {
    // var rippleP = new Ripple(50, 50, 0, engine, stage, ticker);
    // var rippleM = new Ripple(200, 100, 1, engine, stage, ticker);
    // var rippleG = new Ripple(450, 150, 2, engine, stage, ticker);

    var boatFactory = new Boat(
        loader.resources['img/boat-small.png'].texture,
        engine,
        stage,
        ticker
    );

    var boat = boatFactory.create(100, 100);

    var rippleFactory = new Ripple(
        engine,
        stage,
        ticker
    );

    var debugRender = new DebugRenderer(engine);
    debugRender.run();

    var controls = new Controls(rippleFactory);
    controls.init(canvas);
}
