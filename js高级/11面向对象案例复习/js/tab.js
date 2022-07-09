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
window.addEventListener('load', function () {
    class Tab {
        constructor(id) {
            this.main = document.querySelector(id);
            this.con = this.main.querySelector('.con');
            this.add = this.main.querySelector('header .add');
            this.header = this.main.querySelector('header');
            this.init();
        }
        init() {
            this.updateNode();
            this.add.onclick = this.addTab.bind(this.add, this);
            for (let i = 0; i < this.divs.length; i++) {
                this.divs[i].index = i;
                this.divs[i].onclick = this.toggleTab.bind(this.divs[i], this);
                this.dels[i].onclick = this.removeTab.bind(this.dels[i], this);
                this.spans[i].ondblclick = this.editTab;
            }

        }
        updateNode() {
            this.divs = this.main.querySelectorAll('header div');
            this.dels = this.main.querySelectorAll('.del');
            this.spans = this.main.querySelectorAll('header div span:first-child');
        }
        toggleTab(that) {
            for (let i = 0; i < that.divs.length; i++) {
                that.divs[i].className = '';
            }
            this.className = 'slected';
            that.con.innerHTML = this.innerHTML;
        }
        addTab(that) {
            let random = Math.random();
            let div = '<div class="test-1"> <span>新选项卡</span> <span class="del">×</span></div>';
            this.insertAdjacentHTML('beforebegin',div);
            let con = '<div class="con">新选项卡'+random+'</div>';
            that.con.insertAdjacentHTML('afterend',con);
            that.init();
        }
        removeTab(that, e) {
            e.stopPropagation();
            that.header.removeChild(this.parentNode);
            let index = this.parentNode.index;
            if (index > 0) {
                that.divs[index - 1].click();
            } else {
                that.con.innerHTML = '';
            }
        }
        editTab(e) {
            this.innerHTML = '<input type="text">';
        }
    }
    let tab = new Tab('#tab');
})