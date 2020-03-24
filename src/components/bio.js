/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/logo-150.png/" }) {
        childImageSharp {
          fixed(width: 56, height: 56) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            facebook
          }
        }
      }
    }
  `)

    // const { author, social } = data.site.siteMetadata
    return (
        <div
            style={{
                display: `flex`,
                marginBottom: rhythm(2),
            }}
        >
            <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={`Slidesome`}
                style={{
                    marginRight: rhythm(1 / 2),
                    marginBottom: 0,
                    minWidth: 50,
                    width: rhythm(2),
                    height: rhythm(2),
                    //   borderRadius: `100%`,
                }}
            />
            <p style={{ maxWidth: 310 }}>
                The latest news and updates from{` `}
                <a href="https://slidesome.com">Slidesome</a>
            </p>
        </div>
    )
}

export default Bio
