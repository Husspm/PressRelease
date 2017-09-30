w = window.innerWidth;
h = window.innerHeight;

function setup() {
    createCanvas(w, h);
    background(0);
}

function draw() {
    stroke(255);
    point(random(0, w), random(0, h));
}