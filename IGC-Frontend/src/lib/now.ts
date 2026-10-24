import { useEffect, useState } from "react";

// D-day·연도처럼 "지금"에 따라 달라지는 값이 프리렌더 HTML과 첫 클라이언트 렌더에서 같아야
// hydration 불일치가 나지 않는다. 서버는 프리렌더 시각을, 클라이언트 첫 렌더는 그 시각(#root data-ssr-time)을 쓰고,
// 마운트 직후 실제 현재 시각으로 갱신한다.
let renderNow: number | undefined;

/** entry-server(프리렌더) 전용 */
export function setRenderNow(t: number) {
  renderNow = t;
}

function initialNow() {
  if (renderNow !== undefined) return renderNow;
  if (typeof document !== "undefined") {
    const t = Number(document.getElementById("root")?.dataset.ssrTime);
    if (t) return t;
  }
  return Date.now();
}

export function useNow() {
  const [now, setNow] = useState(initialNow);
  useEffect(() => setNow(Date.now()), []);
  return now;
}

export function daysUntil(iso: string, now: number) {
  return Math.ceil((new Date(iso).getTime() - now) / 86400000);
}
