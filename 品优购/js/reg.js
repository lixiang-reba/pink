window.onload = function() {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regmes = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/
    var tel = document.querySelector('#tel');
    var mes = document.querySelector('#mes');
    var pwd = document.querySelector('#pwd');
    var sure = document.querySelector('#sure');
    regexp(tel,regtel);
    regexp(mes,regmes);
    regexp(pwd,regpwd);
    sure.onblur = function() {
        if(this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致';
        }
    }
    function regexp(ele,reg) {
        ele.onblur = function() {
            if(reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入:';
            }
        }
    }
}