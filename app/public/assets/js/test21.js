function setup() {
    createCanvas(w - 20, h - 20);
}
var delay = new Tone.PingPongDelay(0.8, 0.8);
var verb = new Tone.Freeverb(0.3);
var delay2 = new Tone.PingPongDelay(0.4, 0.8);
var verb2 = new Tone.Freeverb(0.9);
var synth = new Tone.Synth({
    harmonicity: 4,
    detune: 5,
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
        type: 'square'
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
    var noteIndex = Math.floor(random(notes.length));
    var posX = map(noteIndex, 0, notes.length, 0, w);
    console.log(noteIndex);
    strokeWeight(200);
    switch (noteIndex) {
        case 0:
            stroke(0, 255, 0, 10);
            break;
        case 1:
            stroke(200, 255, 0, 10);
            break;
        case 2:
            stroke(200, 0, 0, 10);
            break;
        case 3:
            stroke(200, 0, 200, 10);
            break;
        case 4:
            stroke(200, 100, 200, 10);
            break;
        case 5:
            stroke(200, 200, 200, 10);
            break;
        case 6:
            stroke(20, 0, 0, 10);
            break;
        default:
            stroke(10, 10, 210, 10);
    }
    point(posX, random(h));
    synth2.triggerAttackRelease(midiToFreq(notes[noteIndex]), '16n', time);
}

function triggerSound2(time) {
    var noteIndex = Math.floor(random(notes.length));
    var posX = map(noteIndex, 0, notes.length, 0, w);
    console.log(noteIndex);
    strokeWeight(200);
    switch (noteIndex) {
        case 0:
            stroke(0, 255, 0, 10);
            break;
        case 1:
            stroke(200, 255, 0, 10);
            break;
        case 2:
            stroke(200, 0, 0, 10);
            break;
        case 3:
            stroke(200, 50, 200, 10);
            break;
        case 4:
            stroke(100, 100, 200, 10);
            break;
        case 5:
            stroke(200, 200, 200, 10);
            break;
        case 6:
            stroke(20, 0, 200, 10);
            break;
        default:
            stroke(10, 10, 210, 10);
    }
    point(posX, random(h));
    synth.triggerAttackRelease(midiToFreq(notes[noteIndex]), '2n', time);
}
var selector = 0;

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (indexOfNote === -1) {
        indexOfNote = 0;
    }
    var noteToPlay = notes[indexOfNote];
    dot = new Dot(mouseX, mouseY, 210);
    dots.push(dot);
    synth.harmonicity = random(2, 20);
    synth.triggerAttackRelease(midiToFreq(noteToPlay), '2n');
    var when = Tone.Transport.seconds.toFixed(2);
    if (selector % 2 === 0) {
        Tone.Transport.schedule(triggerSound, when);
    } else {
        Tone.Transport.schedule(triggerSound2, when);
    }
    console.log('selector is', selector);
    selector++;
    console.log('selector is', selector);
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
        stroke(initial *= 0.99, 10);
        point(this.x, this.y);
    }
}