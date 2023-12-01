/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 *
 * Il file contiene il codice per l'interazio con i bottoni, ...
 *
 */

// strumenti
let pointMode = document.getElementById('Point');
let pencilMode = document.getElementById('Pencil');
let rectangleMode = document.getElementById('Rectangle');
let circleMode = document.getElementById('Circle');

let edidtMode = document.getElementById('edit');

// layer
let pointLayer = document.getElementById('PointsLayer');
let pencilLayer = document.getElementById('LinesLayer');
let rectLayer = document.getElementById('RectLayer');
let circleLayer = document.getElementById('CircleLayer');
let imgLayer = document.getElementById('ImgLayer');



let dimensionRange = document.getElementById("dimension");


/**
 * In base allo strumento scelto chiama la funzione per elliminare il seguente disegno
 */
function deleteElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        deleteRetc();
    } else if (pointMode.checked && edidtMode.checked) {
        deletePoint();
    } else if (circleMode.checked && edidtMode.checked) {
        deleteCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        deleteLine();
    }
}

/**
 * In base allo strumeno scelto chiama la funzione per cambiare il colore del disegno
 */
function colorElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        changeColorRect();
    } else if (pointMode.checked && edidtMode.checked) {
        changeColorPoint();
    } else if (circleMode.checked && edidtMode.checked) {
        changeColorCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        changeColorLine();
    } else {
        color = document.getElementById("color").value;
    }
}

/**
 * In base allo strumeno scelto chiama la funzione per cambiare lo spessore del disegno
 */
function dimensionElement() {
    if (rectangleMode.checked && edidtMode.checked) {
        changeDimensionRect();
    } else if (pointMode.checked && edidtMode.checked) {
        changeDimensionPoint();
    } else if (circleMode.checked && edidtMode.checked) {
        changeDimensionCircle();
    } else if (pencilMode.checked && edidtMode.checked) {
        changeDimensionLine();
    }
}


// layer dei puntini
function pointLayerCheck() {
    if (!pointLayer.checked) {
        pointMode.disabled = true;

    } else {
        pointMode.disabled = false;

    }

    if (pointMode.checked) {
        pencilMode.checked = true;
    }


    reDrawAll();
}

// layer delle linee
function linesLayerCheck() {
    if (!pencilLayer.checked) {
        pencilMode.disabled = true;
    } else {
        pencilMode.disabled = false;
    }

    if (pencilMode.checked) {
        pointMode.checked = true;
    }
    reDrawAll();
}

// layer dei rettangoli
function rectLayerCheck() {
    if (!rectLayer.checked) {
        rectangleMode.disabled = true;

    } else {
        rectangleMode.disabled = false;

    }

    if (rectangleMode.checked) {
        pointMode.checked = true;
    }

    reDrawAll();
}

// layer dei cerchi
function circleLayerCheck() {
    if (!circleLayer.checked) {
        circleMode.disabled = true;

    } else {
        circleMode.disabled = false;

    }

    if (circleMode.checked) {
        pointMode.checked = true;
    }
    reDrawAll();
}

// layer dell immagine
function imgLayerView() {
    if (imgLayer.checked) {
        reDrawAll();
    } else {
        canvasDrawed.fillStyle = "#FFFFFF";
        canvasDrawed.fillRect(0, 0, canvas.width, canvas.height);
        reDrawAllWhidoutClear();
    }
}


function closeDeleteAll(){
    document.getElementById("deleteAllPannel").classList.remove("visible");
    document.getElementById("deleteAllPannel").classList.add("invisible");
}

function wantDeleteAll(){
    document.getElementById("deleteAllPannel").classList.remove("invisible");
    document.getElementById("deleteAllPannel").classList.add("visible");
}

