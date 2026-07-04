import { useState } from "react";

// 본교 캠퍼스 사진. 파일이 없으면(에러) 스스로 숨김 → 파일 추가 전에도 깨진 이미지 안 보임.
export function CampusPhoto({ src, credit }: { src?: string; credit?: string }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={credit ?? "본교 캠퍼스"}
        loading="lazy"
        onError={() => setOk(false)}
        className="w-full rounded-2xl border object-cover"
        style={{ aspectRatio: "16 / 9" }}
      />
      {credit && <figcaption className="mt-2 text-xs text-muted-foreground">{credit}</figcaption>}
    </figure>
  );
}
