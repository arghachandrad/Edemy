import React from "react"
import Link from "next/link"

const ButtonLink = ({ className, href, hrefAs, children }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>{children}</a>
  </Link>
)

export default ButtonLink
