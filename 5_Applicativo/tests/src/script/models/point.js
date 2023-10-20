class Point {

    constructor(event, canvas, canvasDrawed, numPoint, color) {

        // numero del puntino stampato a schermo
        this.num = numPoint + 1;

        this.color = color;

        this.isSelect = false;

        this.rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / this.rect.width;
        let scaleY = canvas.height / this.rect.height;
        this.x = Math.round((event.x - this.rect.left) * scaleX);
        this.y = Math.round((event.y - this.rect.top) * scaleY);
       // this.x = window.innerWidth / event.clientX * canvas.width; // * canvas.getBoundingClientRect().left;
       // this.y = event.clientY; //- canvas.getBoundingClientRect().top;

        // disegno il puntino
        this.drawPoint();
    }

    drawPoint() {
        // disegno il punto
        canvasDrawed.beginPath();
        canvasDrawed.fillStyle = this.color;
        if (this.isSelect) {
            canvasDrawed.shadowBlur = 10;
            canvasDrawed.shadowColor = "red";
        } else {
            canvasDrawed.shadowBlur = 0;
            canvasDrawed.shadowColor = null;
        }
        canvasDrawed.arc(this.x, this.y, 5, 0 * Math.PI, 2 * Math.PI);
        canvasDrawed.fill();

        // se ce il testo
        if (this.num) {
            // posizione testo
            var textX = this.x + 2;
            var textY = Math.round(this.y - 5 - 3);
            // stampo il testo
            canvasDrawed.font = 'Italic 14px Arial';
            canvasDrawed.fillStyle = this.color;
            canvasDrawed.textAlign = 'center';
            canvasDrawed.fillText(this.num, textX, textY);
        }
    }

    reDraw() {
        this.drawPoint()
    }

}

// on mouse click over canvas
// dblclick
// mousedown
canvas.addEventListener("mousedown", function (e) {
    if (pointMode.checked) {
        points.push(new Point(e, canvas, canvasDrawed, points.length, color));
        document.getElementById("newNumPoint").setAttribute("max", points.length);
    }
});
