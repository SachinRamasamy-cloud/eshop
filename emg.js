// -------------------
// THEME & MENU TOGGLE
// -------------------

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
});

// Dark / Light mode toggle
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  modeToggle.innerHTML = document.body.classList.contains("light-mode")
    ? '<i class="fa fa-moon"></i>'
    : '<i class="fa fa-sun"></i>';
});

// -------------------
// UTILITIES
// -------------------
const parseRating = (r) => parseFloat(String(r).replace(/[^0-9.]/g, "")) || 0;
const rupee = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=No+Image";

// -------------------
// CARD TEMPLATE
// -------------------
const cardHTMLM = (item) => `
    <article onclick="redt(${item.id})" class="snap-start min-w-[200px] max-w-[220px] rounded-2xl border border-[var(--borderColor)] bg-[var(--cardBg)] backdrop-blur-md overflow-hidden shadow-[0_0_0_1px_var(--shadowColor)] transition duration-500 hover:-translate-y-1 hover:border-[var(--hoverBorder)] hover:shadow-xl hover:scale-105">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img src="${item.img}" alt="${item.title}"
             class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
             onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
        <div class="absolute top-2 right-2 text-[11px] px-2 py-1 text-white rounded-full bg-black border border-white/15">
          ${item.rate ?? "⭐ 0.0"}
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-sm sm:text-base font-semibold leading-snug line-clamp-2" style="color: var(--textColor);">
          ${item.title}
        </h3>
        <div class="mt-2 flex items-center justify-between text-[12px] sm:text-sm price-text">
          <div>
            <span class="price">${rupee(item.fromprice)}</span>
            <span class="dash">–</span>
            <span class="price">${rupee(item.toPrice)}</span>
          </div>
          <span class="tag hidden md:flex">${Array.isArray(item.tags) ? item.tags[0] : ""}</span>
        </div>
      </div>
    </article>
  `;

const cardHTMLD = (item) => `
    <article onclick="redt(${item.id})" class="snap-start rounded-2xl border border-[var(--borderColor)] bg-[var(--cardBg)] backdrop-blur-md overflow-hidden shadow-[0_0_0_1px_var(--shadowColor)] transition duration-500 hover:-translate-y-1 hover:border-[var(--hoverBorder)] hover:shadow-xl hover:scale-105">
       <div class="w-full h-40 overflow-hidden rounded-t-2xl">
                <img src="${item.img}" 
                     class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                     alt="${item.title}">
           <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
        <div class="absolute top-2 right-2 text-[11px] px-2 py-1 text-white rounded-full bg-black border border-white/15">
          ${item.rate ?? "⭐ 0.0"}
        </div>
      </div>
                     </div>
            <div class="p-3 flex flex-col justify-between" >
                <h1 class="text-base font-semibold text-white mb-2 hover:text-purple-400 transition-colors" style="color: var(--textColor)">
                    ${item.title}
                </h1>
                <div class="flex justify-between items-center text-xs" style="color: var(--textColor)">
                    <div class="flex items-center gap-1">
                        <span class="" style="color: var(--textColor)">₹${item.fromprice}</span>
                        <span class="text-lg" style="color: var(--textColor)">-</span>
                        <span class="" style="color: var(--textColor)">₹${item.toPrice}</span>
                    </div>
          <span class="tag hidden md:flex" style="color: var(--textColor)">${Array.isArray(item.tags) ? item.tags[0] : ""}</span>
                    </div>
            </div>
    </article>
  `;
// -------------------
// RENDER FUNCTION
// -------------------
function renderCardsM(containerId, list) {
  document.getElementById(containerId).innerHTML = list.map(cardHTMLM).join("");
}
function renderCardsD(containerId, list) {
  document.getElementById(containerId).innerHTML = list.map(cardHTMLD).join("");
}

function redt(id) {
  window.location.href = `prodect.html?id=${id}`;
}
// -------------------
// SORT & FILTER LOGIC
// -------------------
const popularTop8 = [...products].sort((a, b) => parseRating(b.rate) - parseRating(a.rate)).slice(0, 8);
const gaming8 = products.filter(item => item.tags.includes("gaming")).slice(0, 8);
const travel8 = products.filter(item => item.tags.includes("travel")).slice(0, 8);
const enter8 = products.filter(item => item.tags.includes("entertainment")).slice(0, 8);
const shop8 = products.filter(item => item.tags.includes("shopping")).slice(0, 8);
const more8 = products.filter(item => item.tags.includes("gaming")).slice(0, 8);

renderCardsD("dpopularGrid", popularTop8);
renderCardsM("mpopularGrid", popularTop8);
renderCardsD("dgamingGrid", gaming8);
renderCardsM("mgamingGrid", gaming8);
renderCardsD("dtravelGrid", travel8);
renderCardsM("mtravelGrid", travel8);
renderCardsD("denterGrid", enter8);
renderCardsM("menterGrid", enter8);
renderCardsD("dshopGrid", shop8);
renderCardsM("mshopGrid", shop8);
renderCardsD("dmoreGrid", more8);
renderCardsM("MmoreGrid", more8);

document.getElementById("yr").textContent = new Date().getFullYear();


const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (e) => {
  pupils.forEach(pupil => {
    const eye = pupil.parentElement.getBoundingClientRect();
    const centerX = eye.left + eye.width / 2;
    const centerY = eye.top + eye.height / 2;

    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;

    // Limit movement inside the eye
    const maxMove = eye.width / 4; // max 25% of eye size
    const moveX = Math.max(Math.min(deltaX, maxMove), -maxMove);
    const moveY = Math.max(Math.min(deltaY, maxMove), -maxMove);

    pupil.style.transition = 'transform 0.1s linear';
    pupil.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
  });
});