w = window.innerWidth;
h = window.innerHeight;
anglePoints = [],
    sizeChange = [1, 2, 3, 4, 5];

function createPoints(amt) {
    anglePoints = [];
    for (var angle = 0; angle <= 2; angle += amt) {
        var pointOnCircle = angle * Math.PI;
        anglePoints.push(pointOnCircle);
    }
}
createPoints(0.125);

function setup() {
    createCanvas(w, h, P2D);
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
    [85, 27, 4, 40],
    [140, 89, 57, 40],
    [85, 44, 4, 40],
    [140, 113, 57, 40],
    [4, 44, 53, 40],
    [37, 92, 105, 40],
    [3, 59, 35, 40],
    [39, 117, 84, 40],
    [0, 0, 0, 40],
    [255, 255, 255, 40]
];

function draw() {
    var rNum = Math.floor(random(10));
    routineOne(rNum);
}
var potentialAmounts = [0.0125, 0.025, 0.075, 0.125, 0.175, 0.25];
var offset = 0;

function routineOne() {
    offset += 0.01;
    $('body').css('filter', 'contrast(' + noise(offset) * 600 + '%)');
    $('#defaultCanvas0').css('filter', 'blur(' + sin(offset) * 18 + 'px)');
    iterations++;
    if (iterations > 80) {
        iterations = 0;
        sW = random(120, 320);
        shrinkAmount = random(0.74, 0.95);
        //createPoints(potentialAmounts[Math.floor(random(potentialAmounts.length))]);
    }
    if (startRadius < 500) {
        startRadius = random(600, 1000);
    }
    var circle = new Circle(0, 0, startRadius);
    translate(w / 2, h / 2);
    sW *= noise(offset);
    strokeWeight(sW);
    colorIterations++;
    if (colorIterations >= strokeArray.length) {
        colorIterations = 0;
    }
    startRadius = startRadius * shrinkAmount;
    for (i = 0; i < anglePoints.length - 1; i++) {
        let a = anglePoints[i];
        stroke(strokeArray[Math.floor(random(strokeArray.length))]);
        var smallerCircle = new Circle(circle.radius * (sin(a)), circle.radius * (cos(a)), startRadius * sizeChange[changeIterations]);
        noFill();
        // fill(strokeArray[Math.floor(random(strokeArray.length))]);
        ellipse(smallerCircle.x, smallerCircle.y, smallerCircle.radius, smallerCircle.radius / random(0.5, 4));
        push();
        // fill(strokeArray[Math.floor(random(strokeArray.length))]);
        stroke(strokeArray[Math.floor(random(strokeArray.length))]);
        rect(smallerCircle.x, smallerCircle.y, smallerCircle.x + smallerCircle.radius - random(-300, 300), smallerCircle.y + smallerCircle.radius - random(200, 560));
        pop();
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