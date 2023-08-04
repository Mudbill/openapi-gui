import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      overlay: {
        panelStyle: "display: none",
        badgeStyle: "display: none",
        initialIsOpen: false,
      },
    }),
    nodePolyfills(),
  ],
  server: {
    port: 3000,
  },
});
