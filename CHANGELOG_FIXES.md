# PDFQuix — Bug Fix Changelog

All fixes below were verified by actually running the tool end-to-end in a real
headless Chromium browser (Playwright) against the exact CDN-pinned library
versions the site loads, then programmatically inspecting the output file
(page counts, encryption, text content, etc.) — not just code review.

---

## 1. `tools/fill-forms.html` — Silent save failure (CRITICAL)

**Bug:** Field type detection used `field.constructor.name` (e.g. expecting
`"PDFTextField"`, `"PDFCheckBox"`). The site loads the **minified**
`pdf-lib.min.js` from CDN, which mangles class names to single letters at
runtime (`"r"`, `"e"`, ...). Every `typeName === 'PDFTextField'` check
therefore always failed — meaning **whatever the user typed was silently
never written into the saved PDF**. The tool reported success and downloaded
a file, but the file always contained the original, unfilled form.

**Fix:** Replaced the string comparison with `instanceof` checks against the
actual classes pdf-lib exports (`PDFTextField`, `PDFCheckBox`, `PDFRadioGroup`,
`PDFDropdown`). `instanceof` checks the prototype chain, not a name string, so
it survives minification.

**Verified:** Typed "Ada Lovelace" into the name field and checked the
checkbox → downloaded PDF rendered with the text visible and the checkbox
showing a checkmark (confirmed both via text extraction and a rendered
screenshot).

---

## 2. `tools/pdf-forms.html` — Same silent save failure (CRITICAL)

**Bug:** Identical root cause to #1, in a second, independently-written tool:
`f.constructor.name.replace('PDF','').replace('Field','').toLowerCase()` and a
second `pdfField.constructor.name` check on save. Same silent no-op result.

**Fix:** Same `instanceof`-based helper (`getFieldTypeSlug`), applied to both
the field-rendering pass and the save pass.

**Verified:** Typed "Grace Hopper" into the field → confirmed present in the
saved PDF's text content.

---

## 3. `tools/annotate.html` — Save always crashes (CRITICAL)

**Bug:** `Cannot perform Construct on a detached ArrayBuffer` thrown every
time, on every file, when clicking Save. Cause: the file's `ArrayBuffer` was
read once into `originalBytes`, then a `Uint8Array` view of that **same**
buffer was handed to `pdfjsLib.getDocument()`. pdf.js transfers the buffer to
its worker thread for performance, which detaches it — so when `savePDF()`
later called `PDFDocument.load(originalBytes)`, the buffer was already dead.

**Fix:** Pass pdf.js a clone (`originalBytes.slice(0)`) instead of a view over
the live buffer, so `originalBytes` itself is never transferred/detached. This
is the same pattern `esign.html` already used correctly — confirmed via an
audit that no other tool in the codebase had this bug (the rest re-read the
file fresh in their save step, which sidesteps the issue).

**Verified:** Drew a highlight, clicked Save, downloaded a valid 5-page PDF.

---

## 4. `tools/compress.html` — Could make files dramatically *larger* (DESIGN FLAW)

**Bug:** Compression worked by rasterizing every page to a JPEG, full stop. For
ordinary text/vector PDFs (the majority of real-world PDFs — invoices, resumes,
contracts) this could make the file **enormously larger** (26× in testing)
while destroying text selection/search. The UI also hid this — when the
result was bigger, it said "File size is similar" instead of warning.

**Fix:** Now computes two candidates — a lossless structural repack (object
streams + optional metadata stripping, no rasterization) and the rasterized
version — and always returns whichever is genuinely smallest, falling back to
the untouched original if neither helps. The result message now honestly
states which strategy was used and why.

**Verified two scenarios:**
- Text-only PDF: 2,098 → 2,098 bytes (was 2,098 → 55,745 before the fix).
  Message: *"already well optimized... original file is returned unchanged."*
- Image-heavy "scanned" PDF (10 MB, random-noise JPEG so it can't trivially
  compress): 9.62 MB → 334 KB (96.6% reduction) — confirms rasterization still
  works great for the case it's actually good at.
- Metadata stripping re-verified to still work on the winning candidate.

---

## 5. `tools/html-to-pdf.html` — Didn't generate a real file, and leaked the site's own nav into the output (CRITICAL + bonus bug)

**Bug A:** Despite loading pdf-lib and destructuring `PDFDocument` from it,
the tool never used it. "Convert to PDF" just opened the browser's native
print dialog and told the user to manually pick "Save as PDF." No real file
was produced by the tool itself, it couldn't be automated, and it depends on
browser print support existing at all.

**Bug B (found while fixing A):** The generated preview/print document
included `<script src="../js/header.js">` and `<script src="../js/footer.js">`
— the same scripts that inject PDFQuix's full site navigation bar and footer
into every normal site page. Since those scripts auto-run on
`DOMContentLoaded` and unconditionally insert themselves into `document.body`,
**every preview (and every "printed" PDF, before this fix) had PDFQuix's own
nav menu and footer injected above and below the user's actual content** —
confirmed visually via screenshot.

**Fix:** Removed the stray header/footer script includes from the generated
document. Replaced `window.print()` with real client-side PDF generation:
render the content in a hidden iframe at the exact target page pixel width →
rasterize with html2canvas → slice into page-height chunks → embed each chunk
as a JPEG into a real pdf-lib document → trigger an actual file download.
(Output text isn't selectable, same fundamental trade-off as `compress.html`'s
rasterized path — this is now disclosed in the result message.)

**Verified:**
- Preview now shows only the user's own content (no more injected nav menu).
- Short content → correct 1-page PDF.
- 60-paragraph long content → correctly split across 4 pages (visually checked
  the page break — no missing or duplicated content).
- Invoice template + Letter + Landscape → correct 1-page PDF at exactly the
  right landscape Letter dimensions (792×612pt).
- Empty input still shows a friendly error and does not crash.

---

## 6. `tools/dark-mode.html` — Removed

Not a real tool — the file just immediately redirects to the homepage, isn't
linked from anywhere in the site (nav, sitemap, or otherwise), and was never
functional. Removed as dead code.

---

## 7. `tools/delete-pages.html` — Silent no-op (minor, defense-in-depth)

**Bug:** Clicking Delete with zero pages selected, or with *every* page
selected (which would produce an invalid 0-page PDF), silently did nothing —
no error, no feedback. In practice the Delete button is already disabled in
both of these states for normal mouse users, so this was only reachable via
keyboard/programmatic invocation — but it's still a real gap.

**Fix:** Added explicit, friendly error messages for both cases.

**Verified:** Directly invoked the save function while bypassing the disabled
button in both edge cases — now shows a clear message instead of doing
nothing. Normal case (delete 1 of 5 pages) re-verified still works.

---

## 8. `tools/split.html` — Grammar ("1 pages")

Minor cosmetic fix: result message now correctly says "1 page" instead of
"1 pages" when extracting a single page.

---

## Things checked and found to already be correct (no change needed)

To avoid fixing things that weren't broken, the following were explicitly
tested and confirmed already working correctly:
- Non-PDF file uploads are rejected with a friendly error on every PDF tool
  spot-checked (merge, split, compress, rotate, watermark).
- `unlock.html` with a wrong password shows "Incorrect password..." rather
  than crashing.
- `merge.html` with only one file shows a clear "add at least 2 files"
  message rather than silently no-op'ing.
- `split.html` on a single-page PDF works correctly.
- `crop.html`'s margin-to-crop-box math is already clamped against
  zero/negative crop dimensions for extreme inputs.
- `esign.html` and `protect.html` already validate for zero placements /
  empty passwords with friendly errors.

## Known limitation (not fixed — architectural, not a bug)

`tools/ocr.html` requires live internet access at click-time to download
Tesseract's WASM core and language pack from a CDN. Every other tool works
fully offline once the page has loaded; this is the one exception. Fixing
this would require bundling the OCR engine and language data with the site
(several MB), which is a product/hosting decision rather than a bug fix.

---

## 9. `tools/redact.html` — Redaction was cosmetic only; original text fully recoverable (CRITICAL, privacy)

**Bug:** "Apply Redactions" called `page.drawRectangle()` from pdf-lib, which
draws an opaque shape on top of the existing page content — it never touches
the underlying content stream. The text "hidden" under the black box was
still 100% present and extractable via copy-paste or any text-extraction
tool. This directly contradicted the tool's own on-page claim that
"the underlying text is replaced, not just covered."

**Verified before fix:** Drew a redaction box over a page heading, downloaded
the result, ran programmatic text extraction on the output PDF — the
supposedly-redacted text came back in full.

**Fix:** Redacted pages are now rendered to a flattened JPEG (via pdf.js, at
2x display resolution, capped at 3x) with the redaction boxes burned directly
into the pixels, then that image replaces the page's content entirely
(`insertPage` + `removePage`, not an overlay on the original page object).
Document metadata (title/author/subject/keywords) is also stripped on save,
since leftover metadata could leak the same information a user just tried to
redact. Pages with no redactions are left completely untouched. Text on
redacted pages is no longer selectable — same disclosed trade-off already
used in `compress.html`'s rasterized path and `html-to-pdf.html`.

**Verified after fix:**
- Single redaction on page 1 of 3: page 1 now extracts as empty text; pages
  2 and 3 (untouched) still extract their original text normally.
- Two redactions on non-adjacent pages (1 and 3, skipping 2): both redacted
  pages extract as empty, page 2 extracts normally, page count and order
  stayed correct at 3 — confirms the insert/remove index math holds when
  multiple pages are redacted in one pass.
- Visually re-rendered the redacted page: black box in the same position as
  drawn, rest of the page content still legible (now part of the flattened
  image rather than live text).

---

## 10. `tools/pdf-to-pdfa.html` — Embedded XMP metadata was malformed XML (HIGH)

**Bug:** The XMP packet header was built as
`` `<?xpacket begin="\uFEFF" id="...">` `` — a literal BOM character intended
per the XMP spec to declare byte order. But this string gets handed to
pdf-lib's `context.stream()`, which writes it out one byte per character
(Latin-1-style), so the 2-byte UTF-16 code unit `\uFEFF` was truncated down
to a single raw `0xFF` byte instead of being encoded properly. That stray
byte at the very start of the XML made the whole packet not well-formed,
which a strict XMP/XML parser (e.g. `pypdf`'s `xmp_metadata`) rejects
outright — so the output wasn't actually valid PDF/A despite the tool
reporting success.

**Fix:** Changed `begin="\uFEFF"` to `begin=""`. Per the XMP specification,
an empty string is the correct value when there's no byte-order ambiguity to
signal — which is the case here, since the string is handed to pdf-lib
directly with no encoding negotiation involved.

**Verified:** Re-ran the conversion; the embedded XMP packet now parses
successfully as well-formed XML (previously threw `ExpatError: not
well-formed`). Confirmed `pdfaid:part`, `pdfaid:conformance`, and the other
metadata fields are all still present and correct after the fix.

---

## Things checked and found to already be correct (no change needed) — round 2

Ran every tool not previously covered through a full end-to-end pass (real
file upload → action → output download → programmatic content verification
of the actual output file), using the same exact pinned CDN library versions
the site loads:

- `pdf-to-word.html`, `word-to-pdf.html` — round-trip text content verified
  correct on both ends.
- `pdf-to-excel.html` — table rows/columns extracted with correct values.
- `pdf-to-jpg.html`, `jpg-to-pdf.html` — correct page/image count both ways.
- `pdf-to-ppt.html` — correct slide count, each page rendered accurately.
- `batch.html` — multi-operation batch processing, correct ZIP output.
- `page-numbers.html` — numbers actually appear in the extracted text of
  every page.
- `repair.html` — all pages and text preserved after repair.
- `reorder.html`, `edit-pdf.html`, `scan-to-pdf.html` — save pipeline
  verified end-to-end with valid output.
- `excel-to-pdf.html` — spreadsheet data correctly rendered into the PDF.
- `compare.html` and `compare-pdf.html` (the latter currently unlinked from
  the site — see note below) — both correctly diff two PDFs with accurate
  red/removed, green/added line-level highlighting.
- Wrong-file-type handling spot-checked on four tools (`compress`, `merge`,
  `word-to-pdf`, `excel-to-pdf`) — all reject the wrong type with a clear,
  friendly error message rather than crashing.

## Found but not fixed (flagging for a product decision)

- `tools/compare-pdf.html` is fully functional but not linked from anywhere
  in the site (no nav entry, not in `sitemap.xml`). It duplicates
  `compare.html`'s functionality. Worth either linking it (if it's meant to
  be a distinct tool) or removing it to avoid maintaining two near-identical
  features.
- `tools/compare-pdf.html`'s per-side page counter shows "Page X of N" using
  the *larger* of the two documents' page counts on both sides, instead of
  each side showing its own actual page count. Cosmetic only.
