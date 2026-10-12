import { existsSync, readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Runs the files in api/ during `npm run dev`, so the AI assistant and admin page
// work locally the same way they do on Vercel. Secrets go in a .env.local file.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')

        // Files uploaded from the admin page while the dev server is running (e.g. a new CV)
        const upload = url.pathname.match(/^\/uploads\/([\w.-]+)$/)
        if (upload && existsSync(`public/uploads/${upload[1]}`)) {
          res.setHeader('content-type', upload[1].endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream')
          return res.end(readFileSync(`public/uploads/${upload[1]}`))
        }

        const match = url.pathname.match(/^\/api\/([a-z-]+)$/)
        if (!match || !existsSync(`api/${match[1]}.js`)) return next()

        try {
          const mod = await server.ssrLoadModule(`/api/${match[1]}.js`)
          const handler = mod[req.method]
          if (!handler) {
            res.statusCode = 405
            return res.end()
          }
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const response = await handler(new Request(url, {
            method: req.method,
            headers: req.headers,
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
          }))
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          console.error(error)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Local API error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expose server-only secrets (no VITE_ prefix, never sent to the browser) to the local API
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), localApi()],
    server: {
      // Saving in the admin page writes these files; don't reload the page when they change
      watch: { ignored: ['**/content.local.json', '**/public/uploads/**'] },
    },
  }
})
