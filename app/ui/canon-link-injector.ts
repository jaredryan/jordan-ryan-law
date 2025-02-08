'use client'

import { useEffect } from "react"
const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''

// @ts-ignore
export default function CanonLinkInjector({ url }) {
  useEffect(() => {
    const getCurrentUrl = `${baseUrl}${url}`
    console.log(getCurrentUrl)

    const link = document.createElement("link")
    link.rel = "canonical"
    link.href = getCurrentUrl

    const meta = document.createElement("meta")
    meta.setAttribute("property", "og:url");
    meta.content = getCurrentUrl

    document.head.appendChild(link)
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(meta)
    };
  }, [url])
  
  return null
}
