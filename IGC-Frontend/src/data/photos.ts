// 대학별 이미지.
// 현재 src는 T스쿨이 직접 만든 오리지널 일러스트(.svg) — 저작권 100% 안전, 바로 표시됨.
// 실제 CC 캠퍼스 사진으로 교체하려면:
//   1) source(Wikimedia Commons)에서 CC 이미지를 내려받아 public/images/ 에 photo 파일명으로 저장
//   2) 아래 src 를 그 파일명으로 바꾸고, credit 에 저작자/라이선스를 기입
//   3) public/images/CREDITS.md 에도 기록

export interface UniPhoto {
  src: string; // 현재 표시 이미지 (일러스트)
  credit: string; // 캡션
  photo: string; // 실제 CC 사진으로 교체할 때 쓸 파일명
  source: string; // CC 사진 출처(Wikimedia Commons)
}

export const UNI_PHOTOS: Record<string, UniPhoto> = {
  sbu: {
    src: "/images/uni-sbu.svg",
    credit: "스토니브룩 뉴욕 본교 · T스쿨 제작 일러스트",
    photo: "/images/uni-sbu.jpg",
    source: "https://commons.wikimedia.org/wiki/Category:Buildings_of_Stony_Brook_University",
  },
  gmu: {
    src: "/images/uni-gmu.svg",
    credit: "조지메이슨 Fairfax 본교 · T스쿨 제작 일러스트",
    photo: "/images/uni-gmu.jpg",
    source: "https://commons.wikimedia.org/wiki/File:GMU_Fairfax_Campus.JPG",
  },
  utah: {
    src: "/images/uni-utah.svg",
    credit: "유타대 Salt Lake City 본교 · T스쿨 제작 일러스트",
    photo: "/images/uni-utah.jpg",
    source: "https://commons.wikimedia.org/wiki/Category:University_of_Utah_buildings",
  },
  ghent: {
    src: "/images/uni-ghent.svg",
    credit: "겐트대 벨기에 본교 · T스쿨 제작 일러스트",
    photo: "/images/uni-ghent.jpg",
    source: "https://commons.wikimedia.org/wiki/Category:Ghent_University",
  },
  fit: {
    src: "/images/uni-fit.svg",
    credit: "FIT 뉴욕 본교 · T스쿨 제작 일러스트",
    photo: "/images/uni-fit.jpg",
    source: "https://commons.wikimedia.org/wiki/Category:Fashion_Institute_of_Technology",
  },
};
