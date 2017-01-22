var config = {
    width: 800,
    height: 500,
    bgColor: 0x1099BB,
    ripples: {
        radiusSizes: [25, 50, 75],
        tweenTimes: [800, 1000, 1200],
        initialRadius: 10,
        stroke: {
            width: 2,
            color: 0xFFFFFF
        },
        fill: {
            color: 0xAFAFAF
        }
    },
    boat: {
        airFriction: 0.001
    }
};

module.exports = config;
