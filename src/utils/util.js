export const setCategory = (name) => {
    let zhCate = '';
    switch (name){
        case 'hot':
            zhCate = '热门推荐';
            break;
        case 'new':
            zhCate = '新游推荐';
            break;
        case 'trend':
            zhCate = '潮流口袋必备';
            break;
        case 'standalone':
            zhCate = '单机游戏';
            break;
        case 'recharge':
            zhCate = '充值钜惠';
            break;
    }
    return zhCate;
};