import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// T스쿨 위성앱 공통 컨벤션: Vite + React + TanStack Router
// dev 포트 3024 (Hub 3000 / Susi 3001 ... IGC 3024)
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3024,
    strictPort: true,
    cors: true,
    proxy: {
      // Hub 백엔드(NestJS)로 프록시 — 상담 신청/데이터 API
      "/api-nest": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-nest/, ""),
      },
    },
  },
  // 빌드 타임 프리렌더(SSR 빌드)에서 공통 헤더 패키지는 TS 소스 그대로라 번들에 포함
  ssr: {
    noExternal: ["@tskool/satellite-header", "react-helmet-async"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
