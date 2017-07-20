function setup() {
    osc = new p5.SinOsc(); //osc, osc2, and all effects belong to groupA
    osc2 = new p5.SinOsc();
    Cosc = new p5.SqrOsc(); //Cosc, Cosc2, and all effects belong to groupC
    Cosc2 = new p5.SqrOsc();
    osc3 = new p5.SqrOsc();
    Tosc = new p5.TriOsc(); //Tosc and Tosc2 and all effects with T before it belong to groupB
    Tosc2 = new p5.TriOsc();
    Sawosc = new p5.SawOsc(); //Sawosc and Sawosc2 and all effects with Saw before it belong to keyPressedGroup
    Sawosc2 = new p5.SawOsc();
    env = new p5.Env();
    env2 = new p5.Env();
    Tenv = new p5.Env();
    Cenv = new p5.Env();
    Sawenv = new p5.Env();
    oDist = new p5.Distortion(0.0099); //groupA distortion
    oDist2 = new p5.Distortion(0.0699); //rowC distortion
    tDist = new p5.Distortion(0.0099); //groupB distortion
    cDist = new p5.Distortion(0.0299); //groupB distortion
    filter = new p5.BandPass();
    Tfilter = new p5.BandPass();
    env.setRange(2, 0);
    Tenv.setRange(0.4, 0);
    Cenv.setRange(0.3, 0);
    env2.setRange(0.05, 0);
    Sawenv.setRange(0.5, 0);
    reverb = new p5.Reverb();
    reverb2 = new p5.Reverb();
    Treverb = new p5.Reverb();
    Creverb = new p5.Reverb();
    Sawreverb = new p5.Reverb();
    delay = new p5.Delay();
    delay2 = new p5.Delay();
    Tdelay = new p5.Delay();
    Cdelay = new p5.Delay();
    reverb.set(8, 4, 8000);
    reverb2.set(8, 1, 8000);
    Treverb.set(8, 4, 8000);
    Creverb.set(2, 2, 4000);
    Sawreverb.set(10, 4, 8000);
    osc.disconnect();
    osc.connect(reverb);
    osc2.disconnect();
    osc2.connect(reverb);
    Cosc.disconnect();
    Cosc.connect(reverb);
    Cosc2.disconnect();
    Cosc2.connect(reverb);
    osc3.disconnect();
    osc3.connect(reverb2);
    reverb.connect(oDist);
    reverb2.connect(oDist2);
    Creverb.connect(cDist);
    oDist.connect(filter);
    Tosc.disconnect();
    Tosc.connect(Treverb);
    Tosc2.disconnect();
    Tosc2.connect(Treverb);
    Treverb.connect(tDist);
    tDist.connect(Tfilter);
    delay.setType(1);
    Tdelay.setType(1);
    Cdelay.setType(1);
    Sawosc.disconnect();
    Sawosc.connect(Sawreverb);
    Sawosc2.disconnect();
    Sawosc2.connect(Sawreverb);
    env.setADSR(1.5, 0.05, 0, 0.5);
    Cenv.setADSR(1, 0.05, 0, 0.5);
    env2.setADSR(0.05, 0.05, 0, 0.2);
    Tenv.setADSR(0.9, 0.05, 0, 0.5);
    Sawenv.setADSR(0.9, 0.05, 0, 0.5);
    delay.process(oDist, 0.75, 0.6);
    Cdelay.process(cDist, 0.65, 0.5);
    delay2.process(oDist2, 0.25, 0.6);
    Tdelay.process(tDist, 0.75, 0.6);
    osc.amp(env);
    osc2.amp(env);
    Cosc.amp(Cenv);
    Cosc2.amp(Cenv);
    osc3.amp(env2);
    Tosc.amp(Tenv);
    Tosc2.amp(Tenv);
    Sawosc.amp(Sawenv);
    Sawosc2.amp(Sawenv);
    osc.start();
    osc2.start();
    Cosc.start();
    Cosc2.start();
    osc3.start();
    Tosc.start();
    Tosc2.start();
    Sawosc.start();
    Sawosc2.start();
}
var sOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var sOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var cOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var cOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];

var auto = setInterval(function() { makeMusicGroupA(); }, 4000);
var auto2 = setInterval(function() { randomize(); }, 1000);
var auto3 = setInterval(function() { valueListener(); }, 0.2);
var auto4 = setInterval(function() { randomizeC(); }, 3000);

var fOffset = 0;

function valueListener() {
    fOffset += 0.1;
    filter.freq(noise(fOffset) * 7000);
    filter.res(noise(fOffset) * 60);
    Tfilter.freq(noise(fOffset) * 6000);
    Tfilter.res(noise(fOffset) * 120);
    //delay.delayTime(noise(fOffset) * 0.9);
    //Tdelay.delayTime(noise(fOffset) * 0.9);
}

function randomize() {
    var target = Math.floor(random(0, 10));
    if (target === 3) {
        makeMusicGroupB();
    }
}

function randomizeC() {
    var target = Math.floor(random(0, 3));
    if (target === 1) {
        makeMusicGroupC();
    }
}

var group_A_iterations = 0;

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
            sOscArray = sOscCopy.slice();
        }
    }
    group_A_iterations++;
    if (group_A_iterations >= 4) {
        group_A_iterations = 0;
    }
}

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
        tOscArray = tOscCopy.slice();
    }
}

function makeMusicGroupC() {
    console.log("HIT on group C");
    var idx = Math.floor(random(cOscArray.length));
    var note = cOscArray[idx];
    console.log(note, 'was selected for group C');
    Cosc.freq(midiToFreq(note));
    Cosc2.freq(midiToFreq(findNote(note)));
    Cenv.play();
    cOscArray.splice(idx, 1);
    if (cOscArray.length === 0) {
        cOscArray = cOscCopy.slice();
    }
}

function findNote(note) {
    var selector = Math.floor(random(0, 4));
    switch (note) {
        case 48:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 12);
            } else {
                return (note + 21);
            }
        case 50:
            if (selector === 0) {
                return (note + 9);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note + 26);
            }
        case 52:
            if (selector === 0) {
                return (note + 7);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 10);
            } else {
                return (note + 3);
            }
        case 54:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note - 12);
            } else if (selector === 2) {
                return (note + 3);
            } else {
                return (note + 8);
            }
        case 55:
            if (selector === 0) {
                return (note + 4);
            } else if (selector === 1) {
                return (note + 9);
            } else if (selector === 2) {
                return (note + 11);
            } else {
                return (note - 12);
            }
        case 57:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 9);
            } else {
                return (note - 12);
            }
        case 59:
            if (selector === 0) {
                return (note + 1);
            } else if (selector === 1) {
                return (note - 4);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note - 21);
            }
        case 60:
            if (selector === 0) {
                return (note + 11);
            } else if (selector === 1) {
                return (note - 24);
            } else if (selector === 2) {
                return (note + 14);
            } else {
                return (note - 12);
            }
        case 62:
            if (selector === 0) {
                return (note + 26);
            } else if (selector === 1) {
                return (note + 10);
            } else if (selector === 2) {
                return (note - 17);
            } else {
                return (note - 5);
            }
        case 64:
            if (selector === 0) {
                return (note + 27);
            } else if (selector === 1) {
                return (note + 19);
            } else if (selector === 2) {
                return (note - 7);
            } else {
                return (note + 2);
            }
        case 66:
            if (selector === 0) {
                return (note - 6);
            } else if (selector === 1) {
                return (note + 8);
            } else if (selector === 2) {
                return (note + 15);
            } else {
                return (note + 1);
            }
        case 67:
            if (selector === 0) {
                return (note + 2);
            } else if (selector === 1) {
                return (note - 5);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 24);
            }
        case 69:
            if (selector === 0) {
                return (note - 9);
            } else if (selector === 1) {
                return (note + 7);
            } else if (selector === 2) {
                return (note + 19);
            } else {
                return (note - 26);
            }
        case 71:
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
                return (note - 24);
            }
    }
}

function keyPressed() {
    console.log(key);
    switch (key) {
        case 'A':
        case 'Q':
            if (key === 'A') {
                Sawosc.freq(midiToFreq(60));
                Sawosc2.freq(midiToFreq(60) + 1);
                Sawenv.play();
            }
            if (key === 'Q') {
                osc3.freq(midiToFreq(72));
                env2.play();
            }
            break;
        case 'S':
        case 'W':
            if (key === 'S') {
                Sawosc.freq(midiToFreq(62));
                Sawosc2.freq(midiToFreq(62) + 1);
                Sawenv.play();
            }
            if (key === 'W') {
                osc3.freq(midiToFreq(74));
                env2.play();
            }
            break;
        case 'D':
        case 'E':
            if (key === 'D') {
                Sawosc.freq(midiToFreq(64));
                Sawosc2.freq(midiToFreq(64) + 1);
                Sawenv.play();
            }
            if (key === 'E') {
                osc3.freq(midiToFreq(76));
                env2.play();
            }
            break;
        case 'F':
        case 'R':
            if (key === 'F') {
                Sawosc.freq(midiToFreq(66));
                Sawosc2.freq(midiToFreq(66) + 1);
                Sawenv.play();
            }
            if (key === 'R') {
                osc3.freq(midiToFreq(78));
                env2.play();
            }
            break;
        case 'G':
        case 'T':
            if (key === 'G') {
                Sawosc.freq(midiToFreq(67));
                Sawosc2.freq(midiToFreq(67) + 1);
                Sawenv.play();
            }
            if (key === 'T') {
                osc3.freq(midiToFreq(79));
                env2.play();
            }
            break;
        case 'H':
        case 'Y':
            if (key === 'H') {
                Sawosc.freq(midiToFreq(69));
                Sawosc2.freq(midiToFreq(69) + 1);
                Sawenv.play();
            }
            if (key === 'Y') {
                osc3.freq(midiToFreq(81));
                env2.play();
            }
            break;
        case 'J':
        case 'U':
            if (key === 'J') {
                Sawosc.freq(midiToFreq(71));
                Sawosc2.freq(midiToFreq(71) + 1);
                Sawenv.play();
            }
            if (key === 'U') {
                osc3.freq(midiToFreq(83));
                env2.play();
            }
            break;
        case 'K':
        case 'I':
            if (key === 'K') {
                Sawosc.freq(midiToFreq(72));
                Sawosc2.freq(midiToFreq(72) + 1);
                Sawenv.play();
            }
            if (key === 'I') {
                osc3.freq(midiToFreq(84));
                env2.play();
            }
            break;
        case 'L':
        case 'O':
            if (key === 'L') {
                Sawosc.freq(midiToFreq(74));
                Sawosc2.freq(midiToFreq(74) + 1);
                Sawenv.play();
            }
            if (key === 'O') {
                osc3.freq(midiToFreq(86));
                env2.play();
            }
            break;
        case 'º':
        case 'P':
            if (key === 'º') {
                Sawosc.freq(midiToFreq(76));
                Sawosc2.freq(midiToFreq(76) + 1);
                Sawenv.play();
            }
            if (key === 'P') {
                osc3.freq(midiToFreq(88));
                env2.play();
            }
            break;
        case 'Þ':
        case 'Û':
            if (key === 'Þ') {
                Sawosc.freq(midiToFreq(79));
                Sawosc2.freq(midiToFreq(79) + 1);
                Sawenv.play();
            }
            if (key === 'Û') {
                osc3.freq(midiToFreq(91));
                env2.play();
            }
            break;
    }
}