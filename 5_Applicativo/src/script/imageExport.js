/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 *
 * Il file contiene il coodice per salvare le immagini
 */


function openSave(){
    document.getElementById("savePannel").classList.remove("invisible");
    document.getElementById("savePannel").classList.add("visible");
}

/**
 * Per salvare l'immagine
 */
function imageExport(){
    let link = document.createElement('a');
    let name = document.getElementById("nameFile").value;
    let format = document.getElementById("formats").value;

    link.download = name + '.' + format;

    canvasDrawed.fillStyle = "#FFFFFF";
    canvasDrawed.fillRect(0, 0, canvas.width, canvas.height);
    deselectAll();
    reDrawAllWhidoutClear();
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
    reDrawAll();
    closeSave();
    saveSuccess();
}

function closeSave(){
    document.getElementById("savePannel").classList.remove("visible");
    document.getElementById("savePannel").classList.add("invisible");
}

function saveSuccess(){
    document.getElementById("successSave").classList.remove("invisible");
    document.getElementById("successSave").classList.add("visible");
}
function closeSaveSuccess(){
    document.getElementById("successSave").classList.remove("visible");
    document.getElementById("successSave").classList.add("invisible");
}


