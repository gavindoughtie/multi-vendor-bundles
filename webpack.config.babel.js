import path from 'path';
import util from 'util';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

// The full paths to our various directories
const PATHS = {};
['lib', 'build'].forEach((pathName) => {
    PATHS[pathName] = path.join(__dirname, pathName);
});

const uiVendorEntries = [
    'babel-polyfill',
    'react',
    'react-dom',
];

const dataVendorEntries = [
    'immutable',
    'redux',
    'react-redux'
]

module.exports = {
    entry:
    {
        ui_module: path.join(PATHS.lib, 'ui_module'),
        data_module: path.join(PATHS.lib, 'data_module'),
        app: path.join(PATHS.lib, 'index.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output:
    {
        path: PATHS.build,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '' 
    },
    module:
    {
        rules:
        [ {
            test: /\.jsx?$/,
            use: [ {
                loader: 'babel-loader', options: {
                    cacheDirectory: true 
                } 
            } ],
            include: PATHS.lib 
        }],
    },
    plugins:
    [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"' 
        }),
        new HtmlWebpackPlugin({
            title: 'multi-vendor-bundles'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['ui_module', 'manifest'],
            entries: uiVendorEntries
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['data_module', 'manifest'],
            entries: dataVendorEntries
        })
    ],
}
