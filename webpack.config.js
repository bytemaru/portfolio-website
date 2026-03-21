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
  static: [
    { directory: path.join(__dirname, 'dist') },
    { directory: path.join(__dirname, 'public') },
  ],
  hot: true,
  port: 3000,                       // сайт откроется на http://localhost:3000
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
              sourceType: "module"
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
  new HtmlWebpackPlugin({
    template: "./public/storytelling.html",
    filename: "storytelling.html",
  }),
  ],
  resolve: {
    extensions: [".js"],                // чтобы можно было писать import без расширения
  },
};
