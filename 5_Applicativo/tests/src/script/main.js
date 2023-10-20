let pointMode = document.getElementById('point');
let pencilMode = document.getElementById('pencil');
let rectangleMode = document.getElementById('rectangle');
let circleMode = document.getElementById('circle');
let mousePointsMode = document.getElementById('mousePoints');
let mouseRectsMode = document.getElementById('mouseRects');
let mouseCirclesMode = document.getElementById('mouseCircles');
let mouseLinesMode = document.getElementById('mouseLines');
// let bucketMode = document.getElementById('bucket');


let pointLayer = document.getElementById('pointLayer');
let pencilLayer = document.getElementById('linesLayer');
let rectLayer = document.getElementById('rectLayer');
let circleLayer = document.getElementById('circleLayer');

function deleteElement(){
    if(mouseRectsMode.checked){
        deleteRetc();
    }else if(mousePointsMode.checked){
        deletePoint();
    }else if(mouseCirclesMode.checked){
        deleteCircle();
    }else if(mouseLinesMode.checked){
        deleteLine();
    }
    if(isPointConnect){

    }
    
}

function colorElement(){
    changeColorPoint()
    if(mouseRectsMode.checked){
        changeColorRect();
    }else if(mousePointsMode.checked){
        changeColorPoint();
    }else if(mouseCirclesMode.checked){
        changeColorCircle();
    }else if(mouseLinesMode.checked){
        changeColorLine();
    }
}

function connectDots(){
    if(isPointConnect){
        isPointConnect = false;
        reDrawAll();
    }else{
        let oldPoint = points[0];
        for(var point = 1; point < points.length; point++){
            canvasDrawed.beginPath();
            canvasDrawed.lineWidth = 3;
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
            canvasDrawed.moveTo(oldPoint.x , oldPoint.y);
            canvasDrawed.lineTo(points[point].x, points[point].y);
            canvasDrawed.stroke();
            oldPoint = points[point];
        }
        isPointConnect = true;
    }
}

function reConnectDots(){
    let oldPoint = points[0];
    for(var point = 1; point < points.length; point++){
        canvasDrawed.beginPath();
        canvasDrawed.lineWidth = 3;
        canvasDrawed.shadowBlur = 0;
        canvasDrawed.shadowColor = null;
        canvasDrawed.moveTo(oldPoint.x , oldPoint.y);
        canvasDrawed.lineTo(points[point].x, points[point].y);
        canvasDrawed.stroke();
        oldPoint = points[point];
    }
}