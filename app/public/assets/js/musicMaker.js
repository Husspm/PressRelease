w = window.innerWidth;
h = window.innerHeight;

function setup() {
    createCanvas(w, h);
    background(0);
    osc = new p5.SinOsc(); //osc, osc2, and all effects belong to groupA
    osc2 = new p5.SinOsc();
    osc3 = new p5.SqrOsc();
    Tosc = new p5.TriOsc(); //Tosc and Tosc2 and all effects with T before it belong to groupB
    Tosc2 = new p5.TriOsc();
    Sawosc = new p5.SawOsc(); //Sawosc and Sawosc2 and all effects with Saw before it belong to keyPressedGroup
    Sawosc2 = new p5.SawOsc();
    env = new p5.Env();
    env2 = new p5.Env();
    Tenv = new p5.Env();
    Sawenv = new p5.Env();
    oDist = new p5.Distortion(0.0099); //groupA distortion
    oDist2 = new p5.Distortion(0.0699); //rowC distortion
    tDist = new p5.Distortion(0.0099); //groupB distortion
    env.setRange(1, 0);
    Tenv.setRange(0.4, 0);
    env2.setRange(0.05, 0);
    Sawenv.setRange(0.5, 0);
    reverb = new p5.Reverb();
    reverb2 = new p5.Reverb();
    Treverb = new p5.Reverb();
    Sawreverb = new p5.Reverb();
    delay = new p5.Delay();
    delay2 = new p5.Delay();
    Tdelay = new p5.Delay();
    reverb.set(8, 1, 8000);
    reverb2.set(8, 1, 8000);
    Treverb.set(8, 1, 8000);
    Sawreverb.set(10, 1, 8000);
    osc.disconnect();
    osc.connect(reverb);
    osc2.disconnect();
    osc2.connect(reverb);
    osc3.disconnect();
    osc3.connect(reverb2);
    reverb.connect(oDist);
    reverb2.connect(oDist2);
    Tosc.disconnect();
    Tosc.connect(Treverb);
    Tosc2.disconnect();
    Tosc2.connect(Treverb);
    Treverb.connect(tDist);
    delay.setType(1);
    Tdelay.setType(1);
    Sawosc.disconnect();
    Sawosc.connect(Sawreverb);
    Sawosc2.disconnect();
    Sawosc2.connect(Sawreverb);
    env.setADSR(1.5, 0.05, 0, 0.5);
    env2.setADSR(0.05, 0.05, 0, 0.2);
    Tenv.setADSR(0.9, 0.05, 0, 0.5);
    Sawenv.setADSR(0.9, 0.05, 0, 0.5);
    delay.process(oDist, 0.75, 0.6);
    delay2.process(oDist2, 0.25, 0.4);
    Tdelay.process(tDist, 0.75, 0.6);
    osc.amp(env);
    osc2.amp(env);
    osc3.amp(env2);
    Tosc.amp(Tenv);
    Tosc2.amp(Tenv);
    Sawosc.amp(Sawenv);
    Sawosc2.amp(Sawenv);
    osc.start();
    osc2.start();
    osc3.start();
    Tosc.start();
    Tosc2.start();
    Sawosc.start();
    Sawosc2.start();
    volume = new p5.Amplitude();
}
var sOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var sOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];

var auto = setInterval(function() { makeMusicGroupA(); }, 4000);
var auto2 = setInterval(function() { randomize(); }, 1000);

function randomize() {
    var target = Math.floor(random(0, 10));
    if (target === 3) {
        makeMusicGroupB();
    }
}

var group_A_iterations = 0;
var key_change_iterations_A = 0;

function makeMusicGroupA() {
    if (group_A_iterations < 3) {
        console.log('HIT on group A');
        var idx = Math.floor(random(sOscArray.length));
        var note = sOscArray[idx];
        console.log(note, 'was selected for group A');
        osc.freq(midiToFreq(note));
        osc2.freq(midiToFreq(findNote(note)));
        env.play();
        sOscArray.splice(idx, 1);
        if (sOscArray.length === 0) {
            for (var i = 0; i < sOscCopy.length; i++) {
                if (key_change_iterations_A % 2 === 0) {
                    sOscCopy[i] += 5;
                } else {
                    sOscCopy[i] -= 7;
                }
            }
            key_change_iterations_A++;
            console.log('gA array', sOscCopy);
            sOscArray = sOscCopy.slice();
        }
    }
    group_A_iterations++;
    if (group_A_iterations >= 4) {
        group_A_iterations = 0;
    }
}
var key_change_iterations_B = 0;

function makeMusicGroupB() {
    console.log("HIT on group B");
    var idx = Math.floor(random(tOscArray.length));
    var note = tOscArray[idx];
    console.log(note, 'was selected for group B');
    Tosc.freq(midiToFreq(note));
    Tosc2.freq(midiToFreq(findNote(note)));
    Tenv.play();
    tOscArray.splice(idx, 1);
    if (tOscArray.length === 0) {
        for (var i = 0; i < sOscCopy.length; i++) {
            if (key_change_iterations_B % 2 === 0) {
                tOscCopy[i] += 5;
            } else {
                tOscCopy[i] -= 7;
            }
        }
        key_change_iterations_B++;
        console.log('gB array', tOscCopy);
        tOscArray = tOscCopy.slice();
    }
}

function findNote(note) {
    var selector = Math.floor(random(0, 4));
    switch (note) {
        case sOscCopy[0]:
        case tOscCopy[0]:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 12);
            } else {
                return (note + 21);
            }
        case sOscCopy[1]:
        case tOscCopy[1]:
            if (selector === 0) {
                return (note + 9);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note + 26);
            }
        case sOscCopy[2]:
        case tOscCopy[2]:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 15);
            } else {
                return (note + 3);
            }
        case sOscCopy[3]:
        case tOscCopy[3]:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 3);
            } else {
                return (note + 8);
            }
        case sOscCopy[4]:
        case tOscCopy[4]:
            if (selector === 0) {
                return (note + 4);
            } else if (selector === 1) {
                return (note + 9);
            } else if (selector === 2) {
                return (note + 11);
            } else {
                return (note - 12);
            }
        case sOscCopy[5]:
        case tOscCopy[5]:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 9);
            } else {
                return (note - 12);
            }
        case sOscCopy[6]:
        case tOscCopy[6]:
            if (selector === 0) {
                return (note + 1);
            } else if (selector === 1) {
                return (note - 4);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note - 21);
            }
        case sOscCopy[7]:
        case tOscCopy[7]:
            if (selector === 0) {
                return (note + 11);
            } else if (selector === 1) {
                return (note - 24);
            } else if (selector === 2) {
                return (note + 14);
            } else {
                return (note - 12);
            }
        case sOscCopy[8]:
        case tOscCopy[8]:
            if (selector === 0) {
                return (note + 26);
            } else if (selector === 1) {
                return (note + 10);
            } else if (selector === 2) {
                return (note - 17);
            } else {
                return (note - 5);
            }
        case sOscCopy[9]:
        case tOscCopy[9]:
            if (selector === 0) {
                return (note + 27);
            } else if (selector === 1) {
                return (note + 19);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note + 2);
            }
        case sOscCopy[10]:
        case tOscCopy[10]:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note + 8);
            } else if (selector === 2) {
                return (note + 15);
            } else {
                return (note + 1);
            }
        case sOscCopy[11]:
        case tOscCopy[11]:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 24);
            }
        case sOscCopy[12]:
        case tOscCopy[12]:
            if (selector === 0) {
                return (note - 9);
            } else if (selector === 1) {
                return (note + 7);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 26);
            }
        case sOscCopy[13]:
        case tOscCopy[13]:
            if (selector === 0) {
                return (note + 1);
            } else if (selector === 1) {
                return (note + 5);
            } else if (selector === 2) {
                return (note + 7);
            } else {
                return (note - 9);
            }
        default:
            if (selector === 0) {
                return (note + 12);
            } else if (selector === 1) {
                return (note + 24);
            } else {
                return (note - 12);
            }
    }
}

function keyPressed() {
    console.log(key);
    switch (key) {
        case 'A':
        case 'Q':
            if (key === 'A') {
                Sawosc.freq(midiToFreq(sOscCopy[0]));
                Sawosc2.freq(midiToFreq(sOscCopy[0]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Q') {
                osc3.freq(midiToFreq(sOscCopy[0] + 12));
                env2.play();
            }
            break;
        case 'S':
        case 'W':
            if (key === 'S') {
                Sawosc.freq(midiToFreq(sOscCopy[1]));
                Sawosc2.freq(midiToFreq(sOscCopy[1]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'W') {
                osc3.freq(midiToFreq(sOscCopy[1] + 12));
                env2.play();
            }
            break;
        case 'D':
        case 'E':
            if (key === 'D') {
                Sawosc.freq(midiToFreq(sOscCopy[2]));
                Sawosc2.freq(midiToFreq(sOscCopy[2]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'E') {
                osc3.freq(midiToFreq(sOscCopy[2] + 12));
                env2.play();
            }
            break;
        case 'F':
        case 'R':
            if (key === 'F') {
                Sawosc.freq(midiToFreq(sOscCopy[3]));
                Sawosc2.freq(midiToFreq(sOscCopy[3]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'R') {
                osc3.freq(midiToFreq(sOscCopy[3] + 12));
                env2.play();
            }
            break;
        case 'G':
        case 'T':
            if (key === 'G') {
                Sawosc.freq(midiToFreq(sOscCopy[4]));
                Sawosc2.freq(midiToFreq(sOscCopy[4]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'T') {
                osc3.freq(midiToFreq(sOscCopy[4] + 12));
                env2.play();
            }
            break;
        case 'H':
        case 'Y':
            if (key === 'H') {
                Sawosc.freq(midiToFreq(sOscCopy[5]));
                Sawosc2.freq(midiToFreq(sOscCopy[5]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Y') {
                osc3.freq(midiToFreq(sOscCopy[5] + 12));
                env2.play();
            }
            break;
        case 'J':
        case 'U':
            if (key === 'J') {
                Sawosc.freq(midiToFreq(sOscCopy[6]));
                Sawosc2.freq(midiToFreq(sOscCopy[6]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'U') {
                osc3.freq(midiToFreq(sOscCopy[6] + 12));
                env2.play();
            }
            break;
        case 'K':
        case 'I':
            if (key === 'K') {
                Sawosc.freq(midiToFreq(sOscCopy[7]));
                Sawosc2.freq(midiToFreq(sOscCopy[7]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'I') {
                osc3.freq(midiToFreq(sOscCopy[7] + 12));
                env2.play();
            }
            break;
        case 'L':
        case 'O':
            if (key === 'L') {
                Sawosc.freq(midiToFreq(sOscCopy[8]));
                Sawosc2.freq(midiToFreq(sOscCopy[8]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'O') {
                osc3.freq(midiToFreq(sOscCopy[8] + 12));
                env2.play();
            }
            break;
        case 'º':
        case 'P':
            if (key === 'º') {
                Sawosc.freq(midiToFreq(sOscCopy[9]));
                Sawosc2.freq(midiToFreq(sOscCopy[9]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'P') {
                osc3.freq(midiToFreq(sOscCopy[9] + 12));
                env2.play();
            }
            break;
        case 'Þ':
        case 'Û':
            if (key === 'Þ') {
                Sawosc.freq(midiToFreq(sOscCopy[10]));
                Sawosc2.freq(midiToFreq(sOscCopy[10]) + random(-3, 3));
                Sawenv.play();
            }
            if (key === 'Û') {
                osc3.freq(midiToFreq(sOscCopy[10] + 12));
                env2.play();
            }
            break;
    }
}

function draw() {
    level = volume.getLevel();
    amount = map(level, 0, 1, 1, 455);
    strokeWeight(amount / 1.5);
    stroke(random(0, 255), 60);
    noFill();
    point(random(0, w), random(0, h));
    push();
    strokeWeight(amount / 2);
    stroke(amount / 2, 30);
    noFill();
    point(random(0, w), random(0, h));
    pop();
}