import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatReadingTime } from "../utils/helpers"
import style from './index.module.scss'

const renderPost = (post, index) => {
    const title = post.frontmatter.title || post.fields.slug


    if (index === 0) {
        return (
            <article
                key={post.fields.slug}
                className={style.mainArticle}
            >
                <header>
                    <h1
                        style={{
                            marginBottom: rhythm(2 / 4),
                            marginTop: 0,
                        }}
                    >
                        <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                            {title}
                        </Link>
                    </h1>
                    <section>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: post.frontmatter.description || post.excerpt,
                            }}
                        />
                    </section>
                    {post.frontmatter.cover && (
                        <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                            <Image
                                sizes={post.frontmatter.cover.childImageSharp.sizes}
                            />
                        </Link>
                    )}
                    <small>
                        {post.frontmatter.date}
                        {` • ${formatReadingTime(post.timeToRead)}`}
                    </small>
                </header>
            </article>
        )
    }

    return (
        <article
            key={post.fields.slug}
            className={style.secondaryArticle}
            // style={getSecondaryStyles(index)}
        >
            <header>
                <h3
                    style={{
                        marginBottom: rhythm(2 / 4),
                        marginTop: 0,
                    }}
                >
                    <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                        {title}
                    </Link>
                </h3>
                <section>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt,
                        }}
                    />
                </section>
                {post.frontmatter.cover && (
                    <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                        <Image
                            objectFit="cover"
                            sizes={post.frontmatter.cover.childImageSharp.sizes}
                            imgStyle={{
                                // height: '12em',
                            }}
                        />
                    </Link>
                )}
                <small>
                    {post.frontmatter.date}
                    {` • ${formatReadingTime(post.timeToRead)}`}
                </small>
            </header>
        </article>
    )
}

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
            <div className={style.articles}>
                {posts.map(({ node }, i) => {
                    return renderPost(node, i)
                })}
            </div>
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
                fixed(width: 125, height: 125) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
