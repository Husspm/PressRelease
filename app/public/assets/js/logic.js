function setup() {
    x = mouseX;
    y = mouseY;
    mic = new p5.AudioIn();
    mic.start();
}

var amount = 0;
var stopAdjust = 0;
var offset = 0;

function listen() {
    if (mic.getLevel() < 0.05) {
        offset += 0.01;
        amount *= 0.98;
        stopAdjust *= 0.98;
        $(".bgMask").css({
            "opacity": amount,
            "background": "radial-gradient(black, " + stopAdjust + "%, white, #3e0000, white, black)",
            "background-size": "20px 20px"
        });
        $("h2").css({
            "background": "radial-gradient(black, " + stopAdjust * 1.2 + "%, darkgray, #3e0000, white, black)",
            "background-size": "15px 15px"
        });
    } else {
        offset += 0.01;
        amount += 0.005;
        stopAdjust += 0.4;
        if (stopAdjust > 60) {
            stopAdjust = 60;
        }
        $(".bgMask").css({
            "opacity": amount,
            "background": "radial-gradient(black, " + stopAdjust + "%, white, #3e0000, white, black)",
            "background-size": "20px 20px"
        });
        $("h2").css({
            "background": "radial-gradient(black, " + stopAdjust * 1.2 + "%, darkgray, #3e0000, white, black)",
            "background-size": "15px 15px"
        });
    }
}
var spinAmount = 0;

function draw() {
    listen();
    spinAmount += 1.6;
    x = mouseX;
    y = winMouseY;
    $("h2").css({
        "transform": "rotate(" + mic.getLevel() * random(-70, 70) + "deg)",
        "padding": random(90, 150) + "px " + random(100, 140) + "px"
    });
    $(".lightbulb").css("left", x);
    $(".lightbulb").css("top", y);
}