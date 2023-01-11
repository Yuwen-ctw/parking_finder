import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const config = loadEnv(mode, './')
  return defineConfig({
    // base: '/parking_finder/', // for github page
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      port: Number(config.VITE_LOCALPORT),
      proxy: {
        '/api': {
          target: 'http://localhost:3001/data',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
