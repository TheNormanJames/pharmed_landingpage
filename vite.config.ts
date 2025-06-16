import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";
import tailwindcss from "@tailwindcss/vite";

// Variables para Pug (opcionales)
// const pugLocals = {
//   title: 'Mi App con Pug',
//   features: ['Tailwind', 'TypeScript', 'Vite'],
// };

export default defineConfig({
  plugins: [
    // Primero procesa Pug
    pugPlugin({
      // locals: pugLocals, // Pasa variables a tus templates
    }),
    // Luego procesa Tailwind
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Configuración para CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css"; // Nombre fijo
          }
          // Otros assets (imágenes, fuentes, etc.)
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
