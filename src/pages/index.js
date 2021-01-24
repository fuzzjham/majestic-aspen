import React from "react";
import { graphql, navigate, withPrefix } from "gatsby";
import { getUserLangKey } from "ptz-i18n";

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args);

    // Skip build, Browsers only
    if (typeof window !== "undefined") {
      const edges = args.data.allContentfulLocale.edges;
      const langs = edges.map(edge => edge.node.code);
      const langKey = getUserLangKey(langs, "en");
      const homeUrl = withPrefix(`/${langKey}/`);

      navigate(homeUrl);
    }
  }

  render() {
    // It's recommended to add your SEO solution in here for bots
    // eg. https://github.com/ahimsayogajp/ahimsayoga-gatsby/blob/master/src/pages/index.js#L22
    return <div />;
  }
}

export default RedirectIndex;

export const pageQuery = graphql`
  query {
    allContentfulLocale {
      edges {
        node {
          code
        }
      }
    }
  }
`;
