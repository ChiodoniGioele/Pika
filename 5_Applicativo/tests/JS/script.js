class Point{
    constructor(event, canvas){

    // Coordinate globali click
        var eventX = event.clientX;
        var eventY = event.clientY;

    // coordinate canvas 
        var xCanvasLeft = canvas.getBoundingClientRect().left;
        var yCanvasTop = canvas.getBoundingClientRect().top;

    // stampa le coordinate del click
        console.log("Cordinata X: " + this.getXClick(eventX, xCanvasLeft));
        console.log("Cordinata Y: " + this.getYClick(eventY, yCanvasTop));

    }

    getXClick(xE, xC){
        return  xE- xC;
    }
    
    getYClick(yE, yC){
        return yE - yC;
    }
}

let canvas = document.getElementById("canvas");


// on mouse click over canvas
    canvas.addEventListener("mousedown",function(e){
        var p = new Point(e, canvas);
    });
