let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');


let canDraw = false;    // solo se posso disegnare
let color = "black"

// points array manipolato nel file point.js
var points = new Array() // array con i puntini


// pencil array manipolato nel file pencil.js
var lines = new Array();


// rectangle array manipolato nel file rectangle.js
var rects = new Array();

// circle array manipolato nel file circle.js
var circle = new Array();

// ridisegno i punti, linee, rettangoli
function reDrawAll() {
    canvasDrawed.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    for (var i = 0; i < lines.length; i++) {
        lines[i].reDraw(color);
    }
    for (var i = 0; i < points.length; i++) {
        points[i].reDraw();
    }
    for (var i = 0; i < rects.length; i++) {
        rects[i].reDraw(color);
    }
    for (var i = 0; i < circle.length; i++) {
        circle[i].reDraw(color);
    }
}




