

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  /*
  Preparado por si hubiese que modificar proxy por problemas de cors
  server: {
    proxy: {
      '/api': 'http://localhost:80',  
    },
    cors: true, 
    hmr: {
      protocol: 'ws',
      host: 'dev.proyecto-coach.es', 
      clientPort: 5173, 
    },
  },
  */
});




