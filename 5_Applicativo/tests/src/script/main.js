let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');


// pencil
    let canDraw = false;    // solo se posso disegnare
    let color = "black"
    
    var p = new Pencil(canvas);


// array con i puntini
    var points = new Array()