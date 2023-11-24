
function exportCanvas() {
    let link = document.createElement('a');
    link.download = 'image.'+formats.value;
    canvasDrawed.fillStyle = "#FFFFFF";
    canvasDrawed.fillRect(0, 0, canvas.width, canvas.height);
    deselectAll();
    reDrawAllWhidoutClear();
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
    reDrawAll();
}
