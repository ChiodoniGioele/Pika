let rectSelected = -1;
let oldXMouseRect = 0;
let oldYMouseRect = 0;

canvas.addEventListener("dblclick", function (e) {
    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    if (mouseRectsMode.checked) {

        let x = Math.round((e.x - canvasBounding.left) * scaleX);
        let y = Math.round((e.y - canvasBounding.top) * scaleY);

        let rectReturned = isInARect(x, y);
    
        if (rectReturned >= 0) {
            if (rectReturned == rectSelected && isARectSelect()) {
                deselectRect();
                return;
            }
            selectRect(rectReturned);
        }
    }
});

function deselectRect() {
    rects[rectSelected].isSelect = false;
    rectSelected = -1;
    reDrawAll();
}

function selectRect(rectReturned) {
    deselectAll();
    if (rectSelected >= 0 && rectSelected < rects.length) {
        rects[rectSelected].isSelect = false;
    }
    rectSelected = rectReturned;
    rects[rectSelected].isSelect = true;
    reDrawAll();
}

canvas.addEventListener("mousedown", function (e) {
    if (mouseRectsMode.checked && isARectSelect()) {
        canMove = isSameRects(e);
    }
});


canvas.addEventListener("mousemove", function (e) {
    if (mouseRectsMode.checked && canMove && isARectSelect()) {
        let difX = Math.round((e.x - canvasBounding.left) * scaleX) - oldXMouseRect;
        let difY = Math.round((e.y - canvasBounding.top) * scaleY) - oldYMouseRect;
        rects[rectSelected].startX += difX;
        rects[rectSelected].startY += difY;
        reDrawAll();
    }
    oldXMouseRect = Math.round((e.x - canvasBounding.left) * scaleX);
    oldYMouseRect =  Math.round((e.y - canvasBounding.top) * scaleY);
});

// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (mouseRectsMode.checked && isARectSelect()) {
        canMove = false;
        oldXMouseRect = 0;
        oldYMouseRect = 0;
    }
});


function isInARect(x, y) {
    for (var i = 0; i < rects.length; i++) {
        if (isInXRect(rects[i], x) && isInYRect(rects[i], y)) {
            return i;
        }
    }
    return -1;
}

function isInXRect(r, x) {
    let c1 = r.startX;
    let c2 = r.startX + r.endX;
    if (isBetweenRect(c1, c2, x)) {
        return true;
    }
    return false;
}

function isInYRect(r, y) {
    let c1 = r.startY;
    let c2 = r.startY + r.endY;
    if (isBetweenRect(c1, c2, y)) {
        return true;
    }
    return false;
}

function isBetweenRect(c1, c2, p) {
    if (c1 > c2) {
        if (p > c2 && p < c1) {
            return true;
        }
    } else {
        if (p > c1 && p < c2) {
            return true;
        }
    }
    return false;
}

function isARectSelect() {
    if (rectSelected >= 0) {
        return true;
    }
    return false;
}

function isSameRects(event) {
    let x =  Math.round((event.x - canvasBounding.left) * scaleX);
    let y =  Math.round((event.y - canvasBounding.top) * scaleY);

    if (isInARect(x, y) == rectSelected) {
        return true;
    }
    return false;
}

function deleteRetc() {
    if (isARectSelect() && mouseRectsMode.checked) {
        rects.splice(rectSelected, 1);
        rectSelected = -1;
        reDrawAll();
    }
}

function changeColorRect() {
    if (isARectSelect() && mouseRectsMode.checked) {
        let color = document.getElementById("color").value;
        rects[rectSelected].color = color;
        reDrawAll();
    }
}

function changeDimensionRect(){
    if (isARectSelect() && mouseRectsMode.checked) {
        rects[rectSelected].dimension = dimensionRange.value;
        reDrawAll();
    }
}



