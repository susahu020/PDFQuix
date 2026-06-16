// ============================================
// PDFQuick — Multi-column Footer v2
// ============================================
function buildFooter(isToolPage) {
  const prefix = isToolPage ? '../' : '';
  return `
<footer class="footer-v2">
  <div class="container">
    <div class="footer-v2-grid">

      <!-- Brand -->
      <div class="footer-brand">
        <a href="${prefix}index.html" class="logo">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#E63946"/>
            <path d="M8 7h8l5 5v9a1 1 0 01-1 1H8a1 1 0 01-1-1V8a1 1 0 011-1z" fill="white" fill-opacity=".9"/>
            <path d="M16 7l5 5h-4a1 1 0 01-1-1V7z" fill="white" fill-opacity=".5"/>
          </svg>
          PDFQuick
        </a>
        <p>100% free, privacy-first PDF tools. No login, no limits, no nonsense. All processing in your browser.</p>
        <div class="footer-badges">
          <span class="footer-badge">🔒 Privacy First</span>
          <span class="footer-badge green">✅ Free Forever</span>
          <span class="footer-badge blue">⚡ No Login</span>
        </div>
      </div>

      <!-- PDF Tools -->
      <div class="footer-col">
        <h4>PDF Tools</h4>
        <ul>
          <li><a href="${prefix}tools/compress.html">Compress PDF</a></li>
          <li><a href="${prefix}tools/merge.html">Merge PDF</a></li>
          <li><a href="${prefix}tools/split.html">Split PDF</a></li>
          <li><a href="${prefix}tools/rotate.html">Rotate PDF</a></li>
          <li><a href="${prefix}tools/watermark.html">Watermark PDF</a></li>
          <li><a href="${prefix}tools/protect.html">Protect PDF</a></li>
          <li><a href="${prefix}tools/unlock.html">Unlock PDF</a></li>
          <li><a href="${prefix}tools/ocr.html">OCR PDF</a></li>
        </ul>
      </div>

      <!-- Convert -->
      <div class="footer-col">
        <h4>Convert</h4>
        <ul>
          <li><a href="${prefix}tools/pdf-to-word.html">PDF to Word</a></li>
          <li><a href="${prefix}tools/word-to-pdf.html">Word to PDF</a></li>
          <li><a href="${prefix}tools/pdf-to-jpg.html">PDF to JPG</a></li>
          <li><a href="${prefix}tools/jpg-to-pdf.html">JPG to PDF</a></li>
          <li><a href="${prefix}tools/pdf-to-excel.html">PDF to Excel</a></li>
          <li><a href="${prefix}tools/excel-to-pdf.html">Excel to PDF</a></li>
          <li><a href="${prefix}tools/pdf-to-ppt.html">PDF to PowerPoint</a></li>
          <li><a href="${prefix}tools/html-to-pdf.html">HTML to PDF</a></li>
        </ul>
      </div>

      <!-- Edit & Sign -->
      <div class="footer-col">
        <h4>Edit &amp; Sign</h4>
        <ul>
          <li><a href="${prefix}tools/esign.html">e-Sign PDF</a></li>
          <li><a href="${prefix}tools/fill-forms.html">Fill Forms</a></li>
          <li><a href="${prefix}tools/redact.html">Redact PDF</a></li>
          <li><a href="${prefix}tools/annotate.html">Annotate PDF</a></li>
          <li><a href="${prefix}tools/page-numbers.html">Page Numbers</a></li>
          <li><a href="${prefix}tools/reorder.html">Reorder Pages</a></li>
          <li><a href="${prefix}tools/delete-pages.html">Delete Pages</a></li>
          <li><a href="${prefix}tools/extract-text.html">Extract Text</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${prefix}blog.html">Blog</a></li>
          <li><a href="${prefix}about.html">About Us</a></li>
          <li><a href="${prefix}contact.html">Contact</a></li>
          <li><a href="${prefix}privacy.html">Privacy Policy</a></li>
          <li><a href="${prefix}terms.html">Terms of Service</a></li>
          <li><a href="${prefix}sitemap.xml">Sitemap</a></li>
        </ul>
      </div>

    </div>
  </div>

  <div class="footer-bottom">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <span class="footer-bottom-left">© ${new Date().getFullYear()} PDFQuick · All tools are free forever</span>
      <span class="footer-bottom-right">Made with <span class="heart">♥</span> · Privacy First · No Login Required</span>
    </div>
  </div>
</footer>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const isToolPage = window.location.pathname.includes('/tools/');
  // Remove old footer
  document.querySelectorAll('footer.footer').forEach(el => el.remove());
  document.body.insertAdjacentHTML('beforeend', buildFooter(isToolPage));
});
