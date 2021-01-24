import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import sal from "sal.js";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, menus, headerCTA, currentLocale }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allContentfulLocale {
        edges {
          node {
            code
            name
          }
        }
      }
    }
  `);

  // Initialize scroll animations
  useEffect(() => {
    sal();
  }, []);

  return (
    <div className="wrapper overflow-hidden">
      <h1 className="hidden">{data.site.siteMetadata.title}</h1>
      <Header
        menus={menus}
        headerCTA={headerCTA}
        languages={data.allContentfulLocale.edges}
        currentLocale={currentLocale}
      />
      <div>{children}</div>
      <Footer menus={menus} />
    </div>
  );
};

Layout.defaultProps = {
  menus: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  menus: PropTypes.any,
};

export default Layout;
