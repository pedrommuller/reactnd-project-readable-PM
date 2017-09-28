const webpack = require('webpack');
var path = require('path');
console.log(__dirname);
module.exports = {
    context:__dirname,
    entry:  [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
         './app/index.js',
      ],
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'bundle.js',
        publicPath:'/'
    },
    target:'web',
    devtool:'#source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
              test: /\.css$/,
              loaders: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'file-loader',
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: "file-loader?name=public/images/[name].[ext]"
            },
            {
              test: /react-icons\/(.)*(.js)$/,
              loader: 'babel-loader',
              include: path.resolve(__dirname, 'node_modules/react-icons')
            }
        ]
    },
    resolve:{
      alias:{
        images:path.resolve(__dirname, 'public/images')
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ]
};
