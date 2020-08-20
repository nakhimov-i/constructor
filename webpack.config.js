const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// сравниваем наш режим разработки, в котором мы находимся на данный момент, с режимом dev (режим разработки)
//чтобы определить в каком режиме мы находимся на данный момент
// нам это нужно для одного лоадера
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
  const config = {
    //чтобы библиотеки не подключились каждый раз к новому файлу, а делали это единожды
    splitChunks: {
    chunks: 'all'
    }  
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin()
    ]      
  }
  return config   
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

//момент с тайпскриптом
const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}


const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}


// Main const
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
//const PAGES_DIR = PATHS.src
 


module.exports = {
 //? __dirname - текущая папка
  //из какой папки брать контент. Теперь мы можем при указании других путей, начинать писать путь, будто мы уже находимся в src
  context: path.resolve(__dirname, 'src'),
  //какой режим
  mode: 'development',
  //указываем входной файл, их может быть несколько
  entry: {
    main: [ '@babel/polyfill', PATHS.src],
  },
  output: {
    //файлы на выходе
    filename: filename('js'),
    path: PATHS.dist
  },
  resolve: {
    //расширение для импорта файлов (автоматическое определение, чтобы в импортах не писать post.js а можно было бы писать просто post)
    extensions: [".js", ".css", ".png"],
    //указывыет на корень приложения, чтобы сократить путь и писать @models вместо ../../../src/models
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src/models'),
    }
  },
  optimization: optimization(),
  //автоматическое обновление типа live server
  devServer: {
    port: 4400,
    hot: isDev,
    watchContentBase: true,
  },
  //source-map - возможность просмотра исходного кода в браузере
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new CleanWebpackPlugin(),
    //плагин для переноса файлов из src в dist, в данном случае мы переносим favicon
    new CopyWebpackPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, "src/static/favicon.ico"),
            to: path.resolve(__dirname, "dist")
          },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new HTMLWebpackPlugin({
      template: './static/index.html'
    }),
  ],
  
  module: {
    rules: [
      {
        // если тип файла совпадает с этим
        test: /\.css$/,
        // то надо использовать: (также стоит учитывать, что webpack идет справа налево, поэтому справа пишем css, который позволяет импортировать css файлы в js)
        //MiniCssExtractPlugin собирает все стили в один файл main.css
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //hmr - hot module replacement, что позволяет нам изменять сущности без перезагрузки страниц
              hmr: isDev,
              reloadAll: true
            },
          }, 
          'css-loader', 
          'sass-loader',  
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //hmr - hot module replacement, что позволяет нам изменять сущности без перезагрузки страниц
              hmr: isDev,
              reloadAll: true
            },
          }, 
          'css-loader', 
          'sass-loader',  
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|ttf|svg|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/, exclude: /node_modules/, 
        use: jsLoaders()
      }
    ]
  }
}