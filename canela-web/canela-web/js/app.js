/* =========================================================
   CANELA · lógica compartida por todas las páginas
   - Ilustraciones (doodles) en SVG
   - Header, footer, carrito, moneda, login y newsletter
   - Render de la tienda, el menú y el home
   ========================================================= */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const PAGE = document.body.dataset.page;

const store = {
  get(key, fallback) { try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch (e) { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} },
};

/* =========================================================
   1. DOODLES (ilustraciones de línea con contorno dorado)
   ========================================================= */
const DOODLES = {
  cup: { vb: "0 0 100 120", d: `
    M20 30 L80 30 L78 20 Q76 14 68 14 L32 14 Q24 14 22 20 Z
    M23 31 L33 108 L67 108 L77 31
    M27 52 L73 52 L70 80 L30 80 Z
    M32 62 l6 10 l6 -10 l6 10 l6 -10 l6 10 l6 -10` },
  roll: { vb: "0 0 120 92", d: `
    M10 40 C10 16 110 16 110 40 C110 56 10 56 10 40 Z
    M10 40 L12 64 C16 84 104 84 108 64 L110 40
    M14 60 C34 72 86 72 106 58
    M60 36 c8 0 10 -8 2 -10 c-14 -3 -26 6 -16 12 c12 7 36 2 34 -8 c-2 -10 -30 -14 -46 -6` },
  croissant: { vb: "0 0 120 80", d: `
    M10 58 C6 30 36 10 60 10 C84 10 114 30 110 58 C100 70 86 62 84 52 C76 66 44 66 36 52 C34 62 20 70 10 58 Z
    M40 18 C44 30 44 44 38 54 M60 12 C62 28 62 44 60 58 M80 18 C76 30 76 44 82 54` },
  teapot: { vb: "0 0 130 100", d: `
    M32 50 C32 30 90 30 92 50 C96 78 80 90 62 90 C42 90 28 78 32 50 Z
    M46 37 C52 25 72 25 78 37 M62 26 l0 -9
    M32 58 C16 52 12 32 9 16 C16 24 20 38 36 46
    M92 46 C112 44 116 68 93 76 M42 54 C56 60 74 60 86 54` },
  moka: { vb: "0 0 90 120", d: `
    M24 52 L30 14 L62 14 L68 52 Z M42 8 l8 0
    M22 56 L70 56 L64 108 L28 108 Z
    M30 14 L17 22 M62 20 C80 20 82 44 68 46
    M40 64 L38 100 M52 64 L54 100` },
  legs: { vb: "0 0 130 140", d: `
    M30 6 L26 110 C12 112 2 120 8 128 L52 128 L54 110 L56 8
    M78 8 L80 110 L82 128 L126 128 C130 120 118 112 104 110 L102 6` },
};

/* Dibuja un doodle: capa dorada de fondo + línea marrón */
function doodle(name, cls = "") {
  const d = DOODLES[name];
  return `<svg class="doodle ${cls}" viewBox="${d.vb}" aria-hidden="true">
    <path class="halo" d="${d.d}"/><path class="ink" d="${d.d}"/></svg>`;
}

/* Los "brazos en M" del footer */
function handsSVG() {
  const arm = `M44 236 C36 186 24 126 22 74 C13 68 8 54 15 46 C20 54 24 58 27 56
    C24 42 26 31 33 28 C35 38 35 46 38 49 C40 37 46 29 52 31 C52 41 50 51 52 57
    C58 51 64 49 66 55 C59 63 52 74 52 92 C56 142 66 192 70 236`;
  return `<svg class="hands" viewBox="0 0 200 250" aria-hidden="true">
    <g transform="translate(6 0) rotate(-6 50 130)"><path class="halo" d="${arm}"/><path class="ink" d="${arm}"/>
      <path class="ink thin" d="M34 80 C38 130 46 180 52 226"/></g>
    <g transform="translate(96 -8) rotate(4 50 130)"><path class="halo" d="${arm}"/><path class="ink" d="${arm}"/>
      <path class="ink thin" d="M34 80 C38 130 46 180 52 226"/></g>
  </svg>`;
}

/* Mascota: foto del roll + pelo, ojos, brazos y piernas dibujados */
function mascotSVG({ pose = "stand", id = "m" } = {}) {
  const cx = 160, cy = 150;
  // pelo enrulado: trocoide alrededor de la cabeza
  let hair = "";
  for (let i = 0; i <= 420; i++) {
    const t = i / 420;
    const a = Math.PI * (1.02 + t * 0.96);
    const n = 24;
    const x = cx + Math.cos(a) * 112 + Math.cos(a * n) * 17;
    const y = cy + Math.sin(a) * 112 + Math.sin(a * n) * 17;
    hair += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  const arms = {
    stand: `M70 190 C40 200 52 236 92 232 C112 230 132 218 150 214 M250 190 C280 200 268 236 228 232 C208 230 188 218 170 214`,
    wave:  `M66 176 C40 168 26 140 18 112 M18 112 l-10 -4 M18 112 l-4 -11 M18 112 l4 -10
            M254 176 C282 170 296 146 304 116 M304 116 l-4 -11 M304 116 l6 -8 M304 116 l11 -2`,
    run:   `M70 170 C46 168 30 160 14 166 l-8 -6 M14 166 l-6 6 M250 162 C270 150 284 132 300 128 l8 -8 M300 128 l10 2`,
  }[pose];
  const legs = pose === "run"
    ? `M132 252 C124 300 104 330 76 352 C66 344 54 348 52 358 L82 376 L92 360 C122 334 146 304 156 258
       M176 254 C190 300 214 336 222 380 C210 386 204 396 210 402 L246 396 L242 378 C238 334 214 296 198 252`
    : `M134 254 L128 410 C112 412 100 420 104 428 L150 428 L152 410 L156 256
       M176 256 L178 410 L180 428 L226 428 C230 420 218 412 202 410 L198 254`;
  return `<svg class="mascot mascot-${pose}" viewBox="0 0 320 440" aria-hidden="true">
    <g class="halo-g">
      <circle cx="${cx}" cy="${cy}" r="124"/>
      <path d="${legs}"/><path class="arms" d="${arms}"/>
    </g>
    <g class="legs"><path class="ink" d="${legs}"/></g>
    <image href="img/roll.png" x="56" y="44" width="208" height="214"/>
    <path class="ink hair" d="${hair}"/>
    <g class="arms"><path class="ink" d="${arms}"/></g>
    <g class="face">
      <ellipse class="ink eye" cx="134" cy="146" rx="15" ry="24"/>
      <ellipse class="ink eye" cx="182" cy="146" rx="15" ry="24"/>
      <ellipse class="pupil" cx="136" cy="158" rx="8" ry="11"/>
      <ellipse class="pupil" cx="184" cy="158" rx="8" ry="11"/>
      <path class="ink" d="M140 198 C152 210 168 210 180 198"/>
    </g>
  </svg>`;
}

/* Arte de las gift cards */
function giftcardArt(p) {
  return `<div class="giftcard ${p.giftcard}">
      <div class="gc-title">GIFT<br>CARD.</div>
      <img class="gc-roll" src="img/sticker-roll-rulos.png" alt=""><img class="gc-cup" src="img/sticker-vaso.png" alt="">
      ${p.amountLabel ? `<div class="gc-amount">CANELA<br>${p.amountLabel}</div>` : `<div class="gc-amount">CANELA<br>Vos elegís</div>`}
    </div>`;
}


/* =========================================================
   2. MONEDA
   ========================================================= */
let currency = store.get("canela-currency", "ARS");
const cur = () => CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

function money(ars) {
  const c = cur();
  const value = ars / c.rate;
  if (c.code === "ARS") return "$" + Math.round(value).toLocaleString("es-AR");
  const prefix = { USD: "US$ ", EUR: "€ ", GBP: "£ " }[c.code];
  return prefix + value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function flagSVG(code) {
  const f = {
    ar: `<rect width="48" height="32" fill="#74acdf"/><rect y="10.6" width="48" height="10.8" fill="#fff"/><circle cx="24" cy="16" r="3" fill="#f6b40e"/>`,
    us: `<rect width="48" height="32" fill="#fff"/>${[0,2,4,6,8,10,12].map(i => `<rect y="${i*2.46}" width="48" height="2.46" fill="#b22234"/>`).join("")}<rect width="20" height="17.2" fill="#3c3b6e"/>`,
    eu: `<rect width="48" height="32" fill="#003399"/>${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<circle cx="${24+Math.cos(a)*9}" cy="${16+Math.sin(a)*9}" r="1.3" fill="#ffcc00"/>`}).join("")}`,
    gb: `<rect width="48" height="32" fill="#012169"/><path d="M0 0L48 32M48 0L0 32" stroke="#fff" stroke-width="6"/><path d="M0 0L48 32M48 0L0 32" stroke="#c8102e" stroke-width="2"/><path d="M24 0V32M0 16H48" stroke="#fff" stroke-width="10"/><path d="M24 0V32M0 16H48" stroke="#c8102e" stroke-width="6"/>`,
  }[code];
  return `<svg viewBox="0 0 48 32" class="flag" aria-hidden="true">${f}</svg>`;
}

/* =========================================================
   3. HEADER Y FOOTER
   ========================================================= */
const ICONS = {
  cart: `<svg viewBox="0 0 28 24" aria-hidden="true"><path d="M1 2h4l3 13h15l3-9H7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 7v8M14 7v8M18 7v8M22 7v5" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="20" r="2" fill="currentColor"/><circle cx="21" cy="20" r="2" fill="currentColor"/></svg>`,
  chevron: `<svg viewBox="0 0 12 8" class="chev" aria-hidden="true"><path d="M1 2c3 4 7 4 10 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  spotify: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="currentColor"/><path d="M8 12c6-2 12-1.5 17 1.2M9 16.5c5-1.5 10-1 14 1.2M10 20.6c4-1 7.5-.6 11 1" fill="none" stroke="#e3d6bb" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  whatsapp: `<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.3 19.4L3 29l6.8-1.7A13 13 0 1 0 16 3Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11.5 9.5c-.8 0-1.6 1-1.6 2.3 0 3.6 4.8 9.4 9.8 9.9 1.6.1 2.6-.8 2.7-1.8.1-.5-2.2-1.7-2.7-1.6-.5.1-1 1.1-1.5 1.1-1.1 0-4.5-3-4.5-4.3 0-.6 1-1 1-1.5 0-.4-1.1-3.1-1.6-3.6l-1.6-.5Z" fill="currentColor"/></svg>`,
  instagram: `<svg viewBox="0 0 32 32"><rect x="3" y="3" width="26" height="26" rx="7.5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="23.4" cy="8.6" r="1.7" fill="currentColor"/></svg>`,
};

/* Links de WhatsApp */
function waLink(text = SOCIAL.whatsappMsg) {
  return `https://wa.me/${SOCIAL.whatsapp}?text=${encodeURIComponent(text)}`;
}
function waPretty() {
  const n = SOCIAL.whatsapp; // 54 9 11 4678-9800
  return `+${n.slice(0, 2)} ${n.slice(2, 3)} ${n.slice(3, 5)} ${n.slice(5, 9)}-${n.slice(9)}`;
}

/* Recuadro con los datos para transferir */
function bankBox(totalArs) {
  const row = (label, value, copy) => `<div class="bank-row"><span>${label}</span><strong>${value}</strong>${copy ? `<button type="button" class="copy" data-copy="${value}">Copiar</button>` : ""}</div>`;
  return `<div class="bank-box">
      <p class="bank-title">Datos para transferir${totalArs ? ` <b>$${Math.round(totalArs).toLocaleString("es-AR")}</b>` : ""}</p>
      ${row("Alias", BANK.alias, true)}
      ${row("CVU", BANK.cvu, true)}
      ${row("Titular", BANK.titular)}
      ${row("CUIT", BANK.cuit)}
      ${row("Banco", BANK.banco)}
      <p class="bank-note">Transferí el total en pesos y mandanos el comprobante por WhatsApp. Preparamos tu pedido cuando se acredita el pago (suele tardar menos de 10 minutos).</p>
    </div>`;
}

function renderHeader() {
  const nav = [
    ["buenos-aires.html", "Buenos Aires", "buenos-aires"],
    ["menu.html", "Nuestro menu", "menu"],
    ["nosotros.html", "Sobre nosotros", "nosotros"],
  ];
  const link = ([href, label, page]) =>
    `<a href="${href}" class="${PAGE === page ? "active" : ""}" ${PAGE === page ? 'aria-current="page"' : ""}>${label}</a>`;

  $("#site-header").outerHTML = `
  <header class="site-header">
    <a href="index.html" class="logo" aria-label="Canela, inicio">CANELA</a>
    <nav class="main-nav" aria-label="Principal">
      ${link(nav[0])}
      <div class="dropdown">
        <a href="shop.html" class="${PAGE === "shop" ? "active" : ""}" aria-haspopup="true">Shop online${ICONS.chevron}</a>
        <div class="dropdown-menu">
          ${CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}">${c.label}</a>`).join("")}
        </div>
      </div>
      ${link(nav[1])}${link(nav[2])}
    </nav>
    <div class="header-tools">
      <button class="tool" id="currencyBtn" aria-haspopup="dialog"><span id="currencyLabel">${currency} ${cur().symbol}</span>${ICONS.chevron}</button>
      <button class="tool" id="loginBtn"></button>
      <button class="tool cart-tool" id="cartBtn" aria-label="Abrir carrito">${ICONS.cart}<span class="cart-count" id="cartCount">0</span></button>
    </div>
  </header>`;
}

function renderFooter() {
  $("#site-footer").outerHTML = `
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-art">
        ${handsSVG()}
        <div class="socials">
          <a href="${SOCIAL.spotify}" target="_blank" rel="noopener" aria-label="Playlist de Canela en Spotify">${ICONS.spotify}</a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">${ICONS.whatsapp}</a>
          <a href="https://www.instagram.com/${SOCIAL.instagram}/" target="_blank" rel="noopener" aria-label="Instagram de Canela">${ICONS.instagram}</a>
        </div>
      </div>
      <form class="newsletter" id="newsletter" novalidate>
        <label for="nlEmail">¡Suscribite a nuestro newsletter y mantenete al día de los descuentos y novedades!</label>
        <input id="nlEmail" type="email" placeholder="Tu@email.com" autocomplete="email" required>
        <button type="submit">Suscribite</button>
        <p class="nl-msg" id="nlMsg" role="status"></p>
      </form>
      <div class="contact">
        <h2>Información de contacto</h2>
        <p>CANELA CAFÉ<br>info@canela.arg<br>Honduras 4821, Palermo Soho, Buenos Aires, CABA<br>
          <a href="${waLink()}" target="_blank" rel="noopener">${waPretty()}</a> · <a href="https://www.instagram.com/${SOCIAL.instagram}/" target="_blank" rel="noopener">@${SOCIAL.instagram}</a></p>
      </div>
    </div>
    <div class="footer-bar">© 2026 CANELA · Proyecto académico, la tienda no procesa pagos reales.</div>
  </footer>`;
}

/* =========================================================
   4. MODALES (moneda, login, gift card personalizable)
   ========================================================= */
function renderOverlays() {
  document.body.insertAdjacentHTML("beforeend", `
  <div class="scrim" id="scrim" hidden></div>

  <div class="modal" id="currencyModal" role="dialog" aria-modal="true" aria-labelledby="curTitle" hidden>
    <div class="modal-head"><h2 id="curTitle">Moneda</h2><button class="x" data-close aria-label="Cerrar">✕</button></div>
    <div class="modal-search"><input id="curSearch" placeholder="Buscar" aria-label="Buscar moneda"></div>
    <ul class="cur-list" id="curList"></ul>
  </div>

  <div class="modal" id="loginModal" role="dialog" aria-modal="true" aria-labelledby="loginTitle" hidden>
    <div class="modal-head"><h2 id="loginTitle">Log In</h2><button class="x" data-close aria-label="Cerrar">✕</button></div>
    <form class="modal-body" id="loginForm" novalidate>
      <label class="field" id="nameField" hidden><span>Nombre</span><input name="nombre" autocomplete="given-name"></label>
      <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="field"><span>Contraseña</span><input name="pass" type="password" autocomplete="current-password" required minlength="6"></label>
      <p class="form-error" id="loginError" role="alert"></p>
      <button class="btn-dark" type="submit" id="loginSubmit">Ingresar</button>
      <button class="link-btn" type="button" id="loginToggle">¿No tenés cuenta? Creá una</button>
      <p class="tiny">Simulación: la contraseña no se guarda en ningún lado.</p>
    </form>
  </div>

  <div class="modal" id="gcModal" role="dialog" aria-modal="true" aria-labelledby="gcTitle" hidden>
    <div class="modal-head"><h2 id="gcTitle">Gift Card personalizable</h2><button class="x" data-close aria-label="Cerrar">✕</button></div>
    <form class="modal-body" id="gcForm" novalidate>
      <div class="amounts" id="gcAmounts">
        ${[20000, 30000, 75000, 150000].map(a => `<button type="button" data-amount="${a}">$${a.toLocaleString("es-AR")}</button>`).join("")}
      </div>
      <label class="field"><span>Monto en pesos (mínimo $5.000)</span><input name="monto" type="number" min="5000" step="500" required></label>
      <label class="field"><span>Para</span><input name="para" placeholder="Nombre de quien la recibe"></label>
      <label class="field"><span>Mensaje (opcional)</span><textarea name="mensaje" rows="2"></textarea></label>
      <p class="form-error" id="gcError" role="alert"></p>
      <button class="btn-dark" type="submit">Añadir al carrito</button>
    </form>
  </div>

  <aside class="drawer" id="drawer" aria-label="Carrito" aria-hidden="true">
    <div class="drawer-head"><h2 id="drawerTitle">Tu carrito</h2><button class="x" id="closeCart" aria-label="Cerrar">✕</button></div>
    <div class="drawer-body" id="stepCart">
      <ul class="cart-list" id="cartList"></ul>
      <div class="cart-empty" id="cartEmpty">
        <img class="drawer-sticker" src="img/sticker-roll-siesta.png" alt="">
        <p>Tu carrito está vacío.</p>
        <a href="shop.html" class="btn-dark">Ir al shop</a>
      </div>
    </div>
    <form class="drawer-body checkout" id="stepCheckout" hidden novalidate>
      <fieldset><legend>Entrega</legend>
        <label class="choice"><input type="radio" name="entrega" value="retiro" checked><span><strong>Retiro en Honduras 4821</strong><small>Gratis</small></span></label>
        <label class="choice"><input type="radio" name="entrega" value="envio"><span><strong>Envío en CABA</strong><small>$3.500 · gratis desde $60.000</small></span></label>
      </fieldset>
      <fieldset><legend>Tus datos</legend>
        <label class="field"><span>Nombre y apellido</span><input name="nombre" autocomplete="name" required></label>
        <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="field"><span>Teléfono</span><input name="telefono" type="tel" autocomplete="tel" required></label>
        <label class="field" id="addrField" hidden><span>Dirección</span><input name="direccion" autocomplete="street-address" placeholder="Calle, número, piso/depto"></label>
      </fieldset>
      <fieldset><legend>Pago</legend>
        <label class="choice"><input type="radio" name="pago" value="Mercado Pago" checked><span><strong>Mercado Pago</strong><small>Tarjeta o dinero en cuenta</small></span></label>
        <label class="choice"><input type="radio" name="pago" value="Transferencia"><span><strong>Transferencia</strong><small>10% off · alias CANELA.ROLLS.CAFE</small></span></label>
        <div id="bankInCheckout" hidden></div>
        <label class="choice"><input type="radio" name="pago" value="Efectivo"><span><strong>Efectivo</strong><small>Al retirar</small></span></label>
      </fieldset>
      <p class="form-error" id="formError" role="alert"></p>
    </form>
    <div class="drawer-body done" id="stepDone" hidden>
      <img class="drawer-sticker" src="img/sticker-roll-salto.png" alt="">
      <h3>¡Pedido confirmado!</h3>
      <p id="doneText"></p>
      <p class="order-id" id="orderId"></p>
      <div id="bankDone"></div>
    </div>
    <div class="drawer-foot" id="drawerFoot">
      <div class="totals" id="totals"></div>
      <div class="drawer-actions">
        <button class="btn-line" id="backBtn" hidden>Volver</button>
        <button class="btn-dark" id="nextBtn">Finalizar compra</button>
      </div>
    </div>
  </aside>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>`);
}

let openLayer = null;
function openModal(id) {
  closeAll();
  const el = $("#" + id);
  el.hidden = false;
  $("#scrim").hidden = false;
  openLayer = el;
  setTimeout(() => (el.querySelector("input, button:not(.x)") || el).focus(), 30);
}
function closeAll() {
  $$(".modal").forEach(m => (m.hidden = true));
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $("#scrim").hidden = true;
  document.body.classList.remove("no-scroll");
  openLayer = null;
}

/* ---------- Moneda ---------- */
function renderCurrencyList(filter = "") {
  const f = filter.trim().toLowerCase();
  $("#curList").innerHTML = CURRENCIES
    .filter(c => !f || c.name.toLowerCase().includes(f) || c.code.toLowerCase().includes(f))
    .map(c => `<li><button class="${c.code === currency ? "selected" : ""}" data-code="${c.code}">
        ${flagSVG(c.flag)}<span>${c.name}</span><span>${c.code}</span></button></li>`).join("")
    || `<li class="no-results">Sin resultados</li>`;
}
function setCurrency(code) {
  currency = code;
  store.set("canela-currency", code);
  $("#currencyLabel").textContent = `${code} ${cur().symbol}`;
  refreshPrices();
  closeAll();
  toast(`Precios en ${cur().name}`);
}
function refreshPrices() {
  $$("[data-price]").forEach(el => (el.textContent = money(+el.dataset.price)));
  renderCart();
}

/* ---------- Login (simulado) ---------- */
let user = store.get("canela-user", null);
let signup = false;
function renderUser() {
  $("#loginBtn").textContent = user ? `Hola, ${user.nombre}` : "Log In";
}

/* =========================================================
   5. CARRITO Y CHECKOUT
   ========================================================= */
const SHIPPING = 3500, FREE_FROM = 60000;
let cart = store.get("canela-cart-v2", []); // [{key, id, name, price, qty, note}]
let step = "cart";

const count = () => cart.reduce((a, i) => a + i.qty, 0);
const subtotal = () => cart.reduce((a, i) => a + i.price * i.qty, 0);
function saveCart() { store.set("canela-cart-v2", cart); renderCart(); }

function addToCart(p, { price = p.price, note = "" } = {}) {
  const key = p.custom ? `${p.id}-${price}-${note}` : p.id;
  const line = cart.find(i => i.key === key);
  if (line) line.qty++;
  else cart.push({ key, id: p.id, name: p.name, price, qty: 1, note });
  saveCart();
  toast(`${p.name} se agregó al carrito`);
  const badge = $("#cartCount");
  badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
}

function thumbFor(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return "";
  if (p.img) return `<img src="${p.img}" alt="">`;
  if (p.giftcard) return `<div class="mini-gc ${p.giftcard}">GIFT<br>CARD.</div>`;
  return `<div class="mini-gc gold">${doodle("croissant")}</div>`;
}

function totals() {
  const f = $("#stepCheckout");
  const sub = subtotal();
  const inCheckout = step !== "cart";
  const envio = inCheckout && f.entrega.value === "envio" ? (sub >= FREE_FROM ? 0 : SHIPPING) : 0;
  const desc = inCheckout && f.pago.value === "Transferencia" ? sub * 0.1 : 0;
  return { sub, envio, desc, total: sub + envio - desc };
}

function renderCart() {
  if (!$("#cartList")) return;
  $("#cartCount").textContent = count();
  $("#cartList").innerHTML = cart.map(i => `
    <li class="cart-item">
      <div class="thumb">${thumbFor(i.id)}</div>
      <div class="info">
        <h4>${i.name}</h4>
        ${i.note ? `<small>${i.note}</small>` : ""}
        <div class="qty">
          <button data-dec="${i.key}" aria-label="Restar uno">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Sumar uno">+</button>
        </div>
      </div>
      <div class="right"><strong>${money(i.price * i.qty)}</strong><button class="link-btn" data-remove="${i.key}">Quitar</button></div>
    </li>`).join("");
  $("#cartEmpty").hidden = cart.length > 0;

  const t = totals();
  const f = $("#stepCheckout");
  $("#totals").innerHTML = `
    <div><span>Subtotal</span><span>${money(t.sub)}</span></div>
    ${step === "checkout" && f.entrega.value === "envio" ? `<div><span>Envío</span><span>${t.envio ? money(t.envio) : "Gratis"}</span></div>` : ""}
    ${t.desc ? `<div><span>10% off transferencia</span><span>−${money(t.desc)}</span></div>` : ""}
    <div class="grand"><span>Total</span><span>${money(t.total)}</span></div>
    ${currency !== "ARS" ? `<div class="hint">Se cobra en pesos: $${Math.round(t.total).toLocaleString("es-AR")}</div>` : ""}`;
  const transfer = step === "checkout" && f.pago.value === "Transferencia";
  $("#bankInCheckout").hidden = !transfer;
  if (transfer) $("#bankInCheckout").innerHTML = bankBox(t.total);
  $("#drawerFoot").hidden = step === "done" || (step === "cart" && !cart.length);
  $("#nextBtn").textContent = step === "cart" ? "Finalizar compra" : "Confirmar pedido";
  if (step === "checkout" && !cart.length) goTo("cart");
}

function goTo(next) {
  step = next;
  $("#stepCart").hidden = step !== "cart";
  $("#stepCheckout").hidden = step !== "checkout";
  $("#stepDone").hidden = step !== "done";
  $("#backBtn").hidden = step !== "checkout";
  $("#drawerTitle").textContent = { cart: "Tu carrito", checkout: "Finalizar compra", done: "¡Gracias!" }[step];
  $("#formError").textContent = "";
  renderCart();
}

function openCart() {
  closeAll();
  if (step === "done") goTo("cart");
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#scrim").hidden = false;
  document.body.classList.add("no-scroll");
  openLayer = $("#drawer");
  setTimeout(() => $("#closeCart").focus(), 50);
}

function submitOrder() {
  const f = $("#stepCheckout");
  let bad = null;
  $$("input[required]", f).forEach(i => {
    const ok = i.value.trim() && i.checkValidity();
    i.classList.toggle("invalid", !ok);
    if (!ok && !bad) bad = i;
  });
  if (bad) { $("#formError").textContent = "Completá los campos marcados."; bad.focus(); return; }

  const t = totals();
  const id = "CN-" + Date.now().toString().slice(-6);
  const nombre = f.nombre.value.trim().split(" ")[0];
  store.set("canela-orders", [...store.get("canela-orders", []), { id, fecha: new Date().toISOString(), items: cart, total: t.total, entrega: f.entrega.value, pago: f.pago.value }]);
  $("#doneText").textContent = f.entrega.value === "retiro"
    ? `${nombre}, tu pedido te espera en Honduras 4821. Total ${money(t.total)} con ${f.pago.value}.`
    : `${nombre}, ya preparamos tu envío a ${f.direccion.value.trim()}. Total ${money(t.total)} con ${f.pago.value}.`;
  $("#orderId").textContent = "Pedido " + id;
  $("#bankDone").innerHTML = f.pago.value === "Transferencia"
    ? bankBox(t.total) + `<a class="btn-dark wa-btn" target="_blank" rel="noopener" href="${waLink(`Hola Canela, envío el comprobante del pedido ${id} por $${Math.round(t.total).toLocaleString("es-AR")}.`)}">Enviar comprobante por WhatsApp</a>`
    : "";
  cart = []; saveCart();
  f.reset(); $("#addrField").hidden = true; f.direccion.required = false;
  goTo("done");
}

/* =========================================================
   6. EVENTOS GLOBALES
   ========================================================= */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function bindGlobal() {
  $("#currencyBtn").addEventListener("click", () => { renderCurrencyList(); $("#curSearch").value = ""; openModal("currencyModal"); });
  $("#curSearch").addEventListener("input", e => renderCurrencyList(e.target.value));
  $("#curList").addEventListener("click", e => { const b = e.target.closest("[data-code]"); if (b) setCurrency(b.dataset.code); });

  $("#loginBtn").addEventListener("click", () => {
    if (user) {
      if (confirm(`¿Cerrar la sesión de ${user.nombre}?`)) { user = null; store.set("canela-user", null); renderUser(); toast("Sesión cerrada"); }
      return;
    }
    openModal("loginModal");
  });
  $("#loginToggle").addEventListener("click", () => {
    signup = !signup;
    $("#nameField").hidden = !signup;
    $("#loginForm").nombre.required = signup;
    $("#loginTitle").textContent = signup ? "Crear cuenta" : "Log In";
    $("#loginSubmit").textContent = signup ? "Crear cuenta" : "Ingresar";
    $("#loginToggle").textContent = signup ? "Ya tengo cuenta" : "¿No tenés cuenta? Creá una";
  });
  $("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    const bad = $$("input[required]", f).find(i => !i.value.trim() || !i.checkValidity() || (i.name === "pass" && i.value.length < 6));
    if (bad) { $("#loginError").textContent = bad.name === "pass" ? "La contraseña necesita al menos 6 caracteres." : "Revisá los datos."; bad.focus(); return; }
    const nombre = signup ? f.nombre.value.trim() : f.email.value.split("@")[0];
    user = { nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), email: f.email.value.trim() };
    store.set("canela-user", user);
    f.reset(); $("#loginError").textContent = "";
    renderUser(); closeAll(); toast(`¡Hola, ${user.nombre}!`);
  });

  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeAll);
  $("#scrim").addEventListener("click", closeAll);
  $$(".modal [data-close]").forEach(b => b.addEventListener("click", closeAll));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && openLayer) closeAll(); });

  $("#cartList").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const line = cart.find(i => i.key === (b.dataset.inc || b.dataset.dec || b.dataset.remove));
    if (!line) return;
    if (b.dataset.inc) line.qty++;
    if (b.dataset.dec) line.qty--;
    if (b.dataset.remove || line.qty <= 0) cart = cart.filter(i => i !== line);
    saveCart();
  });
  $("#nextBtn").addEventListener("click", () => step === "cart" ? goTo("checkout") : submitOrder());
  // botones "Copiar" de alias y CVU
  $("#drawer").addEventListener("click", async e => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (err) {
      const r = document.createRange(); r.selectNodeContents(b.previousElementSibling);
      getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand("copy");
    }
    b.textContent = "¡Copiado!";
    setTimeout(() => (b.textContent = "Copiar"), 1400);
  });
  $("#backBtn").addEventListener("click", () => goTo("cart"));
  $("#stepCheckout").addEventListener("change", e => {
    if (e.target.name === "entrega") {
      const envio = e.target.value === "envio";
      $("#addrField").hidden = !envio;
      $("#stepCheckout").direccion.required = envio;
    }
    e.target.classList?.remove("invalid");
    renderCart();
  });
  $("#stepCheckout").addEventListener("submit", e => { e.preventDefault(); submitOrder(); });

  // Gift card personalizable
  $("#gcAmounts").addEventListener("click", e => {
    const b = e.target.closest("[data-amount]"); if (!b) return;
    $("#gcForm").monto.value = b.dataset.amount;
    $$("#gcAmounts button").forEach(x => x.classList.toggle("on", x === b));
  });
  $("#gcForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, monto = Math.round(+f.monto.value);
    if (!monto || monto < 5000) { $("#gcError").textContent = "Elegí un monto de al menos $5.000."; f.monto.focus(); return; }
    const p = PRODUCTS.find(x => x.id === "gc-custom");
    const note = [`$${monto.toLocaleString("es-AR")}`, f.para.value.trim() && `para ${f.para.value.trim()}`].filter(Boolean).join(" · ");
    addToCart(p, { price: monto, note });
    f.reset(); $("#gcError").textContent = ""; $$("#gcAmounts button").forEach(x => x.classList.remove("on"));
    closeAll();
  });

  // Newsletter
  $("#newsletter").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#nlEmail");
    if (!input.value.trim() || !input.checkValidity()) { $("#nlMsg").textContent = "Escribí un email válido."; input.focus(); return; }
    store.set("canela-newsletter", input.value.trim());
    $("#nlMsg").textContent = "¡Listo! Te vas a enterar primero de las novedades.";
    input.value = "";
  });
}

/* =========================================================
   7. PÁGINAS
   ========================================================= */
function initHome() {
  // primera visita: elegir moneda, como en el mockup
  if (!store.get("canela-currency-asked", false)) {
    store.set("canela-currency-asked", true);
    setTimeout(() => { renderCurrencyList(); openModal("currencyModal"); }, 700);
  }
}

function productCard(p) {
  const art = p.giftcard ? giftcardArt(p)
    : `<img src="${p.img}" alt="${p.alt}" loading="lazy" class="${p.fit === "contain" ? "contain" : ""}">`;
  const overlay = "";
  const price = p.custom ? `<span>Desde <span data-price="5000">${money(5000)}</span></span>` : `<span data-price="${p.price}">${money(p.price)}</span>`;
  return `<article class="product ${p.giftcard ? "is-gc" : ""}">
      <div class="art">${art}${overlay}</div>
      <div class="meta"><h3>${p.name}</h3>${price}</div>
      <button class="add" data-add="${p.id}">${p.custom ? "Elegir monto" : "Añadir al carrito"}</button>
    </article>`;
}

function initShop() {
  const params = new URLSearchParams(location.search);
  let cat = CATEGORIES.some(c => c.id === params.get("cat")) ? params.get("cat") : "todo";
  const sub = $("#subnav"), grid = $("#grid");

  function render() {
    sub.innerHTML = CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}" data-cat="${c.id}" class="${c.id === cat ? "active" : ""}" ${c.id === cat ? 'aria-current="page"' : ""}>${c.label}</a>`).join("");
    const list = cat === "todo" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
    grid.className = "grid" + (cat === "giftcards" ? " grid-gc" : "");
    grid.innerHTML = list.map(productCard).join("");
    document.title = `${CATEGORIES.find(c => c.id === cat).label} · Shop online · CANELA`;
  }
  sub.addEventListener("click", e => {
    const a = e.target.closest("[data-cat]"); if (!a) return;
    e.preventDefault();
    cat = a.dataset.cat;
    history.replaceState(null, "", `shop.html?cat=${cat}`);
    render();
  });
  grid.addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    const p = PRODUCTS.find(x => x.id === b.dataset.add);
    if (p.custom) return openModal("gcModal");
    addToCart(p);
    b.textContent = "✓ Agregado";
    setTimeout(() => (b.textContent = "Añadir al carrito"), 1200);
  });
  render();
}

function initMenu() {
  $("#menuBoard").innerHTML = MENU.map(col => `
    <section class="menu-col">
      ${col.sections.map(s => `
        <div class="menu-sec ${s.title ? "" : "extras"}">
          ${s.title ? `<h2>${s.title}</h2>` : `<h3 class="sr-only">Extras</h3>`}
          <ul>${s.items.map(([name, price]) => `<li><span class="n">${name}</span><span class="dots"></span><span class="p" data-price="${price}">${money(price)}</span></li>`).join("")}</ul>
        </div>`).join("")}
    </section>`).join("");
}

function initMap() {
  $("#closeCard").addEventListener("click", () => { $("#placeCard").hidden = true; $("#showCard").hidden = false; });
  $("#showCard").addEventListener("click", () => { $("#placeCard").hidden = false; $("#showCard").hidden = true; });
}

/* ---------- Arranque ---------- */
renderHeader();
renderFooter();
renderOverlays();
renderUser();
bindGlobal();
goTo("cart");
({ home: initHome, shop: initShop, menu: initMenu, "buenos-aires": initMap }[PAGE] || (() => {}))();
$$("[data-mascot]").forEach(el => (el.innerHTML = mascotSVG({ pose: el.dataset.mascot })));
// espirales grandes decorativas en los bordes (como en el mockup)
$$("[data-doodle-edge]").forEach(el => {
  let d = "";
  for (let i = 0; i <= 200; i++) {
    const t = i / 200, a = t * Math.PI * 5.2, r = 8 + t * 92;
    d += (i ? "L" : "M") + (100 + Math.cos(a) * r).toFixed(1) + " " + (100 + Math.sin(a) * r * 0.9).toFixed(1);
  }
  el.innerHTML = `<svg viewBox="0 0 200 200" class="doodle" aria-hidden="true"><path class="halo" d="${d}"/><path class="ink" d="${d}"/></svg>`;
});
refreshPrices();
