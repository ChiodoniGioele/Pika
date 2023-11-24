let lineSelected = -1;
canvas.addEventListener("dblclick", function (e) {
    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    if (pencilMode.checked && edidtMode.checked) {
        let x = Math.round((e.x - canvasBounding.left) * scaleX);
        let y = Math.round((e.y - canvasBounding.top) * scaleY);

        let line = isOnALine(x, y);
        if(line >= 0){
            if(line == lineSelected){
                deselectLine();
                return;
            }
            
            selectLine(line);
        }
    }
});

function deselectLine(){
    lines[lineSelected].isSelect = false;
    lineSelected = -1;
    reDrawAll();
}

function selectLine(line){
    deselectAll();
    if (lineSelected >= 0 && lineSelected < lines.length) {
        lines[lineSelected].isSelect = false;
    }
    lineSelected = line;
    lines[lineSelected].isSelect = true;
    reDrawAll();
}

function isOnALine(x, y){
    for(var i = 0; i < lines.length; i++){
        for(var j = 0; j < lines[i].arrayX.length; j++){
            if(getDistancePointLine(lines[i].arrayX[j], lines[i].arrayY[j], x, y) < lines[i].dimension){
                return i;
            }
        }
    }
    return -1;
}


function getDistancePointLine(cX, cY, x, y) {
    let distanceX = Math.abs(cX - x);
    let distanceY = Math.abs(cY - y);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function changeColorLine(){
    if (lineSelected >= 0 && pencilMode.checked && edidtMode.checked) {
        let color = document.getElementById("color").value;
        lines[lineSelected].color = color;
        reDrawAll();
    }
}

function deleteLine(){
    if (lineSelected >= 0 && pencilMode.checked && edidtMode.checked) {
        lines.splice(lineSelected, 1);
        lineSelected = -1;
        reDrawAll();
    }
}

function changeDimensionLine(){
    if(lineSelected >= 0 && pencilMode.checked && edidtMode.checked){
        lines[lineSelected].dimension = dimensionRange.value;
        reDrawAll();
    }
}