const fs = require('fs')

const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require ('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require ('css-minimizer-webpack-plugin')
const path = require("path");

const pagesDir = path.resolve(__dirname, 'src/templates/pages')
const pages = fs.readdirSync(pagesDir).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        ...pages.map(page => {
            return new HtmlWebpackPlugin ({
                template: `${pagesDir}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`
            })
        }),
        new  TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }//“pretty: true” — просим pug-loader расставить отступы и переносы строк (иначе получим весь html-код в одну строку).
            }, {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'eslint-loader'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|svg|mp4)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[path][name].[ext]'
                    }
                }
            },

        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        host: process.env.DEV_SERVER_HOST,
        port: process.env.DEV_SERVER_PORT
    },
}
