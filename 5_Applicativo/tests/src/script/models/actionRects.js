
canvas.addEventListener("dblclick", function (e) {
    if (mouseRectsMode.checked) {
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        let r = isInARect(x,y);
        if(r >= 0){
            rects[r].isSelect = true;
            reDrawAll();
        }
    }
});

function isInARect(x, y) {
    for (var i = 0; i < rects.length; i++) {
        if (isInX(rects[i],x) && isInY(rects[i],y)) {
            return i;
        }
    }
    return -1;
}

function isInX(r,x){
    let c1 = r.startX;
    let c2 = r.startX + r.endX;
    if(isBetween(c1,c2,x)){
        return true;
    }
    return false;
}

function isInY(r,y){
    let c1 = r.startY;
    let c2 = r.startY + r.endY;
    if(isBetween(c1,c2,y)){
        return true;
    }
    return false;
}

function isBetween(c1, c2, p){
    if(c1 > c2){
        if(p > c2 && p < c1){
            return true;
        }
    }else{
        if(p > c1 && p < c2){
            return true;
        }
    }
    return false;
}