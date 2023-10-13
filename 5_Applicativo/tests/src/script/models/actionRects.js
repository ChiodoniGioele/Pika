let rectSelected = -1;
let oldXMouse = 0;
let oldYMouse = 0;
canvas.addEventListener("dblclick", function (e) {
    if (mouseRectsMode.checked) {
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        let rectReturned = isInARect(x, y);
        if (rectReturned >= 0) {
            if(rectReturned == rectSelected && isARectSelect()){
                deselectRect();
                return;
            }
            selectRect(rectReturned);
        }
    }
});

function deselectRect(){
    rects[rectSelected].isSelect = false;
    rectSelected = -1;
    reDrawAll();
}

function selectRect(rectReturned){
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

// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (mouseRectsMode.checked && canMove && isARectSelect()) {
        let difX = (e.clientX - canvas.getBoundingClientRect().left) - oldXMouse;
        let difY = (e.clientY - canvas.getBoundingClientRect().top) - oldYMouse;
        rects[rectSelected].startX +=  difX;
        rects[rectSelected].startY +=  difY;
        reDrawAll();
    }
    oldXMouse = e.clientX - canvas.getBoundingClientRect().left;
    oldYMouse = e.clientY - canvas.getBoundingClientRect().top;
});

// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (mouseRectsMode.checked && isARectSelect) {
        canMove = false;
        oldXMouse = 0;
        oldYMouse = 0;
    }
});


function isInARect(x, y) {
    for (var i = 0; i < rects.length; i++) {
        if (isInX(rects[i], x) && isInY(rects[i], y)) {
            return i;
        }
    }
    return -1;
}

function isInX(r, x) {
    let c1 = r.startX;
    let c2 = r.startX + r.endX;
    if (isBetween(c1, c2, x)) {
        return true;
    }
    return false;
}

function isInY(r, y) {
    let c1 = r.startY;
    let c2 = r.startY + r.endY;
    if (isBetween(c1, c2, y)) {
        return true;
    }
    return false;
}

function isBetween(c1, c2, p) {
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
    if(rectSelected >= 0){
        return true;
    }
    return false;
}

function isSameRects(event){
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    if(isInARect(x,y) == rectSelected){
        return true;
    }
    return false;
}

function deleteRetc(){
    if(isARectSelect() && mouseRectsMode.checked){
        rects.splice(rectSelected, 1);
        reDrawAll();
    }
}

function changeColorRect(){
    if (isARectSelect() && mouseRectsMode.checked) {
        let color = document.getElementById("color").value;
        rects[rectSelected].color = color;
        reDrawAll();
    }
}