import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "@tskool/satellite-header/styles.css";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 },
  },
});

const rootElement = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </HelmetProvider>
);

// Hub의 크롤러용 브랜드 본문은 React 프리렌더 결과가 아니므로 교체 렌더링합니다.
const hasBrandFallback = Array.from(rootElement.childNodes).some(
  (node) => node.nodeType === Node.COMMENT_NODE && node.textContent?.includes("T Skool brand body:"),
);
// react-snap으로 생성된 React 마크업만 hydrate합니다.
if (rootElement.hasChildNodes() && !hasBrandFallback) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
