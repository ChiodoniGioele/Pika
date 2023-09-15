let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');


const STATUS_BTN = 0;   // disegna solo se il bottone è premuto
let canDraw = false;    // solo se posso disegnare



// event 
    // quando premuto start disegno
        canvas.addEventListener("mousedown",function(e){
            startDrawing(e, canvas);
        });

    // quando rilasciato finisci di disegnare
        canvas.addEventListener("mouseup",function(e){
            end(e)
        });

    // se si muove traccia linea
        canvas.addEventListener("mousemove",function(e){
            move(e)
        });


function startDrawing(event, canvas) {
    // da ora si puo disegnare
        canDraw = true;

    // definisce la nuova linea
        setLineProperties(canvasDrawed); 

    // sposta la penna in x e y senza disegnare
        canvasDrawed.beginPath(); 
        let elementRect = canvas.getBoundingClientRect();
        canvasDrawed.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
}

function move(event, color) {
    // se posso disegnare
    if (canDraw) {
        let elementRect = event.target.getBoundingClientRect();
        // traccia la riga in x y
            canvasDrawed.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
        // per modificare il colore
            if(color){
                canvasDrawed.strokeStyle = color;
            }
        // disegna
            canvasDrawed.stroke();
    }
}

function end(event) {
    // non posso piu disegnare perchè non btn non premuto
    if (event.button == STATUS_BTN) {
        canDraw = false;
    }
}


// devinisce la linea
function setLineProperties(canvasDrawed) {
    canvasDrawed.lineWidth = 3;
    return canvasDrawed;
}