const path = require('path');

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        example: path.resolve(__dirname, '../components/'),
      },
    },
  });
};
