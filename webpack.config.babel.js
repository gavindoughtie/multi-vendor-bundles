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
    'react-dom',
    'material-ui'
];

const dataVendorEntries = [
    'immutable',
    'redux',
    'react-redux'
]

module.exports = {
    entry:
    {
        ui_module: uiVendorEntries,
        data_module: dataVendorEntries,
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
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"' 
        // }),
        new HtmlWebpackPlugin({
            title: 'Chunk loading demo'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            chunks: ['data_module', 'ui_module', 'app'],
            minChunks: 2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
};
