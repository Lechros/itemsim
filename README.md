# 아이템 시뮬레이터

itemsim.com

## 코드 검사와 포맷

- `pnpm format`: Oxfmt로 포맷 적용
- `pnpm format:check`: 포맷 검사
- `pnpm lint:code`: Oxlint로 JS/TS 및 Svelte의 스크립트를 검사하고, ESLint로 Svelte 전용 규칙 검사
- `pnpm lint`: 포맷과 코드 검사
- `pnpm check`: Svelte 및 TypeScript 타입 검사

포맷 설정은 `.oxfmtrc.json`, 일반 lint 설정은 `.oxlintrc.json`에서 관리합니다.
Oxlint가 Svelte 템플릿 규칙을 지원하지 않아 `eslint.config.js`는 `.svelte`, `.svelte.ts`, `.svelte.js` 전용으로 유지합니다.
Svelte 포맷과 Tailwind 클래스 정렬은 Oxfmt 설정에서 활성화합니다.
기존 ESLint 규칙 중 자동 변환에서 제외된 `no-undef`, `no-dupe-args`, `no-octal`은 Oxlint 설정에 포함하지 않았습니다.
