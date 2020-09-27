// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        pragma: "dom", // default pragma is React.createElement (only in classic runtime)
      },
    ],
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
