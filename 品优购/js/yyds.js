
window.addEventListener('load', function () {
    // 鼠标经过与左右按钮
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = this.document.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        // 点击小圆圈跟随滚动
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 点击右侧按钮图片滚动
    var flag = true;
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        // 节流阀:防止点击事件过快
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 小圆圈跟随按钮
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    })
    // 点击左侧按钮图片滚动
    var num = 0;
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 小圆圈跟随按钮
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })
    // 自动播放
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
})
