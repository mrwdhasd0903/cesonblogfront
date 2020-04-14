module.exports = {
  // outputDir: 'admin',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'utils': '@/utils',
        'components': '@/components',
        'views': '@/views',
        'ajax': '@/ajax'
      }
    },
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'semantic': 'Semantic',
      'jquery': '$',
      'highlight.js':'hljs'
    }
  },
}