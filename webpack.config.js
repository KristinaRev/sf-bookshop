const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPligin = require ('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPligin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
}
