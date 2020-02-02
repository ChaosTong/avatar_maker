// let timer = null
// let startTime = ''
// let endTime = ''
// const label = document.getElementById('avatar_template')
let imgLoadPreview = document.getElementById("canvas-img")
// label.addEventListener('touchstart', function () {
//     startTime = +new Date()
//     var canvas = document.getElementById('cvs');
//     var image = canvas.toDataURL("image/png")
//     label.setAttribute("crossOrigin",'Anonymous')
//     label.src = image;
//     timer = setTimeout(function () {
//         // deleteBtn.style.display = 'block'
//         // alert('xx');
//     }, 700)
// })

// label.addEventListener('touchend', function () {
//   endTime = +new Date()
//   clearTimeout(timer)
//   if (endTime - startTime < 700) {
//     // 处理点击事件
//     // label.classList.add('selected')
//     // alert('00');
//   }
// })

document.getElementById('download').onclick = function(ev) {
    if (document.getElementById('avatar_img').src == '') 
        return alert('你还没选头像呢');

    var canvas = document.getElementById('cvs');
    var image = canvas.toDataURL("image/png")

    var save_link = document.createElement('a');
    save_link.href = image;
    save_link.download ='avatar.png';
                        
    var clickevent = document.createEvent('MouseEvents');
    clickevent.initEvent('click', true, false);
    save_link.dispatchEvent(clickevent);
}

document.getElementById('prev').onclick = function(ev) {
    var current = parseInt(document.getElementById('avatar_template').alt);
    current = (current - 1 + 4) % 4;
    document.getElementById('avatar_template').src = 'img/head' + current + '.png';
    document.getElementById('avatar_template').alt = current;
    loadImage();
}

document.getElementById('next').onclick = function(ev) {
    var current = parseInt(document.getElementById('avatar_template').alt);
    current = (current + 1) % 4;
    document.getElementById('avatar_template').src = 'img/head' + current + '.png';
    document.getElementById('avatar_template').alt = current;
    loadImage();
}

function loadImage() {
    if(document.getElementById('upload').files.length == 0) return
    var imgUrl = window.URL.createObjectURL(document.getElementById('upload').files[0]);
    document.getElementById('avatar_img').src = imgUrl;
    imgLoadPreview.style.display='none'
    drawToCanvas(imgUrl, document.getElementById('avatar_template').src);
}

function drawToCanvas(img1, img2){
    var size=300
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d')
    var devicePixelRatio = window.devicePixelRatio || 1
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                              ctx.mozBackingStorePixelRatio ||
                              ctx.msBackingStorePixelRatio ||
                              ctx.oBackingStorePixelRatio ||
                              ctx.backingStorePixelRatio || 1
    var ratio = devicePixelRatio / backingStoreRatio;		                    
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    cvs.width = size*ratio;
    cvs.height = size*ratio;
    ctx.scale(ratio,ratio)

    var image1 = new Image;
    image1.setAttribute("crossOrigin",'Anonymous')
    image1.src = img1;
    image1.onload = function() {
        var width = image1.width < image1.height ? size : size * (image1.width / image1.height);
        var height = image1.width > image1.height ? size : size * (image1.height / image1.width);
        var x = image1.width < image1.height ? 0 : (size * (image1.width / image1.height) - size) / 2;
        var y = image1.width > image1.height ? 0 : (size * (image1.height / image1.width) - size) / 2;

        document.getElementById('avatar_img').style.width = width + 'px';
        document.getElementById('avatar_img').style.height = height + 'px';
        document.getElementById('avatar_img').style.marginLeft = -x + 'px';
        document.getElementById('avatar_img').style.marginTop = -y + 'px';

        ctx.drawImage(image1, -x, -y, width, height);
        var image2 = new Image;
        image2.setAttribute("crossOrigin",'Anonymous')
        image2.src = img2;
        image2.onload = function() {
            ctx.drawImage(image2, 0, 0, size, size);
            window.setTimeout(function(){
                imgLoadPreview.src = cvs.toDataURL("image/png")
                imgLoadPreview.style.display='block'
            },2000)
        }
    
    }
}