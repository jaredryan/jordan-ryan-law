// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.jordanryanlaw.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
})
