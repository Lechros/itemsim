# 아이템 시뮬레이터

itemsim.com

## 코드 검사와 포맷

- `pnpm format`: Oxfmt로 포맷 적용
- `pnpm format:check`: 포맷 검사
- `pnpm lint:code`: Oxlint로 JS/TS 및 Svelte의 스크립트를 검사하고, ESLint로 Svelte 전용 규칙 검사
- `pnpm lint`: 포맷과 코드 검사
- `pnpm check`: TypeScript Go로 Svelte 및 TypeScript 타입 검사

포맷 설정은 `.oxfmtrc.json`, 일반 lint 설정은 `.oxlintrc.json`에서 관리합니다.
Oxlint가 Svelte 템플릿 규칙을 지원하지 않아 `eslint.config.js`는 `.svelte`, `.svelte.ts`, `.svelte.js` 전용으로 유지합니다.
Svelte 포맷과 Tailwind 클래스 정렬은 Oxfmt 설정에서 활성화합니다.
기존 ESLint 규칙 중 자동 변환에서 제외된 `no-undef`, `no-dupe-args`, `no-octal`은 Oxlint 설정에 포함하지 않았습니다.

타입 검사는 `svelte-check --tsgo`와 `@typescript/native`의 TypeScript 7을 사용합니다.
`typescript` 6은 Svelte와 ESLint의 JavaScript 컴파일러 API 호환용으로 함께 설치합니다.
Typia 변환은 Vite의 공식 `@ttsc/unplugin`이 처리하며 `ts-patch`는 사용하지 않습니다.
`tsconfig.typia.json`은 임시 설정을 통한 상속에서도 변환 대상 경로를 유지하도록 `${configDir}`로 소스 범위를 지정합니다.
`ttsc`와 `@ttsc/unplugin`은 같은 버전으로 함께 업데이트합니다. 최초 Typia 네이티브 플러그인 컴파일은 수 분 걸릴 수 있습니다.
