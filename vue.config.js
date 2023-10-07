const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8126,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  }
})
