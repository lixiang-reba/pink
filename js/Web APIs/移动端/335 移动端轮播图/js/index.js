// window.addEventListener('load', function () {
//     var focus = document.querySelector('.focus');
//     var ul = focus.children[0];
//     var w = focus.offsetWidth;
//     var ol = focus.children[1];
//     var index = 0;
//     // 自动播放
//     var timer = setInterval(function () {
//         index++;
//         var translatex = -index * w;
//         ul.style.transition = 'all .3s';
//         ul.style.transform = 'translateX(' + translatex + 'px)';
//     }, 2000);
//     ul.addEventListener('transitionend', function () {
//         // 无缝滚动
//         if (index >= 3) {
//             ul.style.transition = 'none';
//             index = 0;
//             var translatex = -index * w;
//             ul.style.transform = 'translateX(' + translatex + 'px)';
//         } else if (index < 0) {
//             ul.style.transition = 'none';
//             index = 2;
//             var translatex = -index * w;
//             ul.style.transform = 'translateX(' + translatex + 'px)';
//         }
//         // 小圆点跟随变化
//         ol.querySelector('.current').classList.remove('current');
//         ol.children[index].classList.add('current');
//     })
//     // 手指滑动轮播图
//     // 触摸元素 touchstart：获取手指初始坐标
//     // 移动手指 touchmove：计算手指的滑动距离，并且移动盒子
//     // 离开手指 touchend: 根据滑动的距离分不同的情况
//     // 如果移动距离小于 某个像素  就回弹原来位置
//     // 如果移动距离大于某个像素就上一张下一张滑动。 
//     // 滑动也分为左滑动和右滑动 判断的标准是 移动距离正负 如果是负值就是左滑 反之右滑 
//     // 如果是左滑 就播放下一张 （index++）
//     // 如果是右滑 就播放上一张  (index--)
//     var startX = 0;
//     var moveX = 0;
//     // 如果只点击 没移动就不需要触发touchend
//     var flag = false;
//     ul.addEventListener('touchstart', function (e) {
//         startX = e.targetTouches[0].pageX;
//         clearInterval(timer);
//     })
//     ul.addEventListener('touchmove', function (e) {
//         moveX = e.targetTouches[0].pageX - startX;
//         var translatex = -index * w + moveX;
//         ul.style.transition = 'none';
//         ul.style.transform = 'translateX(' + translatex + 'px)';
//         flag = true;
//         e.preventDefault();
//     })
//     ul.addEventListener('touchend', function (e) {
//         if (flag) {
//             if (Math.abs(moveX) > 50) {
//                 if (moveX > 0) {
//                     index--;
//                 } else {
//                     index++;
//                 }
//                 var translatex = -index * w;
//                 ul.style.transition = 'all .3s';
//                 ul.style.transform = 'translateX(' + translatex + 'px)';
//             } else {
//                 var translatex = -index * w;
//                 ul.style.transition = 'all .3s';
//                 ul.style.transform = 'translateX(' + translatex + 'px)';
//             }
//         }
//         clearInterval(timer);
//         timer = setInterval(function () {
//             index++;
//             var translatex = -index * w;
//             ul.style.transition = 'all .3s';
//             ul.style.transform = 'translateX(' + translatex + 'px)';
//         }, 2000);
//     });
//     // 返回顶部
//     var goBack = document.querySelector('.goBack');
//     var nav = document.querySelector('nav');
//     window.addEventListener('scroll', function() {
//         if (window.pageYOffset >= nav.offsetTop) {
//             goBack.style.display = 'block';
//         } else {
//             goBack.style.display = 'none';
//         }
//     });
//     goBack.addEventListener('click', function(){
//         window.scroll(0, 0);
//     })
// })
window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.clientWidth;
    var index = 0;
    // 自动播放
    var timer = this.setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000)
    // 无缝滚动
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            var translatex = -index * w;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            var translatex = -index * w;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 小圆点跟随
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })
    // 手指滑动轮播
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault();
        flag = true;
    })
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 开启定时器之前 先清除之前的定时器 
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000)
    })
    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'block';
        }
    })
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })
})