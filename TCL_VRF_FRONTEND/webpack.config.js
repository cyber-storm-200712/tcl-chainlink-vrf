const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const DIST = path.resolve(__dirname, 'dist')

module.exports = {
    node: {
        fs: 'empty'
    },
    mode: 'development',
    entry: './src/server.js',
    output: {
        filename: 'bundle.js',
        path: DIST,
        publicPath: DIST,
    },
      
   
    devServer: {
        contentBase: DIST,
        host: "0.0.0.0",
        port: 9011,
        writeToDisk: true,

    },
  
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

        // for build scripts
        new CopyPlugin({
            patterns: [{
                flatten: true,  
                from: './src/*',
                globOptions: {
                    ignore: ['**/*.js'],
                },
            }, {
                flatten: false,
                from: './src',
            }],
        }),
    ],
}