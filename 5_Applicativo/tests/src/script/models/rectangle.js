class Rectangle {
    constructor(event, canvas , color) {

        this.canvas = canvas;

        this.rect = this.canvas.getBoundingClientRect();

        this.scaleX = this.canvas.width / this.rect.width;
        this.scaleY = this.canvas.height / this.rect.height;

        canDraw = true;
        this.startX = this.getX(event);
        this.startY = this.getY(event);

        this.color = color;

        // coordinate dove finira il rettangolo (in partenza 0)
        this.endX = 0;
        this.endY = 0;

        this.startDrawing();

        this.isSelect = false;
    }

    startDrawing() {
        // muovo la penna in x y
        canvasDrawed.moveTo(this.startX, this.startY);
    }

    move(event, canDraw) {

        let mouseX = this.getX(event);
        let mouseY = this.getY(event);
        // se posso disegnare
        if (canDraw) {
            
            canvasDrawed.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas
            canvasDrawed.beginPath();

            // larghezza attuale del rettangolo
            var width = mouseX - this.startX;
            var height = mouseY - this.startY;

            if(this.isSelect){
                canvasDrawed.shadowBlur = 10;
                canvasDrawed.shadowColor = "red";
            }else{
                canvasDrawed.shadowBlur = 0;
                canvasDrawed.shadowColor = null;
            }

            canvasDrawed.rect(this.startX, this.startY, width, height);

            // imposto il colore
            canvasDrawed.strokeStyle = this.color;

            canvasDrawed.lineWidth = 100;
            canvasDrawed.stroke();
            // salvo la larghezza attuale del rettangolo (che se decide ti smettere di disegnare rimane questa)
            this.endX = width;
            this.endY = height;
        }

    }

    end() {
        return false;
    }

    reDraw() {

        if(this.isSelect){
            canvasDrawed.shadowBlur = 10;
            canvasDrawed.shadowColor = "red";
        }else{
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        // sposto la penna nel punto di partenza x y
        canvasDrawed.moveTo(this.startX, this.startY);

        canvasDrawed.beginPath();
        // variabili end* contengono la largheza e l altezza del rettangolo 
        canvasDrawed.rect(this.startX, this.startY, this.endX, this.endY);

        // imposto il colore
        canvasDrawed.strokeStyle = this.color;
        canvasDrawed.lineWidth = 10;
        // disegno
        canvasDrawed.stroke();
    }

    
        getX(event){
            return Math.round((event.x - this.rect.left) * this.scaleX);
        }

        getY(event){
            return Math.round((event.y - this.rect.top) * this.scaleY);
        }


}



// event 
// quando premuto start disegno
canvas.addEventListener("mousedown", function (e) {
    // solo se CHECKBOX è selezionato puo iniziare a disegnare
    if (rectangleMode.checked) {
        rects.push(new Rectangle(e, canvas,color));
    }
});


// se si muove traccia linea
canvas.addEventListener("mousemove", function (e) {
    if (rectangleMode.checked && rects.length >= 1) {
        rects[rects.length - 1].move(e, canDraw);
        reDrawAll();
    }
});


// quando rilasciato finisci di disegnare
canvas.addEventListener("mouseup", function (e) {
    if (rectangleMode.checked && rects.length >= 1) {
        canDraw = rects[rects.length - 1].end();
        reDrawAll();
    }
});