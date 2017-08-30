function setup() {
    createCanvas(w - 20, h - 20);
}
var delay = new Tone.PingPongDelay('4n', 0.8);
var synth = new Tone.Synth({
    harmonicity: 4,
    oscillator: {
        type: 'sawtooth4'
    },
    envelope: {
        attack: 1,
        decay: 1,
        sustain: 0.5,
        release: 1
    }
}).chain(delay, Tone.Master);

var notes = [
    [48, 50, 51, 53, 55, 56, 58, 60, 62, 63, 65, 67, 68, 70, 72],
    [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72],
    [48, 50, 51, 52, 55, 57, 58, 60, 62, 63, 64, 67, 69, 70, 72]
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
        synth.harmonicity = random(2, 20);
        synth.triggerAttackRelease(midiToFreq(noteToPlay), '2n');
    }
}

function draw() {
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
});