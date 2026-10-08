# Academic Homepage

빌드 도구 없는 순수 정적 사이트입니다 (GitHub Pages 에 바로 배포 가능).

- **기능 구조**: 모든 콘텐츠를 `assets/js/data.js` 한 파일에서 관리
- **페이지 구조**: **단일 페이지** — Publications 섹션에 Selected | All 탭, All 탭은 연도별 나열 + 주제 필터 칩
- **디자인**: https://github.com/orderedlist/minimal — 고정 사이드바 + 스크롤 본문, 네이비/오렌지 아카데믹 팔레트

## 콘텐츠 수정 방법

**모든 수정은 `assets/js/data.js` 에서만** 합니다. HTML/CSS/main.js 는 건드릴 필요 없습니다.

| 항목 | 위치 |
|---|---|
| 이름·소속·링크·CV | `SITE` |
| 자기소개 (3인칭, Copy bio 용) | `BIO` |
| About 문단 | `ABOUT_HTML` |
| About 끝 사진 상자 (사진은 `assets/img/`) | `PHOTOS` |
| 연구 관심사 | `INTERESTS_INTRO_HTML` / `INTERESTS` / `INTERESTS_OUTRO_HTML` |
| 뉴스 | `NEWS` (최신순, ISO 날짜) |
| 논문 필터 칩 (All 탭) | `THEMES` |
| 논문 | `PUBS` |
| 경력 / 학력 / 수상 / 서비스 | `EXPERIENCE` / `EDUCATION` / `AWARDS` / `SERVICES` |

### 논문 추가

```js
{
  id: "mypaper2026",              // 딥링크 앵커 (#mypaper2026 — 뉴스에서 링크 가능)
  category: "international",      // domestic | patent 는 컴팩트 행으로 표시, 그 외는 카드
  theme: "spectral",              // THEMES 의 key
  selected: true,                 // Selected 탭 노출 여부
  date: "2026-06-01",             // 정렬용
  title: "...",
  authors: "Guhnoo Yun, ...",     // 본인 이름은 자동으로 강조됨
  venue: "CVPR 2026",
  badgeShort: "CVPR",             // 썸네일 위 배지
  note: "Oral",                   // 빨간 강조 텍스트 (수상 등, 선택)
  thumb: "assets/img/pub-xxx.webp", // 190×112 이상, 없으면 생략 가능
  abstract: "...",                // Abstract 토글 (선택)
  links: [{ label: "arXiv", url: "..." }],  // 첫 링크가 제목 링크가 됨
  bibtex: "@inproceedings{...}",  // BibTeX 토글 + 복사 버튼 (선택)
}
```

## 해야 할 일 (콘텐츠 확인)

- [x] 프로필 사진: `assets/img/profile.webp` (얼굴 중심 600×600 크롭 적용됨)
- [x] CV: `assets/pdf/Guhnoo_Yun_CV.pdf` (`SITE.cvLink` 지정됨 → CV 버튼 표시, 원본·빌드는 아래 "CV 빌드")
- [ ] `NEWS` 날짜 정확한 날짜로 수정 (현재 근사치)
- [ ] `EDUCATION` 학사 입학연도 확인 (졸업 2016만 확인됨), 박사과정 시작연도 추가
- [ ] `AWARDS` 수상 내역 채우기 (현재 비어 있어 섹션 자동 숨김)
- [ ] `SERVICES.reviewer` 리뷰어 활동 채우기
- [ ] 이메일을 학교 주소로 바꾸려면 `SITE.emailUser/emailDomain` 수정

## 배포 (GitHub Pages)

`DoranLyong/DoranLyong.github.io` 저장소의 `main` 브랜치 루트에서 서빙됩니다
(별도 빌드 없음, `.nojekyll` 포함).

> ⚠️ **저장소 이름 규칙**: 개인 홈페이지 저장소는 반드시 `<계정명>.github.io` 여야 합니다.
> 계정이 DoranLyong 이므로 저장소는 `DoranLyong.github.io`, 주소는 doranlyong.github.io 입니다.

```bash
# data.js 수정 후:
git add -A && git commit -m "Update news" && git push
```

push 후 1~3분 뒤 https://doranlyong.github.io 에 반영됩니다
(안 보이면 Cmd+Shift+R 강력 새로고침 — Pages 캐시는 max-age 600초).

## 로컬 미리보기

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## CV 빌드

CV 원본은 `cv/Guhnoo_Yun_CV.tex` (pdfLaTeX, A4 2쪽). 수정 후 PDF 를 다시 만들어 덮어씁니다
(보조 파일은 저장소 밖 임시 폴더에 생성):

```bash
latexmk -pdf -outdir=/tmp/cvbuild cv/Guhnoo_Yun_CV.tex
cp /tmp/cvbuild/Guhnoo_Yun_CV.pdf assets/pdf/Guhnoo_Yun_CV.pdf
```
