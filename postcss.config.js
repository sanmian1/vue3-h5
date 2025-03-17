module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375, // 设计稿的宽度
            unitPrecision: 5, // 转换后的精度，即小数点位数
            viewportUnit: 'vw', // 希望使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器
            minPixelValue: 1, // 小于或等于`1px`不转换为视口单位
            mediaQuery: false, // 允许在媒体查询中转换`px`
        },
    },
};