function setup() {
    createCanvas(w - 20, h - 20);
}
var delay = new Tone.PingPongDelay(0.8, 0.8);
var verb = new Tone.Freeverb(0.3);
var delay2 = new Tone.PingPongDelay(0.4, 0.8);
var verb2 = new Tone.Freeverb(0.9);
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
}).chain(delay, verb, Tone.Master);
var synth2 = new Tone.Synth({
    harmonicity: 4,
    detune: 10,
    oscillator: {
        type: 'sawtooth4'
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.1
    },
    modulation: {
        type: 'square'
    }
}).chain(delay2, verb2, Tone.Master);

var notes = [60, 62, 63, 65, 67, 68, 70, 72];
var w = window.innerWidth;
var h = window.innerHeight;
var dots = [];

Tone.Transport.loopEnd = '4m';
Tone.Transport.loop = true;
Tone.Transport.start();

function triggerSound(time) {
    console.log('HIT');
    var note = notes[Math.floor(random(notes.length))];
    strokeWeight(200);
    stroke(random(255), random(255), random(255), 10);
    point(random(w), random(h));
    synth2.triggerAttackRelease(midiToFreq(note), '16n', time);
}

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