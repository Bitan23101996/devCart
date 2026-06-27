const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.tsx',
    output: {
        publicPath: '/',
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
        ],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },

            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};