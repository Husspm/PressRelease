w = window.innerWidth;
h = window.innerHeight;
var dots = [];
var layerOne;
function setup() {
    createCanvas(w, h, P2D);
    pixelDensity(1);
    background(0);
}
var sOscArray = [48, 52, 54, 55, 57, 59];
var sOscCopy = [48, 52, 54, 55, 57, 59];
var tOscArray = [48, 52, 54, 55, 57, 59];
var tOscCopy = [48, 52, 54, 55, 57, 59];
var newOscArray = [48, 52, 54, 55, 57, 59];
var newOscCopy = [48, 52, 54, 55, 57, 59];

var auto = setInterval(function() { makeMusicGroupA(); }, 5000);
var auto2 = setInterval(function() { randomize(); }, 500);
var auto3 = setInterval(function() { makeMusicGroupC(); }, 3000);

function randomize() {
    var target = Math.floor(random(0, 10));
    if (target === 3) {
        makeMusicGroupB();
    }
}

var group_A_iterations = 0;
var key_change_iterations_A = 0;
var renderPosX;
Tone.Transport.start();
Tone.Transport.bpm.value = 120;
var dl4 = new Tone.PingPongDelay("4n", 0.25).toMaster();
var dl2 = new Tone.PingPongDelay("8n", 0.25).toMaster();
var dist = new Tone.Distortion(0.015).toMaster();
var freeverb = new Tone.Freeverb().toMaster();
var synth = new Tone.Synth({
    oscillator: {
        type: 'sawtooth4'
    },
    envelope: {
        attack: 0.65,
        decay: 0.71,
        sustain: 0.05,
        release: 0.02
    }
}).chain(dist, dl4, freeverb, Tone.Master);

var synth2 = new Tone.Synth({
    oscillator: {
        type: 'sawtooth'
    },
    envelope: {
        attack: 0.55,
        decay: 0.71,
        sustain: 0.05,
        release: 0.2
    }
}).chain(dist, dl4, freeverb, Tone.Master);
var noteLength = ['16n','8n','4n', '2n', '1n'];
var duoNoteLength = ['8n', '16n', '4n'];
var duo = new Tone.DuoSynth({
    vibratoRate: 10,
    voice0: {
        oscillator: {
        type: 'sawtooth'
        },
        envelope: {
            attack: 0.1,
            decay: 0.05,
            sustain: 0.0,
            release: 0.08
        }
    },
    voice1: {
        oscillator: {
            type: 'sawtooth8'
            },
        envelope: {
            attack: 0.1,
            decay: 0.05,
            sustain: 0.0,
            release: 0.08
        }
    }
}).chain(dist, dl4, freeverb, Tone.Master);
var osc = new Tone.AMSynth({
    harmonicity  : 2 ,
    detune  : 0 ,
    oscillator  : {
    type  : 'sawtooth'
    }  ,
    envelope  : {
    attack  : 0.71 ,
    decay  : 0.71 ,
    sustain  : 1 ,
    release  : 0.5
    }  ,
    modulation  : {
    type  : 'triangle'
    }  ,
    modulationEnvelope  : {
    attack  : 0.75 ,
    decay  : 0 ,
    sustain  : 1 ,
    release  : 0.5
    }
    }).chain(dist, dl2, freeverb, Tone.Master);

var osc2 = new Tone.Synth({
    oscillator: {
        type: 'sawtooth16'
    },
    envelope: {
        attack: 0.75,
        decay: 0.71,
        sustain: 0.05,
        release: 0.02
    }
}).chain(dist, dl2, freeverb, Tone.Master);
var osc3 = new Tone.Synth({
    oscillator: {
        type: 'triangle8'
    },
    envelope: {
        attack: 0.75,
        decay: 0.71,
        sustain: 0.05,
        release: 0.02
    }
}).chain(dist, dl2, freeverb, Tone.Master);
var osc4 = new Tone.Synth({
    oscillator: {
        type: 'triangle16'
    },
    envelope: {
        attack: 0.75,
        decay: 0.71,
        sustain: 0.05,
        release: 0.02
    }
}).chain(dist, dl2, freeverb, Tone.Master);
var volume = new Tone.FFT(64);
Tone.Master.connect(volume);
function makeMusicGroupA() {
    if (group_A_iterations < 12) {
        console.log('HIT on group A');
        var idx = Math.floor(random(sOscArray.length));
        var note = sOscArray[idx];
        console.log(note, 'was selected for group A');
        osc.triggerAttackRelease(midiToFreq(note), noteLength[Math.floor(random(noteLength.length))]);
        osc2.triggerAttackRelease(midiToFreq(findNote(note)), noteLength[Math.floor(random(noteLength.length))], `+${noteLength[Math.floor(random(noteLength.length))]}`);        var renderPosX = map(note, sOscCopy[0], sOscCopy[sOscCopy.length - 1], 0, w);
        var renderPosX2 = map(findNote(note), sOscCopy[0] - 24, sOscCopy[sOscCopy.length - 1] + 24, 0, w);
        dots.push(new Dot(renderPosX, w / 16, 100, [0, 125, 255], midiToFreq(note)));
        dots.push(new Dot(renderPosX2, w / 16, 100, [0, 125, 255], midiToFreq(findNote(note))));
        sOscArray.splice(idx, 1);
        if (sOscArray.length === 0) {
            for (var i = 0; i < sOscCopy.length; i++) {
                if (key_change_iterations_A % 2 === 0) {
                    sOscCopy[i] += 5;
                } else {
                    sOscCopy[i] -= 7;
                }
            }
            console.log('gA array', sOscCopy);
            sOscArray = sOscCopy.slice();
            key_change_iterations_A++;
        }
    }
    group_A_iterations++;
    if (group_A_iterations >= 12) {
        group_A_iterations = 0;
    }
}
var key_change_iterations_B = 0;

function makeMusicGroupB() {
    console.log("HIT on group B");
    var idx = Math.floor(random(tOscArray.length));
    var note = tOscArray[idx];
    console.log(note, 'was selected for group B');
    osc3.triggerAttackRelease(midiToFreq(note), noteLength[Math.floor(random(noteLength.length))]);
    osc4.triggerAttackRelease(midiToFreq(findNote(note)), noteLength[Math.floor(random(noteLength.length))], `+${noteLength[Math.floor(random(noteLength.length))]}`);        
    var renderPosX = map(note, tOscCopy[0], tOscCopy[tOscCopy.length - 1], 0, w);
    var renderPosX2 = map(findNote(note), tOscCopy[0] - 24, tOscCopy[tOscCopy.length - 1] + 24, 0, w);
    dots.push(new Dot(renderPosX, w / 16, 100, [0, 255, 125], midiToFreq(note)));
    dots.push(new Dot(renderPosX2, w / 16, 100, [0, 255, 125], midiToFreq(findNote(note))));
    tOscArray.splice(idx, 1);
    if (tOscArray.length === 0) {
        for (var i = 0; i < tOscCopy.length; i++) {
            if (key_change_iterations_B % 2 === 0) {
                tOscCopy[i] += 5;
            } else {
                tOscCopy[i] -= 7;
            }
        }
        console.log('gB array', tOscCopy);
        tOscArray = tOscCopy.slice();
        key_change_iterations_B++;
    }
}
var key_change_iterations_C = 0;
var group_C_iterations = 0;
function makeMusicGroupC() {
    if (group_C_iterations < 2){
        console.log('HIT on group C');
        var idx = Math.floor(random(newOscArray.length));
        var note = newOscArray[idx];
        console.log(note, 'was selected for group C');
        synth.triggerAttackRelease(midiToFreq(note), noteLength[Math.floor(random(noteLength.length))]);
        synth2.triggerAttackRelease(midiToFreq(findNote(note)), noteLength[Math.floor(random(noteLength.length))], `+${noteLength[Math.floor(random(noteLength.length))]}`);
        var renderPosX = map(note, newOscCopy[0], newOscCopy[newOscCopy.length - 1], 0, w);
        var renderPosX2 = map(findNote(note), newOscCopy[0] - 24, newOscCopy[newOscCopy.length - 1] + 24, 0, w);
        dots.push(new Dot(renderPosX, h / 16, 100, [255, 125, 0], midiToFreq(note)));
        dots.push(new Dot(renderPosX2, h / 16, 100, [255, 125, 0], midiToFreq(findNote(note))));
            // stroke(255, 180);
            // strokeWeight(getMasterVolume() * 100);
            // point(renderPosX, h / 4);
        newOscArray.splice(idx, 1);
        if (newOscArray.length === 0) {
            for (var i = 0; i < newOscCopy.length; i++) {
                if (key_change_iterations_C % 2 === 0) {
                    newOscCopy[i] += 5;
                } else {
                    newOscCopy[i] -= 7;
                }
            }
            console.log('gC array', newOscCopy);
            newOscArray = newOscCopy.slice();
            key_change_iterations_C++;
        }
    }
    group_C_iterations++;
    if (group_C_iterations >= 3) {
        group_C_iterations = 0;
    }
}

function mouseDragged() {
    var noteToPlay = map(mouseX, 0, w, 0, sOscCopy.length);
    noteToPlay = Math.floor(noteToPlay);
    if (noteToPlay < 0){
        noteToPlay = 0;
    }if (noteToPlay > sOscCopy.length - 1){
        noteToPlay = sOscCopy.length - 1;
    }
    console.log(noteToPlay);
    duo.triggerAttackRelease(midiToFreq(sOscCopy[noteToPlay]), duoNoteLength[Math.floor(random(noteLength.length))]);
    dots.push(new Dot(mouseX, mouseY, 150, [200, 100, 70], sOscCopy[noteToPlay]));
}

function findNote(note) {
    var selector = Math.floor(random(0, 4));
    switch (note) {
        case sOscCopy[0]:
        case tOscCopy[0]:
        case newOscCopy[0]:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 12);
            } else {
                return (note + 21);
            }
        case sOscCopy[1]:
        case tOscCopy[1]:
        case newOscCopy[1]:
            if (selector === 0) {
                return (note + 9);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note + 26);
            }
        case sOscCopy[2]:
        case tOscCopy[2]:
        case newOscCopy[2]:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 15);
            } else {
                return (note + 3);
            }
        case sOscCopy[3]:
        case tOscCopy[3]:
        case newOscCopy[3]:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 3);
            } else {
                return (note + 8);
            }
        case sOscCopy[4]:
        case tOscCopy[4]:
        case newOscCopy[4]:
            if (selector === 0) {
                return (note + 4);
            } else if (selector === 1) {
                return (note + 9);
            } else if (selector === 2) {
                return (note + 11);
            } else {
                return (note - 12);
            }
        case sOscCopy[5]:
        case tOscCopy[5]:
        case newOscCopy[5]:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 9);
            } else {
                return (note - 12);
            }
        case sOscCopy[6]:
        case tOscCopy[6]:
        case newOscCopy[6]:
            if (selector === 0) {
                return (note + 1);
            } else if (selector === 1) {
                return (note - 4);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note - 21);
            }
        case sOscCopy[7]:
        case tOscCopy[7]:
        case newOscCopy[7]:
            if (selector === 0) {
                return (note + 11);
            } else if (selector === 1) {
                return (note - 24);
            } else if (selector === 2) {
                return (note + 14);
            } else {
                return (note - 12);
            }
        case sOscCopy[8]:
        case tOscCopy[8]:
        case newOscCopy[8]:
            if (selector === 0) {
                return (note + 26);
            } else if (selector === 1) {
                return (note + 10);
            } else if (selector === 2) {
                return (note - 17);
            } else {
                return (note - 5);
            }
        case sOscCopy[9]:
        case tOscCopy[9]:
        case newOscCopy[9]:
            if (selector === 0) {
                return (note + 27);
            } else if (selector === 1) {
                return (note + 19);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note + 2);
            }
        case sOscCopy[10]:
        case tOscCopy[10]:
        case newOscCopy[10]:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note + 8);
            } else if (selector === 2) {
                return (note + 15);
            } else {
                return (note + 1);
            }
        case sOscCopy[11]:
        case tOscCopy[11]:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 24);
            }
        case sOscCopy[12]:
        case tOscCopy[12]:
            if (selector === 0) {
                return (note - 9);
            } else if (selector === 1) {
                return (note + 7);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 26);
            }
        case sOscCopy[13]:
        case tOscCopy[13]:
            if (selector === 0) {
                return (note + 1);
            } else if (selector === 1) {
                return (note + 5);
            } else if (selector === 2) {
                return (note + 7);
            } else {
                return (note - 9);
            }
        default:
            if (selector === 0) {
                return (note + 12);
            } else if (selector === 1) {
                return (note + 24);
            } else {
                return (note - 12);
            }
    }
}

function keyPressed() {
    console.log(key.toUpperCase());
    key = key.toUpperCase();
    switch (key) {
        case 'A':
        case 'Q':
            if (key === 'A') {
                Sawosc.freq(midiToFreq(sOscCopy[0]));
                Sawosc2.freq(midiToFreq(sOscCopy[0]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Q') {
                osc3.freq(midiToFreq(sOscCopy[0] + 12));
                env2.play();
            }
            break;
        case 'S':
        case 'W':
            if (key === 'S') {
                Sawosc.freq(midiToFreq(sOscCopy[1]));
                Sawosc2.freq(midiToFreq(sOscCopy[1]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'W') {
                osc3.freq(midiToFreq(sOscCopy[1] + 12));
                env2.play();
            }
            break;
        case 'D':
        case 'E':
            if (key === 'D') {
                Sawosc.freq(midiToFreq(sOscCopy[2]));
                Sawosc2.freq(midiToFreq(sOscCopy[2]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'E') {
                osc3.freq(midiToFreq(sOscCopy[2] + 12));
                env2.play();
            }
            break;
        case 'F':
        case 'R':
            if (key === 'F') {
                Sawosc.freq(midiToFreq(sOscCopy[3]));
                Sawosc2.freq(midiToFreq(sOscCopy[3]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'R') {
                osc3.freq(midiToFreq(sOscCopy[3] + 12));
                env2.play();
            }
            break;
        case 'G':
        case 'T':
            if (key === 'G') {
                Sawosc.freq(midiToFreq(sOscCopy[4]));
                Sawosc2.freq(midiToFreq(sOscCopy[4]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'T') {
                osc3.freq(midiToFreq(sOscCopy[4] + 12));
                env2.play();
            }
            break;
        case 'H':
        case 'Y':
            if (key === 'H') {
                Sawosc.freq(midiToFreq(sOscCopy[5]));
                Sawosc2.freq(midiToFreq(sOscCopy[5]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Y') {
                osc3.freq(midiToFreq(sOscCopy[5] + 12));
                env2.play();
            }
            break;
        case 'J':
        case 'U':
            if (key === 'J') {
                Sawosc.freq(midiToFreq(sOscCopy[6]));
                Sawosc2.freq(midiToFreq(sOscCopy[6]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'U') {
                osc3.freq(midiToFreq(sOscCopy[6] + 12));
                env2.play();
            }
            break;
        case 'K':
        case 'I':
            if (key === 'K') {
                Sawosc.freq(midiToFreq(sOscCopy[7]));
                Sawosc2.freq(midiToFreq(sOscCopy[7]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'I') {
                osc3.freq(midiToFreq(sOscCopy[7] + 12));
                env2.play();
            }
            break;
        case 'L':
        case 'O':
            if (key === 'L') {
                Sawosc.freq(midiToFreq(sOscCopy[8]));
                Sawosc2.freq(midiToFreq(sOscCopy[8]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'O') {
                osc3.freq(midiToFreq(sOscCopy[8] + 12));
                env2.play();
            }
            break;
        case 'º':
        case 'P':
            if (key === 'º') {
                Sawosc.freq(midiToFreq(sOscCopy[9]));
                Sawosc2.freq(midiToFreq(sOscCopy[9]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'P') {
                osc3.freq(midiToFreq(sOscCopy[9] + 12));
                env2.play();
            }
            break;
        case 'Þ':
        case 'Û':
            if (key === 'Þ') {
                Sawosc.freq(midiToFreq(sOscCopy[10]));
                Sawosc2.freq(midiToFreq(sOscCopy[10]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Û') {
                osc3.freq(midiToFreq(sOscCopy[10] + 12));
                env2.play();
            }
            break;
    }
}

var canvasResetPercent = 25;
var blocks = [];
function draw() {
    background(0, canvasResetPercent);
    blocks.forEach( function(b, index) {
        b.move();
        b.display();
        if (b.x > w){
            blocks.splice(index, 1);
            blocks.push(new Block(0, b.y, random(50, 100)));
        }
    });
    for (var i = 0; i < dots.length; i++) {
        dots[i].move();
        dots[i].display();
        if (dots[i].weight < 3) {
            dots.splice(i, 1);
        }
    }
}
function createBlocks(){
    for(var i = 0; i < h; i+= h / 200){
        blocks.push(new Block(0, i, Math.random(24, 44)));
    }
}
createBlocks();
$(document).ready(
    function(){
        Tone.context.resume();
    });
function mousePressed(){
    Tone.context.resume();
}
function Dot(x, y, weight, color, freq){
    this.x = x;
    this.y = y;
    this.weight = weight / 10;
    this.color = color;
    this.freq = freq;
    this.offset = 0.1;
    this.creationTime = millis();
    this.move = function(){
        if (abs(this.creationTime - millis()) < 200){
            this.weight *= 1.175;
        }else{
            this.weight *= 0.985;
        }
        this.y += 5;
        this.offset += this.offset;
        this.x = this.x + 35 * (sin(this.freq / 50  * (millis() / 1000)));
        var highestColor = Math.max.apply(null, color);
        var indexToReplace = this.color.indexOf(highestColor);
        this.color[indexToReplace] *= 0.9875;
    }
    this.display = function(){
        noFill();
        stroke(this.color);
        strokeWeight(this.weight);
        point(this.x,this.y);
    }
}
function Block(x,y,width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.step = Math.random() * 10 + 5;
    this.move = function(){
        this.x += this.step;
        this.width *= 1.005;
    }
    this.display = function(){
        push();
        noStroke();
        var scaleHeight = volume.getValue();
        var index = floor(map(this.y, 0, h, 0, scaleHeight.length));
        var actualHeight = abs(scaleHeight[index]);
        fill(255, actualHeight * 3, 0, this.step * 8);
        rect(this.x, this.y, this.width, actualHeight / this.step);
        pop();
        this.step += (actualHeight / 100);
    }
}
function windowResized(){
    w = window.innerWidth;
    h = window.innerHeight;
    resizeCanvas(w, h);
}