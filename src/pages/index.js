import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatReadingTime } from "../utils/helpers"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout
            location={location}
            title={siteTitle}
        >
            <SEO title="All posts" />
            {/* <Bio /> */}
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                    <article
                        key={node.fields.slug}
                        style={{
                            marginBottom: rhythm(3.5),
                        }}
                    >
                        <header>
                            <h1
                                style={{
                                    marginBottom: rhythm(2 / 4),
                                    marginTop: 0,
                                }}
                            >
                                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                                    {title}
                                </Link>
                            </h1>
                            <section>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: node.frontmatter.description || node.excerpt,
                                    }}
                                />
                            </section>
                            {node.frontmatter.cover && (
                                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                                    <Image
                                        sizes={node.frontmatter.cover.childImageSharp.sizes}
                                    />
                                </Link>
                            )}
                            <small>
                                {node.frontmatter.date}
                                {` • ${formatReadingTime(node.timeToRead)}`}
                            </small>
                        </header>
                    </article>
                )
            })}
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              publicURL
              childImageSharp {
                sizes(maxWidth: 2000) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
