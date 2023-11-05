module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
}
