import Vue from 'vue';
import Home from '../components/Home.vue';
import Game from '../components/Game.vue';
import Detail from '../components/Detail.vue';
import Login from '../components/Login.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({ //resolve => require(['../components/Home.vue'], resolve)
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home, meta: {keepAlive: true}},
        {path: '/game/:category', component: Game, name: 'game'},
        {path: '/detail/:category/:id', component: Detail, name: 'detail', meta: {auth: 0}},
        {path: '/login', component: Login}
    ]
});

