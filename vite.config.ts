import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
      },
      webp: {
        quality: 80,
        alphaQuality: 80,
        lossless: false,
        nearLossless: false,
        smartSubsample: true,
        effort: 6,
      },
      jpg: {
        quality: 80,
        progressive: true,
        optimize: true,
        mozjpeg: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
        optimize: true,
        mozjpeg: true,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'react-intersection-observer'],
          ui: ['lucide-react'],
        },
      },
    },
  },
});
