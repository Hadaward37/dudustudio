"use client";

import { useState, useEffect, useRef } from "react";

// ─── Dados ────────────────────────────────────────────────────────────────────
const products = [
  { name: "Camiseta Essential Branca", price: 89, oldPrice: null, badge: "new", colors: ["#fff","#1a1a1a","#6b7a8e"], img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=70" },
  { name: "Calça Cargo Preta", price: 249, oldPrice: 349, badge: "sale", colors: ["#1a1a1a","#4a5a4a"], img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=70" },
  { name: "Jaqueta Trucker Denim", price: 399, oldPrice: null, badge: "hot", colors: ["#3d4f6b","#1a1a1a"], img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=70" },
  { name: "Tênis Chunky Branco", price: 459, oldPrice: 599, badge: "sale", colors: ["#fff","#1a1a1a","#ff3c5f"], img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=70" },
  { name: "Moletom Oversize Cinza", price: 199, oldPrice: null, badge: "new", colors: ["#888","#1a1a1a","#fff"], img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=70" },
  { name: "Óculos Retrô Tartaruga", price: 149, oldPrice: null, badge: null, colors: ["#8b6914","#1a1a1a"], img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=70" },
  { name: "Cinto Couro Preto", price: 99, oldPrice: null, badge: null, colors: ["#1a1a1a","#8b6914"], img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=70" },
  { name: "Mochila Urban Preta", price: 279, oldPrice: 349, badge: "sale", colors: ["#1a1a1a","#2a2a2a"], img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=70" },
];

const marqueeWords = ["NOVIDADES","ENTREGA GRÁTIS ACIMA R$299","DEVOLUÇÃO GRATUITA","PAGAMENTO EM 12X","QUALIDADE PREMIUM"];
const badgeMap: Record<string, string> = { new: "ec-badge-new", sale: "ec-badge-sale", hot: "ec-badge-hot" };
const badgeLabel: Record<string, string> = { new: "Novo", sale: "Sale", hot: "Hot" };
const sizes = ["P","M","G","GG"];

interface CartItem { name: string; price: number; img: string; size: string; }

export default function EcommercePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [colorSelections, setColorSelections] = useState<Record<number, number>>({});
  const [countdown, setCountdown] = useState({ h: "00", m: "00", s: "00" });
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [email, setEmail] = useState("");

  // Countdown
  useEffect(() => {
    function update() {
      const target = new Date();
      target.setHours(target.getHours() + 5, 30, 0, 0);
      const diff = target.getTime() - Date.now();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ h: String(h).padStart(2,"0"), m: String(m).padStart(2,"0"), s: String(s).padStart(2,"0") });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add("visible"), i * 100); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function addToCart(p: typeof products[0], idx: number) {
    const size = sizes[idx % 4];
    setCartItems(prev => [...prev, { name: p.name, price: p.price, img: p.img, size }]);
    setCartOpen(true);
  }

  const cartTotal = cartItems.reduce((a, b) => a + b.price, 0);

  const filters = ["Todos","Camisetas","Calças","Jaquetas","Acessórios","Sale"];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600&family=Space+Mono&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --ec-bg: #0f0f0f; --ec-surface: #1a1a1a; --ec-surface2: #242424;
          --ec-text: #f0f0f0; --ec-muted: #888; --ec-border: #2a2a2a;
          --ec-accent: #ff3c5f; --ec-accent2: #ffd166; --ec-white: #ffffff;
          --ec-font-display: 'Anton', sans-serif;
          --ec-font-body: 'Outfit', sans-serif;
          --ec-font-mono: 'Space Mono', monospace;
        }
        .ec-wrap * { box-sizing: border-box; }
        .ec-wrap { background: var(--ec-bg); color: var(--ec-text); font-family: var(--ec-font-body); overflow-x: hidden; }

        /* NAV */
        .ec-nav { position: fixed; top: 2.75rem; left: 0; right: 0; z-index: 100; background: rgba(15,15,15,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--ec-border); padding: .875rem 2rem; display: flex; align-items: center; justify-content: space-between; }
        .ec-nav-logo { font-family: var(--ec-font-display); font-size: 1.8rem; letter-spacing: .1em; color: var(--ec-white); text-decoration: none; }
        .ec-nav-links { display: flex; gap: 2rem; list-style: none; }
        .ec-nav-links a { color: var(--ec-muted); text-decoration: none; font-size: .82rem; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; transition: color .2s; }
        .ec-nav-links a:hover { color: var(--ec-white); }
        .ec-nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .ec-nav-icon { background: none; border: none; color: var(--ec-muted); font-size: 1.1rem; cursor: pointer; transition: color .2s; position: relative; }
        .ec-nav-icon:hover { color: var(--ec-white); }
        .ec-cart-count { position: absolute; top: -6px; right: -8px; width: 16px; height: 16px; background: var(--ec-accent); border-radius: 50%; font-size: .55rem; font-weight: 700; display: flex; align-items: center; justify-content: center; color: #fff; }
        .ec-nav-search { display: flex; align-items: center; gap: .5rem; background: rgba(255,255,255,.05); border: 1px solid var(--ec-border); border-radius: 4px; padding: .4rem .75rem; }
        .ec-nav-search input { background: none; border: none; color: var(--ec-text); font-family: var(--ec-font-body); font-size: .8rem; width: 140px; outline: none; }
        .ec-nav-search input::placeholder { color: var(--ec-muted); }
        .ec-nav-mobile-btn { display: none; background: none; border: none; color: var(--ec-text); font-size: 1.4rem; cursor: pointer; }
        @media(max-width:768px) { .ec-nav-links, .ec-nav-search { display: none; } .ec-nav-mobile-btn { display: block; } .ec-hero-left { padding: 2rem 1.5rem; } }

        /* MOBILE NAV */
        .ec-mobile-nav { display: none; position: fixed; inset: 0; z-index: 200; background: #0f0f0f; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
        .ec-mobile-nav.open { display: flex; }
        .ec-mobile-nav a { font-family: var(--ec-font-display); font-size: 2.5rem; color: var(--ec-text); text-decoration: none; letter-spacing: .1em; }
        .ec-mobile-nav .close-btn { position: absolute; top: 5rem; right: 2rem; background: none; border: none; color: var(--ec-text); font-size: 2rem; cursor: pointer; }

        /* CART DRAWER */
        .ec-cart-overlay { display: none; position: fixed; inset: 0; z-index: 998; background: rgba(0,0,0,.7); }
        .ec-cart-overlay.open { display: block; }
        .ec-cart-drawer { position: fixed; top: 0; right: -400px; width: 380px; height: 100%; background: var(--ec-surface); z-index: 999; padding: 2rem; transition: right .35s cubic-bezier(.16,1,.3,1); overflow-y: auto; display: flex; flex-direction: column; }
        .ec-cart-drawer.open { right: 0; }
        .ec-cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ec-cart-title { font-family: var(--ec-font-display); font-size: 1.5rem; letter-spacing: .05em; }
        .ec-cart-close { background: none; border: none; color: var(--ec-muted); font-size: 1.5rem; cursor: pointer; }
        .ec-cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--ec-muted); text-align: center; gap: 1rem; }
        .ec-cart-items { flex: 1; }
        .ec-cart-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--ec-border); }
        .ec-cart-item-img { width: 70px; height: 90px; object-fit: cover; border-radius: 2px; flex-shrink: 0; background: var(--ec-surface2); }
        .ec-cart-item-info { flex: 1; }
        .ec-cart-item-name { font-size: .85rem; font-weight: 500; margin-bottom: .25rem; }
        .ec-cart-item-price { font-family: var(--ec-font-display); font-size: 1rem; color: var(--ec-accent); }
        .ec-cart-item-size { font-size: .7rem; color: var(--ec-muted); margin-top: .2rem; }
        .ec-cart-footer { margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--ec-border); }
        .ec-cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .ec-cart-total-label { font-size: .85rem; color: var(--ec-muted); }
        .ec-cart-total-value { font-family: var(--ec-font-display); font-size: 1.5rem; }
        .ec-btn-checkout { width: 100%; padding: 1rem; background: var(--ec-accent); color: #fff; border: none; font-size: .88rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: all .3s; }
        .ec-btn-checkout:hover { background: #e0002b; }

        /* HERO */
        .ec-hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; padding-top: 5.5rem; }
        @media(max-width:1024px) { .ec-hero { grid-template-columns: 1fr; } .ec-hero-right { display: none; } }
        .ec-hero-left { background: linear-gradient(160deg,#1a1a1a 0%,#0f0f0f 100%); padding: 4rem; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
        .ec-hero-left::before { content: ''; position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at 100% 50%,rgba(255,60,95,0.08) 0%,transparent 60%); }
        .ec-hero-eyebrow { font-family: var(--ec-font-mono); font-size: .65rem; letter-spacing: .3em; color: var(--ec-accent); text-transform: uppercase; margin-bottom: 1.5rem; }
        .ec-hero-title { font-family: var(--ec-font-display); font-size: clamp(5rem,10vw,9rem); line-height: .9; letter-spacing: .02em; color: var(--ec-white); margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .ec-hero-title .outline { -webkit-text-stroke: 2px var(--ec-white); color: transparent; }
        .ec-hero-sub { font-size: 1rem; color: var(--ec-muted); line-height: 1.7; max-width: 400px; margin-bottom: 2.5rem; position: relative; z-index: 1; }
        .ec-hero-actions { display: flex; gap: 1rem; position: relative; z-index: 1; }
        .ec-btn-primary { padding: .875rem 2.5rem; background: var(--ec-accent); color: #fff; border: none; font-size: .85rem; font-weight: 600; cursor: pointer; transition: all .3s; text-decoration: none; display: inline-block; letter-spacing: .05em; text-transform: uppercase; }
        .ec-btn-primary:hover { background: #e0002b; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(255,60,95,0.4); }
        .ec-btn-ghost { padding: .875rem 2.5rem; background: transparent; border: 1px solid rgba(255,255,255,.25); color: var(--ec-text); font-size: .85rem; cursor: pointer; transition: all .25s; letter-spacing: .05em; text-transform: uppercase; }
        .ec-btn-ghost:hover { border-color: var(--ec-white); }
        .ec-hero-stats { display: flex; gap: 2.5rem; margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--ec-border); position: relative; z-index: 1; }
        .ec-h-stat .num { font-family: var(--ec-font-display); font-size: 2rem; letter-spacing: .05em; display: block; }
        .ec-h-stat .label { font-size: .65rem; color: var(--ec-muted); letter-spacing: .1em; text-transform: uppercase; }
        .ec-hero-right { position: relative; overflow: hidden; background: #1a1a1a; }
        .ec-hero-right img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: .85; }
        .ec-hero-tag { position: absolute; bottom: 2rem; left: 2rem; background: rgba(15,15,15,.9); backdrop-filter: blur(10px); border: 1px solid var(--ec-border); border-radius: 4px; padding: 1rem 1.5rem; }
        .ec-hero-tag .sale { font-family: var(--ec-font-display); font-size: 2rem; color: var(--ec-accent); display: block; line-height: 1; }
        .ec-hero-tag .label { font-size: .65rem; color: var(--ec-muted); letter-spacing: .1em; text-transform: uppercase; }

        /* MARQUEE */
        .ec-marquee { background: var(--ec-accent); padding: .7rem 0; overflow: hidden; }
        .ec-marquee-track { display: flex; gap: 3rem; animation: ec-marquee 20s linear infinite; width: max-content; }
        @keyframes ec-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ec-marquee-item { font-family: var(--ec-font-display); font-size: .85rem; letter-spacing: .2em; color: #fff; white-space: nowrap; display: flex; align-items: center; gap: 1.5rem; }
        .ec-marquee-item span { font-size: .5rem; opacity: .6; }

        /* PRODUCTS */
        .ec-products { padding: 6rem 0; }
        .ec-container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .ec-products-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1.5rem; }
        .ec-section-title { font-family: var(--ec-font-display); font-size: clamp(2.5rem,5vw,4rem); letter-spacing: .02em; line-height: 1; }
        .ec-view-all { font-family: var(--ec-font-mono); font-size: .72rem; color: var(--ec-muted); text-decoration: none; letter-spacing: .1em; text-transform: uppercase; transition: color .2s; border-bottom: 1px solid transparent; padding-bottom: 2px; }
        .ec-view-all:hover { color: var(--ec-text); border-color: var(--ec-text); }
        .ec-filters { display: flex; gap: .5rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .ec-filter-btn { font-family: var(--ec-font-mono); font-size: .65rem; letter-spacing: .1em; padding: .4rem 1rem; border: 1px solid var(--ec-border); background: transparent; color: var(--ec-muted); text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .ec-filter-btn.active, .ec-filter-btn:hover { border-color: var(--ec-accent); color: var(--ec-accent); }
        .ec-products-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        @media(max-width:1024px) { .ec-products-grid { grid-template-columns: repeat(2,1fr); } }
        .ec-product-card { cursor: pointer; transition: transform .3s; }
        .ec-product-card:hover { transform: translateY(-4px); }
        .ec-product-card-img { width: 100%; aspect-ratio: 3/4; background: var(--ec-surface); overflow: hidden; position: relative; }
        .ec-product-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; display: block; }
        .ec-product-card:hover .ec-product-card-img img { transform: scale(1.04); }
        .ec-product-badge { position: absolute; top: .75rem; left: .75rem; font-family: var(--ec-font-mono); font-size: .55rem; letter-spacing: .1em; text-transform: uppercase; padding: .2rem .5rem; }
        .ec-badge-sale { background: var(--ec-accent); color: #fff; }
        .ec-badge-new { background: var(--ec-accent2); color: #000; }
        .ec-badge-hot { background: #7b61ff; color: #fff; }
        .ec-product-actions { position: absolute; bottom: -50px; left: 0; right: 0; background: rgba(15,15,15,.9); backdrop-filter: blur(8px); padding: .75rem; text-align: center; transition: bottom .3s ease; }
        .ec-product-card:hover .ec-product-actions { bottom: 0; }
        .ec-add-to-cart { background: var(--ec-accent); color: #fff; border: none; width: 100%; padding: .6rem; font-size: .75rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .ec-add-to-cart:hover { background: #e0002b; }
        .ec-product-info { padding: .875rem 0 0; }
        .ec-product-name { font-size: .88rem; font-weight: 500; margin-bottom: .35rem; }
        .ec-product-meta { display: flex; justify-content: space-between; align-items: center; }
        .ec-product-price { font-family: var(--ec-font-display); font-size: 1.1rem; letter-spacing: .02em; }
        .ec-product-price-old { font-size: .72rem; color: var(--ec-muted); text-decoration: line-through; margin-right: .35rem; }
        .ec-product-colors { display: flex; gap: .3rem; }
        .ec-color-dot { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid transparent; cursor: pointer; transition: border-color .2s; }
        .ec-color-dot:hover, .ec-color-dot.active { border-color: var(--ec-white); }

        /* PROMO BANNER */
        .ec-promo { margin: 0; padding: 5rem 2rem; background: linear-gradient(135deg,#1a0a00 0%,#ff3c5f 50%,#ff8a00 100%); position: relative; overflow: hidden; text-align: center; }
        .ec-promo::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=70') center/cover; opacity: .15; }
        .ec-promo-content { position: relative; z-index: 1; }
        .ec-promo-tag { font-family: var(--ec-font-mono); font-size: .7rem; letter-spacing: .3em; color: rgba(255,255,255,.8); text-transform: uppercase; margin-bottom: 1rem; }
        .ec-promo-title { font-family: var(--ec-font-display); font-size: clamp(4rem,10vw,10rem); color: #fff; line-height: .9; letter-spacing: .05em; margin-bottom: 1.5rem; }
        .ec-promo-sub { font-size: 1.1rem; color: rgba(255,255,255,.8); margin-bottom: 2.5rem; }
        .ec-promo-countdown { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .ec-countdown-item { text-align: center; }
        .ec-countdown-num { font-family: var(--ec-font-display); font-size: 3rem; color: #fff; display: block; line-height: 1; }
        .ec-countdown-label { font-size: .6rem; color: rgba(255,255,255,.6); letter-spacing: .2em; text-transform: uppercase; }

        /* LOOKBOOK */
        .ec-lookbook { padding: 6rem 0; background: var(--ec-surface); }
        .ec-collection-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 3rem; }
        @media(max-width:1024px) { .ec-collection-grid { grid-template-columns: 1fr; } .ec-col-img.wide { grid-column: span 1; } .ec-col-img.wide img { aspect-ratio: 4/3; } }
        .ec-col-img { position: relative; overflow: hidden; cursor: pointer; }
        .ec-col-img img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; transition: transform .5s; }
        .ec-col-img:hover img { transform: scale(1.03); }
        .ec-col-img.wide { grid-column: span 2; }
        .ec-col-img.wide img { aspect-ratio: 16/7; }
        .ec-col-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; }
        .ec-col-title { font-family: var(--ec-font-display); font-size: 1.8rem; letter-spacing: .05em; color: #fff; margin-bottom: .25rem; }
        .ec-col-sub { font-size: .75rem; color: rgba(255,255,255,.7); letter-spacing: .1em; text-transform: uppercase; }
        .ec-col-btn { margin-top: .75rem; display: inline-block; font-family: var(--ec-font-mono); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; color: #fff; border-bottom: 1px solid rgba(255,255,255,.5); padding-bottom: 2px; transition: border-color .2s; text-decoration: none; }
        .ec-col-btn:hover { border-color: #fff; }

        /* NEWSLETTER */
        .ec-newsletter { padding: 6rem 2rem; background: var(--ec-bg); text-align: center; border-top: 1px solid var(--ec-border); }
        .ec-newsletter-title { font-family: var(--ec-font-display); font-size: clamp(2.5rem,5vw,4rem); letter-spacing: .02em; margin-bottom: 1rem; }
        .ec-newsletter-sub { font-size: .95rem; color: var(--ec-muted); margin-bottom: 2.5rem; }
        .ec-newsletter-form { display: flex; gap: 0; max-width: 480px; margin: 0 auto; }
        @media(max-width:768px) { .ec-newsletter-form { flex-direction: column; } .ec-newsletter-input { border-right: 1px solid var(--ec-border); border-bottom: none; } }
        .ec-newsletter-input { flex: 1; padding: .875rem 1.25rem; background: var(--ec-surface); border: 1px solid var(--ec-border); border-right: none; color: var(--ec-text); font-family: var(--ec-font-body); font-size: .88rem; outline: none; }
        .ec-newsletter-input:focus { border-color: var(--ec-accent); }
        .ec-newsletter-btn { padding: .875rem 1.75rem; background: var(--ec-accent); color: #fff; border: none; font-size: .82rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; white-space: nowrap; transition: all .2s; }
        .ec-newsletter-btn:hover { background: #e0002b; }
        .ec-newsletter-btn.sent { background: #00c896; }

        /* FOOTER */
        .ec-footer { background: var(--ec-surface); border-top: 1px solid var(--ec-border); padding: 4rem 0 2rem; }
        .ec-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        @media(max-width:1024px) { .ec-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .ec-footer-grid { grid-template-columns: 1fr; } }
        .ec-footer-logo { font-family: var(--ec-font-display); font-size: 2rem; letter-spacing: .1em; margin-bottom: .75rem; }
        .ec-footer-tagline { font-size: .82rem; color: var(--ec-muted); line-height: 1.6; }
        .ec-footer-col h4 { font-size: .7rem; letter-spacing: .2em; color: var(--ec-muted); text-transform: uppercase; margin-bottom: 1rem; }
        .ec-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .6rem; padding: 0; }
        .ec-footer-col ul a { font-size: .82rem; color: var(--ec-muted); text-decoration: none; transition: color .2s; }
        .ec-footer-col ul a:hover { color: var(--ec-text); }
        .ec-footer-bottom { border-top: 1px solid var(--ec-border); margin-top: 3rem; padding-top: 1.5rem; display: flex; justify-content: space-between; font-size: .72rem; color: var(--ec-muted); flex-wrap: wrap; gap: 1rem; }
        .ec-payment-icons { display: flex; gap: .5rem; font-size: .7rem; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="ec-wrap">
        {/* MOBILE NAV */}
        <div className={`ec-mobile-nav${mobileNavOpen ? " open" : ""}`}>
          <button className="close-btn" onClick={() => setMobileNavOpen(false)}>✕</button>
          <a href="#produtos" onClick={() => setMobileNavOpen(false)}>Coleção</a>
          <a href="#colecao" onClick={() => setMobileNavOpen(false)}>Lookbook</a>
          <a href="#newsletter" onClick={() => setMobileNavOpen(false)}>Newsletter</a>
        </div>

        {/* CART DRAWER */}
        <div className={`ec-cart-overlay${cartOpen ? " open" : ""}`} onClick={() => setCartOpen(false)} />
        <div className={`ec-cart-drawer${cartOpen ? " open" : ""}`}>
          <div className="ec-cart-header">
            <span className="ec-cart-title">Carrinho</span>
            <button className="ec-cart-close" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="ec-cart-items">
            {cartItems.length === 0 ? (
              <div className="ec-cart-empty">
                <div style={{ fontSize: "3rem" }}>🛍️</div>
                <div>Seu carrinho está vazio</div>
                <div style={{ fontSize: ".75rem" }}>Adicione produtos para continuar</div>
              </div>
            ) : (
              cartItems.map((item, i) => (
                <div key={i} className="ec-cart-item">
                  <img className="ec-cart-item-img" src={item.img} alt={item.name} />
                  <div className="ec-cart-item-info">
                    <div className="ec-cart-item-name">{item.name}</div>
                    <div className="ec-cart-item-size">Tamanho: {item.size}</div>
                    <div className="ec-cart-item-price">R$ {item.price}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="ec-cart-footer">
              <div className="ec-cart-total">
                <span className="ec-cart-total-label">Total</span>
                <span className="ec-cart-total-value">R$ {cartTotal}</span>
              </div>
              <button className="ec-btn-checkout" onClick={() => alert("🛍️ Este é um site demo! Funcionalidade completa disponível na versão final.")}>Finalizar compra →</button>
            </div>
          )}
        </div>

        {/* NAV */}
        <nav className="ec-nav">
          <a href="#" className="ec-nav-logo">URBAN</a>
          <ul className="ec-nav-links">
            <li><a href="#produtos">Novidades</a></li>
            <li><a href="#colecao">Coleções</a></li>
            <li><a href="#">Masculino</a></li>
            <li><a href="#">Feminino</a></li>
            <li><a href="#">Sale 🔥</a></li>
          </ul>
          <div className="ec-nav-right">
            <div className="ec-nav-search">
              <span style={{ color: "var(--ec-muted)", fontSize: ".85rem" }}>🔍</span>
              <input type="text" placeholder="Buscar..." />
            </div>
            <button className="ec-nav-icon" onClick={() => setCartOpen(true)}>
              🛍️
              <span className="ec-cart-count">{cartItems.length}</span>
            </button>
            <button className="ec-nav-icon">♡</button>
            <button className="ec-nav-mobile-btn" onClick={() => setMobileNavOpen(true)}>☰</button>
          </div>
        </nav>

        {/* HERO */}
        <section className="ec-hero">
          <div className="ec-hero-left">
            <div className="ec-hero-eyebrow">Coleção Verão 2025</div>
            <h1 className="ec-hero-title">
              DEFINE<br />
              <span className="outline">SEU</span><br />
              ESTILO.
            </h1>
            <p className="ec-hero-sub">Moda contemporânea para quem não segue tendências — as cria. Peças exclusivas, qualidade premium.</p>
            <div className="ec-hero-actions">
              <a href="#produtos" className="ec-btn-primary">Explorar coleção</a>
              <button className="ec-btn-ghost">Lookbook →</button>
            </div>
            <div className="ec-hero-stats">
              {[{ num: "500+", label: "Produtos" }, { num: "48H", label: "Entrega SP" }, { num: "Free", label: "Frete R$ 299+" }].map(s => (
                <div key={s.label} className="ec-h-stat"><span className="num">{s.num}</span><span className="label">{s.label}</span></div>
              ))}
            </div>
          </div>
          <div className="ec-hero-right">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" alt="Modelo com roupa urbana" loading="lazy" />
            <div className="ec-hero-tag">
              <span className="sale">-40%</span>
              <span className="label">Sale de temporada</span>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="ec-marquee">
          <div className="ec-marquee-track">
            {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
              <div key={i} className="ec-marquee-item">{w} <span>✦</span></div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <section className="ec-products" id="produtos">
          <div className="ec-container">
            <div className="ec-products-header reveal">
              <h2 className="ec-section-title">NOVIDADES</h2>
              <a href="#" className="ec-view-all">Ver todos →</a>
            </div>
            <div className="ec-filters reveal">
              {filters.map((f, i) => (
                <button key={f} className={`ec-filter-btn${activeFilter === i ? " active" : ""}`} onClick={() => setActiveFilter(i)}>{f}</button>
              ))}
            </div>
            <div className="ec-products-grid reveal">
              {products.map((p, i) => (
                <div key={i} className="ec-product-card">
                  <div className="ec-product-card-img">
                    {p.badge && <span className={`ec-product-badge ${badgeMap[p.badge]}`}>{badgeLabel[p.badge]}</span>}
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <div className="ec-product-actions">
                      <button className="ec-add-to-cart" onClick={() => addToCart(p, i)}>+ Adicionar ao carrinho</button>
                    </div>
                  </div>
                  <div className="ec-product-info">
                    <div className="ec-product-name">{p.name}</div>
                    <div className="ec-product-meta">
                      <div>
                        {p.oldPrice && <span className="ec-product-price-old">R$ {p.oldPrice}</span>}
                        <span className="ec-product-price">R$ {p.price}</span>
                      </div>
                      <div className="ec-product-colors">
                        {p.colors.map((c, ci) => (
                          <div
                            key={ci}
                            className={`ec-color-dot${(colorSelections[i] ?? 0) === ci ? " active" : ""}`}
                            style={{ background: c }}
                            onClick={() => setColorSelections(prev => ({ ...prev, [i]: ci }))}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROMO BANNER */}
        <div className="ec-promo">
          <div className="ec-promo-content">
            <div className="ec-promo-tag">Oferta relâmpago</div>
            <div className="ec-promo-title">SALE</div>
            <p className="ec-promo-sub">Até 50% off em toda a coleção de inverno. Por tempo limitado.</p>
            <div className="ec-promo-countdown">
              <div className="ec-countdown-item"><span className="ec-countdown-num">{countdown.h}</span><span className="ec-countdown-label">Horas</span></div>
              <div className="ec-countdown-item"><span className="ec-countdown-num">:</span></div>
              <div className="ec-countdown-item"><span className="ec-countdown-num">{countdown.m}</span><span className="ec-countdown-label">Min</span></div>
              <div className="ec-countdown-item"><span className="ec-countdown-num">:</span></div>
              <div className="ec-countdown-item"><span className="ec-countdown-num">{countdown.s}</span><span className="ec-countdown-label">Seg</span></div>
            </div>
            <button className="ec-btn-primary" style={{ fontSize: ".9rem", padding: "1rem 3rem" }}>Aproveitar agora →</button>
          </div>
        </div>

        {/* LOOKBOOK */}
        <section className="ec-lookbook" id="colecao">
          <div className="ec-container">
            <div className="reveal"><h2 className="ec-section-title">LOOKBOOK</h2></div>
          </div>
          <div className="ec-collection-grid reveal">
            <div className="ec-col-img wide">
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80" alt="Coleção Outono" />
              <div className="ec-col-overlay">
                <div className="ec-col-title">COLEÇÃO OUTONO</div>
                <div className="ec-col-sub">Minimalismo urbano</div>
                <a href="#" className="ec-col-btn">Ver coleção →</a>
              </div>
            </div>
            <div className="ec-col-img">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" alt="Feminino" />
              <div className="ec-col-overlay">
                <div className="ec-col-title">FEMININO</div>
                <div className="ec-col-sub">Nova chegada</div>
                <a href="#" className="ec-col-btn">Explorar →</a>
              </div>
            </div>
            <div className="ec-col-img">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Masculino" />
              <div className="ec-col-overlay">
                <div className="ec-col-title">MASCULINO</div>
                <div className="ec-col-sub">Clássico moderno</div>
                <a href="#" className="ec-col-btn">Explorar →</a>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="ec-newsletter" id="newsletter">
          <div className="ec-container">
            <div className="reveal">
              <h2 className="ec-newsletter-title">FIQUE POR DENTRO</h2>
              <p className="ec-newsletter-sub">Receba primeiro as novidades, promoções exclusivas e lançamentos. Prometemos não lotar sua caixa de entrada.</p>
              <form className="ec-newsletter-form" onSubmit={e => { e.preventDefault(); setNewsletterSent(true); setEmail(""); setTimeout(() => setNewsletterSent(false), 3000); }}>
                <input className="ec-newsletter-input" type="email" placeholder="seu@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                <button className={`ec-newsletter-btn${newsletterSent ? " sent" : ""}`} type="submit">
                  {newsletterSent ? "✓ Inscrito!" : "Assinar"}
                </button>
              </form>
              <p style={{ fontSize: ".72rem", color: "var(--ec-muted)", marginTop: "1rem" }}>Sem spam. Cancele quando quiser.</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ec-footer">
          <div className="ec-container">
            <div className="ec-footer-grid">
              <div>
                <div className="ec-footer-logo">URBAN</div>
                <p className="ec-footer-tagline">Moda contemporânea para quem define seu próprio estilo. Qualidade premium, entrega rápida.</p>
              </div>
              <div className="ec-footer-col">
                <h4>Comprar</h4>
                <ul>{["Novidades","Feminino","Masculino","Acessórios","Sale"].map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
              </div>
              <div className="ec-footer-col">
                <h4>Ajuda</h4>
                <ul>{["Rastrear pedido","Trocas e devoluções","Guia de tamanhos","FAQ"].map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
              </div>
              <div className="ec-footer-col">
                <h4>Empresa</h4>
                <ul>{["Sobre nós","Sustentabilidade","Trabalhe conosco","Instagram"].map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
              </div>
            </div>
            <div className="ec-footer-bottom">
              <span>© 2025 URBAN. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</span>
              <div className="ec-payment-icons">
                <span>💳 Visa</span><span>• Mastercard</span><span>• Pix</span><span>• Boleto</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
