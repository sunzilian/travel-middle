const webpack = require('webpack')

module.exports = {
    publicPath: './',
    devServer: {
        port: 9090
    },
    chainWebpack: config => {
        config
        .plugin('provide')
        .use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill'
        }]);
    }, 
};