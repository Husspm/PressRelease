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
var blendModes;
var firstLayer;
var texShade;
function preload(){
}
var p = [];
function setup() {
    createCanvas(w, h, WEBGL);
    for (var i = 0; i < 4; i ++){
    var pt = new Particle();
p.push(pt);
    }
    texShade = createShader(vert, frag);
    firstLayer = createGraphics(w, h, P2D);
    background(0);
    frameRate(30);
    blendModes = [ADD, DODGE, DIFFERENCE];
}
var startRadius = 6000;
var sW = 60;
var iterations = 0;
var changeIterations = 0;
var shrinkAmount = 0.66;
var colorIterations = 0;
var transparency = 15;
var strokeArray = [
    [85, 27, 4, transparency],
    [140, 89, 57, transparency],
    [85, 44, 4, transparency],
    [140, 113, 57, transparency],
    [4, 44, 53, transparency],
    [37, 92, 105, transparency],
    [3, 59, 35, transparency],
    [39, 117, 84, transparency],
    [0, 0, 0, transparency],
    [255, 255, 255, transparency]
];
var pos = {x: 0, y: 0};

function draw() {
    p.forEach(function(pt){
        pt.move();
    }); 
    pos.x += 0.0001;
    pos.y += 0.001;
    var rNum = Math.floor(random(10));
    routineOne(rNum);
}
var potentialAmounts = [0.0125, 0.025, 0.075, 0.125, 0.175, 0.25];
var offset = 0;
var blendIndex = 0;
function routineOne() {
    // firstLayer.blendMode(blendModes[blendIndex]);
    offset += 0.01;
    // $('body').css('filter', 'contrast(' + noise(offset) * 600 + '%)');
    // $('#defaultCanvas0').css('filter', 'blur(' + sin(offset) * 18 + 'px)');
    iterations++;
    if (iterations > 20) {
        // firstLayer.background(0);
        iterations = 0;
        blendIndex = floor(random(blendModes.length));
        sW = random(120, 320);
        shrinkAmount = random(0.94, 0.95);
        //createPoints(potentialAmounts[Math.floor(random(potentialAmounts.length))]);
    }
    if (startRadius < 50) {
        startRadius = random(600, 1000);
    }
    var circle = new Circle(0, 0, startRadius);
    firstLayer.push();
    firstLayer.translate(w / 2, h / 2);
    sW *= 0.97;
    firstLayer.strokeWeight(sW);
    colorIterations++;
    if (colorIterations >= strokeArray.length) {
        colorIterations = 0;
    }
    startRadius = startRadius * shrinkAmount;
    for (i = 0; i < anglePoints.length - 1; i++) {
        let a = anglePoints[i];
        firstLayer.stroke(strokeArray[Math.floor(random(strokeArray.length))]);
        var smallerCircle = new Circle(circle.radius * (sin(a)), circle.radius * (cos(a)), startRadius * sizeChange[changeIterations]);
        firstLayer.noFill();
        // fill(strokeArray[Math.floor(random(strokeArray.length))]);
        firstLayer.ellipse(smallerCircle.x, smallerCircle.y, smallerCircle.radius, smallerCircle.radius / random(0.5, 4));
        firstLayer.push();
        // fill(strokeArray[Math.floor(random(strokeArray.length))]);
        firstLayer.stroke(strokeArray[Math.floor(random(strokeArray.length))]);
        firstLayer.rect(smallerCircle.x, smallerCircle.y, smallerCircle.x + smallerCircle.radius - random(-300, 300), smallerCircle.y + smallerCircle.radius - random(200, 560));
        firstLayer.pop();
    }
    changeIterations++;
    if (changeIterations >= sizeChange.length) {
        changeIterations = 0;
    }
    firstLayer.pop();
    texture(firstLayer);
    shader(texShade);
    texShade.setUniform('resolution',[width,height]);
    texShade.setUniform("mousePos", [
        norm(p[0].pos.x, 0, width), 
        norm(p[0].pos.y, height, 0)
    ]);
    texShade.setUniform("mousePos2", [
        norm(p[1].pos.x, width, 0), 
        norm(p[1].pos.y, height, 0)
    ]);
    texShade.setUniform("mousePos3", [
        norm(p[2].pos.x, width, 0), 
        norm(p[2].pos.y, 0, height)
    ]);
    texShade.setUniform("mousePos4", [
        norm(p[3].pos.x, 0, width), 
        norm(p[3].pos.y, 0, height)
    ]);
    texShade.setUniform('time',millis()/20);
    texShade.setUniform('texture',firstLayer);
    plane(w);
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
    resizeCanvas(w, h);
    firstLayer.remove();
    firstLayer = createGraphics(w, h, P2D);
    buttonW = a.clientWidth;
    buttonH = a.clientHeight;
    $("#enter").css({ "left": (w / 2) - buttonW / 2, 'top': ((h / 2) - buttonH / 2), 'opacity': 1 });

}
var vert=`
#ifdef GL_ES
      precision highp float;
      precision highp int;
    #endif
		#extension GL_OES_standard_derivatives : enable

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;
    attribute vec4 aVertexColor;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec4 var_vertCol;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;

    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    //uniform mat3 uNormalMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

      // just passing things through
      // var_vertPos      = aPosition;
      // var_vertCol      = aVertexColor;
      // var_vertNormal   = aNormal;
      // var_vertTexCoord = aTexCoord;
    }
`;
var frag=`

#ifdef GL_ES
precision highp float;
#endif

varying vec2 var_vertTexCoord;
uniform vec2 resolution;
uniform vec2 mousePos;
uniform vec2 mousePos2;
uniform vec2 mousePos3;
uniform vec2 mousePos4;
uniform vec2 particle;
uniform float time;
uniform sampler2D texture;
float intensity = 10.0;
float intensity2 = 3.0;

void main(void)
{
    vec2 p = gl_FragCoord.xy / resolution.xy;
    float divideMod = 5.0 + p.x;
    intensity += 0.03;
    intensity2 += 0.01;
	float colorMod = distance(p.xy, mousePos.xy);
	float colorMod2 = distance(p.xy, mousePos2.xy);
	float colorMod3 = distance(p.xy, mousePos3.xy);
	float colorMod4 = distance(p.xy, mousePos4.xy);
	vec2 pos1 = vec2(p.x * colorMod + intensity, p.y * colorMod2 + intensity2);
//	vec2 pos = vec2(p.x * colorMod, p.y * colorMod2);
	vec2 pos = vec2(((atan(p.y, p.x) / tan(intensity / divideMod * colorMod2)) * colorMod), ((atan(p.x, p.y) / tan(intensity2 / divideMod * colorMod)) * colorMod2));
	vec2 pos2 = vec2(((atan(p.y, p.x) / tan(intensity / divideMod * colorMod3)) * colorMod4), ((atan(p.x, p.y) / tan(intensity2 / divideMod * colorMod4)) * colorMod3));
	float extraMod = distance(mousePos2, mousePos);
	vec4 color = vec4(texture2D(texture, pos));
	vec4 secondColor = vec4(texture2D(texture, pos2));
	vec4 color1 = color / (colorMod * 20.0) * intensity;
	vec4 color2 = color / (colorMod2 * 20.0) * intensity2;
	vec4 color3 = secondColor / (colorMod3 * 20.0) * intensity;
	vec4 color4 = secondColor / (colorMod4 * 20.0) * intensity2;
//	gl_FragDepth = intensity * 100;
	vec3 endColor = vec3(mix(color1, color2, 0.5));
	vec3 endColor2 = vec3(mix(color3, color4, 0.5));
	gl_FragColor = vec4(mix(endColor, endColor2, 0.5), 0.51);
}`

function Particle(){
    this.pos = createVector(w / 2, h / 2);
    this.acc = createVector(1.5, 2.9);
    this.move = function(){
        this.acc.add(p5.Vector.random2D());
        this.acc.rotate(random(0.00001, 0.1));
        this.pos.add(this.acc);
        console.log(this.pos);
        if (this.pos.x > w || this.pos.x < 0){
            this.acc.x *= -1;
        }
        if (this.pos.y > h || this.pos.y < 0){
            this.acc.y *= -1;
        }
    }
}