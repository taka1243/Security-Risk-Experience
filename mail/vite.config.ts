import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const repo = "Security-Risk-Experience";
    const isPages = mode === "pages";
    return {
        base: isPages ? `/${repo}/mail/` : "/dist/mail/",
        build: {
            license: true,
            manifest: true,
            emptyOutDir: true,
            outDir: "../dist/mail",
        },
        server: {
            origin: "http://127.0.0.1:5173",
            proxy: {
                "/api": "http://127.0.0.1:5000",
            },
        },
        plugins: [react()],
    };
});
