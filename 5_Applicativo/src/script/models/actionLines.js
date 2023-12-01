/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 * 
 * In questo file ce il codice che permette di fare azioni con le linee
 * Azioni come:
 *  - Selezionarle
 *  - Cambiare colore
 *  - Elliminare
 *  - Cambiargli spessore
 */


let lineSelected = -1;

// quando fine fato dopppio click per selezionare
canvas.addEventListener("dblclick", function (e) {

    canvasBounding = canvas.getBoundingClientRect();
    scaleX = canvas.width / canvasBounding.width;
    scaleY = canvas.height / canvasBounding.height;

    // se e in modalita di modiffica delle linee
    if (pencilMode.checked && edidtMode.checked) {

        let x = Math.round((e.x - canvasBounding.left) * scaleX);
        let y = Math.round((e.y - canvasBounding.top) * scaleY);

        // il click e avvenuto su una linea
        let line = isOnALine(x, y);
        if (line >= 0) {

            // se era gia selezionata deselezionala
            if (line == lineSelected) {
                deselectLine();
                return;
            }

            // seleziona la linea
            selectLine(line);
        }
    }
});

/**
 * Deseleziona la linea selezionata
 */
function deselectLine() {
    lines[lineSelected].isSelect = false;
    lineSelected = -1;
    reDrawAll();
}

/**
 * 
 * @param {Pencil} line 
 * Seleziona le linee
 */
function selectLine(line) {
    deselectAll();
    if (lineSelected >= 0 && lineSelected < lines.length) {
        lines[lineSelected].isSelect = false;
    }
    lineSelected = line;
    lines[lineSelected].isSelect = true;
    reDrawAll();
}

/**
 * 
 * @param {int} x 
 * @param {int} y 
 * @returns La posizione della linea selezionata nell array, -1 se non e sulla linea
 */
function isOnALine(x, y) {
    for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < lines[i].arrayX.length - 2; j+= 0) {
            if (getDistancePointLine(lines[i].arrayX[j], lines[i].arrayY[j], x, y) < lines[i].dimension) {
                return i;
            }
            j+= 2;
        }
    }
    return -1;
}

/**
 * 
 * @param {int} cX 
 * @param {int} cY 
 * @param {int} x 
 * @param {int} y 
 * @returns La distanza tra i due punti
 */
function getDistancePointLine(cX, cY, x, y) {
    let distanceX = Math.abs(cX - x);
    let distanceY = Math.abs(cY - y);
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

/**
 * cambia il colore alla linea selezionata
 */
function changeColorLine() {
    if (lineSelected >= 0 && pencilMode.checked && edidtMode.checked) {
        let color = document.getElementById("color").value;
        lines[lineSelected].color = color;
        reDrawAll();
    }
}

/**
 * ellimina la linea selezionata
 */
function deleteLine() {
    if (lineSelected >= 0 && pencilMode.checked && edidtMode.checked) {
        lines.splice(lineSelected, 1);
        lineSelected = -1;
        reDrawAll();
    }
}

/**
 * cambia lo spessore della linea selezionata
 */
function changeDimensionLine() {
    if (lineSelected >= 0 && pencilMode.checked && edidtMode.checked) {
        lines[lineSelected].dimension = dimensionRange.value;
        reDrawAll();
    }
}