import type { NextConfig } from 'next'
import nextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = withBundleAnalyzer({
  /* config options here */
  env: {
    NEXT_PUBLIC_CURRENT_URL: process.env.NEXT_PUBLIC_CURRENT_URL || "https://ryanlegalpc.com",
  },
})

export default nextConfig
