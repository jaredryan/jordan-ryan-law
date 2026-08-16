// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: process.env.SITE_URL || 'https://jordanryanlaw.netlify.app',
  output: 'static',
  integrations: [sitemap()],
})
