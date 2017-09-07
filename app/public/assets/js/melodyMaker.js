function setup() {
    createCanvas(w - 20, h - 20);
}
var soundFilter = new Tone.Filter(250, "bandpass");
soundFilter.Q.value = 3;
var delay = new Tone.PingPongDelay(0.2, 0.8);
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
}).chain(delay, Tone.Master);
var chorus = new Tone.Chorus('1m', 2.5, 0.5);
var pitch = new Tone.PitchShift();

Tone.Master.chain(soundFilter, chorus);
var notes = [
    [48, 50, 51, 53, 55, 56, 58, 60, 62, 63, 65, 67, 68, 70, 72],
    [48, 50, 52, 54, 55, 57, 58, 60, 62, 64, 66, 67, 69, 70, 72],
    [48, 49, 52, 53, 55, 56, 59, 60, 61, 64, 65, 67, 68, 71, 72]
];
var currIndex = 0;
var w = window.innerWidth;
var h = window.innerHeight;
var dots = [];

function mousePressed() {
    if (mouseY > 0) {
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

function draw() {
    pitch.pitch = Math.floor(random(12));
    for (var i = 0; i < dots.length; i++) {
        dots[i].show();
        if (dots[i].initial < 10) {
            dots.splice(i, 1);
        }
    }
}

function Dot(x, y, initial) {
    this.x = x;
    this.y = y;
    this.initial = initial;
    this.show = function() {
        strokeWeight(100);
        stroke(initial *= 0.991);
        point(this.x, this.y);
        this.initial *= 0.99;
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
        if (this.id === 'delay') {
            delay.delayTime.value = this.value;
        }
        if (this.id === 'fF') {
            soundFilter.frequency.value = this.value;
        }
        if (this.id === 'fb') {
            delay.feedback.value = this.value;
        }
    });
});