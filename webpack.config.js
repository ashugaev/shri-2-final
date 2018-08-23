// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js', //path relative to this file
    output: {
        filename: 'app.bundle.js' //path relative to this file
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    // plugins: [
    //     new ExtractTextPlugin('style.css')
    // ]

};