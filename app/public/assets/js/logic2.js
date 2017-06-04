var w = window.innerWidth * 0.75;
var h = window.innerHeight * 0.75;
var pointsArrayX = [];
var pointsArrayY = [];

function setup() {
    createCanvas(w, h);
    colorMode(RGB, 255, 255, 255, 1);
    console.log("test");
    for (var p = 0; p < w; p += 50) {
        pointsArrayX.push(p);
    }
    for (var p1 = 0; p1 < h; p1 += 50) {
        pointsArrayY.push(p1);
    }
    $(".canvasTarget").append($("#defaultCanvas0"));
}
var circle = new Circle(0, 0, 200);
var circle2 = new Circle(w / 2, h / 2, 200);
var circle3 = new Circle(w, 0, 200);
var circle4 = new Circle(w / 2, 0, 200);
var x = 0;
var y = 0;
var xOff = 0;
var sOff = 0;

function draw() {
    xOff += 0.01;
    circle.show();
    circle2.show();
    circle3.show();
    circle4.show();
    var posX = noise(xOff) * w;
    var posY = noise(xOff) * h;
    for (var j = 0; j < pointsArrayY.length - 3; j++) {
        for (var i = 0; i < pointsArrayX.length - 3; i++) {
            sOff += 0.03;
            sClr2 = noise(sOff) * 255;
            sClr = noise(sOff) * 275;
            stroke(sClr, sClr, sClr, 0.4);
            noFill();
            strokeWeight(random(0, 25));
            //rect(pointsArrayX[i] + random(-50, 50), pointsArrayY[j] + random(-50, 50), pointsArrayX[i] + random(-20, 20), pointsArrayY[j + 3]);
        }
    }
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.show = function() {
        stroke(random(0, 255));
        fill(random(0, 255));
        ellipse(this.x, this.y, this.radius, this.radius);
        push();
        strokeWeight(10);
        stroke(random(0, 255));
        line(this.x, this.y, this.x, this.y + this.radius * 2);
        line(this.x, this.y, this.x + this.radius * 2, this.y);
    };
}