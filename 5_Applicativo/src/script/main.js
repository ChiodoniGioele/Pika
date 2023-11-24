let pointMode = document.getElementById('point');
let pencilMode = document.getElementById('pencil');
let rectangleMode = document.getElementById('rectangle');
let circleMode = document.getElementById('circle');
let mousePointsMode = document.getElementById('mousePoints');
let mouseRectsMode = document.getElementById('mouseRects');
let mouseCirclesMode = document.getElementById('mouseCircles');
let mouseLineMode = document.getElementById('mouseLines');
// let bucketMode = document.getElementById('bucket');


let pointLayer = document.getElementById('pointLayer');
let pencilLayer = document.getElementById('linesLayer');
let rectLayer = document.getElementById('rectLayer');
let circleLayer = document.getElementById('circleLayer');
let imgLayer = document.getElementById('imgLayer');

let dimensionRange = document.getElementById("dimension");



function deleteElement() {
    if (mouseRectsMode.checked) {
        deleteRetc();
    } else if (mousePointsMode.checked) {
        deletePoint();
    } else if (mouseCirclesMode.checked) {
        deleteCircle();
    } else if (mouseLineMode.checked) {
        deleteLine();
    }
    if (isPointConnect) {

    }

}

function colorElement() {
    changeColorPoint()
    if (mouseRectsMode.checked) {
        changeColorRect();
    } else if (mousePointsMode.checked) {
        changeColorPoint();
    } else if (mouseCirclesMode.checked) {
        changeColorCircle();
    } else if (mouseLineMode.checked) {
        changeColorLine();
    }else{
        color = document.getElementById("color").value;
    }
}

function dimensionElement(){
    if (mouseRectsMode.checked) {
        changeDimensionRect();
    } else if (mousePointsMode.checked) {
        changeDimensionPoint();
    } else if (mouseCirclesMode.checked) {
        changeDimensionCircle();
    } else if (mouseLineMode.checked) {
        changeDimensionLine();
    }
}

function connectDots() {
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

function reConnectDots() {
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


function pointLayerCheck() {
    if (!pointLayer.checked) {
        pointMode.disabled = true;
        mousePointsMode.disabled = true;
    } else {
        pointMode.disabled = false;
        mousePointsMode.disabled = false;
    }

    if (pointMode.checked) {
        pencilMode.checked = true;
    }

    if (mousePointsMode.checked) {
        mouseCirclesMode.checked = true;
    }

    reDrawAll();
}

function linesLayerCheck() {
    if (!linesLayer.checked) {
        pencilMode.disabled = true;
        mouseLineMode.disabled = true;
    } else {
        pencilMode.disabled = false;
        mouseLineMode.disabled = false;
    }

    if (pencilMode.checked) {
        pointMode.checked = true;
    }

    if (mousePointsMode.checked) {
        mousePointsMode.checked = true;
    }

    reDrawAll();
}


function rectLayerCheck() {
    if (!rectLayer.checked) {
        rectangleMode.disabled = true;
        mouseRectsMode.disabled = true;
    } else {
        rectangleMode.disabled = false;
        mouseRectsMode.disabled = false;
    }

    if (rectangleMode.checked) {
        pointMode.checked = true;
    }

    if (mouseRectsMode.checked) {
        mousePointsMode.checked = true;
    }

    reDrawAll();
}

function circleLayerCheck() {
    if (!circleLayer.checked) {
        circleMode.disabled = true;
        mouseCirclesMode.disabled = true;
    } else {
        circleMode.disabled = false;
        mouseCirclesMode.disabled = false;
    }

    if (circleMode.checked) {
        pointMode.checked = true;
    }

    if (mouseCirclesMode.checked) {
        mousePointsMode.checked = true;
    }

    reDrawAll();
}

function imgLayerView(){
    if(imgLayer.checked){
        reDrawAll();
    }else{
        canvasDrawed.fillStyle = "#FFFFFF";
        canvasDrawed.fillRect(0, 0, canvas.width, canvas.height);
        reDrawAllWhidoutClear();
    }
}

function deleteAllDraw(){
    points = new Array();
    lines = new Array();
    rects = new Array();
    circle = new Array();
    reDrawAll();
}

