module.exports = ({ stage, actions, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /docsearch.js/,
            use: loaders.null(),
          }
        ],
      },
    });
    return;
  }
};
