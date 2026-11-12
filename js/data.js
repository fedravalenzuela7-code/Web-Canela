/* =========================================================
   CANELA · datos de la tienda y del menú
   Todos los precios están en pesos argentinos (ARS).
   Para cambiar un precio o un producto, editá este archivo.
   ========================================================= */

const CATEGORIES = [
  { id: "todo",       label: "Ver todo" },
  { id: "giftcards",  label: "Canela gift-cards" },
  { id: "cafe",       label: "Cafe" },
  { id: "merch",      label: "Merch" },
  { id: "ceramica",   label: "Ceramica" },
];

const PRODUCTS = [
  // Gift cards (se dibujan con HTML, no usan foto)
  { id: "gc-100", cat: "giftcards", name: "Gift Card", price: 100000, giftcard: "dark", amountLabel: "$100.000" },
  { id: "gc-50",  cat: "giftcards", name: "Gift Card", price: 50000,  giftcard: "dark", amountLabel: "$50.000" },
  { id: "gc-custom", cat: "giftcards", name: "Gift Card personalizable", price: 0, giftcard: "gold", custom: true },

  // Café en grano
  { id: "cafe-dolce",  cat: "cafe", name: "Café Dolce",  price: 11700, img: "img/cafe-dolce.jpg",  alt: "Paquetes de café Dolce, espresso blend" },
  { id: "cafe-twelve", cat: "cafe", name: "Café Twelve", price: 11400, img: "img/cafe-twelve.jpg", alt: "Paquetes de café Twelve, espresso blend" },
  { id: "cafe-codos",  cat: "cafe", name: "Café Codos",  price: 10200, img: "img/cafe-codos.jpg",  alt: "Paquetes de café Codos, Sunrise Rumble" },

  // Merch
  { id: "merch-remera",   cat: "merch", name: "Remera Canela",       price: 28000, img: "img/merch-remera.jpg",       alt: "Remera crema con la mascota del roll bailando y el logo canela coffee" },
  { id: "merch-tote",     cat: "merch", name: "Tote bag Canela",     price: 14000, img: "img/merch-tote.jpg",         alt: "Tote bag de lienzo crudo con la mascota del roll y el logo" },
  { id: "merch-gorra-m",  cat: "merch", name: "Gorra marrón",        price: 18000, img: "img/merch-gorra-marron.jpg", alt: "Gorra marrón con el logo canela coffee bordado", fit: "contain" },
  { id: "merch-gorra-c",  cat: "merch", name: "Gorra crema",         price: 18000, img: "img/merch-gorra-crema.jpg",  alt: "Gorra crema con la mascota del roll bordada", fit: "contain" },
  { id: "merch-piluso",   cat: "merch", name: "Piluso de corderoy",  price: 21000, img: "img/merch-piluso.jpg",       alt: "Piluso marrón de corderoy con el logo canela coffee" },
  { id: "merch-botella",  cat: "merch", name: "Botella Canela",      price: 16500, img: "img/merch-botella.jpg",      alt: "Botella marrón translúcida con el logo y la mascota" },
  { id: "merch-taza",     cat: "merch", name: "Taza enlozada",       price: 12500, img: "img/merch-taza.jpg",         alt: "Taza enlozada crema con el logo canela coffee" },
  { id: "merch-medias",   cat: "merch", name: "Medias Canela",       price: 8500,  img: "img/merch-medias.jpg",       alt: "Medias crema con puntera marrón y la mascota del roll" },
  { id: "merch-stickers", cat: "merch", name: "Pack de stickers",    price: 3500,  img: "img/stickers-hoja.jpg",      alt: "Hoja de stickers con las mascotas del roll, tazas, croissant y el logo", pos: "center" },

  // Cerámica
  { id: "cer-taza",        cat: "ceramica", name: "Taza",                    price: 9800,  img: "img/ceramica-taza.jpg",        alt: "Taza de cerámica blanca hecha a mano" },
  { id: "cer-bowl",        cat: "ceramica", name: "Bowl",                    price: 15400, img: "img/ceramica-bowl.jpg",        alt: "Bowl de cerámica blanca" },
  { id: "cer-plato-postre",cat: "ceramica", name: "Plato de postre",         price: 10200, img: "img/ceramica-plato-postre.jpg",alt: "Plato de postre de cerámica" },
  { id: "cer-plato",       cat: "ceramica", name: "Plato",                   price: 13200, img: "img/ceramica-plato.jpg",       alt: "Plato hondo de cerámica" },
  { id: "cer-plato-avo",   cat: "ceramica", name: "Plato Avo",               price: 12200, img: "img/ceramica-plato-avo.jpg",   alt: "Plato ovalado de cerámica" },
  { id: "cer-set-bowls",   cat: "ceramica", name: "4 bowls & 4 platos",      price: 95600, img: "img/ceramica-set-bowls.jpg",   alt: "Set de cuatro bowls y cuatro platos" },
  { id: "cer-set-tazas",   cat: "ceramica", name: "4 tazas & 4 platos chicos", price: 70200, img: "img/ceramica-set-tazas.jpg", alt: "Set de cuatro tazas con platitos" },
  { id: "cer-dos-tazas",   cat: "ceramica", name: "2 tazas",                 price: 15400, img: "img/ceramica-dos-tazas.jpg",   alt: "Dos tazas de cerámica" },
];

const MENU = [
  {
    column: 1,
    sections: [
      { title: "Rolls de canela", items: [
        ["Clásico: canela & glaseado de vainilla", 5500],
        ["Dulce de leche: dulce de leche & nueces", 6000],
        ["Choco: chocolate & glaseado", 6000],
        ["Pistacho: crema de pistacho & chocolate blanco", 7000],
        ["Apple Crumble: manzana, canela & crumble", 6500],
      ]},
      { title: "Bakery", items: [
        ["Croissant de manteca", 4000],
        ["Pain au chocolat", 4500],
        ["Cookie de chocolate & sal marina", 4000],
        ["Banana bread", 4000],
      ]},
      { title: "Saladitos", items: [
        ["Roll clásico con crudo y brie", 10200],
        ["Avocado toast, masa madre, palta & huevo", 7500],
        ["Croissant de jamón y queso", 6500],
        ["Focaccia caprese: tomate, mozzarella & pesto", 7000],
      ]},
    ],
  },
  {
    column: 2,
    sections: [
      { title: "Café", items: [
        ["Espresso", 2500],
        ["Americano", 2800],
        ["Flat White", 3800],
        ["Cappuccino", 4000],
        ["Latte", 4000],
        ["Iced Latte", 4500],
        ["Iced flat White", 4200],
      ]},
      { title: null, items: [
        ["Leche vegetal", 1200],
        ["Caramelo", 1500],
        ["Canela", 1000],
        ["Vainilla", 1500],
      ]},
      { title: "Bebidas", items: [
        ["Limonada", 3500],
        ["Naranjada", 3500],
        ["Iced tea", 3500],
        ["Matcha latte", 5000],
      ]},
    ],
  },
];

/* Redes sociales: cambiá estos valores por los reales de Canela */
const SOCIAL = {
  // Playlist de Spotify con la música del local. Reemplazá por el link de la playlist "Canela".
  spotify: "https://open.spotify.com/playlist/37i9dQZF1DX6ziVCJnEm59",
  // Número de WhatsApp en formato internacional, sin "+" ni espacios (54 9 11 ...).
  whatsapp: "5491146789800",
  whatsappMsg: "¡Hola Canela! Quería hacer una consulta 🙂",
  // Usuario de Instagram (sin @).
  instagram: "canela.cafe.ba",
};

/* Datos para pagar por transferencia (ficticios, proyecto académico) */
const BANK = {
  titular: "Canela Café S.R.L.",
  cuit: "30-71234567-8",
  banco: "Mercado Pago",
  alias: "CANELA.ROLLS.CAFE",
  cvu: "0000003100045678912345",
};

/* Cotizaciones de referencia (pesos por unidad). Son ficticias. */
const CURRENCIES = [
  { code: "ARS", name: "Peso Argentino",       symbol: "$", rate: 1,    flag: "ar" },
  { code: "USD", name: "Dólar Estadounidense", symbol: "$", rate: 1450, flag: "us" },
  { code: "EUR", name: "Euro",                 symbol: "€", rate: 1650, flag: "eu" },
  { code: "GBP", name: "Libra Esterlina",      symbol: "£", rate: 1900, flag: "gb" },
];
