// on mouse click over canvas
let isPointSelect = false;
let canMove = false;
let oldColorPoint = null;
let pointSelected = null;

canvas.addEventListener("dblclick", function (e) {
    if (mouseMode.checked) {
        let pointReturned = getPointClicked(e);

        if (pointReturned != null) {
            if (isPointSelect) {
                if (pointReturned.num == pointSelected.num) {
                    deselectPoint();
                    return;
                }
            }
            selectThisPoint(pointReturned);
        }
    }
});

canvas.addEventListener("mousedown", function (e) {
    if (mouseMode.checked && isPointSelect) {
        if (isPointSelect) {
            canMove = isSamePoint(e, pointSelected);
        }
    }
});

// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (mouseMode.checked && canMove) {
        pointSelected.x = e.clientX - canvas.getBoundingClientRect().left;
        pointSelected.y = e.clientY - canvas.getBoundingClientRect().top;
        reDrawAll();
    }
});

// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (mouseMode.checked) {
        if (isPointSelect) {
            canMove = false;
        }
    }
});

function deselectPoint() {
    pointSelected.color = oldColorPoint;
    pointSelected = null;
    isPointSelect = false;
    reDrawAll();
}

function selectThisPoint(pointReturned) {
    if (isPointSelect) {
        pointSelected.color = oldColorPoint;
        pointSelected = pointReturned;
        oldColorPoint = pointSelected.color;
        pointSelected.color = "red";
        isPointSelect = true;
        reDrawAll();
    } else {
        pointSelected = pointReturned;
        oldColorPoint = pointSelected.color;
        pointSelected.color = "red";
        isPointSelect = true;
        reDrawAll();
    }
}

function getPointClicked(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    for (var i = 0; i < points.length; i++) {
        if (getDistancePointClick(points[i], x, y) < 20) {
            posPointClick = i;
            return points[i];
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
    if (getDistancePointClick(point, x, y) < 20) {
        return true;
    } else {
        return false;
    }
}

function deletePoint() {
    if (isPointSelect) {
        points.splice(pointSelected.num - 1, 1);
        for (let i = 0; i < points.length; i++) {
            points[i].num = i + 1;
        }
        document.getElementById("newNumPoint").setAttribute("max", points.length);
        reDrawAll();
    }
}

function renamePoint() {
    let newNum = document.getElementById("newNumPoint").value;
    deletePoint();
    points.splice(newNum - 1, 0, pointSelected);
    for (let i = 0; i < points.length; i++) {
        points[i].num = i + 1;
    }
    document.getElementById("newNumPoint").setAttribute("max", points.length);
    reDrawAll();
}
