var w = window.innerWidth,
    h = window.innerHeight,
    anglePoints = [],
    sizeChange = [0.5, 1, 1.5, 2];

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
}
var startRadius = 4000;
var sW = 40;
var iterations = 0;
var changeIterations = 0;

function draw() {
    iterations++;
    if (iterations > 120) {
        setup();
        iterations = 0;
        sW = 40;
    }
    if (startRadius < 500) {
        startRadius = 4000;
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= 0.95;
    strokeWeight(sW);
    noFill();
    stroke('rgba(250, 250, 250, 0.25)');
    startRadius = startRadius * 0.94;
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