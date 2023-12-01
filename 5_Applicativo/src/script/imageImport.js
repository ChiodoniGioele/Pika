/**
 * @author Gioele Chiodoni
 * @version 24.11.2023
 * Il file contiene il codice per importare le immagini
 */

// se un immagine e selezionata
let isImgSelected = false;

let fileInput = document.getElementById('uploadImg');

/**
 * per caricare l'immagine
 * @param {event} event
 */
function loadImage(event) {
  if (event.target.files) {
    let file = event.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {

      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {

        // se le dimensioni del immagine sono accettabili
        if(this.width > 250 && this.height > 150){

          canvas.style.backgroundImage = 'url("' + this.src + '") ';
          ImgSrc = canvas.style.backgroundImage;
          canvas.style.backgroundSize = 'contain';

          canvas.width = this.width;
          canvas.height = this.height;

          // setto le variabili per il calcolo delle cordinate del file drawHelp.js
          canvasBounding = canvas.getBoundingClientRect();
          scaleX = canvas.width / canvasBounding.width;
          scaleY = canvas.height / canvasBounding.height;

          // dichiaro gli array del file drawHelp.js
          points = new Array();
          lines = new Array();
          rects = new Array();
          circle = new Array();

          canvas.classList.remove("invisible");
          document.getElementById("allertUpLoad").classList.remove("visible");
          document.getElementById("allertUpLoad").classList.add("invisible");
          canvas.classList.add("visible");

        }else{
          // se l'immagine non va bene
          openLoadError();
        }
      }
    }
    reader.readAsDataURL(file);

  }


}

fileInput.addEventListener("change", loadImage);


function closeLoadError(){
  document.getElementById("loadError").classList.remove("visible");
  document.getElementById("loadError").classList.add("invisible");
}

function openLoadError(){
  document.getElementById("loadError").classList.remove("invisible");
  document.getElementById("loadError").classList.add("visible");
}