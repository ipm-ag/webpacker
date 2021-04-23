/* eslint global-require: 0 */

const { canProcess, moduleExists } = require("./helpers");

const getStyleRule = (test, preprocessors = []) => {
  if (moduleExists("css-loader")) {
    const tryPostcss = () =>
      canProcess("postcss-loader", (loaderPath) => ({
        loader: loaderPath,
        options: { sourceMap: false },
      }));

    const use = [
      { loader: require("mini-css-extract-plugin").loader },
      {
        loader: require.resolve("css-loader"),
        options: {
          sourceMap: false,
          importLoaders: 2,
        },
      },
      tryPostcss(),
      ...preprocessors,
    ].filter(Boolean);

    return {
      test,
      use,
    };
  }

  return null;
};

module.exports = getStyleRule;
