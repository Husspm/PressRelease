function setup() {}
var delay = new Tone.PingPongDelay(0.8, 0.8);
var synth = new Tone.AMSynth({
    harmonicity: 4,
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

function mousePressed() {
    var indexOfNote = Math.floor(map(mouseX, 0, w, 0, notes.length));
    var noteToPlay = notes[indexOfNote];
    synth.harmonicity = random(2, 20);
    synth.triggerAttackRelease(midiToFreq(noteToPlay), '2n');
}