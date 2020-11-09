const port = 8080

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://172.0.0.1:18000', 
        // target: 'http://192.168.0.112:18000', // ccb测试用
        // 必须用双引号 //target: `http://localhost:${port}/mock`,
        // target: 'http://lspj.wmjsoft.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
}