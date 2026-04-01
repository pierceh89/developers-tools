# 추가 도구 제안 및 SEO 최적화 계획

이 문서는 현재 구현된 개발자 도구 허브를 기준으로 다음 릴리스에서 바로 검토할 수 있는 신규 도구 후보와 정적 SEO 개선 방향을 정리한다. 범위는 "지금 구현하기 좋은 후보"와 "정적 페이지 SEO"에 한정한다.

## 추가 개발자 도구 제안

### 1. Query String Parser / Builder

- 문제/사용 시나리오
  - 쿼리 문자열을 빠르게 해석하거나 key-value 쌍을 수정한 뒤 다시 URL query string으로 만들고 싶을 때 사용한다.
  - API 테스트, redirect URL 디버깅, 마케팅 파라미터 점검에 자주 필요하다.
- 왜 현재 제품과 맞는지
  - 기존 URL Encode / Decode 도구와 사용 흐름이 자연스럽게 이어진다.
  - 브라우저에서 바로 처리 가능한 순수 문자열 변환 작업이다.
- 핵심 기능
  - raw query string을 key-value 테이블로 파싱
  - key/value 추가, 수정, 삭제
  - 중복 key 유지 여부 선택
  - URL encoding 포함 문자열 재생성
  - 결과 복사 및 샘플 로드
- 예상 UI 패턴
  - 좌측 raw input, 우측 parsed table + regenerated output
- 구현 난이도
  - 낮음
- 우선순위
  - P1

### 2. HMAC Generator

- 문제/사용 시나리오
  - API 서명 테스트, 웹훅 검증, 보안 예제 재현을 위해 메시지와 secret으로 HMAC 값을 계산할 때 사용한다.
- 왜 현재 제품과 맞는지
  - Hash Generator 다음 단계의 보안 유틸로 확장성이 좋다.
  - Web Crypto API 기반으로 클라이언트 사이드 구현이 가능하다.
- 핵심 기능
  - HMAC-SHA-256, HMAC-SHA-512 지원
  - message / secret 입력
  - hex 또는 Base64 출력
  - 예제 데이터 로드
  - 복사 버튼과 에러 상태
- 예상 UI 패턴
  - 입력 패널 2개 + 출력 패널 1개
- 구현 난이도
  - 낮음
- 우선순위
  - P1

### 3. HTML Escape / Unescape

- 문제/사용 시나리오
  - HTML snippet을 문서에 안전하게 붙이거나, entity 문자열을 원래 문자로 복원할 때 필요하다.
  - XSS-safe preview가 필요한 문서 작성 및 디버깅 작업에 유용하다.
- 왜 현재 제품과 맞는지
  - Base64, URL Encode, JSON Formatter와 같은 변환 계열 도구군과 잘 맞는다.
  - 별도 서버 없이 브라우저 API만으로 구현할 수 있다.
- 핵심 기능
  - escape / unescape 모드 전환
  - 일반 문자와 HTML entity 상호 변환
  - 안전한 preview 영역
  - 샘플 입력과 복사 동작
  - 잘못된 entity 처리 안내
- 예상 UI 패턴
  - 모드 스위치 + input/output + preview 패널
- 구현 난이도
  - 낮음
- 우선순위
  - P1

### 4. HTTP Header Formatter

- 문제/사용 시나리오
  - raw request/response headers를 사람이 읽기 좋게 정렬하거나 구조화해서 보고 싶을 때 사용한다.
  - API 디버깅과 문서화에 도움이 된다.
- 왜 현재 제품과 맞는지
  - JSON Formatter, JWT Decoder와 함께 API 디버깅 도구군을 강화한다.
  - 텍스트 파싱 중심이라 현재 구조에 쉽게 녹아든다.
- 핵심 기능
  - raw header 텍스트 파싱
  - key-value 형태 정렬 출력
  - header name normalization 옵션
  - request / response 샘플 로드
  - 결과 복사
- 예상 UI 패턴
  - raw input + structured output table
- 구현 난이도
  - 중간
- 우선순위
  - P2

### 5. JSON Path / Object Inspector

- 문제/사용 시나리오
  - 큰 JSON에서 특정 키를 찾거나 특정 경로 값을 빠르게 확인하고 싶을 때 사용한다.
  - 응답 payload 탐색과 디버깅 시간을 줄여준다.
- 왜 현재 제품과 맞는지
  - JSON Formatter 다음 단계의 탐색 도구로 이어지기 좋다.
  - 현재 프로젝트의 API payload 중심 사용자 흐름과 맞는다.
- 핵심 기능
  - JSON 입력 및 유효성 검사
  - path 입력으로 특정 값 조회
  - key 검색
  - 중첩 구조 트리 탐색
  - 선택 값 복사
- 예상 UI 패턴
  - JSON input + 검색/경로 패널 + inspector output
- 구현 난이도
  - 중간
- 우선순위
  - P2

## SEO 최적화 실행 계획

현재 상태:

- 홈과 개별 도구 HTML에 `title`, `description`, `canonical`은 이미 존재한다.
- Open Graph, Twitter Card, JSON-LD, sitemap, robots, breadcrumb schema는 추가 가능 상태다.
- 각 도구가 독립 HTML 엔트리를 가지므로 정적 SEO 적용에 유리하다.

### 1. 메타 태그 표준화

- 홈과 개별 도구 페이지에 공통 메타 규칙을 적용한다.
- 공통 추가 메타
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:type`
  - `og:site_name`
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
- 제목 규칙
  - 홈: 제품 허브 관점의 제목
  - 도구 페이지: `도구명 | Developer Tools`
- 설명 규칙
  - 1문장 120~160자 내외
  - 실제 기능, 브라우저 실행, 서버 미전송 여부를 필요 시 포함

### 2. 구조화 데이터 추가

- 홈 페이지
  - `WebSite`
  - `ItemList`
- 개별 도구 페이지
  - `WebApplication`
  - `FAQPage`
  - `BreadcrumbList`
- FAQ schema는 실제 페이지 FAQ 문구와 동일하게 유지한다.

### 3. 크롤링 자산 추가

- `public/robots.txt` 추가
- `public/sitemap.xml` 추가
- sitemap에는 홈과 모든 도구 페이지 URL을 포함한다.
- canonical과 sitemap URL은 모두 `https://pierceh89.github.io/developers-tools/` 기준으로 유지한다.

### 4. 내부 링크 구조 강화

- 홈에서 모든 도구를 명시적인 텍스트 링크로 노출한다.
- 홈의 대표 CTA는 단순한 "Open page" 대신 선택된 도구명을 포함한다.
- 각 도구 페이지의 related links는 유지하고, 검색 친화적인 도구명 anchor를 쓴다.
- 도구 페이지 상단에 breadcrumb를 추가해 탐색 구조를 드러낸다.

### 5. 페이지 본문 SEO 강화

- 각 도구 페이지에 사용 사례 또는 대표 활용 패턴을 짧은 텍스트로 추가한다.
- FAQ 질문은 사용자가 검색할 법한 문장형 질문을 유지한다.
- 도구별 핵심 키워드는 제목, 본문 요약, FAQ, 관련 도구 링크에 자연스럽게 분산한다.

### 6. 성능 및 색인 안정성 점검

- 빌드 후 산출물에서 `title`, `description`, `canonical`, OG, Twitter 메타 존재 여부를 점검한다.
- `robots.txt`, `sitemap.xml`이 `dist/`에 포함되는지 확인한다.
- JSON-LD가 정적 HTML에 포함되어 JS 실행 이전에도 검색 엔진이 읽을 수 있게 유지한다.

## 실행 우선순위

1. 문서와 메타 규칙 정리
2. `robots.txt`, `sitemap.xml` 추가
3. 홈/도구 페이지 내부 링크 및 breadcrumb 강화
4. 구조화 데이터 추가
5. 빌드 산출물 점검

## 완료 기준

- 신규 도구 제안이 현재 기능과 중복되지 않는다.
- 각 제안에 우선순위와 난이도가 명시돼 있다.
- SEO 계획이 현재 멀티 페이지 구조에 맞게 구체화돼 있다.
- 구현자가 추가 결정 없이 바로 적용할 수 있을 수준의 규칙과 순서가 정리돼 있다.
