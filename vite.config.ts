import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        commonjs({
            filter(id) {
                if (["ckeditor5/build/ckeditor.js"].includes(id)) {
                    return true;
                }
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            components: `${path.resolve(__dirname, "./src/components/")}`,
            public: `${path.resolve(__dirname, "./public/")}`,
            pages: path.resolve(__dirname, "./src/pages"),
            api: path.resolve(__dirname, "./src/api"),
            assets: path.resolve(__dirname, "./src/assets"),
            layout: path.resolve(__dirname, "./src/layout"),
            features: path.resolve(__dirname, "./src/features"),
            types: `${path.resolve(__dirname, "./src/@types")}`,
            utils: path.resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        port: 5000,
        open: "http://localhost:5000/login",
    },
    optimizeDeps: {
        include: ["ckeditor5/build/ckeditor"],
    },
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        commonjsOptions: {
            exclude: ["ckeditor5/build/ckeditor"],
        },
    },
});
