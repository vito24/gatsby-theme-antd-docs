module.exports = {
  pathPrefix: '/gatsby-theme-antd-docs',
  plugins: [
    {
      resolve: 'gatsby-theme-antd-docs',
      options: {
        logo: '/images/logo.svg',
        docSearchConfig: {
          apiKey: '',
          indexName: 'gatsby-theme-antd-docs',
        },
        github: 'https://github.com/vito24/gatsby-theme-antd-docs/edit/master/www/',
        'zh-CN': {
          'app.header.slogan': '快速构建文档站点',
        },
        'en-US': {
          'app.header.slogan': 'Quickly build document site',
        },
      },
    },
  ],
};
