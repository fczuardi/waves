var Pixi = require('pixi.js');
var config = require('./config');

var {
    width,
    height,
    bgColor
} = config;

var app = new Pixi.Application(width, height);
app.renderer.backgroundColor = bgColor;

module.exports = {
    loader: Pixi.loader,
    canvas: app.view,
    stage: app.stage,
    ticker: app.ticker,
    render: app.render
};

