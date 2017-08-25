function setup() {
    createCanvas(w - 20, h - 20);
}
var delay = new Tone.PingPongDelay(0.8, 0.8);
var delay2 = new Tone.PingPongDelay(0.4, 0.8);
var synth = new Tone.Synth({
    harmonicity: 4,
    detune: 10,
    oscillator: {
        type: 'sawtooth4'
    },
    envelope: {
        attack: 1,
        decay: 1,
        sustain: 0.5,
        release: 1
    },
    modulation: {
        type: 'sine'
    }
}).chain(delay, Tone.Master);

var notes = [60, 62, 63, 65, 67, 68, 70, 72];
var w = window.innerWidth;
var h = window.innerHeight;
var dots = [];

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (indexOfNote === -1) {
        indexOfNote = 0;
    }
    console.log(indexOfNote);
    var noteToPlay = notes[indexOfNote];
    dot = new Dot(mouseX, mouseY, 250);
    dots.push(dot);
    synth.harmonicity = random(2, 20);
    synth.triggerAttackRelease(midiToFreq(noteToPlay), '2n');
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
        strokeWeight(50);
        stroke(initial *= 0.99);
        point(this.x, this.y);
    }
}