let pointMode = document.getElementById('point');
let pencilMode = document.getElementById('pencil');
let rectangleMode = document.getElementById('rectangle');
let circleMode = document.getElementById('circle');
let mousePointsMode = document.getElementById('mousePoints');
let mouseRectsMode = document.getElementById('mouseRects');
// let bucketMode = document.getElementById('bucket');

function deleteElement(){
    if(mouseRectsMode.checked){
        deleteRetc();
    }else if(mousePointsMode.checked){
        deletePoint();
    }
}

function colorElement(){
    changeColorPoint()
    if(mouseRectsMode.checked){
        changeColorRect();
    }else if(mousePointsMode.checked){
        changeColorPoint();
    }
}