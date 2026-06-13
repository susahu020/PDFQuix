# PDFQuick — Complete Beginner's Setup Guide

## What you've built

A fully working PDF tools website with 6 tools:

| Tool | File | Works in browser? |
|------|------|-------------------|
| Compress PDF | tools/compress.html | ✅ Yes |
| Merge PDF | tools/merge.html | ✅ Yes |
| Split PDF | tools/split.html | ✅ Yes |
| PDF to Word | tools/pdf-to-word.html | ✅ Yes |
| Word to PDF | tools/word-to-pdf.html | ✅ Yes |
| PDF to JPG | tools/pdf-to-jpg.html | ✅ Yes |

**All 6 tools run 100% in the browser — no server, no backend, no database needed.**

---

## Project folder structure

```
pdftools/
├── index.html          ← Homepage
├── css/
│   └── style.css       ← All styling
├── js/
│   └── utils.js        ← Shared helper functions
└── tools/
    ├── compress.html
    ├── merge.html
    ├── split.html
    ├── pdf-to-word.html
    ├── word-to-pdf.html
    └── pdf-to-jpg.html
```

---

## Step 1 — Test it locally (on your own computer)

### Option A: VS Code (recommended for beginners)
1. Download and install VS Code: https://code.visualstudio.com
2. Install the "Live Server" extension (search in VS Code Extensions panel)
3. Open the `pdftools` folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Your browser opens at `http://127.0.0.1:5500` — your site is running!

### Option B: Any browser
1. Simply double-click `index.html` in your file explorer
2. The homepage will open. Navigate to each tool and test it.

> ⚠️ Some browsers block local file access. If a tool doesn't work when opened
> directly, use the Live Server method above.

---

## Step 2 — Deploy for free (go live on the internet)

### Option A: Netlify (easiest — recommended for beginners)

1. Go to https://netlify.com and create a free account
2. On your Netlify dashboard, look for **"Add new site"**
3. Choose **"Deploy manually"**
4. Drag and drop your entire `pdftools` folder onto the page
5. Done! Netlify gives you a URL like `https://random-name.netlify.app`

**To use a custom domain later (e.g. pdfquick.com):**
- Buy a domain on Namecheap or Google Domains (~$10/year)
- In Netlify → Site settings → Domain management → Add custom domain
- Follow the DNS instructions Netlify gives you

### Option B: Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Install Vercel CLI: `npm install -g vercel`
3. Open terminal in your `pdftools` folder
4. Run: `vercel`
5. Follow the prompts — your site goes live in 60 seconds

### Option C: GitHub Pages (free forever)

1. Create a free GitHub account at https://github.com
2. Create a new repository called `pdfquick` (or any name)
3. Upload all your files to the repository
4. Go to Settings → Pages → Source → select "main" branch
5. Your site is live at `https://yourusername.github.io/pdfquick`

---

## Step 3 — Give your site a proper name

Change "PDFQuick" throughout the files to your own brand name.
Search and replace `PDFQuick` in all HTML files.

Also update in `index.html`:
```html
<title>YourName — Free PDF Tools Online</title>
<meta name="description" content="Your description here"/>
```

---

## Step 4 — Basic SEO (get found on Google)

Each tool page already has a `<title>` and `<meta name="description">`.
To improve further:

1. **Add Google Search Console** (free):
   - Go to https://search.google.com/search-console
   - Add your website
   - Download the verification HTML file they give you
   - Upload it to your `pdftools` folder and redeploy

2. **Create a sitemap.xml** — add this file to your root folder:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yoursite.com/</loc></url>
  <url><loc>https://yoursite.com/tools/compress.html</loc></url>
  <url><loc>https://yoursite.com/tools/merge.html</loc></url>
  <url><loc>https://yoursite.com/tools/split.html</loc></url>
  <url><loc>https://yoursite.com/tools/pdf-to-word.html</loc></url>
  <url><loc>https://yoursite.com/tools/word-to-pdf.html</loc></url>
  <url><loc>https://yoursite.com/tools/pdf-to-jpg.html</loc></url>
</urlset>
```

---

## Step 5 — Add Google Analytics (optional, to track visitors)

1. Go to https://analytics.google.com
2. Create an account and get your Measurement ID (looks like `G-XXXXXXXXXX`)
3. Paste this just before `</head>` in every HTML file:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Libraries used (all free, loaded from CDN)

| Library | Purpose | CDN |
|---------|---------|-----|
| pdf-lib | Create, modify, compress PDFs | unpkg.com |
| pdf.js | Render PDF pages to canvas | cdnjs |
| mammoth.js | Read .docx Word files | cdnjs |
| docx.js | Create .docx Word files | cdnjs |
| JSZip | Create ZIP archives | cdnjs |

No npm install needed for production — everything loads from CDN automatically.

---

## Common questions

**Q: Is this really free to host?**
Yes. Netlify free tier allows 100GB bandwidth/month. That's plenty for a new site.

**Q: Do files get uploaded to any server?**
No. All processing happens in the visitor's browser. Nothing is sent to a server.

**Q: Can I add more tools later?**
Yes. Copy any existing tool HTML file, change the logic, add a card to `index.html`.

**Q: How do I make money from this later?**
- Google AdSense (display ads)
- A "Pro" version with higher file limits
- API access for developers
- Sponsored placement

---

## What to build next (Phase 2)

Once your site gets visitors, add these tools:
- `tools/jpg-to-pdf.html` — Convert images to PDF
- `tools/rotate.html` — Rotate PDF pages
- `tools/protect.html` — Add password to PDF
- `tools/unlock.html` — Remove PDF password
- `tools/watermark.html` — Add watermark text

Good luck! 🚀
