# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 이 저장소는 무엇인가

Guhnoo Yun 의 개인 학술 홈페이지 (https://doranlyong.github.io). **빌드 도구가 전혀 없는 순수 정적 사이트**로, GitHub Pages 의 `main` 브랜치 루트에서 그대로 서빙됩니다. (`.nojekyll` 로 Jekyll 처리 비활성화.)

## 개발 / 배포 명령

```bash
# 로컬 미리보기 (빌드 단계 없음)
python3 -m http.server 8000        # → http://localhost:8000

# 배포 — main 에 push 하면 GitHub Pages 가 자동 반영 (1~3분, 강력 새로고침 Cmd+Shift+R)
git add -A && git commit -m "..." && git push
```

빌드·번들·린트·테스트 도구가 없습니다. `?theme=dark` / `?theme=light` 쿼리로 테마를 강제해 확인할 수 있습니다.

## 핵심 아키텍처 — 두 개의 독립된 부분

### 1. 메인 사이트 (데이터 주도 SPA)

`index.html` 은 **빈 섹션 컨테이너만** 담은 껍데기입니다. 실제 콘텐츠는 없고, 두 스크립트가 런타임에 채웁니다:

- **`assets/js/data.js`** — 사이트의 **모든 콘텐츠**를 담은 전역 상수: `SITE`, `BIO`, `ABOUT_HTML`, `INTERESTS_INTRO_HTML`, `INTERESTS`, `INTERESTS_OUTRO_HTML`, `NEWS`, `THEMES`, `PUBS`, `EXPERIENCE`, `EDUCATION`, `AWARDS`, `SERVICES`. (About 은 신상·소속만, 연구 서사는 Interests 의 intro/outro 문단에 둔다.)
- **`assets/js/main.js`** — 위 전역들을 읽어 DOM 을 렌더하는 vanilla JS (IIFE, 프레임워크 없음). `DOMContentLoaded` 에서 `renderSidebar → renderIndex → renderPubs → renderFooter → initEmail → initTheme` 순서로 실행.

> **가장 중요한 규칙: 콘텐츠 수정은 `data.js` 에서만 한다.** 이름·논문·뉴스·경력 등을 바꿀 때 HTML/CSS/main.js 는 건드리지 않습니다. main.js/CSS 는 *렌더링 방식/디자인*을 바꿀 때만 수정합니다.

렌더링 로직에서 알아야 할 비자명한 규칙들:

- **Publications** (`renderPubs`): `Selected | All` 탭. Selected 탭은 `selected:true` 논문만 최신순 평면 나열, All 탭은 연도별 나열 + 주제 필터 칩. 필터 칩은 `THEMES` 의 key 로 생성되며 **`PUBS[].theme` 값이 `THEMES` 의 key 와 일치해야** 필터가 동작합니다.
- **논문 카드 vs 컴팩트 행**: `category` 가 `"domestic"` 또는 `"patent"` 이면 썸네일 없는 컴팩트 행, 그 외(`journal`/`international`/`preprint`…)는 썸네일 카드로 렌더 — `category` 는 표시 밀도에만 영향.
- **제목 링크**: `links` 배열의 **첫 번째** 항목 URL 이 논문 제목의 하이퍼링크가 됩니다.
- **저자 강조**: 저자 문자열 안의 `SITE.name` 이 정규식으로 자동 하이라이트됩니다.
- **딥링크**: 각 논문 `li` 의 id 는 `PUBS[].id` (예: `#spanet2023`). `NEWS` 항목에서 이 앵커로 링크하며, 해시로 접근하면 자동으로 All 탭으로 전환 후 스크롤합니다. **`id` 를 바꾸면 뉴스 링크와 외부 링크가 깨질 수 있으니 주의.**
- **섹션 자동 숨김**: `AWARDS` 가 빈 배열이면 Honors 섹션이, `SERVICES` 의 하위 배열이 모두 비면 Services 섹션이 숨겨집니다. `SITE.cvLink`/`rsLink` 가 `null` 이면 해당 버튼이 나타나지 않습니다.
- **이메일 난독화**: 크롤러 방지를 위해 `SITE.emailUser` / `emailDomain` 를 분리 저장하고 main.js 가 런타임에 조립합니다. (통짜 이메일 문자열을 HTML 에 넣지 말 것.)
- **테마**: FOUC 방지를 위해 `index.html` `<head>` 의 pre-paint 인라인 스크립트가 `data-theme` 를 먼저 설정 → 이후 main.js `initTheme` 가 토글 처리. 상태는 `localStorage["theme"]`. 디자인은 orderedlist/minimal 기반(네이비/오렌지 팔레트), CSS 는 `assets/css/style.css` 단일 파일.

### 2. `projects/spanet/` — 독립 프로젝트 페이지 (건드리지 말 것)

SPANet (ICCV 2023) 논문용 별도 정적 페이지 (Nerfies/Bulma "Academic Project Page" 템플릿). 메인 사이트의 data.js 시스템과 **완전히 무관한 자체 완결 페이지**입니다.

> ⚠️ **다음은 절대 금지 — 어기면 출판된 논문 속 인쇄된 URL 이 깨집니다:**
> - `projects/` 폴더 삭제·이동
> - 저장소 이름 변경 (반드시 `DoranLyong.github.io` — 개인 페이지는 `<계정명>.github.io` 규칙)
> - GitHub 계정명(`DoranLyong`) 변경 (Pages 주소는 리다이렉트되지 않음)
>
> `https://doranlyong.github.io/projects/spanet/` 는 ICCV 2023 논문 초록에 인쇄된 프로젝트 페이지 주소입니다.

## 콘텐츠 편집 참고 (data.js)

- `SITE` : 이름/직함/소속/링크/CV·RS 경로/`updated` 날짜. 콘텐츠 갱신 시 `SITE.updated` 도 함께 갱신.
- `date` 필드는 ISO(`YYYY-MM-DD`), **정렬용**이며 연도만 표시에 쓰입니다.
- 논문 추가 시 필드 스키마와 미완료 콘텐츠 확인 항목(CV PDF, 뉴스 정확 날짜, 학사 입학연도 등)은 `README.md` 참고.
