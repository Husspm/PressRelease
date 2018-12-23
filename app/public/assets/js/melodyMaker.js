var w = window.innerWidth;
var h = window.innerHeight;
var layerOne;
function setup() {
    var heightOffset = $("#settingsPanel").innerHeight();
    console.log(heightOffset);
    canvasHeight = h - heightOffset;
    if (w > 650){
    createCanvas(w - 20, canvasHeight, P2D);
    layerOne = createGraphics(w - 20, canvasHeight, P2D);
    }else{
        createCanvas(w, h / 2);
    }
    pixelDensity(1);
    for (var x = 0; x <= w; x += w / notes[0].length) {
        stroke(255);
        line(x, 0, x, h);
    }
}
var soundFilter = new Tone.Filter(250, "bandpass");
soundFilter.Q.value = 1;
var delay = new Tone.PingPongDelay(0.2, 0.8);
delay.wet.value = 0.5;
var trem = new Tone.Tremolo(10, 0.5);
trem.start();
var pitch = new Tone.PitchShift();
var synth = new Tone.Synth({
    harmonicity: 2,
    oscillator: {
        type: 'sawtooth8'
    },
    envelope: {
        attack: '16n',
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
    }
}).chain(trem, delay, Tone.Master);
var chorus = new Tone.Chorus(0.1, 12.5, 0.5);
Tone.Master.chain(soundFilter, chorus);
// var notes = [
//     [48, 50, 51, 53, 55, 56, 58, 60],
//     [48, 50, 52, 54, 55, 57, 59, 60],
//     [48, 52, 55, 59, 61, 65, 68, 72]
// ];
var notes = [
    {
        scale: [48, 50, 51, 53, 55, 56, 58, 60],
        name: "Natural Minor"
    },{
        scale: [48, 50, 51, 53, 55, 57, 58, 60],
        name: "Harmonic Minor"
    },{
        scale: [48, 50, 52, 53, 55, 57, 59, 60],
        name: "Major"
    },{
        scale: [48, 52, 55, 57, 62],
        name: "Major 6/9"
    },{
        scale: [48, 52, 55, 59, 60],
        name: "Major 7"
    },{
        scale: [48, 52, 55, 59, 62],
        name: "Major 7/9"
    },{
        scale: [48, 52, 54, 59, 64],
        name: "Major flat5/7/11"
    },{
        scale: [48, 50, 55, 57, 59, 66],
        name: "Major sus2/6/7/flat11"
    },{
        scale: [48, 55, 62, 67, 71, 79],
        name: "Big Major"
    },{
        scale: [48, 51, 55, 56, 62],
        name: "Minor 6/9"
    },{
        scale: [48, 51, 55, 57, 62],
        name: "Minor M6/9"
    },{
        scale: [48, 51, 55, 58, 62],
        name: "Minor 7/9"
    },{
        scale: [48, 51, 55, 58, 65],
        name: "Minor sus4/7"
    },{
        scale: [48, 52, 56, 60, 64, 68],
        name: "Major 3rds"
    },{
        scale: [48, 51, 54, 57, 60, 63, 66],
        name: "Minor 3rds"
    }
];
var noteLengths = ["16n", "8n", "4n", "2n", "1n"];
var currIndex = 0;
var dots = [];
var scale;
var transpose = 0;
function mousePressed() {
    console.log(mouseY);
    if (mouseY > 0) {
        lineWeight = 10;
        var indexOfNote = Math.floor(map(mouseX, 0, w, 0, scale.length));
        if (indexOfNote < 0) {
            indexOfNote = 0;
        }if (indexOfNote >= scale.length){
            indexOfNote = scale.length - 1;
        }
        console.log(indexOfNote);
        var noteToPlay = scale[indexOfNote] + transpose;
        console.log(noteToPlay);
        dot = new Dot(mouseX, mouseY, 200);
        dots.push(dot);
        var lengthIndex = floor(map(mouseY, 0, h, 0, noteLengths.length));
        synth.triggerAttackRelease(midiToFreq(noteToPlay + transpose), noteLengths[lengthIndex]);
        return false;
    }
}
function mouseDragged() {
        if (mouseY > 0) {
            lineWeight = 10;
            var indexOfNote = Math.floor(map(mouseX, 0, w, 0, scale.length));
            if (indexOfNote < 0) {
                indexOfNote = 0;
            }if (indexOfNote >= scale.length){
                indexOfNote = scale.length - 1;
            }
            console.log(indexOfNote);
            var noteToPlay = scale[indexOfNote] + transpose;
            console.log(noteToPlay);
            dot = new Dot(mouseX, mouseY, 200);
            dots.push(dot);
            var lengthIndex = floor(map(mouseY, 0, h, 0, noteLengths.length));
            synth.triggerAttackRelease(midiToFreq(noteToPlay), noteLengths[lengthIndex]);
            return false;
        }
}
var lineWeight = 10;

function draw() {
    background(0);
    push();
    lineWeight *= 0.931;
    if (lineWeight < 2){
        lineWeight = 2;
    }
    strokeWeight(lineWeight);
    for (var x = 0; x <= w; x += w / scale.length) {
        stroke(lineColor);
        line(x, 0, x, h);
    }
    pop();
    for (var i = 0; i < dots.length; i++) {
        dots[i].show();
        if (dots[i].initial < 40) {
            dots.splice(i, 1);
        }
    }
}

function Dot(x, y, initial) {
    this.x = x;
    this.y = y;
    this.velocity = (x - pmouseX) / 10;
    console.log(this.velocity);
    this.initial = initial;
    this.weight = w / 10;
    this.downwardAcc = 0.01;
    this.color = currColor;
    this.dirMod = dirMod;
    this.show = function() {
        stroke(this.color, this.initial *= 0.991);
        strokeWeight(this.weight *= 0.991);
        this.downwardAcc += 0.05;
        this.y += (1 + this.downwardAcc) * this.dirMod;
        this.x += this.velocity;
        point(this.x, this.y);
    }
}
var colors = [[255, 225, 159], [66, 83, 144]];
var currColor = colors[0];
var lineColor = colors[1];
var dirMod = 1;
var synthTypes = ["sine", "sine4", "sine8", "sawtooth", "sawtooth4", "sawtooth8",
                  "triangle", "triangle4", "triangle8", "square", "square4", "square8"                
];
$(document).ready(function() {
    var listTarget = $("#synthType");
    for (var i = 0; i <  synthTypes.length; i++){
    var option = $("<option>").attr({"id": synthTypes[i]});
    option.html(synthTypes[i] + " wave");
    listTarget.append(option);
    }
    scale = notes[0].scale;
    console.log('READY');
    $("#scale").attr("max", notes.length - 1);
    $("#keyCenter").html(Tone.Frequency(scale[0], "midi").toNote());
    $("#scaleText").html(notes[0].name);
     //wrapping all effects in an object so I can make references to them 
    //via the dataset called module instead of using a large switch statement
    effects = {"delay": delay, "trem": trem, "soundFilter": soundFilter};
    filterTypes = ["lowpass", "bandpass", "highpass"];

    $("input[type='range']").on("input", function() {
        if (this.id == 'type'){
            effects[this.dataset.module][this.id] = filterTypes[this.value];
        }else if (this.id == 'scale'){
            scale = notes[this.value].scale;
            var text = notes[this.value].name;
            $("#scaleText").html(text);
            var checkMinor = /Minor/;
            if (checkMinor.test(text)){
                currColor = colors[0];
                lineColor = colors[1];
                dirMod = 1;
            }else{
                currColor = colors[1];
                lineColor = colors[0];
                dirMod = -1;
            }
        }else if (this.id == 'key'){
            transpose = parseInt(this.value);
            console.log(transpose);
            $("#keyCenter").html(Tone.Frequency(scale[0] + transpose, "midi").toNote());
        }else{
            effects[this.dataset.module][this.id][this.dataset.suffix] = this.value;
        }
    });
    $('select').on("change", function(){
        console.log(this.options[this.options.selectedIndex].id);
        synth.oscillator.type = this.options[this.options.selectedIndex].id;
    });
});

function windowResized() {
    w = window.innerWidth;
    $("#settingsPanel").css("width", w - 20);
    resizeCanvas(w, h / 2);
}
console.log(navigator.platform);