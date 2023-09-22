class Rectangle{

    constructor(){
        window.startX = 0;
        window.startY = 0
    }

    startDrawing(event, canvas, canvasDrawed){
        canDraw = true;
        let elementRect = canvas.getBoundingClientRect();
        window.startX = event.clientX - elementRect.left;
        window.startY = event.clientY - elementRect.top;

        canvasDrawed.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    }

    move(event, color, canDraw, canvasDrawed) {
        let elementRect = canvas.getBoundingClientRect();

        let mouseX = event.clientX - elementRect.left;
        let mouseY = event.clientY - elementRect.top;

        // se posso disegnare
        if (canDraw) {
            canvasDrawed.clearRect(0,0,canvas.width,canvas.height); //clear canvas
            canvasDrawed.beginPath();
            var width = mouseX - window.startX;
            var height = mouseY - window.startY;
            canvasDrawed.rect(window.startX, window.startY, width,height);
            if(color){
                canvasDrawed.strokeStyle = color;
            }
            canvasDrawed.lineWidth = 10;
            canvasDrawed.stroke();
        }
    }

    end(){
      return false;  
    }

}

var r = new Rectangle();


        // event 
// quando premuto start disegno
    canvas.addEventListener("mousedown",function(e){
        // solo se CHECKBOX è selezionato puo iniziare a disegnare
        if(rectangleMode.checked){
            r.startDrawing(e, canvas, canvasDrawed);
            // rects.push(new Rectangle());
        }
    });


// se si muove traccia linea
    canvas.addEventListener("mousemove",function(e){
        if(rectangleMode.checked){
            r.move(e, color, canDraw, canvasDrawed);
        }
    });


// quando rilasciato finisci di disegnare
    canvas.addEventListener("mouseup",function(e){
        if(rectangleMode.checked){
            canDraw = r.end();
        }
    });