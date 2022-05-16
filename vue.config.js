module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://pv.sohu.com/cityjson',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/apiposition': {
        target: 'http://api.ip138.com/ip/',
        changeOrigin: true,
        pathRewrite: {
          '^/apiposition': '',
        },
      },
    },
    historyApiFallback: true,
  },
}
