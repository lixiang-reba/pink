window.addEventListener('load', function () {
    var preview_img = this.document.querySelector('.preview_img');
    var mask = this.document.querySelector('.mask');
    var bigMask = this.document.querySelector('.bigMask');
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        bigMask.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        bigMask.style.display = 'none';
    })
    // 为什么不能写在上面的click中?
    preview_img.addEventListener('mousemove', function (e) {
        // big的父亲没有定位的前提下 offset才是我们想要的
        var maskX = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
        var maskY = e.pageY - this.offsetTop - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 遮挡层移动距离 / 遮挡层最大移动距离 = 大图片移动距离 / 大图片最大移动距离
        // 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离 
        var bigImg = document.querySelector('.bigImg');
        // 是正方形  所以宽高都可以
        var bigMax = bigImg.offsetWidth - bigMask.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})
