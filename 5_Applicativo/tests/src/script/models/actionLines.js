let lineSelected = -1;
canvas.addEventListener("dblclick", function (e) {
    if (mouseLinesMode.checked) {
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
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
            if(getDistancePointLine(lines[i].arrayX[j], lines[i].arrayY[j], x, y) < 15){
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

