class Pencil {

    constructor(canvas, event, color) {


        this.rect = canvas.getBoundingClientRect();

        this.scaleX = canvas.width / this.rect.width;
        this.scaleY = canvas.height / this.rect.height;

        // salvo le coordinate di dove è passato il mouse 
        this.arrayX = new Array();
        this.arrayY = new Array();

        this.isSelect = false;

        this.color = color;

        this.startDrawing(event);
    }

    startDrawing(event) {
        // da ora si puo disegnare
        canDraw = true;

        // definisce le porprietà della nuova linea
        this.setLineProperties();

        // sposta la penna in x e y senza disegnare
        canvasDrawed.beginPath();
        canvasDrawed.moveTo(this.getX(event), this.getY(event));
    }

    move(event, canDraw) {
        // se posso disegnare
        if (canDraw) {

            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;

            // salvo i valori di dove il mouse
            this.arrayX.push(this.getX(event));
            this.arrayY.push(this.getY(event));

            // traccia la riga in x y
            canvasDrawed.lineTo(this.getX(event), this.getY(event));

            // per modificare il colore
            canvasDrawed.strokeStyle = this.color;
            // disegna
            canvasDrawed.stroke();
        }
    }

    end(event) {
        // non posso piu disegnare perchè non btn non premuto
        if (event.button == 0) {
            return false;
        }
        return true;
    }


    // devinisce la linea
    setLineProperties() {
        canvasDrawed.lineWidth = 3;
    }


    reDraw() {

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 3;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        this.setLineProperties();
        canvasDrawed.beginPath();
        // sposto la penna su dove inizia la linea
        canvasDrawed.moveTo(this.arrayX[0], this.arrayY[0]);
        // percorro tutti i punti in qui è passata la linea
        for (var i = 0; i < this.arrayX.length; i++) {
            canvasDrawed.lineTo(this.arrayX[i], this.arrayY[i]);
            // per modificare il colore
            canvasDrawed.strokeStyle = this.color;
            // disegna
            canvasDrawed.stroke();
        }
    }


    getX(event) {
        return Math.round((event.x - this.rect.left) * this.scaleX);
    }

    getY(event) {
        return Math.round((event.y - this.rect.top) * this.scaleY);
    }

}



// event 
// quando premuto start disegno
canvas.addEventListener("mousedown", function (e) {
    // solo se CHECKBOX è selezionato puo iniziare a disegnare
    if (pencilMode.checked) {
        lines.push(new Pencil(canvas, canvasDrawed, e, color));
    }
});

// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (pencilMode.checked && lines.length >= 1) {
        lines[lines.length - 1].move(e, canDraw);
    }
});


// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (pencilMode.checked && lines.length >= 1) {
        canDraw = lines[lines.length - 1].end(e);
    }
});
