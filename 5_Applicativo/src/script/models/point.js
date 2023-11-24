class Point {

    constructor(event, canvas, numPoint, color) {
        this.num = numPoint + 1;
        this.color = color;
        this.isSelect = false;
        this.dimension = dimensionRange.value;
        
        this.canvasBounding = canvas.getBoundingClientRect();

        this.scaleX = canvas.width / this.canvasBounding.width;
        this.scaleY = canvas.height / this.canvasBounding.height;

        this.x = Math.round((event.x - this.canvasBounding.left) * this.scaleX);
        this.y = Math.round((event.y - this.canvasBounding.top) * this.scaleY);

        this.drawPoint();
    }

    drawPoint() {

        canvasDrawed.beginPath();
        canvasDrawed.fillStyle = this.color;

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 30;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        canvasDrawed.arc(this.x, this.y, this.dimension, 0, 2 * Math.PI);
        canvasDrawed.fill();

        var textX = Math.round(this.x - this.dimension - 10);
        var textY = Math.round(this.y - this.dimension - 10);
        
        canvasDrawed.font = this.dimension * 2 + 'px Arial';

        canvasDrawed.fillStyle = this.color;
        canvasDrawed.textAlign = 'center';

        canvasDrawed.fillText(this.num, textX, textY);

    }

    reDraw() {

        this.drawPoint()

    }

}


canvas.addEventListener("mousedown", function (e) {
    if (pointMode.checked && !edidtMode.checked) {
        points.push(new Point(e, canvas, points.length, color));
        document.getElementById("newNumPoint").setAttribute("max", points.length);
    }
});
