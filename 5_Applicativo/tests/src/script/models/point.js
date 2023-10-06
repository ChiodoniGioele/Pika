class Point {

    constructor(event, canvas, canvasDrawed, numPoint, color) {

        this.canvasDrawed = canvasDrawed;
        // numero del puntino stampato a schermo
        this.num = numPoint + 1;

        this.color = color;

        this.isSelect = false;

        // Coordinate globali click
        this.x = event.clientX - canvas.getBoundingClientRect().left;
        this.y = event.clientY - canvas.getBoundingClientRect().top;

        // disegno il puntino
        this.drawPoint();
    }

    drawPoint() {
        // disegno il punto
        this.canvasDrawed.beginPath();
        this.canvasDrawed.fillStyle = this.color;
        this.canvasDrawed.shadowBlur = 0;
        this.canvasDrawed.shadowColor = null;
        this.canvasDrawed.arc(this.x, this.y, 5, 0 * Math.PI, 2 * Math.PI);
        this.canvasDrawed.fill();

        // se ce il testo
        if (this.num) {
            // posizione testo
            var textX = this.x + 2;
            var textY = Math.round(this.y - 5 - 3);
            // stampo il testo
            this.canvasDrawed.font = 'Italic 14px Arial';
            this.canvasDrawed.fillStyle = this.color;
            this.canvasDrawed.textAlign = 'center';
            this.canvasDrawed.fillText(this.num, textX, textY);
        }
    }

    reDraw() {
        if(this.isSelect){
            this.drawPointShadow();
        }else{
            this.drawPoint()
        }
        
    }

    drawPointShadow(){
                // disegno il punto
                this.canvasDrawed.beginPath();
                this.canvasDrawed.fillStyle = this.color;
                this.canvasDrawed.shadowBlur = 10;
                this.canvasDrawed.shadowColor = "red";
                this.canvasDrawed.arc(this.x, this.y, 5, 0 * Math.PI, 2 * Math.PI);
                this.canvasDrawed.fill();
        
                // se ce il testo
                if (this.num) {
                    // posizione testo
                    var textX = this.x + 2;
                    var textY = Math.round(this.y - 5 - 3);
                    // stampo il testo
                    this.canvasDrawed.font = 'Italic 14px Arial';
                    this.canvasDrawed.fillStyle = this.color;
                    this.canvasDrawed.textAlign = 'center';
                    this.canvasDrawed.fillText(this.num, textX, textY);
                }
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
