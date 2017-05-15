import webpack from 'webpack'
import {join} from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const ENV = process.env.NODE_ENV || 'development'

const entry = ENV === 'production' ?
  [
    join(__dirname, 'app', 'index.js')
  ] : [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    join(__dirname, 'app', 'index.js')
  ]

let output = {
  path: join(__dirname, 'dist'),
  filename: 'bundle.js',
}

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: join(__dirname, 'app', 'index.html'),
    inject: 'body'
  })
]

if (ENV !== 'production') {
  output.publicPath = 'http://localhost:8081/'
}

export default {
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['es2015', {modules: false}], 'stage-0', 'react'],
          plugins: ['react-hot-loader/babel']
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'url-loader?limit=10000&name=fonts/[name]-[hash].[ext]'
        ]
      },
    ]
  },
  plugins,
  devServer: {
    hot: true,
    stats: {
      colors: true,
      chunks: false
    },
    // proxy: {
    //   '/*': {
    //     target: 'http://localhost:4000',
    //     proxyTimeout: 3000
    //   }
    // },
    port: 8081
  },
  devtool: 'eval'
}
