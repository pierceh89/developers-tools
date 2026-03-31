# Developer Tools

Browser-based utilities for everyday web development work.

Production URL:
`https://pierceh89.github.io/developers-tools/`

This project is a static multi-page Vite app built with client-side TypeScript and deployed to GitHub Pages. The goal is simple: open the site, pick a tool, and use it immediately without a backend or sign-in flow.

## Current Tools

- JSON Formatter / Validator
- JWT Decoder
- Base64 Encode / Decode
- UUID / ULID Generator
- URL Encode / Decode
- Unix Timestamp Converter
- Regex Tester

## Product Direction

The site is intentionally utility-first.

- Home is a one-page tool workspace.
- Individual tool pages still exist for direct links and search indexing.
- Sensitive transformations are handled client-side in the browser.
- The UX prioritizes immediate input, output, copy actions, and clear error states.

## Tech Stack

- Vite
- TypeScript
- Static multi-page HTML entrypoints
- GitHub Pages deployment via GitHub Actions

## Local Development

Requirements:

- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
.
├── .github/workflows/deploy-pages.yml
├── index.html
├── json-formatter/index.html
├── jwt-decoder/index.html
├── base64-encode-decode/index.html
├── uuid-ulid-generator/index.html
├── url-encode-decode/index.html
├── unix-timestamp-converter/index.html
├── regex-tester/index.html
├── src/
│   ├── app.ts
│   ├── main.ts
│   ├── style.css
│   └── vite-env.d.ts
└── vite.config.ts
```

Notes:

- `src/app.ts` contains routing, shared layout rendering, and tool implementations.
- `vite.config.ts` uses the GitHub Pages base path: `/developers-tools/`.
- Each tool has its own HTML entrypoint for static output and direct page access.

## Deployment

GitHub Pages deployment is configured in:

- [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml)

Current deployment assumptions:

- Repository name: `developers-tools`
- GitHub Pages base path: `/developers-tools/`
- Default deploy branch trigger: `main`

Deployment flow:

1. Push to `main`
2. GitHub Actions runs `npm ci`
3. The site is built with `npm run build`
4. The `dist/` directory is uploaded and deployed to GitHub Pages

## Feature Development Plan (Hash Generator / Diff Checker / Cron Builder-Parser)

요청사항 반영 원칙:

- 각 기능은 **별도 feature 브랜치**에서 개발한다.
- 각 기능 명세는 개발 시작 전에 **GitHub Issue**로 생성한다.
- 구현 우선순위는 `Hash Generator -> Diff Checker -> Cron Expression Builder/Parser` 순서로 진행한다.

---

### 0) 공통 진행 프로세스

1. `main` 최신화
2. 기능별 Issue 생성 (`type: feature`)
3. 기능별 브랜치 생성 (`feature/<issue-number>-<slug>`)
4. 구현 + 자체 테스트
5. PR 생성 (Issue 연결)
6. 코드리뷰 반영 후 `main` 병합

권장 브랜치 네이밍:

- `feature/101-hash-generator`
- `feature/102-diff-checker`
- `feature/103-cron-builder-parser`

권장 커밋 규칙(Conventional Commits):

- `feat(hash): add sha-256 and sha-512 generation`
- `feat(diff): implement line and char diff view`
- `feat(cron): add parser and preset builder`

---

### 1) Hash Generator

#### 1-1. Issue 템플릿(예시)

제목:
`[Feature] Hash Generator 도구 추가`

본문 체크리스트:

- [ ] 지원 알고리즘: MD5, SHA-1, SHA-256, SHA-512
- [ ] 입력 방식: 텍스트 입력(멀티라인 포함)
- [ ] 출력: 선택 알고리즘 해시값 표시 + 복사 버튼
- [ ] 에러 상태/빈 입력 상태 UI 정의
- [ ] 성능 기준: 일반 텍스트 입력 시 즉시 반응
- [ ] 단위 테스트(가능 범위) 및 수동 테스트 시나리오 작성

수용 기준(AC):

- 알고리즘 변경 시 출력이 즉시 갱신된다.
- 복사 버튼 클릭 시 해시값이 클립보드로 복사된다.
- 잘 알려진 테스트 벡터(`abc`) 결과가 정확히 일치한다.

#### 1-2. 브랜치

- `feature/<issue-number>-hash-generator`

#### 1-3. 구현 메모

- Web Crypto API 우선 사용
- MD5는 Web Crypto API 미지원이므로 경량 라이브러리 도입 또는 순수 JS 구현 검토
- 기존 UI 패턴(입력/출력/Copy CTA) 재사용

#### 1-4. 완료 정의(DoD)

- 툴 목록 및 라우팅에 Hash Generator 노출
- README 도구 목록 업데이트
- PR에 테스트 결과 첨부

---

### 2) Diff Checker

#### 2-1. Issue 템플릿(예시)

제목:
`[Feature] Diff Checker 도구 추가`

본문 체크리스트:

- [ ] 좌/우 텍스트 입력 영역 제공
- [ ] 라인 단위 diff 표시
- [ ] 문자 단위 강조(라인 내 변경점)
- [ ] 출력 모드: inline 또는 split view(최소 1개 모드 필수)
- [ ] 샘플 데이터 로드 버튼
- [ ] 복사 동작(좌/우 원문 또는 결과 중 우선순위 정의)

수용 기준(AC):

- 두 입력이 동일하면 “차이 없음” 상태가 명확히 표시된다.
- 공백/개행 차이가 UI에서 구분 가능하다.
- 1,000줄 내외 텍스트 비교 시 브라우저가 멈추지 않는다.

#### 2-2. 브랜치

- `feature/<issue-number>-diff-checker`

#### 2-3. 구현 메모

- 초기 버전은 text diff에 집중(JSON 전용 diff는 후속 이슈)
- 경량 diff 라이브러리 사용 가능
- 렌더링 비용 절감을 위해 큰 입력에서는 계산 디바운스 적용

#### 2-4. 완료 정의(DoD)

- 툴 목록/라우팅 반영
- 접근성(키보드 포커스, 대비) 기본 점검
- PR에 대용량 입력 테스트 결과 포함

---

### 3) Cron Expression Builder / Parser

#### 3-1. Issue 템플릿(예시)

제목:
`[Feature] Cron Expression Builder/Parser 도구 추가`

본문 체크리스트:

- [ ] 표준 5필드 cron(`min hour day month weekday`) 우선 지원
- [ ] 식 입력 시 파싱 + human-readable 설명 제공
- [ ] Builder UI(필드별 선택) 제공
- [ ] 프리셋 제공(@hourly 성격의 프리셋은 5필드 식으로 매핑)
- [ ] 유효성 검사 및 에러 메시지 정의
- [ ] 파싱 결과/생성 결과 복사 기능

수용 기준(AC):

- 유효한 cron 식 입력 시 자연어 설명이 표시된다.
- Builder 변경 시 cron 문자열이 즉시 갱신된다.
- 잘못된 값(예: 분 60) 입력 시 필드 단위 에러가 표시된다.

#### 3-2. 브랜치

- `feature/<issue-number>-cron-builder-parser`

#### 3-3. 구현 메모

- v1은 5필드만 지원, Quartz(초/년 포함)는 후속 이슈 분리
- 로케일은 우선 영어 설명으로 시작 후 다국어 확장 가능 구조 고려
- 프리셋 예시: 매분, 매시 정각, 매일 00:00, 주중 09:00

#### 3-4. 완료 정의(DoD)

- Parser와 Builder 상호 동기화 동작 확인
- 예외 케이스(범위/step/list) 테스트
- README 도구 및 사용 예시 업데이트

---

### Issue/PR 운영 규칙

- Issue 라벨 권장: `feature`, `frontend`, `tooling`
- PR 제목 규칙: `[<tool>] #<issue-number> <short-description>`
- PR 본문에 반드시 포함:
  - 구현 범위(In scope / Out of scope)
  - UI 변경 스크린샷(가능 시)
  - 테스트 결과
  - Close 키워드(`Closes #<issue-number>`)

---

### 실행 순서 제안 (2주 스프린트 예시)

- Day 1: Issue 3건 생성 + 명세 확정
- Day 2~4: Hash Generator 개발/리뷰/병합
- Day 5~8: Diff Checker 개발/리뷰/병합
- Day 9~12: Cron Builder/Parser 개발/리뷰/병합
- Day 13~14: 통합 QA 및 문서 보강
## Future UX Improvements

- Remember the last selected tool on the home page
- Add search or command-palette style tool switching
- Reduce duplication between individual tool pages and the home tool runner
- Add lightweight analytics for tool usage patterns
- Improve SEO metadata and add structured data
- Add copy success toasts instead of button text replacement

## Future Engineering Improvements

- Split each tool into smaller modules instead of keeping all logic in `src/app.ts`
- Add tests for path handling and tool transformations
- Add linting and formatting
- Add shared utility helpers for encoding, time conversion, and routing
- Introduce a lightweight component structure if the app grows materially

## License

No license has been added yet.
