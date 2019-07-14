const { override, fixBabelImports, addLessLoader } = require('customize-cra')

// 针对 ant 实现按需打包， 根据 import 来打包（使用babel-plugin-import）
module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true  // 自动打包相关的样式
    }),

    // 使用less-loader对源码中的less的变量重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    })
)