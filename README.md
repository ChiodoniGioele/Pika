# Pika

>Progetto M-306

## Link utili

[Link coordinate](https://linuxhint.com/get-mouse-coordinates-javascript/#:~:text=To%20get%20mouse%20coordinates%20in%20JavaScript%2C%20apply%20the%20%E2%80%9CclientX%E2%80%9D,current%20screen%20or%20with%20an%20%E2%80%9C)

[Link coordinate click Canvas](https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)

[Link line](https://medium.com/@zxlee618/drawing-on-a-html-canvas-b7566624b17f)

---
##### Eventi 

~~~ JavaScript

// on mouse click over canvas per i puntini
	canvas.addEventListener("mousedown",function(canvas, e){
	    new Point(e);
	});

// per le linee
	// quando premuto start disegno
		canvas.addEventListener("mousedown",function(e){
			startDrawing(e, canvas);
		});
	// quando rilasciato finisci di disegnare
		canvas.addEventListener("mouseup",function(e){
			end(e)
		});
	// se si muove traccia linea
		canvas.addEventListener("mousemove",function(e){
			move(e)
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


##### Ordine import script
> Nel file index.htm l'ultimo import dei file.js deve essere il main.js perché sennò cerca di generare le classi senza averle ancora importate.

~~~ html
  <script src="./script/models/point.js"></script>
  <script src="./script/models/pencil.js"></script>
  <script src="./script/main.js"></script>
~~~

