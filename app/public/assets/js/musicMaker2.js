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
        type: 'fmsine4'
    },
    envelope: {
        attack: 1.7,
        decay: 0.2,
        sustain: 0,
        release: 0.9
    }
});
var delay = new Tone.PingPongDelay("8n", 0.75);
synth.chain(delay, Tone.Master);
var synth4 = new Tone.Synth({
    oscillator: {
        type: 'fmsine2'
    },
    envelope: {
        attack: 1.7,
        decay: 0.2,
        sustain: 0,
        release: 0.7
    }
});
synth4.chain(delay, Tone.Master);
var synth2 = new Tone.Synth({
    oscillator: {
        type: 'fmtriangle2'
    },
    envelope: {
        attack: 1.7,
        decay: 0.1,
        sustain: 0,
        release: 0.8
    }
});
var delay2 = new Tone.PingPongDelay(0.65, 0.5);
synth2.chain(delay2, Tone.Master);
var synth3 = new Tone.Synth({
    oscillator: {
        type: 'fmtriangle4'
    },
    envelope: {
        attack: 1.7,
        decay: 0.1,
        sustain: 0,
        release: 0.8
    }
});
var delay3 = new Tone.PingPongDelay(0.85, 0.5);
synth3.chain(delay3, Tone.Master);
var reverb = new Tone.JCReverb(0.7, 0.9);
var masterDelay = new Tone.PingPongDelay(0.5, 0.4);
Tone.Master.chain(masterDelay, reverb);
var auto = setInterval(function() { playMusicA() }, 4000);
var auto2 = setInterval(function() { playMusicB() }, 5500);
var lenDiff = ["+1n", "+2n", "+4n", "+8n"];
var pauses = [2000, 1000, 500, 250];

function playMusicA() {
    noteIndex = Math.floor(random(notes.length));
    note = MIDI(notes[noteIndex]);
    note2 = MIDI(notes[Math.floor(random(notes.length))]);
    console.log(note);
    console.log(note2);
    synth.triggerAttackRelease(note, '4n');
    pauseLength = Math.floor(random(lenDiff.length));
    synth4.triggerAttackRelease(note2, '4n', lenDiff[pauseLength]);
    strokeWeight(140);
    stroke(255, Math.floor(random(255)), Math.floor(random(255)), 90);
    point(random(w), random(h));
    setTimeout(function() {
        push();
        stroke(255, Math.floor(random(255)), Math.floor(random(255)), 90);
        point(random(w), random(h));
        pop();
    }, pauses[pauseLength]);
}

function playMusicB() {
    //note = MIDI(notes[(Math.floor(random(notes.length)))]);
    //synth2.triggerAttackRelease(note, '2n');
    //strokeWeight(140);
    //stroke(Math.floor(random(255)), Math.floor(random(255)), 250, 90);
    //point(random(w), random(h));
    //synth3.triggerAttackRelease(MIDI(notes[Math.floor(random(notes.length))]), '2n', '+1n');
    //push();
    //strokeWeight(140);
    //stroke(Math.floor(random(255)), 250, Math.floor(random(255)), 90);
    //point(random(w), random(h));
    //pop();
}

function findNote(index) {
    switch (index) {
        case 0:
            return notes[index] + 7;
        default:
            return notes[index] + 12;
    }
}