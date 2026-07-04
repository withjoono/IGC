import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/utils";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/** 페이지별 메타/OG 태그. 프리렌더(react-snap) 시 정적 HTML head에 박힘 → SEO */
export function Seo({ title, description, path = "", image }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? "https://www.tskool.kr/logo.png";
  const full = `${title} | IGC 입시 · T스쿨`;
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
