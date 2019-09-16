const path = require('path');

module.exports = options => {
  console.log('options', options);

  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-less',
        options: {
          javascriptEnabled: true,
        },
      },
      {
        resolve: 'gatsby-plugin-antd',
        options: {
          style: true,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: 'docs',
          name: 'docs',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: 'components',
          name: 'components',
        },
      },
      {
        resolve: 'gatsby-transformer-remark-antd',
        options: {
          plugins: [
            {
              resolve: path.resolve(
                __dirname,
                './plugins/gatsby-remark-header-custom-ids'
              ),
            },
            {
              resolve: path.resolve(
                __dirname,
                './plugins/gatsby-remark-img-warpper-p'
              ),
            },
            {
              resolve: 'gatsby-remark-prismjs',
              options: {
                noInlineHighlight: true,
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 786,
              },
            },
            'gatsby-remark-copy-linked-files',
          ],
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
    ],
  };
};
