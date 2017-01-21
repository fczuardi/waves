require('shelljs/global');

var LIBDIR = './docs/js/lib/';
var MATTERJS = './node_modules/matter-js/build/matter-dev.js';
var PIXIJS = './node_modules/pixi.js/dist/pixi.js';

mkdir('-p', LIBDIR);
cp(MATTERJS, LIBDIR + 'matter.js');
cp(PIXIJS, LIBDIR + 'pixi.js');

