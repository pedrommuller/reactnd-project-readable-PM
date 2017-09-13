const webpack = require('webpack')
module.exports = {
    context:__dirname,
    entry:  [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './app/Index.js',
      ],
    output: {
        path: __dirname + '/public',
        publicPath:'/',
        filename: 'bundle.js'
    },
    target:'web',
    devtool:'#source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
              test: /\.jsx$/,
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
              loader: "file-loader?name=app/images/[name].[ext]"
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ]
};
