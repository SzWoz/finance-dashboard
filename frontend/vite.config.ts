import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      /* --- kluczowe zmiany --- */
      strategies: "injectManifest",
      srcDir: "src", // katalog, w którym trzymasz SW
      filename: "sw-custom.ts", // nazwa pliku SW (może być .ts)
      /* ----------------------- */

      /* przydatne w czasie developmentu */
      devOptions: {
        enabled: true,
        type: "module",
      },

      /* nie korzystasz z precache ⇒ wyłącz punkt wstrzykiwania */
      injectManifest: {
        injectionPoint: undefined,
      },

      registerType: "autoUpdate",

      includeAssets: [
        "icons/icon-192.png",
        "icons/icon-512.png",
        "favicon.ico",
        "robots.txt",
      ],
      manifest: {
        name: "Finance App",
        short_name: "Finanse",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#10b981",
        // icons: [
        //   { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
        //   { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
        // ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
