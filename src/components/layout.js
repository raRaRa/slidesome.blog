import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Header from './Header'
import Footer from "./Footer/Footer"

const Layout = ({ location, title, cover, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
        header = (
            <h1
                style={{
                    ...scale(1.5),
                    marginBottom: rhythm(1.5),
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: `none`,
                        textDecoration: `none`,
                        color: `inherit`,
                    }}
                    to={`/`}
                >
                    {title}
                </Link>
            </h1>
        )
    } else {
        header = (<></>
        )
    }
    return (
        <>
            <Header />
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(30),
                    padding: `${rhythm(3.5)} ${rhythm(3 / 4)} ${rhythm(14.5)} ${rhythm(3 / 4)}`,
                }}
            >
                {location.pathname !== rootPath && (
                    <header>{header}</header>
                )}
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}

export default Layout
