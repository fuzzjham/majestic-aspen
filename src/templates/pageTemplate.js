import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

import Section from "sections/section";

export const query = graphql`
  query($slug: String! = "/home", $node_locale: String! = "en") {
    contentfulLayout(slug: { eq: $slug }, node_locale: { eq: $node_locale }) {
      id
      slug
      title
      description
      contentful_id
      menu {
        name
        type
        menuItems {
          id
          title
          url
        }
      }
      contentModule {
        ... on Node {
          id
        }
        ... on ContentfulLayoutHero {
          id
          heading
          subheading
          description {
            description
          }
          ctaText
          ctaUrl
          image {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulLayoutAbout {
          id
          heading
          description {
            description
          }
          featureItem {
            id
            title
            icon
            description {
              description
            }
          }
          image {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulLayoutContact {
          id
          heading
          description {
            description
          }
          image {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulLayoutPricing {
          id
          heading
          description {
            description
          }
          pricingPlans {
            id
            title
            price
            perItem
            currency
            planFeatures
            buttonText
            buttonUrl
            featured
          }
        }
        ... on ContentfulLayoutServices {
          id
          heading
          description {
            description
          }
          serviceItems {
            id
            title
            description {
              description
            }
            image {
              fluid(quality: 100, maxWidth: 208, maxHeight: 146) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
        ... on ContentfulLayoutTestimonials {
          id
          heading
          description {
            description
          }
          testimonials {
            id
            name
            company
            comment {
              comment
            }
            image {
              fluid(quality: 100) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
        ... on ContentfulLayoutPageNotFound {
          id
          heading
          description {
            description
          }
          buttonText
          buttonUrl
          image {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export default function PageTemplate(props) {
  const { data, pageContext } = props;
  const title = data.contentfulLayout.title;
  const description = data.contentfulLayout.description;
  const menus = data.contentfulLayout.menu;
  const contentModule = data.contentfulLayout.contentModule;

  console.log("template data", data);
  console.log("template pageContext", pageContext);
  return (
    <Layout menus={menus} currentLocale={pageContext.node_locale}>
      <SEO
        title={title}
        description={description}
        lang={pageContext.node_locale}
      />
      {contentModule &&
        contentModule.length > 0 &&
        contentModule.map(content => (
          <Section
            contentModuleId={content.id}
            content={content}
            type={content.__typename}
            key={content.id}
          />
        ))}
    </Layout>
  );
}
