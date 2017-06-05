function setup() {

}
var offset = 0;

function draw() {
    offset += 0.008;
    var cAmt = noise(offset) * 80;
    $(".headerMask").css({
        "background": "radial-gradient(white," + cAmt + "%,black)",
        "background-size": "20px 20px"
    });
}