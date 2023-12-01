/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 * In questo file ce il codice che permette di fare delle azioni sui cerchi.
 * Azioni come:
 *  - Selezionare
 *  - Cambiare colore
 *  - Spostare
 *  - Elliminare
 *  - Cambiare spessore
 */

let circleSelect = -1;
let oldXMouseCircle = 0;
let oldYMouseCircle = 0;

// doppio click per selezionare un cerchio
canvas.addEventListener("dblclick", function (e) {

    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    // se e in modalita di modifica dei cerchi
    if (circleMode.checked && edidtMode.checked) {

        // prendo le coordinate
        let x = Math.round((e.x - canvasBounding.left) * scaleX);
        let y = Math.round((e.y - canvasBounding.top) * scaleY);

        // circleReturned e il cerchio in qui e avvenuto il click
        let circleReturned = isInACircle(x, y);

        // se il click è in un cerchio
        if (circleReturned >= 0) {

            // se il cerchio selezionato era gia selezionato
            if (circleReturned == circleSelect && isACircleSelect()) {

                // deseeziona il cerchio
                deselectCircle();
                return;
            }

            // seleziona il cerchio
            selectCircle(circleReturned);
        }
    }
});

/**
 * Funzione che permette di deselezionare i cerchi
 */
function deselectCircle() {
    circle[circleSelect].isSelect = false;
    circleSelect = -1;
    reDrawAll();
}

/**
 * @param {int} circleReturned
 * Il cerchio da selezionare
 *
 * Funzione che permette di selezionare il nuovo cerchio
 */
function selectCircle(circleReturned) {
    deselectAll();
    if (circleSelect >= 0 && circleSelect < circle.length) {
        circle[circleSelect].isSelect = false;
    }
    circleSelect = circleReturned;
    console.log(circleSelect);
    circle[circleSelect].isSelect = true;
    reDrawAll();
}


// quando il mouse viene premuto
canvas.addEventListener("mousedown", function (e) {
    // se ce un cerchio selezionato
    if (circleMode.checked && edidtMode.checked && isACircleSelect()) {

        // se il mouse e stato premuto nello stesso cerchio selezionato si puo spostare il cerchio
        canMove = isSameCircle(e);
    }
});


// quando il mouse si muove
canvas.addEventListener("mousemove", function (e) {
    // se si muove e il cerchio si puo muovere
    if (circleMode.checked && edidtMode.checked && canMove && isACircleSelect()) {

        // sposto il cerchio
        let difX =
            Math.round((e.x - canvasBounding.left) * scaleX) - oldXMouseCircle;

        let difY =
            Math.round((e.y - canvasBounding.top) * scaleY) - oldYMouseCircle;

        circle[circleSelect].startX += difX;
        circle[circleSelect].startY += difY;

        reDrawAll();
    }
    oldXMouseCircle = Math.round((e.x - canvasBounding.left) * scaleX);
    oldYMouseCircle = Math.round((e.y - canvasBounding.top) * scaleY);
});

// quando il mouse viene rilasciato 
canvas.addEventListener("mouseup", function (e) {
    if (circleMode.checked && edidtMode.checked && isACircleSelect()) {
        // non si puo piu muovere
        canMove = false;
        oldXMouseCircle = 0;
        oldXMouseCircle = 0;
    }
});

/**
 * @param {int} x 
 * @param {int} y
 * @returns la posizione del cerchio selezionato nell array
 * Se non e in un cerchio ritorna -1
 */
function isInACircle(x, y) {
    for (var i = 0; i < circle.length; i++) {
        if (isCoordinateInACircle(x, y, circle[i])) {
            return i;
        }
    }
    return -1;
}

/**
 * @param {int} x 
 * @param {int} y 
 * @param {Circle} c 
 * @returns true se le coordinate sono nel cerchio, false se fuori
 */
function isCoordinateInACircle(x, y, c) {
    let distance = getDistancePointToPoint(x, c.startX, y, c.startY);
    return distance < c.raggio;
}

/**
 * 
 * @param {int} x1 
 * @param {int} x2 
 * @param {int} y1 
 * @param {int} y2 
 * @returns ritona la distanza tra due punti
 */
function getDistancePointToPoint(x1, x2, y1, y2) {
    let distanceX = Math.abs(x1 - x2);
    let distanceY = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

/**
 * 
 * @returns ritorna true se un cerchio e selezionato, folse se no
 */
function isACircleSelect() {
    if (circleSelect >= 0) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {event} event 
 * @returns true se il click e avventuo nel cerchio selezionato
 */
function isSameCircle(event) {
    let x = Math.round((event.x - canvasBounding.left) * scaleX);
    let y = Math.round((event.y - canvasBounding.top) * scaleY);
    if (isInACircle(x, y) == circleSelect) {
        return true;
    }
    return false;
}

/**
 * ellimina cerchio selezionato
 */
function deleteCircle() {
    console.log(isACircleSelect());
    if (isACircleSelect() && circleMode.checked && edidtMode.checked) {
        circle.splice(circleSelect, 1);
        circleSelect = -1;
        reDrawAll();
    }
}

/**
 * cambiare colore al cerchio selezionato
 */
function changeColorCircle() {
    if (isACircleSelect() && circleMode.checked && edidtMode.checked) {
        let color = document.getElementById("color").value;
        circle[circleSelect].color = color;
        reDrawAll();
    }
}

/**
 * cambia lo spessore del bordo del cerchio selezionato
 */
function changeDimensionCircle() {
    if (isACircleSelect() && circleMode.checked && edidtMode.checked) {
        circle[circleSelect].dimension = dimensionRange.value;
        reDrawAll();
    }
}
