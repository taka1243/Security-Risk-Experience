import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const repo = "Security-Risk-Experience";
    const isPages = mode === "pages";
    return {
        base: isPages ? `/${repo}/fake_support/` : "/dist/fake_support/",
        build: {
            license: true,
            manifest: true,
            emptyOutDir: true,
            outDir: "../dist/fake_support",
        },
        server: {
            origin: "http://127.0.0.1:5174",
            proxy: {
                "/api": "http://127.0.0.1:5000",
            },
        },
    };
});
