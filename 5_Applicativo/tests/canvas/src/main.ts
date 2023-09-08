class DrawingApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private paint: boolean;
    
    private clickX: number[] = []; // dove ho cliccato pos X
    private clickY: number[] = []; // dove ho cliccato pos Y
    private clickDrag: boolean[] = [];
    
    constructor() {
        let canvas = document.getElementById('canvas') as
                     HTMLCanvasElement;
        let context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black'; // colore del disegno
        context.lineWidth = 1;
    
        this.canvas = canvas;
        this.context = context;
    
        this.redraw();
        this.createUserEvents();
    }

    private createUserEvents() { // metodo cheregistra le interazioni dell'utente con il canvas
        let canvas = this.canvas;
    
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);
    
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
    
        document.getElementById('clear')
                .addEventListener("click", this.clearEventHandler);
    }
    
    private redraw() {
        let clickX = this.clickX; // sono degli array di number[] 
        let clickY = this.clickY; // sono degli array di number[] 
        let context = this.context; // oggetto di tipo CanvasRenderingContext2D
        let clickDrag = this.clickDrag; // array di boolean[]
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }

            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    }   
    
    
    private addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    
    private clearCanvas() {
        this.context
            .clearRect(100, 100, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }
    
    private clearEventHandler = () => {
        this.clearCanvas();
    }
    
    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw();
    }
    
    private cancelEventHandler = () => {
        this.paint = false;
    }    

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
    
        this.paint = true;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    }
    
    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
    
        if (this.paint) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }
    
        e.preventDefault();
    }

}

new DrawingApp();