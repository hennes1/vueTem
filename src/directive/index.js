import Vue from 'vue';

// 注册一个全局自定义指令 `v-title`，可以指定页面标题
const title = Vue.directive('title', function (el, binding) {
    document.title = binding.value || binding.expression;
});

// 表单获取焦点指令：`v-focus`
const focus = Vue.directive('focus', function (el) {
    el.focus();
});

// 表单获取/失去焦点的样式
const sysFocus = Vue.directive('sysFocus', function(el){
    let sysInput = el.querySelector('input');
    sysInput.onfocus = function(){
        sysInput.style.borderColor = '#FFBC00';
    };
    sysInput.onblur = function(){
        sysInput.style.borderColor = '#D1D1D1';
    };
});

export { title, focus, sysFocus };