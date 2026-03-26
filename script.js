const heroImages = {
  original: "imagenes/pexels-uhgo-3160544.jpg",
  truck: "imagenes/pexels-500photos-com-15338-93398.jpg",
};
let currentScale = 1;
let scrollY = 0;
function scaleWindow() {
  const win = document.getElementById("window");
  const scaler = document.getElementById("scaler");
  if (!win || !scaler) return;
  const gapX = -15;
  const gapTop = 15;
  const gapBottom = 15;
  const scale = (window.innerWidth - gapX * 2) / 560;
  currentScale = scale;
  const scrollContent = document.getElementById("scroll-content");
  const contentH = scrollContent ? Math.ceil(scrollContent.offsetHeight) : 0;
  const maxH =
    Math.round((window.innerHeight - gapTop - gapBottom) / scale) + 10;
  const h = contentH > 0 ? Math.min(contentH, maxH) : maxH;
  const leftPos = (window.innerWidth / 2 - (560 / 2) * scale) / scale;
  const topPos = (gapTop - 10 * scale) / scale;
  const clip = `M 10 36 L 550 36 L 550 ${h - 8} A 8 8 0 0 1 542 ${h} L 18 ${h} A 8 8 0 0 1 10 ${h - 8} L 10 36 Z M 18 10 L 112 10 A 8 8 0 0 1 120 18 L 120 36 L 10 36 L 10 18 A 8 8 0 0 1 18 10 Z M 448 10 L 542 10 A 8 8 0 0 1 550 18 L 550 36 L 440 36 L 440 18 A 8 8 0 0 1 448 10 Z M 120 28 C 120 32.42 123.58 36 128 36 H 120 Z M 440 28 C 440 32.42 436.42 36 432 36 H 440 Z`;
  win.style.clipPath = `path('${clip}')`;
  win.style.width = "560px";
  win.style.height = h + "px";
  win.style.left = leftPos + "px";
  win.style.top = topPos + "px";
  win.style.transform = "none";
  win.style.zoom = String(scale);
  const heroImg = document.getElementById("hero-video");
  const heroCont = document.getElementById("hero-container");
  if (heroImg) heroImg.style.height = h + "px";
  if (heroCont) heroCont.style.height = h + "px";
  const S = scale;
  const ox = leftPos * scale;
  const oy = topPos * scale;
  const svgPath = `
      M ${ox + 10 * S} ${oy + 18 * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 18 * S} ${oy + 10 * S}
      L ${ox + 112 * S} ${oy + 10 * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 120 * S} ${oy + 18 * S}
      L ${ox + 120 * S} ${oy + 28 * S}
      C ${ox + 120 * S} ${oy + 32.42 * S} ${ox + 123.58 * S} ${oy + 36 * S} ${ox + 128 * S} ${oy + 36 * S}
      L ${ox + 432 * S} ${oy + 36 * S}
      C ${ox + 436.42 * S} ${oy + 36 * S} ${ox + 440 * S} ${oy + 32.42 * S} ${ox + 440 * S} ${oy + 28 * S}
      L ${ox + 440 * S} ${oy + 18 * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 448 * S} ${oy + 10 * S}
      L ${ox + 542 * S} ${oy + 10 * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 550 * S} ${oy + 18 * S}
      L ${ox + 550 * S} ${oy + (h - 8) * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 542 * S} ${oy + h * S}
      L ${ox + 18 * S} ${oy + h * S} A ${8 * S} ${8 * S} 0 0 1 ${ox + 10 * S} ${oy + (h - 8) * S}
      Z
    `;
  const shadowPath = document.getElementById("svg-shadow-path");
  if (shadowPath) shadowPath.setAttribute("d", svgPath);
  const islaEl = document.getElementById("isla");
  if (islaEl) {
    const screenTop = gapTop - 10 * scale;
    islaEl.style.left = window.innerWidth / 2 - 150 * scale + "px";
    islaEl.style.top = screenTop + 14 * scale + "px";
    islaEl.style.width = 300 * scale + "px";
    islaEl.style.height = 20 * scale + "px";
    islaEl.style.fontSize = 7.5 * scale + "px";
    islaEl.style.gap = 24 * scale + "px";
    islaEl.style.opacity = "1";
    document.querySelectorAll(".isla-group").forEach((g) => {
      g.style.gap = 18 * scale + "px";
    });
    const islaLogo = document.getElementById("isla-logo");
    if (islaLogo) islaLogo.style.height = 21 * scale + "px";
  }
  win.style.visibility = "visible";
  updateScroll();
}
function updateScroll() {
  const scaler = document.getElementById("scaler");
  const content = document.getElementById("scroll-content");
  const thumb = document.getElementById("scroll-thumb");
  if (!scaler || !content || !thumb) return;
  const scale = currentScale;
  const totalH = content.offsetHeight;
  const visibleH = totalH - window.innerHeight / scale;
  const clamped = Math.max(0, Math.min(scrollY, visibleH));
  scrollY = clamped;
  scaler.style.marginTop = `-${clamped}px`;
  const ratio = window.innerHeight / scale / totalH;
  const thumbH = Math.max(ratio * window.innerHeight, 30);
  const thumbTop =
    visibleH > 0 ? (clamped / visibleH) * (window.innerHeight - thumbH) : 0;
  thumb.style.height = thumbH + "px";
  thumb.style.top = thumbTop + "px";
}
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
    scrollY += e.deltaY / currentScale;
    updateScroll();
  },
  { passive: false },
);
window.addEventListener("resize", scaleWindow);
scaleWindow();
function switchHero(key) {
  const img = document.getElementById("hero-video");
  if (img) img.src = heroImages[key];
  document.getElementById("img-btn-1").style.background =
    key === "original" ? "#fff" : "rgba(255,255,255,0.4)";
  document.getElementById("img-btn-2").style.background =
    key === "truck" ? "#fff" : "rgba(255,255,255,0.4)";
}
function openDemo() {
  document.getElementById("modal-overlay").classList.add("open");
}
function closeDemo(e) {
  if (e.target === document.getElementById("modal-overlay")) {
    document.getElementById("modal-overlay").classList.remove("open");
    document.getElementById("demo-form").style.display = "flex";
    document.getElementById("form-success").style.display = "none";
  }
}
function submitDemo(e) {
  e.preventDefault();
  document.getElementById("demo-form").style.display = "none";
  document.getElementById("form-success").style.display = "block";
  setTimeout(() => {
    document.getElementById("modal-overlay").classList.remove("open");
    document.getElementById("demo-form").style.display = "flex";
    document.getElementById("form-success").style.display = "none";
  }, 2000);
}
let menuOpen = false;
function toggleMobileMenu() {
  menuOpen = !menuOpen;
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("open", menuOpen);
  document.getElementById("burger-1").style.transform = menuOpen
    ? "translateY(7px) rotate(45deg)"
    : "none";
  document.getElementById("burger-2").style.opacity = menuOpen ? "0" : "1";
  document.getElementById("burger-2").style.transform = menuOpen
    ? "scaleX(0)"
    : "none";
  document.getElementById("burger-3").style.transform = menuOpen
    ? "translateY(-7px) rotate(-45deg)"
    : "none";
}
