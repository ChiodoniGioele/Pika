class Point{

    constructor(event, canvas, canvasDrawed, numPoint){

    // Coordinate globali click
        let eventX = event.clientX;
        let eventY = event.clientY;

    // coordinate canvas 
        let xCanvasLeft = canvas.getBoundingClientRect().left;
        let yCanvasTop = canvas.getBoundingClientRect().top;

    // le coordinate del click
        let x = this.getXClick(eventX, xCanvasLeft);
        let y = this.getYClick(eventY, yCanvasTop);

    // disegno il puntino
        this.drawPoint(canvas, canvasDrawed, x, y, numPoint + 1);
    }

    // ritorna la posizione del puntino X
    getXClick(xE, xC){
        return  xE- xC;
    }
    
    // ritorna la posizione del puntino Y
    getYClick(yE, yC){
        return yE - yC;
    }

    drawPoint(canvas,canvasDrawed ,x, y, num, color, size) {

        // se dati non inseriti
            if (color == null) {
                color = '#000';
            }
                if (size == null) {
                size = 5;
            }

        // disegno il punt
            canvasDrawed.beginPath();
            canvasDrawed.fillStyle = color;
            canvasDrawed.arc(x, y, size, 0 * Math.PI, 2 * Math.PI);
            canvasDrawed.fill();
        
        // se ce il testo
            if (num) {
                // posizione testo
                    var textX = x + 2;
                    var textY = Math.round(y - size - 3);
                // stampo il testo
                    canvasDrawed.font = 'Italic 14px Arial';
                    canvasDrawed.fillStyle = color;
                    canvasDrawed.textAlign = 'center';
                    canvasDrawed.fillText(num, textX, textY);
            }
    }
}



// on mouse click over canvas
        // dblclick
        // mousedown
    canvas.addEventListener("dblclick",function(e){
        if(pointMode.checked){
            points.push(new Point(e, canvas, canvasDrawed, points.length));
        }
    });
