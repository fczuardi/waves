// Pirate Minigolf
//
// Global Game Jam 2017
//

var html = require('bel');
var Physics = require('./physics');
var Renderer = require('./render');
var Controls = require('./controls');
var DebugRenderer = require('./debugRender');
var Boat = require('./boat');
var Ripple = require('./ripple');
var Maps = require('./maps');

var demosLink = html`<p>
    <a href="demos.html">see some demos</a>, 
    <a href="https://github.com/fczuardi/waves">see the source</a>
</p>`;
document.body.appendChild(demosLink);

var { loader, canvas, stage, ticker } = Renderer;
document.body.appendChild(canvas);

var engine = Physics.engine;

Maps.loadMap(Maps.FullStage(stage), engine);

loader
    .add([
        'img/boat-small.png'
    ])
    .load(game);

function game() {
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
