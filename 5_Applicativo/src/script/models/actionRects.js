/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 * Il file contiene il codice per fare delle azioni su retangoli
 * Azioni come:
 *  - selezionare
 *  - spostare
 *  - cambiare colore
 *  - elliminare
 *  - cambiare lo spessore
 */

let rectSelected = -1;
let oldXMouseRect = 0;
let oldYMouseRect = 0;

// per selezionare un rettangolo
canvas.addEventListener("dblclick", function (e) {

    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    // se e in modalita di modifica dei rettangoli
    if (rectangleMode.checked && edidtMode.checked) {

        let x = Math.round((e.x - canvasBounding.left) * scaleX);
        let y = Math.round((e.y - canvasBounding.top) * scaleY);

        let rectReturned = isInARect(x, y);

        // se e si puo selezionare un rettangolo
        if (rectReturned >= 0) {
            // se era gia selezionato
            if (rectReturned == rectSelected && isARectSelect()) {
                deselectRect();
                return;
            }
            selectRect(rectReturned);
        }
    }
});

/**
 * per deselezionare un rettangolo
 */
function deselectRect() {
    rects[rectSelected].isSelect = false;
    rectSelected = -1;
    reDrawAll();
}

/**
 * per selezionare un rettangolo
 * @param rectReturned
 */
function selectRect(rectReturned) {
    deselectAll();
    if (rectSelected >= 0 && rectSelected < rects.length) {
        rects[rectSelected].isSelect = false;
    }
    rectSelected = rectReturned;
    rects[rectSelected].isSelect = true;
    reDrawAll();
}

// quando si preme su un rettangolo
canvas.addEventListener("mousedown", function (e) {
    // se puo essere spostato
    if (rectangleMode.checked && edidtMode.checked && isARectSelect()) {
        canMove = isSameRects(e);
    }
});

// se si vuole spostare
canvas.addEventListener("mousemove", function (e) {
    // se puo essere spostato
    if (rectangleMode.checked && edidtMode.checked && canMove && isARectSelect()) {
        // sposto il rettangolo
        let difX = Math.round((e.x - canvasBounding.left) * scaleX) - oldXMouseRect;
        let difY = Math.round((e.y - canvasBounding.top) * scaleY) - oldYMouseRect;
        rects[rectSelected].startX += difX;
        rects[rectSelected].startY += difY;
        reDrawAll();
    }
    oldXMouseRect = Math.round((e.x - canvasBounding.left) * scaleX);
    oldYMouseRect =  Math.round((e.y - canvasBounding.top) * scaleY);
});

// quando rilasciato finisci di spostare il rettangolo
canvas.addEventListener("mouseup", function (e) {
    if (rectangleMode.checked && edidtMode.checked && isARectSelect()) {
        canMove = false;
        oldXMouseRect = 0;
        oldYMouseRect = 0;
    }
});


/**
 * @param x coordinata x
 * @param y coordinata y
 * @returns {number} posizione del rettangolo nel array
 */
function isInARect(x, y) {
    for (var i = 0; i < rects.length; i++) {
        if (isInXRect(rects[i], x) && isInYRect(rects[i], y)) {
            return i;
        }
    }
    return -1;
}

/**
 *
 * @param r rettangolo
 * @param x coordinata x
 * @returns {boolean} se la coordinata x e nel rettangolo
 */
function isInXRect(r, x) {
    let c1 = r.startX;
    let c2 = r.startX + r.endX;
    if (isBetweenRect(c1, c2, x)) {
        return true;
    }
    return false;
}

/**
 *
 * @param r rettangolo
 * @param y coordinata y
 * @returns {boolean} se la coordinata y e nel rettangolo
 */
function isInYRect(r, y) {
    let c1 = r.startY;
    let c2 = r.startY + r.endY;
    if (isBetweenRect(c1, c2, y)) {
        return true;
    }
    return false;
}

/**
 *
 * @param c1 punto di partenza del rettangolo
 * @param c2 punto d'arrivo del rettangolo
 * @param p coordinata
 * @returns {boolean} se la coordinata e in mezzo ai 2 punti del rettangolo
 */
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

/**
 *
 * @returns {boolean} se un rettangolo e selezionato
 */
function isARectSelect() {
    if (rectSelected >= 0) {
        return true;
    }
    return false;
}

/**
 *
 * @param event click
 * @returns {boolean} se il click fa parte del rettangolo gia selezionato
 */
function isSameRects(event) {
    let x =  Math.round((event.x - canvasBounding.left) * scaleX);
    let y =  Math.round((event.y - canvasBounding.top) * scaleY);

    if (isInARect(x, y) == rectSelected) {
        return true;
    }
    return false;
}

/**
 * deselezionare del rettangolo selezionato
 */
function deleteRetc() {
    if (isARectSelect() && rectangleMode.checked && edidtMode.checked) {
        rects.splice(rectSelected, 1);
        rectSelected = -1;
        reDrawAll();
    }
}

/**
 * cambiare colore del rettangolo selezionato
 */
function changeColorRect() {
    if (isARectSelect() && rectangleMode.checked && edidtMode.checked) {
        let color = document.getElementById("color").value;
        rects[rectSelected].color = color;
        reDrawAll();
    }
}

/**
 * cambiare lo spessore del bordo del rettangolo selezionato
 */
function changeDimensionRect(){
    if (isARectSelect() && rectangleMode.checked && edidtMode.checked) {
        rects[rectSelected].dimension = dimensionRange.value;
        reDrawAll();
    }
}



