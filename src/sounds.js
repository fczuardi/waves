var Howl = require('howler').Howl;

var sources = function(filename){
    return [
        './audio/' + filename + '.ogg',
        './audio/' + filename + '.mp3'
    ];  
}

var themeSong = new Howl({
    src: sources('ThemeSongLong') 
});

var beepMenu = new Howl({
    src: sources('BeepMenu') 
});

var bigRock = new Howl({
    src: sources('BigRock') 
});

var mediumRock = new Howl({
    src: sources('MediumRock') 
});

var tinyRock = new Howl({
    src: sources('TinyRock') 
});

var chestOpening = new Howl({
    src: sources('ChestOpening') 
});

var waterBubbling = new Howl({
    src: sources('WaterBubbling') 
});

var finalWin = new Howl({
    src: sources('FinalWin') 
});

var collisionSound = new Howl({
    src: sources('Collision') 
});

module.exports = {
    themeSong,
    beepMenu,
    bigRock,
    mediumRock,
    tinyRock,
    chestOpening,
    waterBubbling,
    finalWin,
    collisionSound
};

