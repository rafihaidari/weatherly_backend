const path = require("path");

module.exports = {
  target: "node", // Set the target to 'node'
  mode: "development", // or 'production' for production mode
  entry: "./src/api.js", // Path to your server-side entry file
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "server.bundle.js", // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader", // Use Babel for transpiling
          options: {
            presets: ["@babel/preset-env"], // Use @babel/preset-env for modern JavaScript features
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"], // Resolve .js extensions automatically
  },
};
