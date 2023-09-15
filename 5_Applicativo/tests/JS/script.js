// classe che rappresenta e disegna il puntino salvato nel array points

class Point{

    constructor(event, canvas, numPoint){

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
        this.drawPoint(canvas, x, y, numPoint + 1);
    }

    // ritorna la posizione del puntino X
    getXClick(xE, xC){
        return  xE- xC;
    }
    
    // ritorna la posizione del puntino Y
    getYClick(yE, yC){
        return yE - yC;
    }

    drawPoint(canvas, x, y, num, color, size) {
        // rendo disegnabile il canvas
            var canvasDrawed = canvas.getContext('2d');
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

// canvas
    let canvas = document.getElementById("canvas");

// array con i puntini
    var points = new Array();

// on mouse click over canvas
    canvas.addEventListener("mousedown",function(e){
        points.push(new Point(e, canvas, points.length));
    });
