require('shelljs/global');

var LIBDIR = './docs/js/lib/';
var MATTERJS = './node_modules/matter-js/build/matter-dev.js';

mkdir('-p', LIBDIR);
cp(MATTERJS, LIBDIR + '.');

