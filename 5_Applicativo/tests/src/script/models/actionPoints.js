// on mouse click over canvas
let isAPointSelected = false;
let pointSelected = - 1;
let canMove = false;

canvas.addEventListener("dblclick", function (e) {
    if (mouseMode.checked) {
        let pointReturned = getPointClicked(e);
        if (pointReturned != null) {
            if (pointReturned == pointSelected && isAPointSelected) {
                deselectPoint();
                return;
            }
            selectThisPoint(pointReturned);
        }
    }
});

canvas.addEventListener("mousedown", function (e) {
    if (mouseMode.checked && isAPointSelected) {
        if (isAPointSelected) {
            canMove = isSamePoint(e, pointSelected);
        }
    }
});

// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (mouseMode.checked && canMove) {
        points[pointSelected].x = e.clientX - canvas.getBoundingClientRect().left;
        points[pointSelected].y = e.clientY - canvas.getBoundingClientRect().top;
        reDrawAll();
    }
});

// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (mouseMode.checked) {
        if (isAPointSelected) {
            canMove = false;
        }
    }
});

function deselectPoint() {
    points[pointSelected].isSelect = false;
    pointSelected = - 1;
    isAPointSelected = false;
    reDrawAll();
}

function selectThisPoint(pointReturned) {
    if (pointSelected >= 0 && pointSelected < points.length) {
        points[pointSelected].isSelect = false;
    }
    pointSelected = pointReturned;
    isAPointSelected = true;
    points[pointSelected].isSelect = true;
    reDrawAll();
}

function getPointClicked(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    for (var i = 0; i < points.length; i++) {
        if (getDistancePointClick(points[i], x, y) < 20) {
            return i;
        }
    }
    return null;
}

function getDistancePointClick(point, x, y) {
    let distanceX = Math.abs(point.x - x);
    let distanceY = Math.abs(point.y - y);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
}

function isSamePoint(event, point) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    if (getDistancePointClick(points[point], x, y) < 20) {
        return true;
    } else {
        return false;
    }
}

function deletePoint() {
    if (isAPointSelected) {
        points.splice(points[pointSelected].num - 1, 1);
        for (let i = 0; i < points.length; i++) {
            points[i].num = i + 1;
        }
        document.getElementById("newNumPoint").setAttribute("max", points.length);
        reDrawAll();
    }
}

function renamePoint() {
    if (isAPointSelected) {
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

function changeColor() {
    if (isAPointSelected) {
        let color = document.getElementById("pointColor").value;
        points[pointSelected].color = color;
        oldColorPoint = color;
        reDrawAll();
    }
}
