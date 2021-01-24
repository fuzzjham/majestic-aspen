const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const layoutTemplate = path.resolve(`src/templates/pageTemplate.js`);
  return graphql(`
    query {
      allContentfulLayout {
        edges {
          node {
            slug
            contentful_id
            node_locale
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    result.data.allContentfulLayout.edges.forEach(edge => {
        
      // We need a common ID to cycle between locales.
      const commonId = edge.node.contentful_id
      console.log('gatsby-node edge', edge);
      console.log('gatsby-node commonId', commonId);
      if (edge.node.slug === "404") {
        // for 404 page we use custom page at src/pages/404.js
        return;
      }
      createPage({
        path: `/${edge.node.node_locale}/${edge.node.slug}`,
        component: layoutTemplate,
        context: {
          slug: edge.node.slug,
          contentful_id: edge.node.contentful_id,
          node_locale: edge.node.node_locale
        },
      });
    });
  });
};
