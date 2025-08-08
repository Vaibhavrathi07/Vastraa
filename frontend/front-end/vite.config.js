import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  
  // Vercel-specific optimizations
  base: './', // Relative base path for deployment
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600, // Adjust based on your project size
  },
  
  // Development server settings
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false // Disable HMR overlay if needed
    }
  },
  
  // Optional: Pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
      // Add other frequently used dependencies
    ]
  }
});