'use client'

import { useEffect } from "react"

// @ts-ignore
export default function JsonLdInjector({ json }) {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(json, null, 2)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    };
  }, [json])

  return null
}
