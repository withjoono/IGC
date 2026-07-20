// 본교(홈 캠퍼스) 사진 — Wikimedia Commons(CC) 후보.
// 사용법: 아래 source(파일 페이지)에서 이미지를 내려받아 public/images/ 에 지정 파일명으로 저장.
// CC BY-SA 등은 저작자 표기가 필요합니다 → credit에 실제 저작자/라이선스를 확정해 기입하세요.

export interface UniPhoto {
  src: string;
  credit: string;
  source: string;
}

export const UNI_PHOTOS: Record<string, UniPhoto> = {
  sbu: {
    src: "/images/uni-sbu.jpg",
    credit: "스토니브룩대 본교 캠퍼스 · Wikimedia Commons (CC BY-SA)",
    source: "https://commons.wikimedia.org/wiki/Category:Buildings_of_Stony_Brook_University",
  },
  gmu: {
    src: "/images/uni-gmu.jpg",
    credit: "조지메이슨대 Fairfax 본교 · Wikimedia Commons (CC BY-SA 3.0)",
    source: "https://commons.wikimedia.org/wiki/File:GMU_Fairfax_Campus.JPG",
  },
  utah: {
    src: "/images/uni-utah.jpg",
    credit: "유타대 본교(Park Building 등) · Wikimedia Commons (CC BY-SA)",
    source: "https://commons.wikimedia.org/wiki/Category:University_of_Utah_buildings",
  },
  ghent: {
    src: "/images/uni-ghent.jpg",
    credit: "겐트대 본교(Boekentoren 등) · Wikimedia Commons (CC BY-SA)",
    source: "https://commons.wikimedia.org/wiki/Category:Ghent_University",
  },
  fit: {
    src: "/images/uni-fit.jpg",
    credit: "FIT(Fashion Institute of Technology) 뉴욕 본교 · Wikimedia Commons (CC BY-SA)",
    source: "https://commons.wikimedia.org/wiki/Category:Fashion_Institute_of_Technology",
  },
};
