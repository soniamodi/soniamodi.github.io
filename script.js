const overlay = document.getElementById('overlay');
const tiles = document.querySelectorAll('.tile');
const panels = document.querySelectorAll('.panel');
const closeButtons = document.querySelectorAll('.close');

function openPanel(id) {
  document.getElementById(id).classList.add('open');
  overlay.classList.add('open');
}

function closeAll() {
  panels.forEach(p => p.classList.remove('open'));
  overlay.classList.remove('open');
}

tiles.forEach(tile => {
  tile.addEventListener('click', () => openPanel(tile.dataset.target));
});

closeButtons.forEach(btn => btn.addEventListener('click', closeAll));

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeAll();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
});
