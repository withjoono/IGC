import { createFileRoute, redirect } from "@tanstack/react-router";

// 루트(/)는 /promo 로 — T스쿨 위성앱 컨벤션
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/promo" });
  },
});
