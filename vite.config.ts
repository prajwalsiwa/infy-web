import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { domToCodePlugin } from "dom-to-code/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.NODE_ENV !== "production"
      ? domToCodePlugin({
          mode: "react",
        })
      : undefined,
  ],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
