# oxvelte 교체 검증

검증일: 2026-10-06

- 대상: `oxvelte 0.2.0`, 커밋 `7196779a744cee009abfc551e4c527bc98e26945`
- 비교 대상: `eslint 9.39.5`, `eslint-plugin-svelte 3.23.0`
- 환경: Windows x64, Rust 1.99.0, release 빌드
- 결론: Svelte 전용 ESLint 유지. 활성 규칙의 누락이 있어 동등한 교체로 판단하지 않음.

## 방법

oxvelte 소스와 Rust 도구체인은 `%TEMP%/itemsim-oxvelte-evaluation`에 설치했다.
사용자 PATH와 프로젝트 의존성은 변경하지 않았다. 빌드는 `--release --locked`로 수행했고,
검증 시간을 줄이기 위해 LTO를 끄고 codegen units를 16으로 지정했다. 정식 성능 벤치마크는 아니다.

ESLint API의 `calculateConfigForFile('src/routes/+page.svelte')`로 실제 적용되는 Svelte 규칙을 추출했다.
추천 규칙과 오류·경고 수준을 잃지 않도록 이 JSON을 `oxvelte migrate`에 입력하고,
실행 시 `--config`로 변환 결과를 명시했다.

ESLint가 검사한 동일한 286개 `.svelte` 및 `.svelte.ts` 파일을 oxvelte에도 전달했다.
두 도구 모두 오류와 경고가 없었고, oxvelte의 표준 오류 출력도 비어 있었다.
이 결과만으로 오류 검출의 동등성을 판단하지 않고 아래 사례를 별도로 검사했다.

## 검출 비교

| 사례                                 | ESLint           | oxvelte                       |
| ------------------------------------ | ---------------- | ----------------------------- |
| 정상 Svelte 5 `$state` 컴포넌트      | 통과             | 통과                          |
| `{@html}` 사용                       | 오류             | 동일 규칙의 오류, 종료 코드 1 |
| 위 규칙의 `eslint-disable-next-line` | 통과             | 통과                          |
| each 블록의 키 누락                  | 오류             | 동일 규칙의 오류, 종료 코드 1 |
| 키가 있는 each 블록                  | 통과             | 통과                          |
| `{@debug}` 사용                      | 경고             | 동일 규칙의 경고, 종료 코드 0 |
| `.svelte.ts`의 일반 `Map` 사용       | 반응성 규칙 오류 | 동일 규칙의 오류, 종료 코드 1 |
| 모듈 반응성 규칙의 억제 주석         | 통과             | 통과                          |
| 문자열 리터럴의 불필요한 mustache    | 오류             | 동일 규칙의 오류, 종료 코드 1 |
| 잘못된 스크립트 및 닫히지 않은 태그  | 파싱 오류        | 진단 없음, 종료 코드 0        |
| 불필요한 `svelte-ignore`             | 오류             | 진단 없음, 종료 코드 0        |

11개 사례 중 9개는 위 기준에서 일치했고 2개는 일치하지 않았다. 전체 규칙의 동등성 검증은 아니다.

### 문법 오류 재현

```svelte
<script lang="ts">let = ;</script><div>
```

oxvelte는 진단 없이 성공했다. Oxfmt는 `element_unclosed` 오류로 실패하므로 현재 통합 lint의 포맷 단계에서 잡힌다.

### 불필요한 억제 주석 재현

```svelte
<!-- svelte-ignore a11y_no_static_element_interactions -->
<p>hello</p>
```

ESLint는 활성 규칙인 `svelte/no-unused-svelte-ignore` 오류를 보고했다.
oxvelte는 진단 없이 성공했고, 설치된 Svelte 컴파일러의 `compile()`도 경고를 반환하지 않았다.
이 누락을 보완하지 않고 ESLint를 제거하면 기존 검사 범위가 줄어든다.

### 자동 수정

`<p>{'hello'}</p>`에 `oxvelte lint --fix`를 실행했으나 파일 내용은 바뀌지 않았고 종료 코드는 1이었다.
해당 커밋의 CLI는 `fix: _`로 옵션을 버린다.

## 재검토 조건

불필요한 `svelte-ignore` 검출과 문법 오류 처리가 개선되거나, 해당 검사 차이를 명시적으로 허용할 때 다시 검증한다.
현재 프로젝트의 `Oxlint + Svelte 전용 ESLint + Oxfmt` 구성은 유지한다.

검증한 소스: <https://github.com/tolgaouz/oxvelte/tree/7196779a744cee009abfc551e4c527bc98e26945>
