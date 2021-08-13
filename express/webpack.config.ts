import path from "path";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";

module.exports = {
  mode: "development",
  target: "node",

  entry: {
    app: path.resolve(__dirname, "src", "index.ts"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".js", ".ts"],
  },

  externals: [nodeExternals()],
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  plugins: [new NodemonPlugin()],
};
