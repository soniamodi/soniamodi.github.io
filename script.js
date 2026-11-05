const overlay = document.getElementById('overlay');
const tiles = document.querySelectorAll('.tile');
const panels = document.querySelectorAll('.panel');
const closeButtons = document.querySelectorAll('.panel .close');
const viewer = document.getElementById('viewer');
const viewerFrame = document.getElementById('viewer-frame');
const viewerTitle = document.getElementById('viewer-title');
const viewerClose = viewer.querySelector('.close');
const viewerOpen = document.getElementById('viewer-open');

function openPanel(id) {
  document.getElementById(id).classList.add('open');
  overlay.classList.add('open');
}

// Phones and tablets can't render a PDF inside an iframe, so open it in a new tab there.
function canEmbedPdf() {
  if (navigator.pdfViewerEnabled === false) return false;
  const touchMac = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
  return !(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || touchMac);
}

function openViewer(src, title) {
  if (!canEmbedPdf()) {
    window.open(src, '_blank', 'noopener');
    return;
  }
  viewerOpen.href = src;
  viewerTitle.textContent = title;
  viewerFrame.src = src;
  viewer.classList.add('open');
}

function closeViewer() {
  viewer.classList.remove('open');
  viewerFrame.src = 'about:blank';
}

function closeAll() {
  closeViewer();
  panels.forEach(p => p.classList.remove('open'));
  document.querySelectorAll('video').forEach(v => v.pause());
  overlay.classList.remove('open');
}

tiles.forEach(tile => {
  tile.addEventListener('click', () => openPanel(tile.dataset.target));
});

closeButtons.forEach(btn => btn.addEventListener('click', closeAll));

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeAll();
});

document.querySelectorAll('[data-pdf]').forEach(btn => {
  btn.addEventListener('click', () => openViewer(btn.dataset.pdf, btn.dataset.title));
});

viewerClose.addEventListener('click', closeViewer);

viewer.addEventListener('click', e => {
  if (e.target === viewer) closeViewer();
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (viewer.classList.contains('open')) closeViewer();
  else closeAll();
});
