/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 * Il file contiene il codice per poter fare delle azioni sui puntini
 * Azioni come:
 *  - Selezionare
 *  - Spostare
 *  - Elliminare
 *  - Cambiare colore
 *  - Cambiare il numero
 *  - Ridimensionare
 */

let pointSelected = - 1;
let canMove = false;

// per selezionare un puntino
canvas.addEventListener("dblclick", function (e) {

    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    // se e in modalita modifica dei puntini
    if (pointMode.checked && edidtMode.checked) {
        let pointReturned = getPointClicked(e);
        // se ritorna un puntino
        if (pointReturned != null) {
            // se era gia selezionato
            if (pointReturned == pointSelected && isAPointSelected()) {
                deselectPoint();
                return;
            }
            selectThisPoint(pointReturned);
        }
    }
});

// quando viene premuto il pulsante
canvas.addEventListener("mousedown", function (e) {
    // se il puntino e selezionato allora si puo muovere
    if (pointMode.checked && edidtMode.checked && isAPointSelected()) {
        canMove = isSamePoint(e, pointSelected);
    }
});


// spostare il puntino
canvas.addEventListener("mousemove", function (e) {
    // se si puo muovere
    if (pointMode.checked && edidtMode.checked && canMove && isAPointSelected()) {
        points[pointSelected].x = Math.round((e.x - canvasBounding.left) * scaleX);
        points[pointSelected].y = Math.round((e.y - canvasBounding.top) * scaleY);
        reDrawAll();
    }
});

// fine movimento puntino
canvas.addEventListener("mouseup", function (e) {
    if (pointMode.checked && edidtMode.checked) {
        if (isAPointSelected()) {
            canMove = false;
        }
    }
});

/**
 * per deselezionare un puntino
 */
function deselectPoint() {
    points[pointSelected].isSelect = false;
    pointSelected = - 1;
    reDrawAll();
}

/**
 * per selezionare un puntino
 * @param pointReturned puntino da selezionare
 */
function selectThisPoint(pointReturned) {
    deselectAll();
    if (pointSelected >= 0 && pointSelected < points.length) {
        points[pointSelected].isSelect = false;
    }
    pointSelected = pointReturned;
    points[pointSelected].isSelect = true;
    reDrawAll();
}

/**
 * Ritorna il puntino che si vuole selezionare
 * @param event
 * @returns {number|null}
 */
function getPointClicked(event) {
    let x = Math.round((event.x - canvasBounding.left) * scaleX);
    let y = Math.round((event.y - canvasBounding.top) * scaleY);
    for (var i = 0; i < points.length; i++) {
        if (getDistancePointClick(points[i], x, y) < points[i].dimension) {
            return i;
        }
    }
    return null;
}

/**
 * @param point
 * @param x
 * @param y
 * @returns {number} ritorna la distanza tra un puntino e una coordinata
 */
function getDistancePointClick(point, x, y) {
    let distanceX = Math.abs(point.x - x);
    let distanceY = Math.abs(point.y - y);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

/**
 *
 * @param event coordinate del click
 * @param point punto
 * @returns {boolean} il punto che si cerca di selezionare e lo stesso
 */
function isSamePoint(event, point) {
    let x = Math.round((event.x - canvasBounding.left) * scaleX);
    let y = Math.round((event.y - canvasBounding.top) * scaleY);
    if (getDistancePointClick(points[point], x, y) < dimension.value * 10) {
        return true;
    } else {
        return false;
    }
}

/**
 * per elliminare il puntino selezionato
 */
function deletePoint() {
    if (isAPointSelected() && pointMode.checked && edidtMode.checked) {
        points.splice(points[pointSelected].num - 1, 1);
        for (let i = 0; i < points.length; i++) {
            points[i].num = i + 1;
        }
        document.getElementById("newNumPoint").setAttribute("max", points.length);
        reDrawAll();
    }
}

/**
 * per cambiare numero ad un puntino
 */
function renamePoint() {
    if (isAPointSelected() && pointMode.checked && edidtMode.checked) {
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

/**
 * per cambiare il colore ad un puntino
 */
function changeColorPoint() {
    if (isAPointSelected() && pointMode.checked && edidtMode.checked) {
        let color = document.getElementById("color").value;
        points[pointSelected].color = color;
        reDrawAll();
    }
}

/**
 *
 * @returns {boolean} se un pntino e selezionato
 */
function isAPointSelected() {
    for (var i = 0; i < points.length; i++) {
        if (points[i].isSelect) {
            return true;
        }
    }
    return false;
}

/**
 * per cambiare la dimensione del puntino
 */
function changeDimensionPoint(){
    if (isAPointSelected() && pointMode.checked && edidtMode.checked) {
        points[pointSelected].dimension = dimensionRange.value;
        reDrawAll();
    }
}
