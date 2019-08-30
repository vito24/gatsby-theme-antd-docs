module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-antd-docs',
      options: {
        logo: '/images/logo.svg',
        docSearchConfig: {
          apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
          indexName: 'ant_design',
        },
        github: 'https://github.com/vito24/gatsby-theme-antd-docs/edit/master/',
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
