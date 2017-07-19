function setup(){
    osc = new p5.SinOsc();//osc, osc2, and all effects belong to groupA
    osc2 = new p5.SinOsc();
    Tosc = new p5.TriOsc();//Tosc and Tosc2 and all effects with T before it belong to groupB
    Tosc2 = new p5.TriOsc();
    Sawosc = new p5.SawOsc();//Sawosc and Sawosc2 and all effects with Saw before it belong to keyPressedGroup
    Sawosc2 = new p5.SawOsc();
    env = new p5.Env();
    Tenv = new p5.Env();
    Sawenv = new p5.Env();
    oDist = new p5.Distortion(0.0099);//groupA distortion
    tDist = new p5.Distortion(0.0099);//groupB distortion
    filter = new p5.BandPass();
    Tfilter = new p5.BandPass();
    Tenv.setRange(0.3, 0);
    Sawenv.setRange(0.3, 0);
    reverb = new p5.Reverb();
    Treverb = new p5.Reverb();
    Sawreverb = new p5.Reverb();
    delay = new p5.Delay();
    Tdelay = new p5.Delay();
    reverb.set( 8, 4, 8000);
    Treverb.set( 8, 4, 8000);
    Sawreverb.set( 8, 4, 8000);
    osc.disconnect();
    osc.connect(reverb);
    osc2.disconnect();
    osc2.connect(reverb);
    reverb.connect(oDist);
    oDist.connect(filter);
    Tosc.disconnect();
    Tosc.connect(Treverb);
    Tosc2.disconnect();
    Tosc2.connect(Treverb);
    Treverb.connect(tDist);
    tDist.connect(Tfilter);
    delay.setType(1);
    Tdelay.setType(1);
    Sawosc.disconnect();
    Sawosc.connect(Sawreverb);
    Sawosc2.disconnect();
    Sawosc2.connect(Sawreverb);
    env.setADSR(1.5, 0.05, 0, 0.5);
    Tenv.setADSR(0.9, 0.05, 0, 0.5);
    Sawenv.setADSR(0.9, 0.05, 0, 0.5);
    delay.process(oDist, 0.75, 0.6);
    Tdelay.process(tDist, 0.75, 0.6);
    osc.amp(env);
    osc2.amp(env);
    Tosc.amp(Tenv);
    Tosc2.amp(Tenv);
    Sawosc.amp(Sawenv);
    Sawosc2.amp(Sawenv);
    osc.start();
    osc2.start();
    Tosc.start();
    Tosc2.start();
    Sawosc.start();
    Sawosc2.start();
}
var sOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var sOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscArray = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];
var tOscCopy = [48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72];

var auto = setInterval(function(){ makeMusicGroupA();}, 4000);
var auto2 = setInterval(function(){ randomize();}, 1000);
var auto3 = setInterval(function(){ valueListener();}, 0.2);

var fOffset = 0;

function valueListener(){
    fOffset += 0.1;
    filter.freq(noise(fOffset) * 7000);
    filter.res(noise(fOffset) * 60);
    Tfilter.freq(noise(fOffset) * 6000);
    Tfilter.res(noise(fOffset) * 120);
    //delay.delayTime(noise(fOffset) * 0.9);
    //Tdelay.delayTime(noise(fOffset) * 0.9);
}

function randomize(){
    var target = Math.floor(random(0, 10));
        if (target === 3){
            makeMusicGroupB();
        }
}
var group_A_iterations = 0;
function makeMusicGroupA(){
    if (group_A_iterations < 3){
        console.log('HIT on group A');
        var idx = Math.floor(random(sOscArray.length));
        var note = sOscArray[idx];
        console.log(note, 'was selected for group A');
        osc.freq(midiToFreq(note));
        osc2.freq(midiToFreq(findNote(note)));
        env.play();
        sOscArray.splice(idx, 1);
        if (sOscArray.length === 0){
            sOscArray = sOscCopy.slice();
        }
    }
    group_A_iterations++;
    if (group_A_iterations >= 4){
        group_A_iterations=0;
    }
}
function makeMusicGroupB(){
    console.log("HIT on group B");
    var idx = Math.floor(random(tOscArray.length));
    var note = tOscArray[idx];
    console.log(note, 'was selected for group B');
    Tosc.freq(midiToFreq(note));
    Tosc2.freq(midiToFreq(findNote(note)));
    Tenv.play();
    tOscArray.splice(idx, 1);
    if (tOscArray.length === 0){
        tOscArray = tOscCopy.slice();
    }
}

function findNote(note){
var selector = Math.floor(random(0,4));
    switch(note){
        case 48:
                if (selector === 0){
                    return(note + 7);
                }else if (selector === 1){
                    return(note - 5);
                }else if (selector === 2){
                    return(note + 12);
                }else{
                    return(note + 21);
                }
        case 60:
                if (selector === 0){
                    return(note + 11);
                }else if (selector === 1){
                    return(note - 24);
                }else if (selector === 2){
                    return(note + 14);
                }else{
                    return(note - 12);
                }
        case 62: 
                if (selector === 0){
                    return(note + 26);
                }else if (selector === 1){
                    return(note + 10);
                }else if (selector === 2){
                    return(note - 17);
                }else{
                    return(note - 5);
                }
        case 64:
                if (selector === 0){
                    return(note + 27);
                }else if (selector === 1){
                    return(note + 19);
                }else{
                    return(note - 7);
                }
        case 66:
                if (selector === 0){
                    return(note - 6);
                }else if (selector === 1){
                    return(note + 8);
                }else{
                    return(note + 15);
                }
        default:
                if (selector === 0){
                    return(note + 12);
                }else if (selector ===1){
                    return(note + 24);
                }else{
                    return(note - 24);
                }
    }
}
function keyPressed(){
    console.log(key);
    switch(key){
    case 'A':
        Sawosc.freq(midiToFreq(60));
        Sawosc2.freq(midiToFreq(60) + 1);
        Sawenv.play();
        break;
    case 'S':
        Sawosc.freq(midiToFreq(62));
        Sawosc2.freq(midiToFreq(62) + 1);
        Sawenv.play();
        break;
    case 'D':
        Sawosc.freq(midiToFreq(64));
        Sawosc2.freq(midiToFreq(64) + 1);
        Sawenv.play();
        break;
    case 'F':
        Sawosc.freq(midiToFreq(66));
        Sawosc2.freq(midiToFreq(66) + 1);
        Sawenv.play();
        break;
    case 'G':
        Sawosc.freq(midiToFreq(67));
        Sawosc2.freq(midiToFreq(67) + 1);
        Sawenv.play();
        break;
    case 'H':
        Sawosc.freq(midiToFreq(69));
        Sawosc2.freq(midiToFreq(69) + 1);
        Sawenv.play();
        break;
    case 'J':
        Sawosc.freq(midiToFreq(71));
        Sawosc2.freq(midiToFreq(71) + 1);
        Sawenv.play();
        break;
    case 'K':
        Sawosc.freq(midiToFreq(72));
        Sawosc2.freq(midiToFreq(72) + 1);
        Sawenv.play();
        break;
    case 'L':
        Sawosc.freq(midiToFreq(74));
        Sawosc2.freq(midiToFreq(74) + 1);
        Sawenv.play();
        break;
    case 'º':
        Sawosc.freq(midiToFreq(76));
        Sawosc2.freq(midiToFreq(76) + 1);
        Sawenv.play();
        break;
    case 'Þ':
        Sawosc.freq(midiToFreq(79));
        Sawosc2.freq(midiToFreq(79) + 1);
        Sawenv.play();
        break;
    } 
}