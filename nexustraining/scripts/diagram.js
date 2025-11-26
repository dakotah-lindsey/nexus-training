// Elements
const container = document.getElementById('diagram-container');
const inner = document.getElementById('diagram-inner');
const infoText = document.getElementById('info-text');

// Symbol info
const symbolInfo = {
  "Test 1": "Test 1: htghrstr.",
  "Test 2": "Test 2: trydjurtyudrhur6t",
  "Test 3": "Test 3: DHSGD",
  "Test 4": "Test 4: dghofpgo"
};

// Info bar functionality
document.querySelectorAll('.symbol-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const symbol = btn.dataset.symbol;
    infoText.textContent = symbolInfo[symbol] || "No information available.";
  });
});

// Zooming & panning setup
let scale = 1;
const minScale = 0.5;
const maxScale = 5;
let originX = 0;
let originY = 0;
let isPanning = false;
let startX, startY;

// Prevent scrolling the page when zooming or panning
window.addEventListener('wheel', (e) => {
  if (container.contains(e.target)) e.preventDefault();
}, { passive: false });

// Update transform (scale + pan)
function updateTransform() {
  inner.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// Mouse wheel zoom
container.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1.1 : 0.9;
  const rect = container.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  const newScale = Math.min(maxScale, Math.max(minScale, scale * delta));
  originX = offsetX - (offsetX - originX) * (newScale / scale);
  originY = offsetY - (offsetY - originY) * (newScale / scale);
  scale = newScale;
  updateTransform();
}, { passive: false });

// Panning — middle mouse button only
container.addEventListener('mousedown', (e) => {
  if (e.button !== 1) return;
  isPanning = true;
  startX = e.clientX - originX;
  startY = e.clientY - originY;
  container.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', (e) => {
  if (e.button !== 1) return;
  isPanning = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
  isPanning = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
  if (!isPanning) return;
  originX = e.clientX - startX;
  originY = e.clientY - startY;
  updateTransform();
});

// Reset Button
document.getElementById('reset-zoom').addEventListener('click', () => {
  scale = 1;
  originX = 0;
  originY = 0;
  updateTransform();
});

// Highlight selected symbol
document.querySelectorAll('.symbol-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.symbol-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});
