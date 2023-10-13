let circleSelect = -1;
let oldXMouseCircle = 0;
let oldYMouseCircle = 0;

canvas.addEventListener("dblclick", function (e) {
    if (mouseCirclesMode.checked) {
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        let circleReturned = isInACircle(x, y);
        if (circleReturned >= 0) {
            if (circleReturned == circleSelect && isACircleSelect()) {
                deselectCircle();
                return;
            }
            selectCircle(circleReturned);
        }
    }
});

function deselectCircle() {
    circle[circleSelect].isSelect = false;
    circleSelect = -1;
    reDrawAll();
}

function selectCircle(circleReturned) {
    if (circleSelect >= 0 && circleSelect < circle.length) {
        circle[circleSelect].isSelect = false;
    }
    circleSelect = circleReturned;
    console.log(circleSelect);
    circle[circleSelect].isSelect = true;
    reDrawAll();
}

canvas.addEventListener("mousedown", function (e) {
    if (mouseCirclesMode.checked && isACircleSelect()) {
        canMove = isSameCircle(e);
    }
});


canvas.addEventListener("mousemove", function (e) {
    if (mouseCirclesMode.checked && canMove && isACircleSelect()) {
        let difX = (e.clientX - canvas.getBoundingClientRect().left) - oldXMouseCircle;
        let difY = (e.clientY - canvas.getBoundingClientRect().top) - oldYMouseCircle;
        circle[circleSelect].startX += difX;
        circle[circleSelect].startY += difY;
        reDrawAll();
    }
    oldXMouseCircle = e.clientX - canvas.getBoundingClientRect().left;
    oldYMouseCircle = e.clientY - canvas.getBoundingClientRect().top;
});


canvas.addEventListener("mouseup", function (e) {
    if (mouseCirclesMode.checked && isACircleSelect()) {
        canMove = false;
        oldXMouseCircle = 0;
        oldXMouseCircle = 0;
    }
});

function isInACircle(x, y) {
    for (var i = 0; i < circle.length; i++) {
        if (isCoordinateInACircle(x, y, circle[i])) {
            return i;
        }
    }
    return -1;
}

function isCoordinateInACircle(x, y, c) {
    let distance = getDistancePointToPoint(x, c.startX, y, c.startY);
    return distance < c.raggio;
}

function getDistancePointToPoint(x1, x2, y1, y2){
    let distanceX = Math.abs(x1 - x2);
    let distanceY = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}


function isACircleSelect() {
    if (circleSelect >= 0) {
        return true;
    }
    return false;
}


function isSameCircle(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    if (isInACircle(x, y) == circleSelect) {
        return true;
    }
    return false;
}

function deleteCircle() {
    console.log(isACircleSelect());
    if (isACircleSelect() && mouseCirclesMode.checked) {
        circle.splice(circleSelect, 1);
        circleSelect = -1;
        reDrawAll();
    }
}

function changeColorCircle() {
    if (isACircleSelect() && mouseCirclesMode.checked) {
        let color = document.getElementById("color").value;
        circle[circleSelect].color = color;
        reDrawAll();
    }
}