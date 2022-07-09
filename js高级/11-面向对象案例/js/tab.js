// 功能需求:
// 点击 tab栏,可以切换效果.
// 点击 + 号, 可以添加 tab 项和内容项.
// 点击 x 号, 可以删除当前的tab项和内容项.
// 双击tab项文字或者内容项文字,可以修改里面的文字内容.

// 抽象对象: Tab 对象 
// 该对象具有切换功能
// 该对象具有添加功能
// 该对象具有删除功能
// 该对象具有修改功能
var that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.children[0].children[0];
        // section的父元素
        this.fsection = this.main.children[1];
        this.init();
    }
    init() {
        this.updateNode();
        // init初始化存放所有的事件绑定
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            // 绑定双击事件
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 更新所有的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    // 1 切换
    toggleTab() {
        that.cleaClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 移除类函数
    cleaClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2 添加
    addTab() {
        that.cleaClass();
        // (1) 创建li元素和section元素
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = ' <section class="conactive">新选项卡</section>';
        // (2) 把两个元素追加到对应的父元素里面
        // 利用 insertAdjacentHTML() 可以直接把字符串格式元素添加到父元素中   insertAdjacentHTML(追加的位置,‘要追加的字符串元素’)  
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3 删除
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;
        // remove方法可以直接删除  不需要用removechild
        that.lis[index].remove();
        that.sections[index].remove();
        // 删除了选定li以后  让他的前一个处于选中状态
        if (document.querySelector('.liactive')) {
            return;
        }
        index--;
        // 手动调用点击事件 不需要鼠标触发
        // 如果index等于-1  则不执行后续操作
        that.lis[index] && that.lis[index].click();
    }
    // 4 修改
    editTab() {
        var str = this.innerHTML;
        // 双击禁止选定文字(默认选中)
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text">';
        var input = this.children[0];
        input.value = str;
        input.select();// 文本框里的文字处于选定状态
        // 离开文本框  就把里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以把文本框里的值给span
        input.onkeyup = function(e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        }
    } 
}
var tab = new Tab('#tab');
// var that;
// class Tab {
//     constructor(id) {
//         // that = this;
//         this.main = document.querySelector(id);
//         this.add = this.main.querySelector('.fisrstnav .tabadd');
//         this.ul = this.main.querySelector('.fisrstnav ul');
//         this.fsections = this.main.querySelector('.tabscon');
//         this.init();
//     }
//     init() {
//         this.updateNode();
//         // init初始化存放所有的事件绑定
//         this.add.onclick = this.addTab.bind(this.add, this);
//         for (var i = 0; i < this.lis.length; i++) {
//             this.lis[i].index = i;
//             console.log(i);
//             this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
//             this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
//             this.spans[i].ondblclick = this.editTab;
//         }
//     }
//     updateNode() {
//         this.lis = this.main.querySelectorAll('li');
//         this.sections = this.main.querySelectorAll('section');
//         this.remove = this.main.querySelectorAll('.fisrstnav .icon-guanbi');
//         this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
//     }
//     clearClass() {
//         for (var i = 0; i < this.lis.length; i++) {
//             this.lis[i].className = '';
//             this.sections[i].className = '';
//         }
//     }
//     toggleTab(that) {
//         that.clearClass();
//         this.className = 'liactive';
//         that.sections[this.index].className = 'conactive';
//     }
//     addTab(that) {
//         that.clearClass();
//         var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
//         var section = ' <section class="conactive">新选项卡</section>';
//         that.ul.insertAdjacentHTML('beforeend', li);
//         that.fsections.insertAdjacentHTML('beforeend', section);
//         that.init();
//     }
//     removeTab(that,e) {
//         e.stopPropagation();
//         var index = this.parentNode.index;
//         that.lis[index].remove();
//         that.sections[index].remove();
//         if (document.querySelector('.liactive')) return;
//         index--;
//         that.lis[index] && that.lis[index].click();
//     }
//     editTab(e) {
//         var str = this.innerHTML;
//         window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
//         this.innerHTML = '<input type="text" name="" id="">';
//         var input = this.children[0];
//         input.value = str;
//         input.select();
//         input.onblur = function () {
//             this.parentNode.innerHTML = this.value;
//         }
//         input.onkeyup = function (e) {
//             if (e.keyCode === 13) {
//                 this.blur();
//             }
//         }
//     }
// }
// var tab = new Tab('#tab');