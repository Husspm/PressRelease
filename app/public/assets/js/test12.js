var w = window.innerWidth,
    h = window.innerHeight,
    anglePoints = [],
    sizeChange = [1, 2];

function createPoints() {
    for (var angle = 0; angle <= 2; angle += 0.2) {
        var pointOnCircle = angle * Math.PI;
        anglePoints.push(pointOnCircle);
    }
}
createPoints();

function setup() {
    createCanvas(w, h);
    background(0);
    frameRate(60);
}
var startRadius = 10000;
var sW = 40;
var iterations = 0;
var changeIterations = 0;

function draw() {
    iterations++;
    if (iterations > 70) {
        setup();
        iterations = 0;
        sW = 40;
    }
    if (startRadius < 500) {
        startRadius = 10000;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.9;
    strokeWeight(sW);
    noFill();
    stroke('rgba(250, 250, 250, 0.28)');
    startRadius = startRadius * 0.9;
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
    $("#enter").css({ "left": (w / 2) - buttonW / 2, 'top': ((h / 2) - buttonH / 2) - 5 });
});