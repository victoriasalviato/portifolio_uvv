import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src', // Se o seu código está na pasta 'src'
  build: {
    outDir: '../dist', // Pasta de saída para os arquivos de build
  },
  server: {
    port: 3000, // Porta onde o servidor de desenvolvimento irá rodar
  },
});
