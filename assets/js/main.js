/* ==========================================================================
   main.js — vanilla JS renderer. 콘텐츠 수정은 data.js 에서만 하세요.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m[d.getMonth()] + " " + d.getFullYear();
  }

  function highlightMe(authors) {
    return esc(authors).replace(
      new RegExp(esc(SITE.name), "g"),
      '<span class="me">' + esc(SITE.name) + "</span>"
    );
  }

  function flashLabel(btn, text) {
    clearTimeout(btn._flashTimer);
    if (btn._origLabel == null) btn._origLabel = btn.textContent;
    btn.textContent = text;
    btn._flashTimer = setTimeout(function () {
      btn.textContent = btn._origLabel;
      btn._origLabel = null;
      btn._flashTimer = null;
    }, 1600);
  }

  /* ---------- theme ---------- */

  function initTheme() {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    function label() {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.innerHTML = dark
        ? ICONS.sun + "Light mode"
        : ICONS.moon + "Dark mode";
    }
    btn.addEventListener("click", function () {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const next = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      label();
    });
    label();
  }

  /* ---------- email (obfuscated) ---------- */

  function initEmail() {
    const addr = SITE.emailUser + "@" + SITE.emailDomain;
    document.querySelectorAll("[data-email]").forEach(function (a) {
      a.href = "mailto:" + addr;
      if (a.hasAttribute("data-email-text")) a.textContent = addr;
    });
  }

  /* ---------- inline SVG icons ---------- */

  const ICONS = {
    scholar:
      '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 32L16 176l240 144 200-120v176h40V176L256 32zM120 320v96c0 26.5 60.9 64 136 64s136-37.5 136-64v-96l-136 81.6L120 320z"/></svg>',
    github:
      '<svg viewBox="0 0 496 512" aria-hidden="true"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
    twitter:
      '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>',
    email:
      '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
    blog:
      '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z"/></svg>',
    cv:
      '<svg viewBox="0 0 384 512" aria-hidden="true"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32z"/></svg>',
    moon:
      '<svg viewBox="0 0 384 512" aria-hidden="true"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>',
    sun:
      '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>',
  };

  /* ---------- section nav (shared by sidebar + mobile top bar) ---------- */

  const NAV_ITEMS = [
    ["#about", "About"],
    ["#news", "News"],
    ["#publications", "Publications"],
    ["#experience", "Experience"],
    ["#education", "Education"],
  ];

  /* 모바일(≤960px) 전용 sticky 상단 내비게이션 — 데스크톱에서는 CSS 로 숨김 */
  function renderMobileNav() {
    const nav = el("nav", "mobile-topnav");
    nav.setAttribute("aria-label", "Sections");
    nav.innerHTML = NAV_ITEMS.map(function (it) {
      return '<a href="' + it[0] + '">' + it[1] + "</a>";
    }).join("");
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ---------- sidebar ---------- */

  function renderSidebar() {
    const side = document.querySelector(".sidebar");
    if (!side) return;

    let social = "";
    function icon(href, key, title, external) {
      if (!href) return "";
      return (
        '<a href="' + href + '" title="' + title + '" aria-label="' + title + '"' +
        (external ? ' target="_blank" rel="noopener"' : "") +
        ">" + ICONS[key] + "</a>"
      );
    }
    social += '<a href="#" data-email title="Email" aria-label="Email">' + ICONS.email + "</a>";
    social += icon(SITE.scholar, "scholar", "Google Scholar", true);
    social += icon(SITE.github, "github", "GitHub", true);
    social += icon(SITE.linkedin, "linkedin", "LinkedIn", true);
    social += icon(SITE.twitter, "twitter", "X (Twitter)", true);
    social += icon(SITE.blog, "blog", "Blog", true);
    if (SITE.cvLink) social += icon(SITE.cvLink, "cv", "CV (PDF)", true);

    side.innerHTML =
      '<img class="avatar" src="' + SITE.portrait + '" alt="Portrait of ' + esc(SITE.name) + '">' +
      "<h1>" + esc(SITE.name) + "</h1>" +
      '<p class="position">' + esc(SITE.position) + "</p>" +
      '<p class="affiliation"><a href="' + SITE.affiliationLink + '" target="_blank" rel="noopener">' +
      esc(SITE.affiliation) + "</a></p>" +
      '<p class="email"><a href="#" data-email data-email-text></a></p>' +
      '<div class="social-icons">' + social + "</div>" +
      '<ul class="side-nav">' +
      NAV_ITEMS.map(function (it) {
        return '<li><a href="' + it[0] + '">' + it[1] + "</a></li>";
      }).join("") +
      "</ul>" +
      '<button class="theme-toggle" data-theme-toggle type="button"></button>';
  }

  /* ---------- publication card ---------- */

  function pubCard(p, opts) {
    opts = opts || {};
    const li = el("li");
    li.id = opts.anchor ? p.id : "";
    if (p.theme) li.dataset.themeTag = p.theme;

    const compact = p.category === "domestic" || p.category === "patent";
    const row = el("div", "pub-row" + (compact ? " pub-compact" : "") +
      (opts.highlightSelected && p.selected ? " pub-row-selected" : ""));

    const titleHref = p.links && p.links.length ? p.links[0].url : null;

    if (!compact && p.thumb) {
      const thumbWrap = el("div", "pub-thumb");
      const img =
        '<img src="' + p.thumb + '" alt="" loading="lazy" width="190" height="112">';
      thumbWrap.innerHTML = titleHref
        ? '<a href="' + titleHref + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' + img + "</a>"
        : img;
      if (p.badgeShort) {
        thumbWrap.appendChild(el("span", "pub-badge", esc(p.badgeShort)));
      }
      row.appendChild(thumbWrap);
    }

    const main = el("div", "pub-main");
    const titleHtml = titleHref
      ? '<a href="' + titleHref + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    main.appendChild(el("div", "pub-title", titleHtml));
    if (p.authors) main.appendChild(el("div", "pub-authors", highlightMe(p.authors)));

    let venueHtml = esc(p.venue || "");
    const year = p.date ? p.date.slice(0, 4) : "";
    if (year) venueHtml += (venueHtml ? ", " : "") + year;
    if (p.note) venueHtml += ' <span class="pub-note">' + esc(p.note) + "</span>";
    if (venueHtml) main.appendChild(el("div", "pub-venue", venueHtml));

    /* links row + abstract/bibtex toggles */
    const linksRow = el("div", "pub-links");
    (p.links || []).forEach(function (l) {
      const a = el("a", "btn", esc(l.label));
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      linksRow.appendChild(a);
    });

    let abstractPanel = null,
      bibtexPanel = null;

    if (p.abstract) {
      const btn = el("button", "btn", "Abstract");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      abstractPanel = el("div", "pub-extra", "<p style='margin:0'>" + esc(p.abstract) + "</p>");
      if (p.id) {
        abstractPanel.id = p.id + "-abstract";
        btn.setAttribute("aria-controls", abstractPanel.id);
      }
      btn.addEventListener("click", function () {
        abstractPanel.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(abstractPanel.classList.contains("open")));
      });
      linksRow.appendChild(btn);
    }

    if (p.bibtex) {
      const btn = el("button", "btn", "BibTeX");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      bibtexPanel = el("div", "pub-extra");
      if (p.id) {
        bibtexPanel.id = p.id + "-bibtex";
        btn.setAttribute("aria-controls", bibtexPanel.id);
      }
      const pre = el("pre", null, esc(p.bibtex));
      const copy = el("button", "btn", "Copy BibTeX");
      copy.type = "button";
      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(p.bibtex).then(function () {
          flashLabel(copy, "Copied!");
        });
      });
      bibtexPanel.appendChild(pre);
      bibtexPanel.appendChild(copy);
      btn.addEventListener("click", function () {
        bibtexPanel.classList.toggle("open");
        btn.setAttribute("aria-expanded", bibtexPanel.classList.contains("open"));
      });
      linksRow.appendChild(btn);
    }

    if (linksRow.childNodes.length) main.appendChild(linksRow);
    if (abstractPanel) main.appendChild(abstractPanel);
    if (bibtexPanel) main.appendChild(bibtexPanel);

    row.appendChild(main);
    li.appendChild(row);
    return li;
  }

  /* ---------- index page ---------- */

  function renderIndex() {
    /* about + interests */
    const about = document.getElementById("about-body");
    if (about) about.innerHTML = ABOUT_HTML;

    const interests = document.getElementById("interests-body");
    if (interests) {
      const ul = el("ul");
      INTERESTS.forEach(function (i) {
        ul.appendChild(el("li", null, i));
      });
      interests.appendChild(ul);
    }

    /* hero action buttons (conditional) + copy-bio */
    const actions = document.querySelector(".hero-actions");
    if (actions) {
      function add(label, href) {
        if (!href) return;
        const a = el("a", "btn", label);
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener";
        actions.appendChild(a);
      }
      add("CV (PDF)", SITE.cvLink);
      add("Research Statement", SITE.rsLink);
      add("Google Scholar", SITE.scholar);
      add("GitHub", SITE.github);

      const bioBtn = el("button", "btn", "Copy bio");
      bioBtn.type = "button";
      bioBtn.title = "Copy a third-person bio for talks & committees";
      bioBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(BIO).then(function () {
          flashLabel(bioBtn, "Copied!");
        });
      });
      actions.appendChild(bioBtn);
    }

    /* news (limit 5 + toggle) */
    const newsBody = document.getElementById("news-body");
    if (newsBody && NEWS.length) {
      const LIMIT = 5;
      const box = el("div", "news-box");
      const ul = el("ul");
      box.appendChild(ul);
      newsBody.appendChild(box);
      let expanded = false;

      function draw() {
        ul.innerHTML = "";
        (expanded ? NEWS : NEWS.slice(0, LIMIT)).forEach(function (n) {
          const li = el("li");
          li.appendChild(el("span", "news-date", fmtDate(n.date)));
          li.appendChild(el("span", null, n.html));
          ul.appendChild(li);
        });
      }
      draw();

      if (NEWS.length > LIMIT) {
        const btn = el("button", "link-btn", "Show all " + NEWS.length + " items");
        btn.type = "button";
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", function () {
          expanded = !expanded;
          btn.textContent = expanded ? "Show fewer" : "Show all " + NEWS.length + " items";
          btn.setAttribute("aria-expanded", String(expanded));
          draw();
        });
        newsBody.appendChild(btn);
      }
    }

    /* experience */
    const exp = document.getElementById("experience-body");
    if (exp) {
      EXPERIENCE.forEach(function (e) {
        const entry = el("div", "entry");
        entry.appendChild(el("div", "entry-when", esc(e.when)));
        const body = el("div", "entry-body");
        body.appendChild(el("div", "entry-title", esc(e.title)));
        body.appendChild(el("div", "entry-sub", e.sub));
        if (e.bullets && e.bullets.length) {
          const ul = el("ul");
          e.bullets.forEach(function (b) {
            ul.appendChild(el("li", null, b));
          });
          body.appendChild(ul);
        }
        entry.appendChild(body);
        exp.appendChild(entry);
      });
    }

    /* education */
    const edu = document.getElementById("education-body");
    if (edu) {
      EDUCATION.forEach(function (e) {
        const entry = el("div", "entry");
        entry.appendChild(el("div", "entry-when", esc(e.when)));
        const body = el("div", "entry-body");
        body.appendChild(el("div", "entry-title", esc(e.title)));
        body.appendChild(el("div", "entry-sub", e.sub));
        entry.appendChild(body);
        edu.appendChild(entry);
      });
    }

    /* awards — hide section when empty */
    const awardsSection = document.getElementById("awards");
    const awardsBody = document.getElementById("awards-body");
    if (awardsSection) {
      if (!AWARDS.length) {
        awardsSection.hidden = true;
      } else {
        const ul = el("ul", "flat-list");
        AWARDS.forEach(function (a) {
          ul.appendChild(el("li", null, '<span class="year">' + esc(a.year) + "</span>" + a.text));
        });
        awardsBody.appendChild(ul);
      }
    }

    /* services & skills */
    const svc = document.getElementById("services-body");
    if (svc) {
      let html = "";
      if (SERVICES.reviewer.length) {
        html += "<h3>Reviewer</h3><p>" + SERVICES.reviewer.map(esc).join(", ") + "</p>";
      }
      if (SERVICES.skills.length) {
        html += "<h3>Skills</h3><p>" + SERVICES.skills.map(esc).join(" · ") + "</p>";
      }
      if (SERVICES.openSource.length) {
        html +=
          "<h3>Open Source</h3><ul>" +
          SERVICES.openSource
            .map(function (o) {
              return "<li>" + o.text + "</li>";
            })
            .join("") +
          "</ul>";
      }
      svc.innerHTML = html;
      if (!html) document.getElementById("services").hidden = true;
    }
  }

  /* ---------- publications (Selected | All tabs, year-ordered) ---------- */

  function renderPubs() {
    const root = document.getElementById("pubs-body");
    if (!root) return;

    const sorted = PUBS.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });

    /* Selected | All tabs */
    const tabs = el("div", "pub-tabs");
    const tabSel = el("button", "pub-tab active", "Selected");
    const tabAll = el("button", "pub-tab", "All");
    [tabSel, tabAll].forEach(function (t) {
      t.type = "button";
    });
    tabs.appendChild(tabSel);
    tabs.appendChild(el("span", "pub-tab-sep", "|"));
    tabs.appendChild(tabAll);
    root.appendChild(tabs);

    /* theme filter chips — shown in All view only */
    const chipRow = el("div", "filter-chips");
    let activeTheme = "all";

    function makeChip(key, label) {
      const c = el("button", "chip" + (key === "all" ? " active" : ""), esc(label));
      c.type = "button";
      c.dataset.filter = key;
      c.setAttribute("aria-pressed", key === "all" ? "true" : "false");
      c.addEventListener("click", function () {
        activeTheme = key;
        chipRow.querySelectorAll(".chip").forEach(function (x) {
          const on = x.dataset.filter === key;
          x.classList.toggle("active", on);
          x.setAttribute("aria-pressed", String(on));
        });
        applyFilter();
      });
      return c;
    }
    chipRow.appendChild(makeChip("all", "All"));
    Object.keys(THEMES).forEach(function (k) {
      chipRow.appendChild(makeChip(k, THEMES[k]));
    });
    root.appendChild(chipRow);

    /* screen-reader announcement */
    const status = el("div", "visually-hidden");
    status.setAttribute("role", "status");
    root.appendChild(status);

    /* Selected list (flat, newest first) */
    const selWrap = el("div");
    const selUl = el("ul", "pub-list");
    sorted
      .filter(function (p) {
        return p.selected;
      })
      .forEach(function (p) {
        selUl.appendChild(pubCard(p, {}));
      });
    selWrap.appendChild(selUl);
    root.appendChild(selWrap);

    /* All list, year-ordered with ghost year separators */
    const allWrap = el("div");
    const allUl = el("ul", "pub-list");
    let lastYear = "";
    sorted.forEach(function (p) {
      const y = p.date.slice(0, 4);
      if (y !== lastYear) {
        const yl = el("li", "pub-year", y);
        yl.dataset.year = y;
        yl.setAttribute("aria-hidden", "true");
        allUl.appendChild(yl);
        lastYear = y;
      }
      const li = pubCard(p, { anchor: true, highlightSelected: true });
      li.dataset.year = y;
      allUl.appendChild(li);
    });
    allWrap.appendChild(allUl);
    root.appendChild(allWrap);

    let mode = "selected";
    let allVisible = allUl.querySelectorAll("li:not(.pub-year)").length;

    function announce() {
      const n = mode === "selected" ? selUl.children.length : allVisible;
      status.textContent = n + (n === 1 ? " publication shown" : " publications shown");
    }

    function setMode(m) {
      mode = m;
      tabSel.classList.toggle("active", m === "selected");
      tabAll.classList.toggle("active", m === "all");
      tabSel.setAttribute("aria-pressed", String(m === "selected"));
      tabAll.setAttribute("aria-pressed", String(m === "all"));
      selWrap.style.display = m === "selected" ? "" : "none";
      allWrap.style.display = m === "all" ? "" : "none";
      chipRow.style.display = m === "all" ? "" : "none";
      announce();
    }
    tabSel.addEventListener("click", function () {
      setMode("selected");
    });
    tabAll.addEventListener("click", function () {
      setMode("all");
    });

    function applyFilter() {
      const yearHasVisible = {};
      let total = 0;
      allUl.querySelectorAll("li:not(.pub-year)").forEach(function (li) {
        const show = activeTheme === "all" || li.dataset.themeTag === activeTheme;
        li.style.display = show ? "" : "none";
        if (show) {
          total++;
          yearHasVisible[li.dataset.year] = true;
        }
      });
      allUl.querySelectorAll("li.pub-year").forEach(function (li) {
        li.style.display = yearHasVisible[li.dataset.year] ? "" : "none";
      });
      allVisible = total;
      announce();
    }

    applyFilter();
    setMode("selected");

    /* deep links (#pub-id): switch to All so the target is visible, then scroll */
    function resolveHash() {
      if (!location.hash) return;
      const target = document.getElementById(location.hash.slice(1));
      if (target && allWrap.contains(target)) {
        setMode("all");
        requestAnimationFrame(function () {
          target.scrollIntoView({ block: "start" });
        });
      }
    }
    window.addEventListener("hashchange", resolveHash);
    resolveHash();
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    const f = document.querySelector("footer.site-footer");
    if (!f) return;
    let html =
      "<span>© " + new Date().getFullYear() + " " + esc(SITE.name) + "</span>" +
      "<span>" + esc(SITE.affiliation) + "</span>" +
      '<a href="#" data-email data-email-text></a>';
    if (SITE.cvLink) html += '<a href="' + SITE.cvLink + '" target="_blank" rel="noopener">CV (PDF)</a>';
    html += "<span>Last updated: " + esc(SITE.updated) + "</span>";
    f.innerHTML = html;
  }

  /* ---------- boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderMobileNav();
    renderSidebar();
    renderIndex();
    renderPubs();
    renderFooter();
    initEmail();
    initTheme();
  });
})();
