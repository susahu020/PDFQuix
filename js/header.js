// ============================================
// PDFQuick — Header v6
// LEFT: Logo
// CENTRE: [Compress PDF] [Merge PDF] [e-Sign PDF] | [Convert ▾] [All Tools ▾]
// RIGHT: Search bar | Dark-mode icon
// ============================================

const TOOLS = {
  optimise: {
    label: 'Optimise', icon: '⚡', color: '#ef4444', bg: '#fee2e2',
    desc: 'Reduce, fix & resize',
    tools: [
      { name: 'Compress PDF',  href: 'compress.html',    icon: '🗜️', desc: 'Shrink file size' },
      { name: 'Split PDF',     href: 'split.html',       icon: '✂️', desc: 'Extract pages' },
      { name: 'Crop PDF',      href: 'crop.html',        icon: '📐', desc: 'Trim margins', isNew: true },
      { name: 'Repair PDF',    href: 'repair.html',      icon: '🔧', desc: 'Fix corrupt files', isNew: true },
    ]
  },
  organise: {
    label: 'Organise', icon: '📁', color: '#3b82f6', bg: '#dbeafe',
    desc: 'Arrange & manage pages',
    tools: [
      { name: 'Merge PDF',      href: 'merge.html',        icon: '🔗', desc: 'Combine files' },
      { name: 'Reorder pages',  href: 'reorder.html',      icon: '🔀', desc: 'Drag to sort' },
      { name: 'Delete pages',   href: 'delete-pages.html', icon: '🗑️', desc: 'Remove pages', isNew: true },
      { name: 'Rotate PDF',     href: 'rotate.html',       icon: '🔄', desc: 'Fix orientation' },
      { name: 'Page numbers',   href: 'page-numbers.html', icon: '#️⃣', desc: 'Add numbering' },
      { name: 'Batch process',  href: 'batch.html',        icon: '⚙️', desc: 'Process many files' },
    ]
  },
  convert: {
    label: 'Convert', icon: '🔄', color: '#10b981', bg: '#dcfce7',
    desc: 'Change file formats',
    tools: [
      { name: 'PDF to Word',  href: 'pdf-to-word.html',  icon: '📝', desc: 'Editable .docx' },
      { name: 'Word to PDF',  href: 'word-to-pdf.html',  icon: '📄', desc: 'From .docx' },
      { name: 'PDF to Excel', href: 'pdf-to-excel.html', icon: '📊', desc: 'Extract tables', isNew: true },
      { name: 'Excel to PDF', href: 'excel-to-pdf.html', icon: '📊', desc: 'From .xlsx/.csv', isNew: true },
      { name: 'PDF to JPG',   href: 'pdf-to-jpg.html',   icon: '🖼️', desc: 'Pages as images' },
      { name: 'JPG to PDF',   href: 'jpg-to-pdf.html',   icon: '📷', desc: 'Images to PDF' },
      { name: 'PDF to PPT',   href: 'pdf-to-ppt.html',   icon: '📑', desc: 'Editable slides' },
      { name: 'HTML to PDF',  href: 'html-to-pdf.html',  icon: '💻', desc: 'Webpage to PDF', isNew: true },
    ]
  },
  edit: {
    label: 'Edit & Review', icon: '✏️', color: '#f59e0b', bg: '#fef3c7',
    desc: 'Mark up & compare',
    tools: [
      { name: 'Annotate PDF', href: 'annotate.html',     icon: '🖊️', desc: 'Highlight & draw', isNew: true },
      { name: 'Compare PDFs', href: 'compare.html',      icon: '🔍', desc: 'Find changes', isNew: true },
      { name: 'Extract text', href: 'extract-text.html', icon: '📋', desc: 'Copy as .txt', isNew: true },
      { name: 'Redact PDF',   href: 'redact.html',       icon: '🚫', desc: 'Hide sensitive data' },
      { name: 'Watermark',    href: 'watermark.html',    icon: '💧', desc: 'Add text/image' },
      { name: 'Fill forms',   href: 'fill-forms.html',   icon: '📝', desc: 'Complete PDF forms' },
    ]
  },
  secure: {
    label: 'Sign & Secure', icon: '🔒', color: '#8b5cf6', bg: '#ede9fe',
    desc: 'Sign, protect & unlock',
    tools: [
      { name: 'e-Sign PDF',  href: 'esign.html',   icon: '✍️', desc: 'Draw your signature' },
      { name: 'Protect PDF', href: 'protect.html', icon: '🔐', desc: 'Add password' },
      { name: 'Unlock PDF',  href: 'unlock.html',  icon: '🔓', desc: 'Remove password' },
      { name: 'OCR PDF',     href: 'ocr.html',     icon: '👁️', desc: 'Make searchable' },
    ]
  }
};

// 3 pinned quick-access tools shown as icon pills in the centre
const PINNED = [
  { name: 'Compress PDF', href: 'compress.html', icon: '🗜️', color: '#ef4444', bg: '#fee2e2' },
  { name: 'Merge PDF',    href: 'merge.html',    icon: '🔗', color: '#3b82f6', bg: '#dbeafe' },
  { name: 'e-Sign PDF',   href: 'esign.html',    icon: '✍️', color: '#8b5cf6', bg: '#ede9fe' },
];

// ─────────────────────────────────────────────
// Build a single category dropdown panel
// ─────────────────────────────────────────────
function buildCatPanel(cat, prefix) {
  const toolLinks = cat.tools.map(t => `
    <a class="hdd-tool" href="${prefix}${t.href}">
      <span class="hdd-tool-icon" style="background:${cat.bg};color:${cat.color}">${t.icon}</span>
      <span class="hdd-tool-body">
        <span class="hdd-tool-name">${t.name}${t.isNew ? ' <span class="hdd-new">New</span>' : ''}</span>
        <span class="hdd-tool-desc">${t.desc}</span>
      </span>
    </a>`).join('');

  return `
    <div class="hdd-panel-header" style="border-top:3px solid ${cat.color}">
      <span class="hdd-panel-icon" style="background:${cat.bg};color:${cat.color}">${cat.icon}</span>
      <div>
        <div class="hdd-panel-title">${cat.label}</div>
        <div class="hdd-panel-desc">${cat.desc}</div>
      </div>
    </div>
    <div class="hdd-tools-grid">${toolLinks}</div>`;
}

// ─────────────────────────────────────────────
// Build the "All Tools" mega-panel (category columns)
// ─────────────────────────────────────────────
function buildAllToolsPanel(prefix) {
  const columns = Object.values(TOOLS).map(cat => {
    const links = cat.tools.map(t => `
      <a class="hdd-tool" href="${prefix}${t.href}">
        <span class="hdd-tool-icon" style="background:${cat.bg};color:${cat.color}">${t.icon}</span>
        <span class="hdd-tool-body">
          <span class="hdd-tool-name">${t.name}${t.isNew ? ' <span class="hdd-new">New</span>' : ''}</span>
          <span class="hdd-tool-desc">${t.desc}</span>
        </span>
      </a>`).join('');

    return `
      <div class="all-col">
        <div class="all-col-head" style="color:${cat.color}">
          <span class="all-col-icon" style="background:${cat.bg};color:${cat.color}">${cat.icon}</span>
          ${cat.label}
        </div>
        ${links}
      </div>`;
  }).join('');

  return `
    <div class="all-panel-header">
      <div class="all-panel-title">All PDF Tools</div>
      <div class="all-panel-desc">28 free tools — no account needed</div>
    </div>
    <div class="all-tools-cols">${columns}</div>`;
}

// ─────────────────────────────────────────────
// Main buildHeader
// ─────────────────────────────────────────────
function buildHeader(isToolPage) {
  const prefix    = isToolPage ? '' : 'tools/';
  const homeHref  = isToolPage ? '../index.html' : 'index.html';
  const aboutHref = isToolPage ? '../about.html'  : 'about.html';
  const urlBase   = isToolPage ? '../' : '';

  // ── Pinned quick-access pills ──
  const pinnedHTML = PINNED.map(p => `
    <a class="nav-pill" href="${prefix}${p.href}">
      <span class="nav-pill-label">${p.name}</span>
    </a>`).join('');

  // ── Convert dropdown ──
  const convertCat = TOOLS.convert;
  const convertPanel = buildCatPanel(convertCat, prefix);

  // ── All Tools mega panel ──
  const allPanel = buildAllToolsPanel(prefix);

  // ── Mobile cats ──
  const mobileCats = Object.entries(TOOLS).map(([key, cat]) => {
    const links = cat.tools.map(t => `
      <a class="mob-link" href="${prefix}${t.href}">
        <span class="mob-link-icon" style="background:${cat.bg};color:${cat.color}">${t.icon}</span>
        <span class="mob-link-name">${t.name}${t.isNew ? ' <span class="hdd-new">New</span>' : ''}</span>
      </a>`).join('');
    return `
    <div class="mob-cat">
      <div class="mob-cat-title" style="color:${cat.color}">${cat.icon} ${cat.label}</div>
      <div class="mob-tools">${links}</div>
    </div>`;
  }).join('');

  const LOGO_SVG = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#E63946"/>
    <path d="M8 7h8l5 5v9a1 1 0 01-1 1H8a1 1 0 01-1-1V8a1 1 0 011-1z" fill="white" fill-opacity=".9"/>
    <path d="M16 7l5 5h-4a1 1 0 01-1-1V7z" fill="white" fill-opacity=".5"/>
  </svg>`;

  return `
  <div class="hdd-backdrop" id="hddBackdrop"></div>

  <!-- Mobile overlay -->
  <div class="mob-overlay" id="mobOverlay">
    <div class="mob-overlay-inner">
      <div class="mob-header">
        <a href="${homeHref}" class="logo" onclick="closeMob()">${LOGO_SVG} PDFQuick</a>
        <button class="mob-close" onclick="closeMob()" aria-label="Close">✕</button>
      </div>
      <div class="mob-search-wrap">
        <span class="mob-search-icon">🔍</span>
        <input id="mobSearchInput" class="mob-search-input" type="text" placeholder="Search tools…" oninput="runMobSearch(this.value)"/>
      </div>
      <div id="mobCats">${mobileCats}</div>
      <div class="mob-static-links">
        <a class="mob-link" href="${urlBase}blog.html">
          <span class="mob-link-icon" style="background:#fff0f1;color:#E63946">📰</span>
          <span class="mob-link-name">Blog</span>
        </a>
        <a class="mob-link" href="${aboutHref}">
          <span class="mob-link-icon" style="background:#eff6ff;color:#3b82f6">ℹ️</span>
          <span class="mob-link-name">About</span>
        </a>
        <a class="mob-link" href="${urlBase}contact.html">
          <span class="mob-link-icon" style="background:#f0fdf4;color:#16a34a">✉️</span>
          <span class="mob-link-name">Contact</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Main header -->
  <header class="header" id="siteHeader">
    <div class="container header-inner">

      <!-- LEFT: Logo -->
      <a href="${homeHref}" class="logo">
        ${LOGO_SVG}
        PDFQuick
      </a>

      <!-- CENTRE nav -->
      <nav class="hdd-nav" id="hddNav" aria-label="Tools navigation">

        <!-- 3 pinned tool pills -->
        ${pinnedHTML}

        <!-- Divider -->
        <div class="nav-divider"></div>

        <!-- Convert category dropdown -->
        <div class="hdd-item" data-id="convert">
          <button class="hdd-trigger" aria-haspopup="true" aria-expanded="false">
            <span class="hdd-trigger-icon">${convertCat.icon}</span>
            Convert
            <svg class="hdd-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="hdd-panel" role="menu">
            ${convertPanel}
          </div>
        </div>

        <!-- All Tools mega dropdown -->
        <div class="hdd-item hdd-item--all" data-id="alltools">
          <button class="hdd-trigger hdd-trigger--all" aria-haspopup="true" aria-expanded="false">
            <span class="hdd-trigger-icon">📄</span>
            All Tools
            <svg class="hdd-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="hdd-panel hdd-panel--all" role="menu">
            ${allPanel}
          </div>
        </div>

      </nav>

      <!-- RIGHT: Search + dark mode + hamburger -->
      <div class="header-right">

        <div class="hdr-search-wrap" id="hdrSearchWrap">
          <span class="hdr-search-icon">🔍</span>
          <input
            id="hdrSearchInput"
            class="hdr-search-input"
            type="text"
            placeholder="Search tools…"
            autocomplete="off"
            oninput="runHeaderSearch(this.value)"
            onfocus="showSearchResults()"
          />
          <button class="hdr-search-clear" id="hdrSearchClear" onclick="clearHeaderSearch()" aria-label="Clear">✕</button>
          <div class="hdr-search-results" id="hdrSearchResults"></div>
        </div>

        <button class="hdr-dm-btn" id="dmToggle" onclick="toggleDarkMode()" aria-label="Toggle dark mode">
          <span id="dmIcon">🌙</span>
        </button>

        <button class="mob-burger" onclick="openMob()" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>

      </div>
    </div>
  </header>`;
}

// ─────────────────────────────────────────────
// Hover / click interaction logic
// ─────────────────────────────────────────────
let hoverTimer = null;

function setupHover() {
  document.querySelectorAll('.hdd-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      closeAll();
      openItem(item);
    });
    item.addEventListener('mouseleave', () => {
      hoverTimer = setTimeout(closeAll, 130);
    });
    item.querySelector('.hdd-panel')?.addEventListener('mouseenter', () => clearTimeout(hoverTimer));
    item.querySelector('.hdd-panel')?.addEventListener('mouseleave', () => {
      hoverTimer = setTimeout(closeAll, 130);
    });
    item.querySelector('.hdd-trigger')?.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      closeAll();
      if (!isOpen) openItem(item);
    });
  });

  document.getElementById('hddBackdrop')?.addEventListener('click', closeAll);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAll(); closeMob(); clearHeaderSearch(); }
  });
}

function openItem(item) {
  item.classList.add('open');
  item.querySelector('.hdd-trigger')?.setAttribute('aria-expanded', 'true');
  document.getElementById('hddBackdrop')?.classList.add('active');
}
function closeAll() {
  document.querySelectorAll('.hdd-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.hdd-trigger')?.setAttribute('aria-expanded', 'false');
  });
  document.getElementById('hddBackdrop')?.classList.remove('active');
}

// ─────────────────────────────────────────────
// Mobile
// ─────────────────────────────────────────────
function openMob() {
  document.getElementById('mobOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('mobSearchInput')?.focus();
}
function closeMob() {
  document.getElementById('mobOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────
// Search helpers
// ─────────────────────────────────────────────
function getAllTools(prefix) {
  const all = [];
  Object.values(TOOLS).forEach(cat => {
    cat.tools.forEach(t => all.push({ ...t, cat: cat.label, catIcon: cat.icon, catColor: cat.color, catBg: cat.bg, href: prefix + t.href }));
  });
  return all;
}

function runHeaderSearch(query) {
  const prefix = window.location.pathname.includes('/tools/') ? '' : 'tools/';
  const q = query.trim().toLowerCase();
  const clear = document.getElementById('hdrSearchClear');
  if (clear) clear.style.display = q ? 'flex' : 'none';
  const results = document.getElementById('hdrSearchResults');
  if (!results) return;
  if (!q) { results.classList.remove('open'); return; }
  const matches = getAllTools(prefix).filter(t =>
    t.name.toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)
  ).slice(0, 8);
  results.innerHTML = matches.length
    ? matches.map(t => `
        <a class="hsr-item" href="${t.href}">
          <span class="hsr-icon" style="background:${t.catBg};color:${t.catColor}">${t.icon}</span>
          <span class="hsr-body">
            <span class="hsr-name">${highlightMatch(t.name, q)}</span>
            <span class="hsr-cat">${t.catIcon} ${t.cat}</span>
          </span>
        </a>`).join('')
    : `<div class="hsr-empty">No tools match "<strong>${q}</strong>"</div>`;
  results.classList.add('open');
}

function highlightMatch(text, q) {
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
}
function showSearchResults() {
  const q = document.getElementById('hdrSearchInput')?.value?.trim();
  if (q) runHeaderSearch(q);
}
function clearHeaderSearch() {
  const inp = document.getElementById('hdrSearchInput');
  if (inp) { inp.value = ''; inp.focus(); }
  document.getElementById('hdrSearchResults')?.classList.remove('open');
  const clear = document.getElementById('hdrSearchClear');
  if (clear) clear.style.display = 'none';
}
document.addEventListener('click', e => {
  if (!document.getElementById('hdrSearchWrap')?.contains(e.target))
    document.getElementById('hdrSearchResults')?.classList.remove('open');
});

// ─────────────────────────────────────────────
// Mobile search
// ─────────────────────────────────────────────
function runMobSearch(query) {
  const prefix = window.location.pathname.includes('/tools/') ? '' : 'tools/';
  const q = query.trim().toLowerCase();
  const cats = document.getElementById('mobCats');
  if (!cats) return;
  if (!q) {
    cats.querySelectorAll('.mob-link, .mob-cat').forEach(el => el.style.display = '');
    return;
  }
  cats.querySelectorAll('.mob-cat').forEach(catEl => {
    let visible = false;
    catEl.querySelectorAll('.mob-link').forEach(link => {
      const show = link.textContent.toLowerCase().includes(q);
      link.style.display = show ? '' : 'none';
      if (show) visible = true;
    });
    catEl.style.display = visible ? '' : 'none';
  });
}

// ─────────────────────────────────────────────
// Dark mode
// ─────────────────────────────────────────────
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.body?.setAttribute('data-theme', t);
  const icon = document.getElementById('dmIcon');
  if (icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
}
function toggleDarkMode() {
  const cur  = document.documentElement.getAttribute('data-theme') || 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  localStorage.setItem('pdfquick-theme', next);
  applyTheme(next);
}
(function() {
  const saved = localStorage.getItem('pdfquick-theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
})();

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const isToolPage = window.location.pathname.includes('/tools/');
  document.querySelectorAll('header.header, .hdd-backdrop, .mob-overlay').forEach(el => el.remove());
  document.body.insertAdjacentHTML('afterbegin', buildHeader(isToolPage));
  setupHover();
  const saved = localStorage.getItem('pdfquick-theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
});
