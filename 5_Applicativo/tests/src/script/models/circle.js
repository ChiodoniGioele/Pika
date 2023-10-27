class Circle {

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

    move(event, canDraw) {
        canvasDrawed.moveTo(this.startX, this.startY);
        if (this.isSelect) {
            canvasDrawed.shadowBlur = 10;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }

        let mouseX = this.getX(event);
        let mouseY = this.getY(event);

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

    end() {
        return false;
    }

    reDraw() {

        if (this.isSelect) {
            canvasDrawed.shadowBlur = 10;
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

    getX(event) {
        return Math.round((event.x - this.canvasBounding.left) * this.scaleX);
    }

    getY(event) {
        return Math.round((event.y - this.canvasBounding.top) * this.scaleY);
    }

}



canvas.addEventListener("mousedown", function (e) {
    if (circleMode.checked) {
        circle.push(new Circle(e, canvas, canvasDrawed, color));
    }
});


canvas.addEventListener("mousemove", function (e) {
    if (circleMode.checked && circle.length >= 1) {
        circle[circle.length - 1].move(e, canDraw);
        reDrawAll();
    }
});


canvas.addEventListener("mouseup", function (e) {
    if (circleMode.checked && circle.length >= 1) {
        canDraw = circle[circle.length - 1].end();
        reDrawAll();
    }
});