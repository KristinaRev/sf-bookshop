const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPligin = require ('html-webpack-plugin');
const TerserWebpackPlugin = require ('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require ('css-minimizer-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPligin(),
        new  TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin()
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
