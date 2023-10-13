class Circle {

    constructor(event, canvas, canvasDrawed, color) {
        canDraw = true;
        this.elementRect = canvas.getBoundingClientRect();

        // coordinate dell'inizio del rettangolo
        this.startX = event.clientX - this.elementRect.left;
        this.startY = event.clientY - this.elementRect.top;

        this.color = color;

        // coordinate dove finira il rettangolo (in partenza 0)
        this.raggio = 0;

        this.canvas = canvas;
        this.canvasDrawed = canvasDrawed;

        this.startDrawing(this.canvasDrawed);

        this.isSelect = false;
    }

    startDrawing() {
        // muovo la penna in x y
        this.canvasDrawed.moveTo(this.startX, this.startY);
    }

    move(event, canDraw) {

        if(this.isSelect){
            this.canvasDrawed.shadowBlur = 10;
            this.canvasDrawed.shadowColor = "red";
        }else{
            this.canvasDrawed.shadowBlur = 0;
            this.canvasDrawed.shadowColor = null;
        }


        // coordinate di dove si trova il mouse
        let mouseX = event.clientX - this.elementRect.left;
        let mouseY = event.clientY - this.elementRect.top;

        // se posso disegnare
        if (canDraw) {
            this.canvasDrawed.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
            this.canvasDrawed.beginPath();
            // larghezza attuale del rettangolo
            this.raggio = Math.sqrt(Math.pow((mouseX - this.startX), 2) + Math.pow((mouseY - this.startY), 2));

            this.canvasDrawed.arc(this.startX, this.startY, this.raggio, 0, 2 * Math.PI, false);

            // imposto il colore
            this.canvasDrawed.strokeStyle = this.color;

            this.canvasDrawed.lineWidth = 10;
            this.canvasDrawed.stroke();
            // salvo la larghezza attuale del rettangolo (che se decide ti smettere di disegnare rimane questa)
        }

    }

    end() {
        return false;
    }

    reDraw(color) {

        if(this.isSelect){
            this.canvasDrawed.shadowBlur = 10;
            this.canvasDrawed.shadowColor = "red";
        }else{
            this.canvasDrawed.shadowBlur = 0;
            this.canvasDrawed.shadowColor = null;
        }

        // sposto la penna nel punto di partenza x y
        this.canvasDrawed.moveTo(this.startX, this.startY);

        this.canvasDrawed.beginPath();
        // variabili end* contengono la largheza e l altezza del rettangolo 
        this.canvasDrawed.arc(this.startX, this.startY, this.raggio, 0, 2 * Math.PI, false);

        // imposto il colore
        this.canvasDrawed.strokeStyle = this.color;
        this.canvasDrawed.lineWidth = 10;
        // disegno
        this.canvasDrawed.stroke();
    }

}



// event 
// quando premuto start disegno
canvas.addEventListener("mousedown", function (e) {
    // solo se CHECKBOX è selezionato puo iniziare a disegnare
    if (circleMode.checked) {
        circle.push(new Circle(e, canvas, canvasDrawed, color));
    }
});


// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (circleMode.checked && circle.length >= 1) {
        circle[circle.length - 1].move(e, canDraw);
        reDrawAll();
    }
});


// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (circleMode.checked && circle.length >= 1) {
        canDraw = circle[circle.length - 1].end();
        reDrawAll();
    }
});