---
name: repo-hygiene-and-pii
description: 리포 루트에 개인정보 문서가 방치돼 있어 커밋 시 유출되는 위험과 안전한 커밋 절차
type: feedback
---

# 커밋 위생 — 루트에 개인정보가 있다

## 사실 (2026-09-03 실측)

- **리포 루트에 `.gitignore` 가 없다.** `.gitignore` 는 `IGC-Frontend/` 안에만 있고, 그 규칙은 루트 파일에 적용되지 않는다.
- 추적 중인 파일은 전부 **57개**다. 그중 루트에 있는 것은 `IGC.xlsx`, `IGC2027.xlsx`, 기획 md 3개뿐이고 나머지는 `IGC-Frontend/` 하위다.
- 루트에 **추적되지 않은 파일이 22개** 있다. 종류:
  - 학생 실명이 파일명에 들어간 `.docx` — 추천서 초안·추천서 예시·브리핑 시트·추가 에세이·지원 패키지
  - 설명회 슬라이드 `.pptx`
  - 프로모션 기획서 `.docx`, 경쟁사 분석·키워드 기획 등 `.md`
  - 프로모 원고 `.html` 6개 (`promo_gwagiwon_*`, `promo_landing_2027spring.html`, `promo_pricing.html`)
- `IGC-Frontend/index.html` 과 `IGC-Frontend/public/sitemap.xml` 이 **커밋되지 않은 수정 상태**다(브랜드 sync 결과로 보임 — 확인 필요).

## 위험

`git add .` · `git add -A` · `git commit -a` 를 한 번이라도 실행하면 **학생 개인정보가 담긴 문서가 공개 리포(`withjoono/IGC`)에 커밋된다.** 한 번 push 되면 히스토리에서 지우기 어렵다.

## 규칙

1. **`git add .` / `git add -A` / `git commit -a` 금지.**
2. 커밋은 **항상 경로를 명시**한다.

```bash
git add IGC-Frontend/src/routes/promo/consult.tsx
git status --short          # 스테이징된 것만 다시 확인하고 커밋
```

3. 커밋 직전 `git status --short` 로 **의도한 파일만** 올라갔는지 눈으로 확인한다.
4. 문서 안의 학생 이름·성적·연락처를 코드 주석·이슈·커밋 메시지·로그로 옮기지 않는다.

## 정리하려면

루트 `.gitignore` 를 만드는 것이 우선이다. 다만:

- `IGC.xlsx` · `IGC2027.xlsx` 는 **이미 추적 중**이라 `.gitignore` 만으로는 빠지지 않는다. 빼려면 `git rm --cached` 가 필요하고, 그건 히스토리에 이미 들어간 내용을 지우지는 못한다. 두 파일에 개인정보가 있는지 먼저 확인할 것.
- 개인 산출물은 아예 리포 밖(별도 드라이브 폴더)으로 옮기는 편이 낫다. 이 리포는 프론트엔드 코드와 공개 가능한 기획 문서만 담는 것이 원래 의도로 보인다.

이 정리는 **사용자 확인 없이 진행하지 말 것** — 파일 이동·삭제는 되돌리기 어렵다.
