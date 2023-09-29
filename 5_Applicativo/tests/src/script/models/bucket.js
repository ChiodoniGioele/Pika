class Bucket{
    constructor(event, canvas, canvasDrawed, color){
            this.canvasDrawed = canvasDrawed;
            this.canvas = canvas;
            this.color = color;
    
        // Coordinate globali click
            this.x = event.clientX - this.canvas.getBoundingClientRect().left;
            this.y = event.clientY - this.canvas.getBoundingClientRect().top;

            this.controlColor = this.getColorPX(this.x, this.y);
            this.fill();

    }

    fill(){
        var cells = new Array();
        cells.push(new Cell(this.x, this.y));
        while(cells.length > 0){
            for(var y = cells[0].getY() - 1; y < y + 3; y++){
                for(var x = cells[0].getX() - 1; x < x + 2; x++){
                    if( x > this.canvas.getBoundingClientRect().left 
                            && 
                        y > this.canvas.getBoundingClientRect().top 
                            && 
                        x < this.canvas.getBoundingClientRect().left + 500
                            &&  
                        y < this.canvas.getBoundingClientRect().top + 500)
                    {
                        if(this.getColorPX(x,y) == this.controlColor){
                            cells.push(new Cell(x, y));
                        }
                    }
                }
            }
            this.colorPX(cells[0].getX(), cells[0].getY());
            delete cells[0];
        }
    }

    colorPX(x,y){
        this.canvasDrawed.fillStyle = "blue";
        this.canvasDrawed.fillRect(x, y, 1, 1);
    }

    getColorPX(x,y){
        let data = this.canvasDrawed.getImageData(x, y, 1, 1).data;
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    }
}

class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}



// on mouse click over canvas
    // dblclick
    // mousedown
    canvas.addEventListener("mousedown",function(e){
        if(bucketMode.checked){
            new Bucket(e, canvas, canvasDrawed, color);
        }
    });