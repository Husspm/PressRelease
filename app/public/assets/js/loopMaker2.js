var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
    createCanvas(w, h);
    for (var x = 0; x < w; x += w / notes.length) {
        stroke(255);
        line(x, 0, x, h);
    }
}
Tone.Transport.bpm.value = 130;
var delay = new Tone.PingPongDelay('4n', 0.8);
var delay2 = new Tone.PingPongDelay('4n', 0.5);
var synth = new Tone.PolySynth({
    oscillator: {
        type: 'sawtooth2'
    }
}).chain(delay, Tone.Master);
synth.set({
    'envelope': {
        'attack': 0.1
    }
})
var synth2 = new Tone.Synth({
    oscillator: {
        type: 'sawtooth8'
    },
    envelope: {
        attack: 0.9,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8
    }
}).chain(delay2, Tone.Master);

var notes = [60, 62, 64, 65, 67, 69, 71, 72];
var dots = [];

Tone.Transport.loopEnd = '4m';
Tone.Transport.loop = true;
Tone.Transport.start();
var loopIterations = 0;
var switchChords = false;
var chords = [
    ['C4', 'E4', 'G4', 'B4'],
    ['G4', 'A4', 'D5', 'E5']
];
var loop = new Tone.Loop(function(time) {
    loopIterations++;
    if (loopIterations % 2 === 0) {
        if (switchChords === false) {
            switchChords = true;
        } else {
            switchChords = false;
        }
    }
    if (switchChords === false) {
        synth.triggerAttackRelease(chords[0], '16n');
    } else {
        synth.triggerAttackRelease(chords[1], '16n');

    }
}, "2m").start(0);
var memorySim = [];

function triggerSound(time) {
    var check = Tone.Transport.seconds.toFixed(2);
    for (var i = 0; i < memorySim.length; i++) {
        if (memorySim[i].time === check) {
            note = memorySim[i].note;
        }
    }
    var noteIndex = notes.indexOf(note);
    var posX = map(noteIndex, 0, notes.length, 0, w);
    strokeWeight(150);
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
            stroke(0, 0, 200, 10);
            break;
        case 4:
            stroke(200, 100, 200, 10);
            break;
        case 5:
            stroke(200, 200, 0, 10);
            break;
        case 6:
            stroke(200, 200, 200, 10);
            break;
    }
    point(posX, random(h));
    synth2.triggerAttackRelease(midiToFreq(note), '4n', time);
}

var selector = 0;

var types = ['sine4', 'sawtooth2', 'triangle2', 'square2'];

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (indexOfNote === -1) {
        indexOfNote = 0;
    }
    var noteToPlay = notes[indexOfNote];
    synth.triggerAttackRelease(midiToFreq(noteToPlay), '4n');
    var tick = Tone.Transport.ticks;
    var when = Tone.Transport.seconds.toFixed(2);
    var saver = { note: notes[indexOfNote], time: when, tick: tick };
    memorySim.push(saver);
    Tone.Transport.schedule(triggerSound, when);
    if (memorySim.length > 12) {
        var finder = memorySim.shift();
        for (var i = 0; i < Tone.Transport._timeline._timeline.length; i++) {
            var diff = Tone.Transport._timeline._timeline[i].time - finder.tick;
            diff = Math.abs(diff);
            if (diff < 5) {
                Tone.Transport._timeline._timeline.splice(i, 1);
            }
        }
    }
}