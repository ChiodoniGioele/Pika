class Rectangle {
    constructor(event, color) {
        this.canvasBounding = canvas.getBoundingClientRect();

        this.scaleX = canvas.width / this.canvasBounding.width;
        this.scaleY = canvas.height / this.canvasBounding.height;

        this.startX = this.getX(event);
        this.startY = this.getY(event);

        this.endX = 0;
        this.endY = 0;

        canDraw = true;
        this.color = color;
        this.isSelect = false;
        this.dimension = dimensionRange.value;

        canvasDrawed.moveTo(this.startX, this.startY);
    }

    move(event, canDraw) {
        let mouseX = this.getX(event);
        let mouseY = this.getY(event);

        if (canDraw) {
            canvasDrawed.clearRect(0, 0, canvas.width, canvas.height);
            canvasDrawed.beginPath();

            var width = mouseX - this.startX;
            var height = mouseY - this.startY;

            if (this.isSelect) {
                canvasDrawed.shadowBlur = 30;
                canvasDrawed.shadowColor = "red";
            } else {
                canvasDrawed.shadowBlur = 0;
                canvasDrawed.shadowColor = null;
            }

            canvasDrawed.rect(this.startX, this.startY, width, height);

            canvasDrawed.strokeStyle = this.color;

            canvasDrawed.lineWidth = this.dimension * 2;
            canvasDrawed.stroke();

            this.endX = width;
            this.endY = height;
        }
    }

    end() {
        return false;
    }

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

        canvasDrawed.rect(this.startX, this.startY, this.endX, this.endY);

        canvasDrawed.strokeStyle = this.color;
        canvasDrawed.lineWidth = this.dimension * 2;

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
    if (rectangleMode.checked && !edidtMode.checked) {
        rects.push(new Rectangle(e, canvas, color));
    }
});


canvas.addEventListener("mousemove", function (e) {
    if (rectangleMode.checked && !edidtMode.checked && rects.length >= 1) {
        rects[rects.length - 1].move(e, canDraw);
        reDrawAll();
    }
});


canvas.addEventListener("mouseup", function (e) {
    if (rectangleMode.checked && !edidtMode.checked && rects.length >= 1) {
        canDraw = rects[rects.length - 1].end();
        reDrawAll();
    }
});
