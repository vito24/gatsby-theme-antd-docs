const { resolve } = require("path");

module.exports = async ({ graphql, actions }, themeConfig) => {
  console.log('^^^^themeConfig^^^^', themeConfig)
  const { createPage, createRedirect } = actions;

  const docsTemplate = resolve(__dirname, "../src/templates/docs.js");
  const componentsTemplate = resolve(
    __dirname,
    "../src/templates/components.js"
  );

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
                underScoreCasePath
                path
              }
            }
          }
        }
      }
    `
  );

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);

    throw Error(allMarkdown.errors);
  }
  const redirects = {};

  const edges = allMarkdown.data.allMarkdownRemark.edges;
  edges.forEach(edge => {
    const { slug, underScoreCasePath, path: mdPath } = edge.node.fields;
    if (slug.includes("docs/") || slug.includes("components/")) {
      let template = docsTemplate;
      if (slug.includes("components/")) {
        template = componentsTemplate;
      }
      const createArticlePage = path => {
        if (underScoreCasePath !== path) {
          redirects[underScoreCasePath] = path;
        }

        const demoQuery = slug
          .split(".")
          .shift()
          .split("/")
          .pop()
          .replace("-cn", "");

        if (
          !slug.includes("demo/") &&
          !mdPath.includes(".zh-CN") &&
          !mdPath.includes(".en-US")
        ) {
          createPage({
            path: `${path}-cn`,
            component: template,
            context: {
              slug,
              demo: `/${demoQuery}/demo/`,
              themeConfig
            }
          });
        }
        return createPage({
          path,
          component: template,
          context: {
            slug,
            demo: `/${demoQuery}/demo/`,
            themeConfig
          }
        });
      };

      // Register primary URL.
      createArticlePage(slug.replace("/index", ""));
    }
  });

  // homepage
  const indexTemplate = resolve(__dirname, "../src/templates/home.js");

  createPage({
    path: "/index",
    component: indexTemplate,
    context: {
      themeConfig
    }
  });

  createPage({
    path: "/index-cn",
    component: indexTemplate,
    context: {
      themeConfig
    }
  });

  // Redirect /index.html to root.
  createRedirect({
    fromPath: "/",
    redirectInBrowser: true,
    toPath: "/index"
  });

  // Redirect /index.html to root.
  createRedirect({
    fromPath: "/index.html",
    redirectInBrowser: true,
    toPath: "/index"
  });

  Object.keys(redirects).map(path =>
    createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path]
    })
  );
};
