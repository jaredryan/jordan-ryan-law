import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_CURRENT_URL: process.env.NEXT_PUBLIC_CURRENT_URL || "https://ryanlegalpc.com",
  },
}

export default nextConfig
