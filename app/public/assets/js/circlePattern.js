var w = window.innerWidth * 0.98,
    h = window.innerHeight * 0.98,
    anglePoints = [],
    sizeChange = [2, 3, 4, 5];

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

function draw() {
    iterations++;
    if (iterations > 120) {
        setup();
        iterations = 0;
        sW = 60;
    }
    if (startRadius < 500) {
        startRadius = 6000;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.96;
    strokeWeight(sW);
    fill(50, 2);
    stroke(250, 40);
    startRadius = startRadius * random(0.75, 0.99);
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
    $("#enter").css({ "left": (w / 2) - buttonW / 2, 'top': ((h / 2) - buttonH / 2), 'opacity': 1 })
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