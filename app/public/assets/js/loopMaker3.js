function setup() {
    w = window.innerWidth;
    h = window.innerHeight;
    createCanvas(w, h);
    strokeWeight(5);
    for (var x = 0; x <= w; x += w / notes.length) {
        stroke(255);
        line(x, 0, x, h);
    }
}

var notes = [60, 62, 63, 65, 67, 68, 70, 72];
var delay = new Tone.PingPongDelay(0.9, 0.6);
var reverb = new Tone.JCReverb(0.8);
var synth = new Tone.PluckSynth({
    attackNoise: 20,
    dampening: 1500,
    resonance: 0.9
}).chain(delay, reverb, Tone.Master);

function windowResized() {
    setup();
}

function mousePressed() {
    var note = Math.floor(map(mouseX, 0, w, 0, notes.length));
    if (note > notes.length - 1) {
        note = notes.length - 1;
    }
    if (note < 0) {
        note = 0;
    }
    point(mouseX, mouseY);
    console.log(note);
    if (mouseY < h / 2) {
        synth.triggerAttackRelease(midiToFreq(notes[note]), '16n');
    } else {
        synth.triggerAttackRelease(midiToFreq(notes[note] - 12), '16n');

    }
}