// 轮播图制作
// js写在外部时  要加load事件
addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过停止自动播放
        clearInterval(timer);
        // 变量不用了 清空最合适
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 6 克隆ul 第一个li  cloneNode()   加true 深克隆 复制里面的子节点    false 浅克隆 
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
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
        circle++;
        // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circleChange();
        }
    })

    // 9 左侧：从最后一个图往回播
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                // left 千万不要忘记加px!!
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放 
            circleChange();
        }
    })
    function circleChange() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[num].className = 'current';
    }
    // 10. 自动播放轮播图  此时我们使用手动调用右侧按钮点击事件  arrow_r.click()
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)
})
