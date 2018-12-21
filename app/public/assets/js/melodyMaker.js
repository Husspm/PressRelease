function setup() {
    var heightOffset = $("#settingsPanel").innerHeight();
    console.log(heightOffset);
    createCanvas(w - 20, h - heightOffset);
    pixelDensity(1);
    for (var x = 0; x <= w; x += w / notes[0].length) {
        stroke(255);
        line(x, 0, x, h);
    }
}
var soundFilter = new Tone.Filter(250, "bandpass");
soundFilter.Q.value = 1;
var delay = new Tone.PingPongDelay(0.2, 0.8);
var trem = new Tone.Tremolo(10, 0.5);
trem.start();
var pitch = new Tone.PitchShift();
var synth = new Tone.Synth({
    harmonicity: 4,
    oscillator: {
        type: 'sawtooth4'
    },
    envelope: {
        attack: '16n',
        decay: 1,
        sustain: 0.5,
        release: 1
    }
}).chain(trem, delay, Tone.Master);
var chorus = new Tone.Chorus('1m', 2.5, 0.5);

Tone.Master.chain(soundFilter, chorus);
var notes = [
    [48, 50, 51, 53, 55, 56, 58, 60, 62, 63, 65, 67, 68, 70, 72],
    [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72],
    [48, 49, 52, 53, 55, 56, 59, 60, 61, 64, 65, 67, 68, 71, 72]
];
var currIndex = 0;
var w = window.innerWidth;
var h = window.innerHeight;
var dots = [];

function mousePressed() {
    if (mouseY > 0) {
        lineWeight = 10;
        var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes[currIndex].length));
        if (indexOfNote === -1) {
            indexOfNote = 0;
        }
        console.log(indexOfNote);
        var noteToPlay = notes[currIndex][indexOfNote];
        dot = new Dot(mouseX, mouseY, 200);
        dots.push(dot);
        synth.triggerAttackRelease(midiToFreq(noteToPlay), '1n');
    }
}
function mouseDragged() {
        if (mouseY > 0) {
            lineWeight = 10;
            var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes[currIndex].length));
            if (indexOfNote === -1) {
                indexOfNote = 0;
            }
            console.log(indexOfNote);
            var noteToPlay = notes[currIndex][indexOfNote];
            dot = new Dot(mouseX, mouseY, 200);
            dots.push(dot);
            synth.triggerAttackRelease(midiToFreq(noteToPlay), '1n');
        }
}
var lineWeight = 10;
function draw() {
    background(0);
    push();
    lineWeight *= 0.931;
    if (lineWeight < 1){
        lineWeight = 1;
    }
    strokeWeight(lineWeight);
    for (var x = 0; x <= w; x += w / notes[0].length) {
        stroke(255);
        line(x, 0, x, h);
    }
    pop();
    for (var i = 0; i < dots.length; i++) {
        dots[i].show();
        if (dots[i].initial < 30) {
            dots.splice(i, 1);
        }
    }
}

function Dot(x, y, initial) {
    this.x = x;
    this.y = y;
    this.initial = initial;
    this.weight = w / 10;
    this.show = function() {
        stroke(this.initial *= 0.991);
        strokeWeight(this.weight *= 0.991);
        point(this.x, this.y);
    }
}
$(document).ready(function() {
    console.log('READY');
    $('button').on('click', function() {
        console.log(this.id);
        if (this.id === 'major') {
            currIndex = 1;
        } else if (this.id === 'odd') {
            currIndex = 2;
        } else {
            currIndex = 0;
        }
        console.log(currIndex);
    });
    $("input[type='range']").on("input", function() {
        console.log(this.id);
        if (this.id == 'trem'){
            trem.frequency.value = this.value;
        }
        if (this.id == 'tD'){
            trem.depth.value = this.value;
        }
        if (this.id === 'delay') {
            delay.delayTime.value = this.value;
        }
        if (this.id === 'wet') {
            delay.wet.value = this.value;
        }
        if (this.id === 'fb') {
            delay.feedback.value = this.value;
        }
        if (this.id === 'fT') {
                if (this.value == 1){
                soundFilter.type = "lowpass";
                }if (this.value == 2){
                soundFilter.type = "bandpass";
                }if(this.value == 3){
                soundFilter.type = "highpass";
                }
            console.log(soundFilter.type);
        }
        if (this.id === 'fF') {
            soundFilter.frequency.value = this.value;
        }
        if (this.id === 'fW') {
            soundFilter.Q.value = this.value;
        }
    });
});
var auto = setInterval(function() {
    for (var x = 0; x < w; x += w / notes[0].length) {
        stroke(255);
        strokeWeight(1);
        line(x, 0, x, h);
    }
}, 1000);