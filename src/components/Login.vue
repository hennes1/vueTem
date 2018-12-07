<template>
    <div class="category-contain pd-top" v-title="title">
        <div class="page-contain">
            <div class="page-body">
                <h5 class="form-tle">登录/注册</h5>
                <div class="form-panel">
                    <p class="form-item" v-sysFocus>
                        <input type="text" class="form-control" v-model.trim="user.name" id="user_name" placeholder="请输入手机号作为用户名" maxlength="11" @keypress="press">
                    </p>
                    <p class="form-item" v-sysFocus>
                        <input type="password" class="form-control" v-model.trim="user.pwd" id="user_pwd" maxlength="18" minlength="6" placeholder="请输入用户密码" autocomplete="off">
                    </p>
                    <p class="explain">如果是第一次登录本网站，注册即登录。</p>
                    <p class="form-item">
                        <button class="form-btn" @click="checkForm">登录</button>
                    </p>
                </div>
            </div>
        </div>
        <!--/ login panel end -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
            	title: '登录/注册',
                user: [],
                isLogin: parseInt(localStorage.getItem('isLogin')) || 0,
                userStorage: JSON.parse(localStorage.getItem('userLogin')) || null
            }
        },
        methods: {
            checkForm(e){
                let phoneIpt = document.getElementById('user_name'), pwdIpt = document.getElementById('user_pwd');
                let name = this.user.name, pwd = this.user.pwd;
                if(!name){
                    this.$Layer('请输入手机号');
                    phoneIpt.focus();
                    return false;
                }else if(!this.validPhone(name)){
                    this.$Layer('请输入正确的手机号');
                    phoneIpt.focus();
                    return false;
                }
                if(!pwd){
                    this.$Layer('请输入用户密码');
                    pwdIpt.focus();
                    return false;
                }else if(!this.validChart(pwd)){
                    this.$Layer('密码格式：数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符', 3000);
                    pwdIpt.focus();
                    return false;
                }

                let userJson = {'name': name, 'pwd': pwd};
                if(this.userStorage){
                    let that = this;
                    let isStorage = that.userStorage.some(item => item.name === userJson.name && item.pwd === userJson.pwd);
                    let isSameName = that.userStorage.some(item => item.name === userJson.name && item.pwd !== userJson.pwd);
                    if(isStorage){
                        this.$Layer('成功登录');
                    }else{
                        if(isSameName){
                            this.$Layer('该账号已注册过');
                            return false;
                        }
                        this.$Layer('注册成功并登录');
                        that.userStorage.push(userJson);
                        localStorage.setItem('userLogin', JSON.stringify(that.userStorage));
                    }
                    that.isLogin = 1;
                    localStorage.setItem('isLogin', '1');
                    localStorage.setItem('currUser', userJson.name);
                    that.$router.go(-1);
                }else{
                    this.$Layer('注册成功并登录');
                    this.user.push(userJson);
                    localStorage.setItem('userLogin', JSON.stringify(this.user));
                    this.isLogin = 1;
                    localStorage.setItem('isLogin', '1');
                    localStorage.setItem('currUser', userJson.name);
                    this.$router.go(-1);
                    return false;
                }
                e.preventDefault();
            },
            validChart(v){
                // 能匹配的组合为：数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，
                // 不能是纯数字，纯字母，纯特殊字符
                // 限定特殊字符，例如，特殊字符的范围为 !#$%^&*
                let regExp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,18}$/;
                return regExp.test(v);
            },
            validPhone(v){
                let phoneExp = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
                return phoneExp.test(v);
            },
            press(){
                let keyCode = event.keyCode;
                event.returnValue = keyCode >= 48 && keyCode <= 57;
            }
        }
    }
</script>

<style lang="less" scoped>
    .pd-top{ padding-top: 1.6rem}
    .page-body{ padding: 0 .8rem}
    .form-tle{
        font-size: 1.2rem;
        text-align: center;
        margin: 0 0 1rem;
    }
    .explain{
        color: #00f;
        font-size: .7rem;
        margin: .5rem .8rem 0;
    }
    .form-item{
        height: 2rem;
        margin-top: 1rem;
        input{
            background: #fff;
            border: 1px solid #D1D1D1;
            border-radius: 1rem;
            box-sizing: border-box;
            color: #BFBFBF;
            font-size: .8rem;
            width: 100%;
            height: 100%;
            padding: 0 .8rem;
            outline: none;
        }
    }
    .form-item:last-child{ margin-top: .5rem; margin-bottom: 1rem}
    .form-btn {
        background: #FFBC00;
        border: none;
        border-radius: .3rem;
        color: #FFF;
        cursor: pointer;
        font-family: 'Microsoft YaHei';
        outline: none;
        font-size: .9rem;
        width: 100%;
        height: 100%;
    }
</style>