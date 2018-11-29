import axios from 'axios';

// 增加默认请求路径，本地测试用
axios.defaults.baseURL = 'http://localhost:3200';

// 拦截器
axios.interceptors.response.use((res) => {
    // 在这里统一拦截结果，把结果处理成res.data
    return res.data;
});

export const fnGetSlides = () => {
    return axios.get('/slider');
};

// 按需读取游戏
export const fnGetCategoryGames = (category) => {
    if(category){
        return axios.get(`/game?category=${category}`);
    }else{
        return axios.get('/game');
    }
};

// 首页加loading
export const fnShowLoading = () => {
    return axios.all([fnGetSlides(), fnGetCategoryGames()]);
};

// 通过id找到某个游戏
export const fnGetGame = (category, id) => {
    return axios.get(`/detail?category=${category}&id=${id}`);
};

// 每次加载`offset`条数据
export const fnLoadMore = (category, offset) => {
    return axios.get(`/page?offset=${offset}&category=${category}`);
};