import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages sirve bajo /<repo>/. Sobreescribible con VITE_BASE.
const base = process.env.VITE_BASE ?? "/observatorio-smartphones-adolescentes/";

export default defineConfig({
  base,
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false, chunkSizeWarningLimit: 1400 },
});
