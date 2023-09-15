class Pencil{

    startDrawing(event, canvas, canvasDrawed) {
        // da ora si puo disegnare
            canDraw = true;

        // definisce la nuova linea
            this.setLineProperties(canvasDrawed); 

        // sposta la penna in x e y senza disegnare
            canvasDrawed.beginPath(); 
            let elementRect = canvas.getBoundingClientRect();
            canvasDrawed.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    }

    move(event, color, canDraw, canvasDrawed) {
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

    end(event, STATUS_BTN) {
        // non posso piu disegnare perchè non btn non premuto
        if (event.button == STATUS_BTN) {
            return false;
        }
        return true;
    }


    // devinisce la linea
    setLineProperties(canvasDrawed) {
        canvasDrawed.lineWidth = 3;
        return canvasDrawed;
    }
}





// event 
    // quando premuto start disegno
    canvas.addEventListener("mousedown",function(e){
        p.startDrawing(e, canvas, canvasDrawed);
    });

// quando rilasciato finisci di disegnare
    canvas.addEventListener("mouseup",function(e){
        canDraw = p.end(e, 0)
    });

// se si muove traccia linea
    canvas.addEventListener("mousemove",function(e){
        p.move(e, color, canDraw, canvasDrawed)
    });

