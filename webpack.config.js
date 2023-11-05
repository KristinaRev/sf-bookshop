const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: "index.html"
        }),
        new  TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }//“pretty: true” — просим pug-loader расставить отступы и переносы строк (иначе получим весь html-код в одну строку).
            }

        ]
    }
}
