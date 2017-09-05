var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
    createCanvas(w, h);
    strokeWeight(5);
    for (var x = 0; x <= w; x += w / notes.length) {
        stroke(255);
        line(x, 0, x, h);
    }
    line(0, h / 2, w, h / 2)
}
Tone.Transport.bpm.value = 100;
var delay = new Tone.PingPongDelay('2n', 0.6);
var delay2 = new Tone.PingPongDelay('4n', 0.6);
var synth = new Tone.Synth({
    oscillator: {
        type: 'square4'
    },
    envelope: {
        attack: 1.2,
        decay: 0.8,
        sustain: 0.6,
        release: 0.9
    }
}).chain(delay, Tone.Master);

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

Tone.Transport.loopEnd = '8m';
Tone.Transport.loop = true;
Tone.Transport.start();

var memorySim = [];
var memorySim2 = [];

function triggerSound(time) {
    var check = Tone.Transport.seconds.toFixed(2);
    for (var i = 0; i < memorySim.length; i++) {
        if (memorySim[i].time === check) {
            note = memorySim[i].note;
        }
    }
    var noteIndex = notes.indexOf(note);
    var posX = map(noteIndex, 0, notes.length, 0, w);
    var lengths = ['8n', '4n', '2n', '1n'];
    strokeWeight(w * 0.15);
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
    point(posX, random(h / 2, h));
    synth2.triggerAttackRelease(midiToFreq(note), lengths[Math.floor(random(lengths.length))], time);
}

function triggerSound2(time) {
    var check = Tone.Transport.seconds.toFixed(2);
    for (var i = 0; i < memorySim2.length; i++) {
        if (memorySim2[i].time === check) {
            note = memorySim2[i].note;
        }
    }
    var noteIndex = notes.indexOf(note);
    var posX = map(noteIndex, 0, notes.length, 0, w);
    var lengths = ['8n', '4n', '2n', '1n'];
    strokeWeight(w * 0.15);
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
    point(posX, random(h / 2, 0));
    synth.triggerAttackRelease(midiToFreq(note), lengths[Math.floor(random(lengths.length))], time);
}

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (indexOfNote === -1) {
        indexOfNote = 0;
    }
    var noteToPlay = notes[indexOfNote];
    if (mouseY > h / 2) {
        synth2.triggerAttackRelease(midiToFreq(noteToPlay), '4n');
        var tick = Tone.Transport.ticks;
        var when = Tone.Transport.seconds.toFixed(2);
        var saver = { note: notes[indexOfNote], time: when, tick: tick };
        memorySim.push(saver);
        Tone.Transport.schedule(triggerSound, when);
        if (memorySim.length > 20) {
            var finder = memorySim.shift();
            for (var i = 0; i < Tone.Transport._timeline._timeline.length; i++) {
                var diff = Tone.Transport._timeline._timeline[i].time - finder.tick;
                diff = Math.abs(diff);
                if (diff < 5) {
                    Tone.Transport._timeline._timeline.splice(i, 1);
                }
            }
        }
    } else if (mouseY < h / 2) {
        synth.triggerAttackRelease(midiToFreq(noteToPlay), '4n');
        var tick = Tone.Transport.ticks;
        var when = Tone.Transport.seconds.toFixed(2);
        var saver = { note: notes[indexOfNote], time: when, tick: tick };
        memorySim2.push(saver);
        Tone.Transport.schedule(triggerSound2, when);
        if (memorySim.length > 20) {
            var finder = memorySim2.shift();
            for (var i = 0; i < Tone.Transport._timeline._timeline.length; i++) {
                var diff = Tone.Transport._timeline._timeline[i].time - finder.tick;
                diff = Math.abs(diff);
                if (diff < 5) {
                    Tone.Transport._timeline._timeline.splice(i, 1);
                }
            }
        }
    }
}