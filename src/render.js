var Pixi = require('pixi.js');
var config = require('./config');

var { width, height} = config;
var app = new Pixi.Application(width, height);

module.exports = {
	canvas: app.view,
	render: app.render
};

