# CLAUDE.md — IGC (T IGC, tigc.kr)

Claude Code 가 자동으로 읽는 진입점이다. 규칙 본문은 아래 두 파일에 있고, 여기서 자동으로 불러온다.

@AGENTS.md
@docs/context/README.md

`docs/context/` 의 개별 파일은 색인을 보고 **작업에 해당하는 것만** 연다.

## 작업 마무리 규칙 — main 에 바로 커밋·푸시

- 기본 브랜치는 **`main`** 이다(`master` 아님). 작업이 끝나면 별도 브랜치·PR 없이 **`main` 에 바로 커밋하고 푸시**한다.
- 푸시 전 `cd IGC-Frontend && npm run build` 가 통과해야 한다(`tsc -b` 가 게이트). 프론트를 건드리지 않은 문서 작업은 빌드 생략 가능.
- 자동 배포: `.github/workflows/deploy-igc.yml` — `main` 푸시 중 **`IGC-Frontend/**` 또는 워크플로 파일이 바뀐 경우에만** `firebase deploy --only hosting:igc` 를 실행한다. 문서만 바꾼 푸시는 배포되지 않는다.
  - GitHub 시크릿 `FIREBASE_SERVICE_ACCOUNT` 가 있어야 동작한다.
  - 푸시 후 Actions 결과를 확인하고, 실패하면 사용자에게 알린다. 수동 배포는 `npm run deploy:firebase` 만 쓴다(target 생략 금지).

## 커밋 안전 규칙 (AGENTS.md 요약 — 반드시 지킬 것)

- **`git add .` / `git add -A` / `git commit -a` 금지.** 루트에 학생 실명이 든 `.docx`·`.pptx` 가 있다. 항상 경로를 지정해서 add 한다.
- 커밋 직전 `git status --short` 로 스테이징 목록을 눈으로 확인한다.
- 비밀번호·API 키·토큰·학생 개인정보(이름·성적·연락처·생기부·에세이 본문)는 코드·문서·커밋 메시지·로그 어디에도 넣지 않는다.
