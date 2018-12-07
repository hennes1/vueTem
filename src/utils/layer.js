import Vue from 'vue';
import Layer from '../base/Layer.vue';

// 返回一个 扩展实例构造器
const LayerConstructor = Vue.extend(Layer);

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showLayer(text, duration = 1000) {
    // 实例化一个 Layer.vue
    const LayerDom = new LayerConstructor({
        el: document.createElement('div'),
        data() {
            return {
                msg: text,
                show: true
            }
        }
    });

    // 把实例化的 Layer.vue 添加到 body 里
    document.body.appendChild(LayerDom.$el);

    // 过了 duration 时间后隐藏
    setTimeout(() => {
        LayerDom.show = false
    }, duration);
}

// 注册为全局组件的函数
// 将组件注册到 Vue 的 原型链里去,
// 这样就可以在所有 Vue 的实例里面使用 this.$Layer()
function layerRegistry() {
    Vue.prototype.$Layer = showLayer;
}

export default layerRegistry;