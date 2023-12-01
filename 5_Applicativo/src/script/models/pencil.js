/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 *
 * La classe permetti di disegnare le linee
 */
class Pencil {

    constructor(event, color) {

        this.canvasBounding = canvas.getBoundingClientRect();

        this.scaleX = canvas.width / this.canvasBounding.width;
        this.scaleY = canvas.height / this.canvasBounding.height;
        
        this.arrayX = new Array();
        this.arrayY = new Array();

        this.isSelect = false;
        this.color = color;
        this.dimension = dimensionRange.value;

        this.startDrawing(event);
    }

    /**
     * per iniziare a disegnare la linea
     * @param event inizio del disegno
     */
    startDrawing(event) {
        canDraw = true;

        this.setLineProperties();

        canvasDrawed.beginPath();
        canvasDrawed.moveTo(this.getX(event), this.getY(event));
    }

    /**
     * per disegnare la linea
     * @param event coordinata della posizione attuale del mouse
     * @param canDraw se puo disegnare
     */
    move(event, canDraw) {
        if (canDraw) {

            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;

            this.arrayX.push(this.getX(event));
            this.arrayY.push(this.getY(event));

            canvasDrawed.lineTo(this.getX(event), this.getY(event));

            canvasDrawed.strokeStyle = this.color;
            // disegna
            canvasDrawed.stroke();
        }
    }

    /**
     * quando finisce di disegnare la linea
     * @param event posizione del mouse
     * @returns {boolean} non puo piu disegnare
     */
    end(event) {
        if (event.button == 0) {
            return false;
        }
        return true;
    }


    setLineProperties() {
        canvasDrawed.lineWidth = this.dimension;
    }


    /**
     * per ridisegnare la linea
     */
    reDraw() {

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 6;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        this.setLineProperties();
        canvasDrawed.beginPath();

        canvasDrawed.moveTo(this.arrayX[0], this.arrayY[0]);

        for (var i = 0; i < this.arrayX.length; i++) {
            canvasDrawed.lineTo(this.arrayX[i], this.arrayY[i]);
            canvasDrawed.strokeStyle = this.color;
            canvasDrawed.stroke();
        }
    }


    /**
     *
     * @param event posizione del mouse
     * @returns {number} coordinata x
     */
    getX(event) {
        return Math.round((event.x - this.canvasBounding.left) * this.scaleX);
    }

    /**
     *
     * @param event posizione del mouse
     * @returns {number} coordinata y
     */
    getY(event) {
        return Math.round((event.y - this.canvasBounding.top) * this.scaleY);
    }

}


// quando inizia a disegnare
canvas.addEventListener("mousedown", function (e) {
    // se e in modalita per disegnare le linee
    if (pencilMode.checked && !edidtMode.checked) {
        lines.push(new Pencil(e, color));
    }
});

// quando disegna la linea
canvas.addEventListener("mousemove", function (e) {
    // se puo disegnare la linea
    if (pencilMode.checked && !edidtMode.checked && lines.length >= 1) {
        lines[lines.length - 1].move(e, canDraw);
    }
});

// quando finisce di disegnare la linea
canvas.addEventListener("mouseup", function (e) {
    if (pencilMode.checked && !edidtMode.checked && lines.length >= 1) {
        canDraw = lines[lines.length - 1].end(e);
    }
});
