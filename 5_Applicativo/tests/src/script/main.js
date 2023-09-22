let canvas = document.getElementById("canvas");
let canvasDrawed = canvas.getContext('2d');

// bottono
let pointMode = document.getElementById('point');
let pencilMode = document.getElementById('pencil');
let rectangleMode = document.getElementById('rectangle');

let canDraw = false;    // solo se posso disegnare
let color = "black"

// points
    var points = new Array() // array con i puntini


// pencil
    var lines = new Array();

    
// rectangle
    var rects = new Array();

