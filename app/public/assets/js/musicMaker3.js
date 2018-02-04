w = window.innerWidth;
h = window.innerHeight;
dotArray = [];

function setup() {
    createCanvas(w, h);
    background(0);
    pixelDensity(3);
    frameRate(60);
    blendArray = [BLEND, ADD, DARKEST, LIGHTEST, DIFFERENCE, EXCLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN];

    function Dot(type, noiseAmount) {
        this.type = type;
        this.xMovementNegative = -10;
        this.xMovementPositive = 10;
        this.yMovementNegative = -10;
        this.yMovementPositive = 10;
        this.nA = 0 + noiseAmount;
        this.redValue = random(0, 55);
        this.greenValue = random(0, 55);
        this.blueValue = random(0, 55);
        this.position = createVector(random(0, w), random(0, h));
        this.rotation = random(-0.05, 0.05);
        this.swellAmount = random(5, 10);
        this.applyMovement = function() {
            this.position = this.position.add(createVector(random(this.xMovementNegative, this.xMovementPositive), random(this.yMovementNegative, this.yMovementPositive)));
            this.position.x = constrain(this.position.x, 0, w);
            this.position.y = constrain(this.position.y, 0, h);
            this.nA += noiseAmount;
        }
        this.display = function(type) {
            if (this.type === 'heavy') {
                push();
                rotate(this.rotation);
                var color = noise(this.nA) * 250;
                var swell = noise(this.nA) * this.swellAmount;
                strokeWeight(random(0.1, 1));
                stroke(color, random(90));
                fill(this.redValue * 2, this.greenValue / 2, this.blueValue, random(90));
                rect(this.position.x, this.position.y, swell, swell, random(20));
                pop();
            } else {
                push();
                rotate(this.rotation);
                var color = noise(this.nA) * 255;
                var swell = noise(this.nA) * this.swellAmount;
                //blendMode(DODGE);
                strokeWeight(random(0.1, 1));
                stroke(color, random(90));
                fill(this.redValue, this.greenValue, this.blueValue, random(90));
                rect(this.position.x, this.position.y, swell, swell, random(10));
                pop();
            }
        }
        this.movementAdjust = function() {
            this.xMovementNegative = random(-2, -15);
            this.xMovementPositive = random(15, 2);
            this.yMovementNegative = random(-2, -15);
            this.yMovementPositive = random(15, 2);
        }

    }
    for (var i = 0; i <= 6; i++) {
        if (i % 2 === 0) {
            var d = new Dot('heavy', random(0.1, 0.001));
        } else {
            d = new Dot('light', random(0.1, 0.001));
        }
        dotArray.push(d);
    }
}
var audioArray = [];

function createAudioArray() {
    for (var i = 1; i <= 4; i++) {
        audioFile = './assets/audio/sample' + i + '.wav';
        audioArray.push(audioFile);
    }
}
createAudioArray();
console.log(audioArray);

var sampler = new Tone.GrainPlayer(audioArray[2]);
sampler.start();
sampler.toMaster();
sampler.loop = true;
var sampler2 = new Tone.Player(audioArray[1]);
//sampler2.toMaster();
//sampler2.autostart = true;
//sampler2.loop = true;
var sampler3 = new Tone.Player(audioArray[2]);
//sampler3.toMaster();
//sampler3.autostart = true;
//sampler3.loop = true;
var delay = new Tone.PingPongDelay(1 / 3, 0.15);
var reverb = new Tone.JCReverb(0.6);
delay.wet.value = 0.25;
reverb.wet.value = 0.17;
Tone.Master.chain(delay, reverb);
playbackValue = 0.5;
sampler.playbackRate = playbackValue;
sampler.grainSize = 0.4;
sampler2.playbackRate = playbackValue;
sampler3.playbackRate = playbackValue;
//sampler.setLoopPoints(0, 1);
sampler2.setLoopPoints(0, (2 / 2));
sampler3.setLoopPoints(0, (2 / 1));
sampler.fadeIn = 0.1;
sampler2.fadeIn = 0.1;
sampler3.fadeIn = 0.1;
sampler.fadeOut = 0.1;
sampler2.fadeOut = 0.1;
sampler3.fadeOut = 0.1;
var auto = setInterval(function() {
    //sampler.buffer = audioArray[Math.floor(random(audioArray.length))];
    //sampler2.load(audioArray[Math.floor(random(audioArray.length))]);
    //sampler3.load(audioArray[Math.floor(random(audioArray.length))]);
}, 2000);

blendArrayIndex = 0;

function draw() {
    //    blendMode(blendArray[blendArrayIndex]);
    for (var i = 0; i < dotArray.length; i++) {
        dotArray[i].applyMovement();
        dotArray[i].display();
        dotArray[i].movementAdjust();
    }
}

var auto = setInterval(function() {
    var blender = blendArray[Math.floor(random(blendArray.length))];
    console.log(blender);
    blendMode(blender);
}, 4000);

function keyPressed() {
    if (key === 'A') {
        blendArrayIndex++;
        console.log(blendArray[blendArrayIndex]);
        if (blendArrayIndex >= blendArray.length) {
            blendArrayIndex = 0;
        }
    }
}
/*
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
*/