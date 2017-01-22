var Render = require('matter-js').Render;
var config = require('./config');

var { width, height } = config;

function DebugRender(engine) {
    // create a renderer
    this.render = Render.create({
        element: document.body,
        engine: engine,
        options: { width, height }
    });
    this.run = function () {
        Render.run(this.render);
    }
}

module.exports = DebugRender;

