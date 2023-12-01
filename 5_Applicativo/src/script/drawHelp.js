/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 *
 * Il file contiene le funzioni e le variabili usate per disegnare
 */

// canvas
let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');

// servono per calcolare le coordinate
let canvasBounding = canvas.getBoundingClientRect();
let scaleX = canvas.width / canvasBounding.width;
let scaleY = canvas.height / canvasBounding.height;

// se i puntini sono connessi
let isPointConnect = false;

// se puo disegnare
let canDraw = false;    // solo se posso disegnare

// colore del disegno
let color = "black"

// points array manipolato nel file point.js e actionPoints.js
var points = new Array(); // array con i puntini

// pencil array manipolato nel file pencil.js e actionLines.js
var lines = new Array();

// rectangle array manipolato nel file rectangle.js e actionRects.js
var rects = new Array();

// circle array manipolato nel file circle.js e actionCircle.js
var circle = new Array();


/**
 * Per ridisegnare tutti i disegni ripulendo il canvas
 */
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

/**
 * Per ridisegnare tutti i disegni senza ripulire il canvas
 */
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

/**
 * per deselezionare tutti i disegni
 */
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


/**
 * Per collegare i puntini
 */
function connectDots() {
    if (points.length > 0) {
        if (pointLayer.checked) {
            if (isPointConnect) {
                isPointConnect = false;
                reDrawAll();
            } else {
                let oldPoint = points[0];
                for (var point = 1; point < points.length; point++) {
                    canvasDrawed.beginPath();
                    canvasDrawed.lineWidth = 3;
                    canvasDrawed.shadowBlur = 0;
                    canvasDrawed.shadowColor = null;
                    canvasDrawed.moveTo(oldPoint.x, oldPoint.y);
                    canvasDrawed.lineTo(points[point].x, points[point].y);
                    canvasDrawed.stroke();
                    oldPoint = points[point];
                }

                canvasDrawed.beginPath();
                canvasDrawed.lineWidth = 3;
                canvasDrawed.shadowBlur = 0;
                canvasDrawed.shadowColor = null;
                canvasDrawed.moveTo(points[0].x, points[0].y);
                canvasDrawed.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                canvasDrawed.stroke();
                isPointConnect = true;
            }
        }
    }
}

/**
 * Per ricollegare i puntini una volta pulito il canvas
 */
function reConnectDots() {
    if (points.length > 0) {
        let oldPoint = points[0];
        for (var point = 1; point < points.length; point++) {
            canvasDrawed.beginPath();
            canvasDrawed.lineWidth = 3;
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
            canvasDrawed.moveTo(oldPoint.x, oldPoint.y);
            canvasDrawed.lineTo(points[point].x, points[point].y);
            canvasDrawed.stroke();
            oldPoint = points[point];
        }
        canvasDrawed.beginPath();
        canvasDrawed.lineWidth = 3;
        canvasDrawed.shadowBlur = 0;
        canvasDrawed.shadowColor = null;
        canvasDrawed.moveTo(points[0].x, points[0].y);
        canvasDrawed.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        canvasDrawed.stroke();
        isPointConnect = true;
    } else {
        isPointConnect = false;
    }
}


// per elliminare tutti i disegni
function deleteAllDraw() {
    points = new Array();
    lines = new Array();
    rects = new Array();
    circle = new Array();
    isPointConnect = false;
    reDrawAll();
    closeDeleteAll();
}
