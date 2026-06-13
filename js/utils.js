// ============================================
// PDFQuick — Shared Utilities (utils.js)
// ============================================

// Format bytes to KB / MB
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Trigger a file download from a Blob or Uint8Array
function downloadFile(data, filename, mimeType = 'application/pdf') {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// Read a File as ArrayBuffer (returns Promise)
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

// Read a File as DataURL (returns Promise) — used for image preview
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Show progress bar
function setProgress(pct, label = '') {
  const fill  = document.querySelector('.progress-bar-fill');
  const lbl   = document.querySelector('.progress-label');
  if (fill) fill.style.width = pct + '%';
  if (lbl)  lbl.textContent  = label;
}

// Show / hide error message
function showError(msg) {
  const box = document.querySelector('.error-box');
  if (!box) return;
  box.textContent = msg;
  box.classList.add('visible');
}
function clearError() {
  const box = document.querySelector('.error-box');
  if (box) box.classList.remove('visible');
}

// Show success result box
function showResult(msg, filename, data, mimeType = 'application/pdf') {
  const box  = document.querySelector('.result-box');
  const desc = box?.querySelector('p');
  const btn  = box?.querySelector('.btn-download');
  if (!box) return;
  if (desc) desc.textContent = msg;
  if (btn) {
    btn.onclick = () => downloadFile(data, filename, mimeType);
  }
  box.classList.add('visible');
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Setup drag-and-drop on a dropzone
function setupDropzone(dropzoneEl, onFiles) {
  dropzoneEl.addEventListener('dragover', e => {
    e.preventDefault();
    dropzoneEl.classList.add('dragover');
  });
  dropzoneEl.addEventListener('dragleave', () => {
    dropzoneEl.classList.remove('dragover');
  });
  dropzoneEl.addEventListener('drop', e => {
    e.preventDefault();
    dropzoneEl.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  });
  dropzoneEl.addEventListener('click', () => {
    const input = dropzoneEl.querySelector('input[type="file"]');
    if (input) input.click();
  });
}

// Render file list items
function renderFileList(files, listEl, onRemove) {
  listEl.innerHTML = '';
  files.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-item-icon">📄</span>
      <div class="file-item-info">
        <div class="file-item-name">${file.name}</div>
        <div class="file-item-size">${formatBytes(file.size)}</div>
      </div>
      <button class="file-item-remove" title="Remove">✕</button>
    `;
    item.querySelector('.file-item-remove').onclick = () => onRemove(i);
    listEl.appendChild(item);
  });
}
