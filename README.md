# Pika

>Progetto M-306

## Link utili

[Link coordinate](https://linuxhint.com/get-mouse-coordinates-javascript/#:~:text=To%20get%20mouse%20coordinates%20in%20JavaScript%2C%20apply%20the%20%E2%80%9CclientX%E2%80%9D,current%20screen%20or%20with%20an%20%E2%80%9C)

[Link coordinate click canvas](https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)

##### Eventi 

~~~ JavaScript
// on mouse click over canvas
canvas.addEventListener("mousedown",function(canvas, e){
    new Point(e);
});
~~~

##### Funzione per disegnare i puntini

~~~JavaScript
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
~~~ 


