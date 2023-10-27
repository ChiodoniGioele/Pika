

let isImgSelected = false;

function actionVIsibility(){
    actionsVisible = false;
    document.getElementById("actions").style.display = false;
}

let fileInput = document.getElementById('uploadImg');
function loadImage(event) {
  if (event.target.files) {
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        canvas.style.backgroundImage = 'url("' + this.src + '") ';
        ImgSrc = canvas.style.backgroundImage;
        canvas.style.backgroundSize = 'contain';
        canvas.width = this.width;
        canvas.height = this.height;
        document.getElementById("container").style.display='block';

        canvasBounding = canvas.getBoundingClientRect();
        scaleX = canvas.width / canvasBounding.width;
        scaleY = canvas.height / canvasBounding.height;
        points = new Array();
        lines = new Array();
        rects = new Array();
        circle = new Array();
      }
    }
    reader.readAsDataURL(file);

  }


}

fileInput.addEventListener("change", loadImage);