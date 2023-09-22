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

    end(event, status) {
        // non posso piu disegnare perchè non btn non premuto
        if (event.button == status) {
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

let p = new Pencil(canvas);

        // event 
// quando premuto start disegno
    canvas.addEventListener("mousedown",function(e){
        // solo se CHECKBOX è selezionato puo iniziare a disegnare
        if(pencilMode.checked){
            p.startDrawing(e, canvas, canvasDrawed);
    //        lines.push(new Pencil(e, canvas, canvasDrawed));
        }
    });

// quando rilasciato finisci di disegnare
    canvas.addEventListener("mouseup",function(e){
        if(pencilMode.checked){
            canDraw = p.end(e, 0)
        }
    });

// se si muove traccia linea
    canvas.addEventListener("mousemove",function(e){
        if(pencilMode.checked){
            p.move(e, color, canDraw, canvasDrawed)
        }
    });





