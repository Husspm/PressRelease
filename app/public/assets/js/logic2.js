function setup() {

}
var offset = 0;
var stopChange = 0;
var stopDirection = true;

function draw() {
    if (stopDirection === true) {
        stopChange += 0.15;
    }
    if (stopChange > 120) {
        stopDirection = false;
    }
    if (stopDirection === false) {
        stopChange -= 0.15;
    }
    if (stopChange < 0) {
        stopDirection = true;
    }
    offset += 0.008;
    var cAmt = noise(offset) * 80;
    $(".main-body").css({
        "background": "linear-gradient(to bottom left, #000, #111," + stopChange + "%, #222, #111, #000)",
        "background-size": "80px 80px"
    });
    $(".side-bar").css({
        "background": "linear-gradient(to bottom right, #000, #111," + stopChange + "%, #222, #111, #000)",
        "background-size": "80px 80px"
    });
    $("body").css({
        "background": "linear-gradient(to bottom right, #000, #333, #666," + stopChange + "%,#999, #666, #333, #000)",
        "background-size": "130px 130px"
    });
}