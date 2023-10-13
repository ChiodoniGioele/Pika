class Pencil {

    constructor(canvas, canvasDrawed, event, color) {
        // salvo le coordinate di dove è passato il mouse 
        this.arrayX = new Array();
        this.arrayY = new Array();

        this.canvas = canvas;
        this.canvasDrawed = canvasDrawed;
        this.elementRect = canvas.getBoundingClientRect();

        this.startDrawing(event);

        this.isSelect = false;

        this.color = color;
    }

    startDrawing(event) {
        // da ora si puo disegnare
        canDraw = true;

        // definisce le porprietà della nuova linea
        this.setLineProperties();

        // sposta la penna in x e y senza disegnare
        this.canvasDrawed.beginPath();
        this.canvasDrawed.moveTo(event.clientX - this.elementRect.left, event.clientY - this.elementRect.top);
    }

    move(event, canDraw) {
        // se posso disegnare
        if (canDraw) {

            this.canvasDrawed.shadowBlur = 0;
            this.canvasDrawed.shadowColor = null;

            // salvo i valori di dove il mouse
            this.arrayX.push(event.clientX);
            this.arrayY.push(event.clientY);
            // traccia la riga in x y
            this.canvasDrawed.lineTo(event.clientX - this.elementRect.left, event.clientY - this.elementRect.top);

            // per modificare il colore
            this.canvasDrawed.strokeStyle = this.color;
            // disegna
            this.canvasDrawed.stroke();
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
        this.canvasDrawed.lineWidth = 3;
    }


    reDraw() {

        if(this.isSelect){
            this.canvasDrawed.shadowBlur = 3;
            this.canvasDrawed.shadowColor = "red";
        }else{
            this.canvasDrawed.shadowBlur = 0;
            this.canvasDrawed.shadowColor = null;
        }

        this.setLineProperties(this.canvasDrawed);
        this.canvasDrawed.beginPath();
        // sposto la penna su dove inizia la linea
        this.canvasDrawed.moveTo(this.arrayX[0] - this.elementRect.left, this.arrayY[0] - this.elementRect.top);
        // percorro tutti i punti in qui è passata la linea
        for (var i = 0; i < this.arrayX.length; i++) {
            canvasDrawed.lineTo(this.arrayX[i] - this.elementRect.left, this.arrayY[i] - this.elementRect.top);
            // per modificare il colore
            this.canvasDrawed.strokeStyle = this.color;
            // disegna
            this.canvasDrawed.stroke();
        }
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






