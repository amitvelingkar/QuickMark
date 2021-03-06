var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3'],
                    plugins: ['transform-class-properties']
                }
            },
            {
              test: /\.(s*)css$/,
              loaders: ['style-loader', 'css-loader', 'sass-loader'],
              include: __dirname + '/src'
            },
            {
                test: /\.svg$/,
                loaders: ['babel-loader', 'svg-react-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:7777',
                secure: false,
                changeOrigin: true,
            }
        },
    }
}