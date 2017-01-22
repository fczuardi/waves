var Howl = require('howler').Howl;

var sources = function(filename){
    return [
        './audio/' + filename + '.ogg',
        './audio/' + filename + '.mp3'
    ];  
}
var bigRock = new Howl({
    src: sources('BigRock') 
});

module.exports = {
    bigRock
};

