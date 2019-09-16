module.exports = async ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: '/docs',
    redirectInBrowser: true,
    toPath: '/docs/getting-started',
  });

  createRedirect({
    fromPath: '/docs-cn',
    redirectInBrowser: true,
    toPath: '/docs/getting-started-cn',
  });

  createRedirect({
    fromPath: '/components/',
    redirectInBrowser: true,
    toPath: '/components/button',
  });
};
