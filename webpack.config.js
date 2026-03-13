// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",              // твой главный JS-файл
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,                        // очищает dist перед сборкой
  },
  mode: "development",                  // можно поменять на "production"
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,                         // сайт откроется на http://localhost:3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,                  // прогоняем JS через Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,                 // прогоняем CSS через PostCSS (Tailwind)
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",  // твой html-шаблон
    }),
  ],
  resolve: {
    extensions: [".js"],                // чтобы можно было писать import без расширения
  },
};
