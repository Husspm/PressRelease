w = window.innerWidth;
h = window.innerHeight;
anglePoints = [],
    sizeChange = [1, 1.2, 1.5, 2, 3, 4, 5];

function createPoints() {
    for (var angle = 0; angle <= 2; angle += 0.25) {
        var pointOnCircle = angle * Math.PI;
        anglePoints.push(pointOnCircle);
    }
}
createPoints();

function setup() {
    createCanvas(w, h);
    background(0);
    frameRate(30);
}
var startRadius = 6000;
var sW = 60;
var iterations = 0;
var changeIterations = 0;
var shrinkAmount = 0.66;
var colorIterations = 0;
var strokeArray = [
    [85, 60, 4, 70],
    [9, 20, 58, 70],
    [255, 225, 159, 70],
    [115, 128, 172, 70],
    [255, 248, 233, 70],
    [234, 239, 254, 70]
];

function draw() {
    iterations++;
    if (iterations > 120) {
        setup();
        iterations = 0;
        sW = 60;
        shrinkAmount = random(0.3, 0.9);
    }
    if (startRadius < 500) {
        startRadius = 6000;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.97;
    strokeWeight(sW);
    noFill();
    stroke(strokeArray[colorIterations]);
    colorIterations++;
    if (colorIterations >= strokeArray.length) {
        colorIterations = 0;
    }
    startRadius = startRadius * shrinkAmount;
    for (i = 0; i < anglePoints.length - 1; i++) {
        let a = anglePoints[i];
        var smallerCircle = new Circle(circle.radius * (sin(a)), circle.radius * (cos(a)), startRadius * sizeChange[changeIterations]);
        ellipse(smallerCircle.x, smallerCircle.y, smallerCircle.radius);
    }
    changeIterations++;
    if (changeIterations >= sizeChange.length) {
        changeIterations = 0;
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}
$('document').ready(function() {
    var a = document.getElementById('enter');
    buttonW = a.clientWidth;
    buttonH = a.clientHeight;
    $("#enter").css({ "left": (w / 2) - buttonW / 2 - w * 0.001, 'top': ((h / 2) - buttonH / 2 - h * 0.0012), 'opacity': 1 })
});

function windowResized() {

    var a = document.getElementById('enter');
    w = window.innerWidth;
    h = window.innerHeight;
    createCanvas(w, h);
    buttonW = a.clientWidth;
    buttonH = a.clientHeight;
    $("#enter").css({ "left": (w / 2) - buttonW / 2, 'top': ((h / 2) - buttonH / 2), 'opacity': 1 });
}