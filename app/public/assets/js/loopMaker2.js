var storage = [{
    scale: [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72],
    names: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
}, {
    scale: [48, 50, 51, 53, 55, 57, 58, 60, 62, 63, 65, 67, 69, 70, 72],
    names: ['C', 'D', 'D#', 'F', 'G', 'A', 'A#', 'C', 'D', 'D#', 'F', 'G', 'A', 'A#', 'C']
}];
startIndex = 0;
noteNames = storage[0].names;

function setup() {
    w = window.innerWidth - 30;
    h = window.innerHeight;
    createCanvas(w, h);
    strokeWeight(5);
    for (var x = 0, nV = 0; x <= w; x += w / notes.length, nV++) {
        stroke(255, 50);
        line(x, 0, x, h);
        if (nV < noteNames.length) {
            textSize(w * 0.02);
            text(noteNames[nV], x + 20, 40);
            text(noteNames[nV], x + 20, h / 2 + 40);
        }
    }
    line(0, h / 2, w, h / 2);
}

var types = ['sine', 'sine2', 'sine4', 'sine8', 'triangle', 'triangle2', 'triangle4', 'triangle8', 'sawtooth', 'square'];
Tone.Transport.bpm.value = 120;
var delay = new Tone.PingPongDelay(0.5, 0.7);
delay.wet.value = 0.5;
var reverb = new Tone.JCReverb(0.2);
reverb.wet.value = 0.5;
var delay2 = new Tone.PingPongDelay('4n', 0.7);
delay2.wet.value = 0.5;
var delay3 = new Tone.PingPongDelay('8n', 0.7);
delay3.wet.value = 0.5;
var synth = new Tone.MembraneSynth({
    pitchDecay: 0.005,
    octaves: 2,
    oscillator: {
        type: types[$("#synthType").val()]
    },
    envelope: {
        attack: 0.01,
        decay: 0.08,
        sustain: 0.05,
        release: 0.09,
        attackCurve: 'ripple'
    }
}).chain(delay, Tone.Master);

var distort = new Tone.Distortion(0.2);
var synth2 = new Tone.FMSynth({
    oscillator: {
        type: 'sawtooth8'
    },
    envelope: {
        attack: 0.4,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8
    }
}).chain(delay2, distort, Tone.Master);
Tone.Master.chain(reverb, delay3);

var notes = storage[0].scale;


Tone.Transport.loopEnd = '2m';
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
    var lengths = ['16n', '8n', '4n', '2n'];
    strokeWeight(w * 0.2);
    switch (noteIndex) {
        case 0:
        case 7:
            stroke(0, 255, 0, 100);
            break;
        case 1:
        case 8:
            stroke(200, 255, 0, 100);
            break;
        case 2:
        case 9:
            stroke(200, 0, 0, 100);
            break;
        case 3:
        case 10:
            stroke(0, 0, 200, 100);
            break;
        case 4:
        case 11:
            stroke(200, 100, 200, 100);
            break;
        case 5:
        case 12:
            stroke(200, 200, 0, 100);
            break;
        case 6:
        case 13:
            stroke(200, 200, 200, 100);
            break;
        case 7:
        case 14:
            stroke(85, 95, 255, 100);
    }
    synth2.triggerAttackRelease(midiToFreq(note), lengths[Math.floor(random(lengths.length))], time);
    point(posX, random(h / 2, h));
}

function triggerSound2(time) {
    var check = Tone.Transport.seconds.toFixed(2);
    for (var i = 0; i < memorySim2.length; i++) {
        if (abs(memorySim2[i].time - check) < 0.1) {
            note = memorySim2[i].note;
            howLong = memorySim2[i].noteLength;
            posY = memorySim2[i].yPos;
        }
    }
    var noteIndex = notes.indexOf(note);
    synth.triggerAttackRelease(midiToFreq(note), howLong, time, random(0.2, 1));
    var posX = map(noteIndex, 0, notes.length, 0, w);
    strokeWeight(w * 0.2);
    switch (noteIndex) {
        case 0:
        case 7:
            stroke(0, 255, 0, 100);
            break;
        case 1:
        case 8:
            stroke(200, 255, 0, 100);
            break;
        case 2:
        case 9:
            stroke(200, 0, 0, 100);
            break;
        case 3:
        case 10:
            stroke(0, 0, 200, 100);
            break;
        case 4:
        case 11:
            stroke(200, 100, 200, 100);
            break;
        case 5:
        case 12:
            stroke(200, 200, 0, 100);
            break;
        case 6:
        case 13:
            stroke(200, 200, 200, 100);
            break;
    }
    point(posX, posY);
}

function mousePressed() {
    if (mouseY > 0) {
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
        } else if (mouseY < h / 2) {
            var tick = Tone.Transport.ticks;
            var when = Tone.Transport.seconds.toFixed(2);
            var howLong = ['16n', '8n', '4n'];
            var length = Math.floor(map(mouseY, 0, h / 2, 0, howLong.length));
            synth.triggerAttackRelease(midiToFreq(noteToPlay), howLong[length]);
            var yMarker = mouseY;
            var saver = { note: notes[indexOfNote], time: when, tick: tick, noteLength: howLong[length], yPos: yMarker };
            memorySim2.push(saver);
            Tone.Transport.schedule(triggerSound2, when);
            if (memorySim2.length > 12) {
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
    } //ends mouseY if statement
}

function windowResized() {
    setup();
}

$(document).ready(function() {
    $("input").on('input', function() {
        console.log(this.id, '=', this.value);
        switch (this.id) {
            case 'delay':
                {
                    delay.delayTime.value = this.value;
                    break;
                }
            case 'delay2':
                {
                    delay2.delayTime.value = this.value;
                    break;
                }
            case 'reverb':
                {
                    reverb.roomSize.value = this.value;
                    break;
                }
            case 'feedback':
                {
                    delay.feedback.value = this.value;
                    break;
                }
            case 'feedback2':
                {
                    delay2.feedback.value = this.value;
                    break;
                }
            case 'attack':
                {
                    synth2.envelope.attack = this.value;
                    break;
                }
            case 'release':
                {
                    synth2.envelope.release = this.value;
                    break;
                }
            case 'delay3':
                {
                    delay3.delayTime.value = this.value;
                    break;
                }
            case 'feedback3':
                {
                    delay3.feedback.value = this.value;
                    break;
                }
            case 'pitchDecay':
                {
                    synth.pitchDecay = this.value;
                    break;
                }
            case 'intensity':
                {
                    synth.octaves = this.value;
                    break;
                }
            case 'delayVolume':
                {
                    delay.wet.value = this.value;
                    break;
                }
            case 'synthType':
                {
                    synth.oscillator.type = types[this.value];
                    break;
                }
            case 'harmonicity':
                {
                    synth2.harmonicity.value = this.value;
                    break;
                }
            case 'mod':
                {
                    synth2.modulationIndex.value = this.value;
                    break;
                }
            case 'dist':
                {
                    distort.distortion = this.value;
                    break;
                }
            case 'delay3Vol':
                {
                    delay3.wet.value = this.value;
                    break;
                }
            case 'lineVolume':
                {
                    synth.volume.input.value = this.value;
                    break;
                }
        }
    }); //ends input function
    $('#reset').on('click', function() {
        console.log(this.id);
        memorySim = [];
        memorySim2 = [];
        Tone.Transport._timeline._timeline = [];
        setup();
    });
    $('#change').on('click', function() {
        console.log('Clicked');
        console.log(startIndex);
        if (startIndex === 0) {
            noteNames = storage[1].names;
            notes = storage[1].scale;
            startIndex = 1;
        } else {
            noteNames = storage[0].names;
            notes = storage[0].scale;
            startIndex = 0;
        }
        setup();
    });
    var auto = setInterval(function() {
        blink()
    }, 500);
    var iterations = 0;

    function blink() {
        if (iterations % 4 === 0) {
            $(".blinker").css('background', 'green');
        } else {
            $(".blinker").css('background', 'red');
        }
        setTimeout(function() {
            $(".blinker").css('background', 'black');
        }, 100);
        iterations++;
    }
    $("select").on('input', function() {
        console.log(this.value);
        Tone.Transport.loopEnd = this.value;
    });
    synth.oscillator.type = types[$("#synthType").val()];
}); //ends doc ready function