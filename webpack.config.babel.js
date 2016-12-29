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
    'react',
];

const dataVendorEntries = [
    'babel-polyfill',
    'react-dom',
    'immutable',
    'redux',
    'react-redux'
]

module.exports = [
    {
        entry:
        {
            ui_module: uiVendorEntries,
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
            new webpack.optimize.CommonsChunkPlugin({
                names: ['ui_module']
            })
        ],
    },
    {
        entry:
        {
            data_module: dataVendorEntries,
            discard: path.join(PATHS.lib, 'shim_entry.js')
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
            new webpack.optimize.CommonsChunkPlugin({
                names: ['data_module'],
                entries: dataVendorEntries
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['discard'],
                entries: uiVendorEntries
            })
        ],
    }

]
