import React from "react"
import { Link, graphql, navigate } from "gatsby"
import Image from "gatsby-image"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"
import style from './index.module.scss'
import { formatReadingTime } from "../utils/helpers"
import Button from "../components/Button/components/Button"
import Container from "../components/Container"
import PageHeaderEffect from "../components/PageHeaderEffect"
import Column from "../components/Column"

const BlogPostTemplate = ({ data, pageContext, location }) => {
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    // const { previous, next } = pageContext

    return (
        <Layout
            location={location}
            title={siteTitle}
            cover={post.frontmatter.cover}
        >
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <PageHeaderEffect />
            <Container hasMargin>
                <Column>
                    <article className={style.article}>
                        <header>
                            <div className={style.specialNav}>
                                <h1>
                                    {post.frontmatter.title}
                                </h1>
                                <Link
                                    style={{
                                        fontSize: '1.4em',
                                    }}
                                    to={`/`}
                                >
                                    ← View all blog posts
                                </Link>
                            </div>
                            <p
                                className={style.posted}
                            >
                                {post.frontmatter.date}
                                {` • ${formatReadingTime(post.timeToRead)}`}
                            </p>
                            <h3 className={style.title}>{post.frontmatter.description}</h3>
                            {post.frontmatter.cover && (
                                <Image
                                    sizes={post.frontmatter.cover.childImageSharp.sizes}
                                    className={style.cover}
                                />
                            )}
                        </header>
                        <section dangerouslySetInnerHTML={{ __html: post.html }} />
                        <footer className={style.footer}>
                            <Button
                                medium
                                onClick={() => navigate("/")}
                            >
                                ← Back to all posts
                        </Button>
                        </footer>
                    </article>

                    {/* <nav>
                    <ul
                        style={{
                            display: `flex`,
                            flexWrap: `wrap`,
                            justifyContent: `space-between`,
                            listStyle: `none`,
                            padding: 0,
                        }}
                    >
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    ← {previous.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    {next.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav> */}
                </Column>
            </Container>
        </Layout>

    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`
