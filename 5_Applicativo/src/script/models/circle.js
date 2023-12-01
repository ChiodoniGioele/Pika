/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 *
 * Classe Circle rappresenta un oggetto cerchio da disegnare
 *
 */
class Circle {

    /**
     * @param event coordinate del click
     * @param color colore del cerchio
     */
    constructor(event, color) {
        this.canvasBounding = canvas.getBoundingClientRect();

        this.scaleX = canvas.width / this.canvasBounding.width;
        this.scaleY = canvas.height / this.canvasBounding.height;

        this.startX = this.getX(event);
        this.startY = this.getY(event);

        this.raggio = 0;

        this.color = color;
        canDraw = true;
        this.isSelect = false;
        this.dimension = dimensionRange.value;

    }

    /**
     * Per muovere un cerchio quando viene disegnato
     * @param event nuove coordinate
     * @param canDraw se si puo muovere
     */
    move(event, canDraw) {
        canvasDrawed.moveTo(this.startX, this.startY);

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 30;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        let mouseX = this.getX(event);
        let mouseY = this.getY(event);

        // se puo essere disegnato
        if (canDraw) {
            canvasDrawed.clearRect(0, 0, canvas.width, canvas.height);
            canvasDrawed.beginPath();

            this.raggio = Math.sqrt(Math.pow((mouseX - this.startX), 2) + Math.pow((mouseY - this.startY), 2));

            canvasDrawed.arc(this.startX, this.startY, this.raggio, 0, 2 * Math.PI, false);

            canvasDrawed.strokeStyle = this.color;

            canvasDrawed.lineWidth = this.dimension;
            canvasDrawed.stroke();
        }

    }

    /**
     *
     * @returns {boolean} non puo piu disegnare
     */
    end() {
        return false;
    }

    /**
     * per rideisegnare i cerchi gia disegnati
     */
    reDraw() {

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 30;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        canvasDrawed.moveTo(this.startX, this.startY);

        canvasDrawed.beginPath();

        canvasDrawed.arc(this.startX, this.startY, this.raggio, 0, 2 * Math.PI, false);

        canvasDrawed.strokeStyle = this.color;
        canvasDrawed.lineWidth = this.dimension;

        canvasDrawed.stroke();
    }

    /**
     *
     * @param event clock
     * @returns {number} coordinata x
     */
    getX(event) {
        return Math.round((event.x - this.canvasBounding.left) * this.scaleX);
    }

    /**
     *
     * @param event click
     * @returns {number} la coordinata y
     */
    getY(event) {
        return Math.round((event.y - this.canvasBounding.top) * this.scaleY);
    }

}


// quando viene premuto il mouse
canvas.addEventListener("mousedown", function (e) {
    // se e in modalita per disegnare i cerchi
    if (circleMode.checked && !edidtMode.checked) {
        circle.push(new Circle(e, canvas, canvasDrawed, color));
    }
});


// quando muove il mouse per disegnare il cerchio
canvas.addEventListener("mousemove", function (e) {
    // se e in modalita per disegnare i cerchi
    if (circleMode.checked && !edidtMode.checked && circle.length >= 1) {
        circle[circle.length - 1].move(e, canDraw);
        reDrawAll();
    }
});

// quando finisce di disegnare il cerchio
canvas.addEventListener("mouseup", function (e) {
    if (circleMode.checked && !edidtMode.checked && circle.length >= 1) {
        canDraw = circle[circle.length - 1].end();
        reDrawAll();
    }
});