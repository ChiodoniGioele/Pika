let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');

let canvasBounding = canvas.getBoundingClientRect();
let scaleX = canvas.width / canvasBounding.width;
let scaleY = canvas.height / canvasBounding.height;

let isPointConnect = false;

let canDraw = false;    // solo se posso disegnare

let color = "black"

// points array manipolato nel file point.js
var points = new Array(); // array con i puntini

// pencil array manipolato nel file pencil.js
var lines = new Array();

// rectangle array manipolato nel file rectangle.js
var rects = new Array();

// circle array manipolato nel file circle.js
var circle = new Array();

// ridisegno i punti, linee, rettangoli
function reDrawAll() {
    canvasDrawed.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    if (pencilLayer.checked) {
        for (var i = 0; i < lines.length; i++) {
            lines[i].reDraw();
        }
    }

    if (pointLayer.checked) {
        for (var i = 0; i < points.length; i++) {
            points[i].reDraw();
        }

        if (isPointConnect) {
            reConnectDots();
        }

    }

    if (rectLayer.checked) {
        for (var i = 0; i < rects.length; i++) {
            rects[i].reDraw();
        }
    }

    if (circleLayer.checked) {
        for (var i = 0; i < circle.length; i++) {
            circle[i].reDraw();
        }
    }
}

function reDrawAllWhidoutClear(){
    if (pencilLayer.checked) {
        for (var i = 0; i < lines.length; i++) {
            lines[i].reDraw();
        }
    }

    if (pointLayer.checked) {
        for (var i = 0; i < points.length; i++) {
            points[i].reDraw();
        }

        if (isPointConnect) {
            reConnectDots();
        }

    }

    if (rectLayer.checked) {
        for (var i = 0; i < rects.length; i++) {
            rects[i].reDraw();
        }
    }

    if (circleLayer.checked) {
        for (var i = 0; i < circle.length; i++) {
            circle[i].reDraw();
        }
    }
}

function deselectAll(){
    for (var i = 0; i < lines.length; i++) {
        lines[i].isSelect = false;
    }

    for (var i = 0; i < points.length; i++) {
        points[i].isSelect = false;
    }

    for (var i = 0; i < rects.length; i++) {
        rects[i].isSelect = false;
    }

    for (var i = 0; i < circle.length; i++) {
        circle[i].isSelect = false;
    }

    pointSelected = -1;
    rectSelected = -1;
    circleSelect = -1;
    lineSelected = -1;
    oldXMouseCircle = 0;
    oldYMouseCircle = 0;
    canMove = false;
    oldXMouseRect = 0;
    oldYMouseRect = 0;
}






