function setup() {
    createCanvas(w - 20, h - 20);
}
Tone.Transport.bpm.value = 100;
var delay = new Tone.PingPongDelay('16n', 0.8);
var delay2 = new Tone.PingPongDelay('4n', 0.8);
var synth = new Tone.Synth({
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.2,
        decay: 1,
        sustain: 0.5,
        release: 1
    }
}).chain(delay, Tone.Master);
var synth2 = new Tone.Synth({
    harmonicity: 4,
    detune: 10,
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8
    }
}).chain(delay2, delay2, Tone.Master);

var notes = [60, 62, 63, 65, 67, 68, 70, 72];
var w = window.innerWidth;
var h = window.innerHeight;
var dots = [];

Tone.Transport.loopEnd = '8m';
Tone.Transport.loop = true;
Tone.Transport.start();
var memorySim = [];

function triggerSound(time) {
    var check = Tone.Transport.seconds.toFixed(2);
    for (var i = 0; i < memorySim.length; i++) {
        if (memorySim[i].time === check) {
            console.log(check, 'HIT');
            note = memorySim[i].note;
        }
    }
    var noteIndex = notes.indexOf(note);
    var posX = map(noteIndex, 0, notes.length, 0, w);
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
    }
    point(posX + random(-20, 20), random(h));
    synth2.triggerAttackRelease(midiToFreq(note), '4n', time);
}

function triggerSound2(time) {
    synth2.oscillator.type = types[Math.floor(random(types.length))];
    var noteIndex = Math.floor(random(notes.length));
    var posX = map(noteIndex, 0, notes.length, 0, w);
    strokeWeight(200);
    switch (noteIndex) {
        case 0:
        case 7:
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
    }
    point(posX + random(-20, 20), random(h));
    synth.triggerAttackRelease(midiToFreq(notes[noteIndex]), '2n', time);
}
var selector = 0;

var types = ['sine4', 'sawtooth2', 'triangle2', 'square2'];

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (indexOfNote === -1) {
        indexOfNote = 0;
    }
    var noteToPlay = notes[indexOfNote];
    synth.oscillator.type = types[Math.floor(random(types.length))];
    synth.triggerAttackRelease(midiToFreq(noteToPlay), '2n');
    var when = Tone.Transport.seconds.toFixed(2);
    var saver = { note: notes[indexOfNote], time: when };
    memorySim.push(saver);
    console.log(saver);
    Tone.Transport.schedule(triggerSound, when);
}
var auto = setInterval(function() {
    monitor();
}, 10);

function monitor() {
    if (Tone.Transport._timeline._timeline.length > 20) {
        Tone.Transport._timeline._timeline.shift();
        memorySim.shift();

    }
}