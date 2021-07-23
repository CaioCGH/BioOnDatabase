
module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://bio-api:3000',
          changeOrigin: true
        },
      },
	disableHostCheck: true
    }
  }
