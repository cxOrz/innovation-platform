import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as unknown as PluginOption],
  base: '/',
  build: {
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
});
