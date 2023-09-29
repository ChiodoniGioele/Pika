class Bucket{
    constructor(event, canvas, canvasDrawed, color){
            this.canvasDrawed = canvasDrawed;
            this.canvas = canvas;
            this.color = color;
    
        // Coordinate globali click
            this.x = event.clientX - this.canvas.getBoundingClientRect().left;
            this.y = event.clientY - this.canvas.getBoundingClientRect().top;

            this.controlColor = this.getColorPX(this.x, this.y);
            console.log(this.controlColor);

            this.statusX = this.x;
            this.statusY = this.y;
            this.i = 0;
            var finish = false;
            while(!finish){
                finish = this.fill(this.statusX, this.statusY);
            }

    }

    fill(cX, cY){
        if(this.i >= 100){
            this.statusX = cX;
            this.statusY = cY;
            return false;
        }
        let centerX = cX;
        let centerY = cY;
        
        for(var y = centerY - 1; y <= centerY + 1; y++){
            for(var x = centerX - 1; x <= centerX + 1; x++){
                if( x > this.canvas.getBoundingClientRect().left 
                        && 
                    y > this.canvas.getBoundingClientRect().top 
                        && 
                    x < this.canvas.getBoundingClientRect().left + 500
                        &&  
                    y < this.canvas.getBoundingClientRect().top + 500)
                {
                    if(this.getColorPX(x,y) == this.controlColor){
                        this.colorPX(x,y);
                        this.i++;
                        this.fill(x,y);
                    }
                }
            }
        }
        return true;
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



// on mouse click over canvas
    // dblclick
    // mousedown
    canvas.addEventListener("mousedown",function(e){
        if(bucketMode.checked){
            new Bucket(e, canvas, canvasDrawed, color);
        }
    });