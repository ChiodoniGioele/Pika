
let pointMode = document.getElementById('Point');
let pencilMode = document.getElementById('Pencil');
let rectangleMode = document.getElementById('Rectangle');
let circleMode = document.getElementById('Circle');

let edidtMode = document.getElementById('edit');


let pointLayer = document.getElementById('PointsLayer');
let pencilLayer = document.getElementById('LinesLayer');
let rectLayer = document.getElementById('RectLayer');
let circleLayer = document.getElementById('CircleLayer');
let imgLayer = document.getElementById('ImgLayer');



let dimensionRange = document.getElementById("dimension");



function deleteElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        deleteRetc();
    } else if (pointMode.checked && edidtMode.checked) {
        deletePoint();
    } else if (circleMode.checked && edidtMode.checked) {
        deleteCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        deleteLine();
    }
}

function colorElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        changeColorRect();
    } else if (pointMode.checked && edidtMode.checked) {
        changeColorPoint();
    } else if (circleMode.checked && edidtMode.checked) {
        changeColorCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        changeColorLine();
    } else {
        color = document.getElementById("color").value;
    }
}

function dimensionElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        changeDimensionRect();
    } else if (pointMode.checked && edidtMode.checked) {
        changeDimensionPoint();
    } else if (circleMode.checked && edidtMode.checked) {
        changeDimensionCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        changeDimensionLine();
    }
}

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


function pointLayerCheck() {
    if (!pointLayer.checked) {
        pointMode.disabled = true;

    } else {
        pointMode.disabled = false;

    }

    if (pointMode.checked) {
        pencilMode.checked = true;
    }


    reDrawAll();
}

function linesLayerCheck() {
    if (!pencilLayer.checked) {
        pencilMode.disabled = true;
    } else {
        pencilMode.disabled = false;
    }

    if (pencilMode.checked) {
        pointMode.checked = true;
    }



    reDrawAll();
}


function rectLayerCheck() {
    if (!rectLayer.checked) {
        rectangleMode.disabled = true;

    } else {
        rectangleMode.disabled = false;

    }

    if (rectangleMode.checked) {
        pointMode.checked = true;
    }


    reDrawAll();
}

function circleLayerCheck() {
    if (!circleLayer.checked) {
        circleMode.disabled = true;

    } else {
        circleMode.disabled = false;

    }

    if (circleMode.checked) {
        pointMode.checked = true;
    }



    reDrawAll();
}

function imgLayerView() {
    if (imgLayer.checked) {
        reDrawAll();
    } else {
        canvasDrawed.fillStyle = "#FFFFFF";
        canvasDrawed.fillRect(0, 0, canvas.width, canvas.height);
        reDrawAllWhidoutClear();
    }
}

function deleteAllDraw() {
    points = new Array();
    lines = new Array();
    rects = new Array();
    circle = new Array();
    isPointConnect = false;
    reDrawAll();
}

