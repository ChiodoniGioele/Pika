let pointMode = document.getElementById('point');
let pencilMode = document.getElementById('pencil');
let rectangleMode = document.getElementById('rectangle');
let circleMode = document.getElementById('circle');
let mousePointsMode = document.getElementById('mousePoints');
let mouseRectsMode = document.getElementById('mouseRects');
let mouseCirclesMode = document.getElementById('mouseCircles');
let mouseLinesMode = document.getElementById('mouseLines');
// let bucketMode = document.getElementById('bucket');

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