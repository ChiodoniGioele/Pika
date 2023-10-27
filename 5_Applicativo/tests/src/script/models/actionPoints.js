// on mouse click over canvas
let pointSelected = - 1;
let canMove = false;

canvas.addEventListener("dblclick", function (e) {
    if (mousePointsMode.checked) {
        let pointReturned = getPointClicked(e);
        if (pointReturned != null) {
            if (pointReturned == pointSelected && isAPointSelected()) {
                deselectPoint();
                return;
            }
            selectThisPoint(pointReturned);
        }
    }
});

canvas.addEventListener("mousedown", function (e) {
    if (mousePointsMode.checked && isAPointSelected()) {
        canMove = isSamePoint(e, pointSelected);
    }
});

// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (mousePointsMode.checked && canMove && isAPointSelected()) {
        points[pointSelected].x = Math.round((e.x - canvasBounding.left) * scaleX);
        points[pointSelected].y = Math.round((e.y - canvasBounding.top) * scaleY);
        reDrawAll();
    }
});

// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (mousePointsMode.checked) {
        if (isAPointSelected()) {
            canMove = false;
        }
    }
});

function deselectPoint() {
    points[pointSelected].isSelect = false;
    pointSelected = - 1;
    reDrawAll();
}

function selectThisPoint(pointReturned) {
    if (pointSelected >= 0 && pointSelected < points.length) {
        points[pointSelected].isSelect = false;
    }
    pointSelected = pointReturned;
    points[pointSelected].isSelect = true;
    reDrawAll();
}

function getPointClicked(event) {
    let x = Math.round((event.x - canvasBounding.left) * scaleX);
    let y = Math.round((event.y - canvasBounding.top) * scaleY);
    for (var i = 0; i < points.length; i++) {
        if (getDistancePointClick(points[i], x, y) < points[i].dimension) {
            console.log("fatto<");
            return i;
        }
    }
    console.log("fno");
    return null;
}

function getDistancePointClick(point, x, y) {
    let distanceX = Math.abs(point.x - x);
    let distanceY = Math.abs(point.y - y);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function isSamePoint(event, point) {
    let x = Math.round((event.x - canvasBounding.left) * scaleX);
    let y = Math.round((event.y - canvasBounding.top) * scaleY);
    if (getDistancePointClick(points[point], x, y) < dimension.value * 10) {
        return true;
    } else {
        return false;
    }
}

function deletePoint() {
    if (isAPointSelected() && mousePointsMode.checked) {
        points.splice(points[pointSelected].num - 1, 1);
        for (let i = 0; i < points.length; i++) {
            points[i].num = i + 1;
        }
        document.getElementById("newNumPoint").setAttribute("max", points.length);
        reDrawAll();
    }
}

function renamePoint() {
    if (isAPointSelected() && mousePointsMode.checked) {
        let newPos = document.getElementById("newNumPoint").value;
        let p = points[pointSelected];
        deletePoint();
        points.splice(newPos - 1, 0, p);
        for (let i = 0; i < points.length; i++) {
            points[i].num = i + 1;
        }
        points[pointSelected].isSelect = false;
        points[newPos - 1].isSelect = true;
        pointSelected = newPos - 1;
        document.getElementById("newNumPoint").setAttribute("max", points.length);
        reDrawAll();

    }
}

function changeColorPoint() {
    if (isAPointSelected() && mousePointsMode.checked) {
        let color = document.getElementById("color").value;
        points[pointSelected].color = color;
        reDrawAll();
    }
}

function isAPointSelected(){
    for(var i = 0; i < points.length; i++){
        if(points[i].isSelect){
            return true;
        }
    }
    return false;
}