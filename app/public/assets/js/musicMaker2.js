w = window.innerWidth;
h = window.innerHeight;
var notes = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72];
var notesB = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72];

function MIDI(note) {
    return midiToFreq(note);
}

function setup() {
    createCanvas(w, h);
    background(0);
}

var synth = new Tone.Synth({
    oscillator: {
        type: 'square'
    },
    envelope: {
        attack: 1.9,
        decay: 0.2,
        sustain: 0,
        release: 0.9
    }
});
var delay = new Tone.PingPongDelay("8n", 0.75);
delay.wet.value = 0.5;
synth.chain(delay, Tone.Master);
var synth4 = new Tone.Synth({
    oscillator: {
        type: 'fmsine2'
    },
    envelope: {
        attack: 0.7,
        decay: 0.2,
        sustain: 0,
        release: 0.7
    }
});
synth4.chain(delay, Tone.Master);
var reverb = new Tone.JCReverb(0.97);
reverb.wet.value = 0.5;
var masterDelay = new Tone.PingPongDelay(0.95, 0.6);
masterDelay.wet.value = 0.5;
Tone.Master.chain(masterDelay, reverb);
var auto = setInterval(function() { playMusicA() }, 4000);
var lenDiff = ["+1n", "+2n", "+4n", "+8n"];
var pauses = [2000, 1000, 500, 250];

function playMusicA() {
    noteIndex = Math.floor(random(notes.length));
    noteValue = notes[noteIndex];
    var xPos = map(noteValue, 48, 72, 0, w);
    note = MIDI(noteValue);
    note2Value = findNote(noteValue);
    var xPos2 = map(note2Value, 48, 72, 0, w);
    note2 = MIDI(note2Value);
    synth.triggerAttackRelease(note, '4n', AudioContext.currentTime, random(0.25, 1));
    var pauseLength = Math.floor(random(lenDiff.length));
    synth4.triggerAttackRelease(note2, '4n', lenDiff[pauseLength], random(0.25, 1));
    strokeWeight(140);
    stroke(255, Math.floor(random(255)), Math.floor(random(255)), 90);
    point(xPos, random(h));
    setTimeout(function() {
        push();
        stroke(255, Math.floor(random(255)), Math.floor(random(255)), 90);
        point(xPos2, random(h));
        pop();
    }, pauses[pauseLength]);
    notes.splice(noteIndex, 1);
    if (notes.length === 0) {
        notes = notesB.slice();
    }
}

function findNote(notePassed) {
    console.log(notePassed);
    switch (notePassed) {
        case 48:
        case 60:
        case 72:
            return notePassed + 7;
            break;
        case 50:
        case 62:
            return notePassed + 9;
            break;
        case 52:
        case 64:
            return notePassed - 5;
            break;
        case 53:
        case 65:
            return notePassed + 7;
            break;
        case 55:
        case 67:
            return notePassed + 4;
            break;
        case 57:
        case 69:
            return notePassed - 9;
            break;
        case 59:
        case 71:
            return notePassed + 5;
            break;
        default:
            return notePassed + 12;
    }
}