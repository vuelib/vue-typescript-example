const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        admin: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true,
                    loaders: {
                        'js': 'vue-ts-loader',
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build/*.*']),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/lib/vendor.json')
        })
    ]
};