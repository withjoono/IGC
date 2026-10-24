import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/utils";

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  /** 사이트 루트 기준 경로. "/" 는 홈(https://tigc.kr/) */
  path?: string;
  /** 지정할 때만 og:image 를 덮어씀 — 없으면 index.html 브랜드 블록의 og-image.png 사용 */
  image?: string;
  type?: "website" | "article";
  /** schema.org 구조화 데이터 (BlogPosting, BreadcrumbList 등) */
  jsonLd?: JsonLd | JsonLd[];
}

export function canonicalUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/+$/, "");
}

/**
 * 페이지별 title·description·canonical·OG.
 * 빌드 타임 프리렌더(scripts/prerender.mjs)가 이 값을 정적 HTML <head>에 박아 넣고,
 * index.html 브랜드 블록의 사이트 공통 값(홈 canonical 등)은 제거한다.
 */
export function Seo({ title, description, path = "/", image, type = "website", jsonLd }: SeoProps) {
  const url = canonicalUrl(path);
  const full = `${title} | IGC 입시 · T스쿨`;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image.startsWith("http") ? image : `${SITE_URL}${image}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {ld.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...item })}
        </script>
      ))}
    </Helmet>
  );
}

/** 홈 › … 경로용 BreadcrumbList */
export function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "T IGC", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonicalUrl(it.path),
    })),
  };
}
