"use client";

import type { Metadata } from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Metadata (export separado pois este é client component)
// Coloca o título via useEffect pois 'use client' não permite export metadata
// A metadata real está no generateMetadata abaixo (server-side)

// ─── Dados ────────────────────────────────────────────────────────────────────
const menuItems = [
  { name: "Margherita Classica", desc: "Molho tomate, mozzarella, manjericão", price: "R$ 65", size: "M / G" },
  { name: "Napoletana", desc: "Molho tomate, mozzarella, anchovas, alcaparras, azeitonas pretas", price: "R$ 78", size: "M / G" },
  { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesão, provolone", price: "R$ 89", size: "M / G" },
  { name: "Diavola", desc: "Molho tomate, mozzarella, salame picante importado", price: "R$ 85", size: "M / G" },
  { name: "Prosciutto e Funghi", desc: "Presunto cru, cogumelos frescos, rúcula, parmesão", price: "R$ 92", size: "M / G" },
  { name: "Carbonara", desc: "Base de creme, guanciale, ovo, parmesão, pimenta", price: "R$ 87", size: "M / G" },
];

const galleryImgs = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=70",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=70",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
  "https://images.unsplash.com/photo-1518600654093-21af5de87869?w=400&q=70",
  "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&q=70",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=70",
];

const addBtns = [0, 1]; // índices dos featured cards

export default function PizzariaPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [addedBtns, setAddedBtns] = useState<Record<number, boolean>>({});
  const [form, setForm] = useState({ nome: "", tel: "", data: "", hora: "18:00", pessoas: "1-2 pessoas", ocasiao: "Jantar comum", obs: "" });
  const [formSent, setFormSent] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  // Intersection observer para animações .reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Data mínima = hoje
  const today = new Date().toISOString().split("T")[0];

  function handleAddBtn(idx: number) {
    setAddedBtns((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => setAddedBtns((prev) => ({ ...prev, [idx]: false })), 1500);
  }

  function handleReservation(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => { setFormSent(false); setForm({ nome: "", tel: "", data: "", hora: "18:00", pessoas: "1-2 pessoas", ocasiao: "Jantar comum", obs: "" }); }, 4000);
  }

  const tabs = ["Tradicionais", "Especiais", "Vegetarianas", "Doces", "Bebidas"];

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=Space+Mono&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --bg: #0e0800;
          --surface: #1a1000;
          --accent: #ff6b00;
          --accent2: #ffd166;
          --text: #f5ede0;
          --muted: #9a8878;
          --border: rgba(255,107,0,0.15);
          --glass: rgba(255,255,255,0.03);
          --font-display: 'Playfair Display', serif;
          --font-body: 'DM Sans', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }
        .pz-wrap * { box-sizing: border-box; }
        .pz-wrap { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }

        /* NAV */
        .pz-nav {
          position: fixed; top: 2.75rem; left: 0; right: 0; z-index: 100;
          padding: 1rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(14,8,0,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .pz-nav-logo { font-family: var(--font-display); font-size: 1.6rem; font-weight: 900; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: .4rem; }
        .pz-nav-logo em { color: var(--accent); font-style: italic; }
        .pz-nav-links { display: flex; gap: 2rem; align-items: center; list-style: none; }
        .pz-nav-links a { color: var(--muted); text-decoration: none; font-size: .88rem; font-weight: 400; transition: color .2s; }
        .pz-nav-links a:hover { color: var(--text); }
        .pz-nav-cta { background: var(--accent); color: #fff; border: none; padding: .6rem 1.5rem; border-radius: 3px; font-size: .82rem; font-weight: 500; cursor: pointer; transition: all .25s; text-decoration: none; }
        .pz-nav-cta:hover { background: #ff8c2a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,107,0,0.4); }
        .pz-nav-mobile-btn { display: none; background: none; border: none; color: var(--text); font-size: 1.4rem; cursor: pointer; }
        @media(max-width:768px) { .pz-nav-links, .pz-nav-cta { display: none; } .pz-nav-mobile-btn { display: block; } }

        /* MOBILE NAV */
        .pz-mobile-nav { display: none; position: fixed; inset: 0; z-index: 200; background: rgba(14,8,0,0.98); flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
        .pz-mobile-nav.open { display: flex; }
        .pz-mobile-nav a { font-family: var(--font-display); font-size: 2rem; color: var(--text); text-decoration: none; font-weight: 700; }
        .pz-mobile-nav .close-btn { position: absolute; top: 5rem; right: 2rem; background: none; border: none; color: var(--text); font-size: 2rem; cursor: pointer; }

        /* HERO */
        .pz-hero { min-height: 100vh; padding-top: 6rem; display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .pz-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(255,107,0,0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255,107,0,0.08) 0%, transparent 40%), linear-gradient(180deg, #0e0800 0%, #1a0e00 100%); }
        .pz-hero-img-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80') center/cover; opacity: .12; }
        .pz-hero-content { position: relative; z-index: 5; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 4rem 2rem 2rem; max-width: 1280px; margin: 0 auto; width: 100%; }
        .pz-hero-tag { font-family: var(--font-mono); font-size: .7rem; letter-spacing: .25em; color: var(--accent); text-transform: uppercase; margin-bottom: 1.5rem; display: flex; align-items: center; gap: .6rem; }
        .pz-hero-tag::before { content: ''; width: 28px; height: 1px; background: var(--accent); }
        .pz-hero-title { font-family: var(--font-display); font-size: clamp(4rem,10vw,9rem); font-weight: 900; line-height: .9; letter-spacing: -0.02em; margin-bottom: 1.5rem; }
        .pz-hero-title .italic { font-style: italic; color: var(--accent); }
        .pz-hero-title .stroke { -webkit-text-stroke: 2px var(--text); color: transparent; }
        .pz-hero-sub { font-size: 1.05rem; color: var(--muted); line-height: 1.7; max-width: 480px; margin-bottom: 2.5rem; }
        .pz-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .pz-btn-primary { padding: .9rem 2.2rem; background: var(--accent); color: #fff; border: none; border-radius: 3px; font-size: .88rem; font-weight: 500; cursor: pointer; transition: all .3s; box-shadow: 0 0 30px rgba(255,107,0,0.3); }
        .pz-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255,107,0,0.5); }
        .pz-btn-outline { padding: .9rem 2.2rem; background: transparent; border: 1px solid rgba(245,237,224,0.25); color: var(--text); border-radius: 3px; font-size: .88rem; cursor: pointer; transition: all .25s; }
        .pz-btn-outline:hover { border-color: var(--text); }
        .pz-hero-badges { display: flex; gap: 2rem; margin-top: 3.5rem; flex-wrap: wrap; }
        .pz-hero-badge { display: flex; align-items: center; gap: .6rem; }
        .pz-hero-badge .icon { font-size: 1.4rem; }
        .pz-hero-badge .text span { display: block; }
        .pz-hero-badge .text .num { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--text); }
        .pz-hero-badge .text .label { font-size: .65rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; }
        .pz-scroll-hint { position: relative; z-index: 5; text-align: center; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: .5rem; }
        .pz-scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--accent), transparent); animation: pz-scroll-drop 2s ease-in-out infinite; }
        @keyframes pz-scroll-drop { 0% { transform: translateY(-10px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
        .pz-scroll-label { font-size: .6rem; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }
        @media(max-width:768px) { .pz-hero-title { font-size: clamp(3rem,12vw,6rem); } .pz-hero-content { padding: 2rem 1.5rem; } }

        /* GALLERY */
        .pz-gallery { padding: 4rem 0; overflow: hidden; }
        .pz-gallery-track { display: flex; gap: 1rem; animation: pz-gallery-scroll 30s linear infinite; width: max-content; }
        .pz-gallery-track:hover { animation-play-state: paused; }
        @keyframes pz-gallery-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pz-gallery-img { width: 280px; height: 200px; flex-shrink: 0; border-radius: 8px; overflow: hidden; }
        .pz-gallery-img img { width: 100%; height: 100%; object-fit: cover; }

        /* FEATURED */
        .pz-featured { padding: 6rem 0; background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%); }
        .pz-container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .pz-section-label { font-family: var(--font-mono); font-size: .65rem; letter-spacing: .3em; color: var(--accent); text-transform: uppercase; margin-bottom: .75rem; }
        .pz-section-title { font-family: var(--font-display); font-size: clamp(2.5rem,5vw,4rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 1rem; line-height: 1; }
        .pz-section-sub { font-size: .95rem; color: var(--muted); line-height: 1.7; max-width: 450px; }
        .pz-featured-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 4rem; }
        @media(max-width:1024px) { .pz-featured-grid { grid-template-columns: 1fr; } }
        .pz-pizza-card { border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid var(--border); transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s; cursor: pointer; }
        .pz-pizza-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(255,107,0,0.1); }
        .pz-pizza-card-img { width: 100%; aspect-ratio: 4/3; position: relative; overflow: hidden; }
        .pz-pizza-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .pz-pizza-card:hover .pz-pizza-card-img img { transform: scale(1.05); }
        .pz-pizza-card-info { padding: 1.5rem; }
        .pz-pizza-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; margin-bottom: .35rem; }
        .pz-pizza-desc { font-size: .82rem; color: var(--muted); line-height: 1.6; margin-bottom: 1rem; }
        .pz-pizza-footer { display: flex; align-items: center; justify-content: space-between; }
        .pz-pizza-price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--accent); }
        .pz-pizza-price span { font-size: .75rem; color: var(--muted); font-family: var(--font-body); font-weight: 400; }
        .pz-add-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); border: none; color: #fff; font-size: 1.2rem; cursor: pointer; transition: all .25s; display: flex; align-items: center; justify-content: center; }
        .pz-add-btn:hover { transform: scale(1.15); box-shadow: 0 0 20px rgba(255,107,0,0.5); }
        .pz-add-btn.added { background: #22c55e; }
        .pz-pizza-badge { position: absolute; top: 1rem; left: 1rem; background: var(--accent); color: #fff; font-size: .6rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: .3rem .6rem; border-radius: 2px; }

        /* MENU */
        .pz-menu-section { padding: 6rem 0; }
        .pz-menu-tabs { display: flex; gap: .5rem; margin: 2.5rem 0; flex-wrap: wrap; }
        .pz-menu-tab { padding: .5rem 1.2rem; background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: 30px; font-size: .8rem; cursor: pointer; transition: all .2s; }
        .pz-menu-tab.active, .pz-menu-tab:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
        .pz-menu-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
        @media(max-width:1024px) { .pz-menu-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .pz-menu-grid { grid-template-columns: 1fr; } }
        .pz-menu-item { background: var(--surface); padding: 1.5rem; transition: background .2s; cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .pz-menu-item:hover { background: rgba(255,107,0,0.05); }
        .pz-menu-item-info .name { font-weight: 500; font-size: .9rem; margin-bottom: .25rem; }
        .pz-menu-item-info .desc { font-size: .75rem; color: var(--muted); line-height: 1.5; }
        .pz-menu-item-right { text-align: right; flex-shrink: 0; }
        .pz-menu-price { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--accent); white-space: nowrap; }
        .pz-menu-size { font-size: .65rem; color: var(--muted); margin-top: .2rem; }

        /* ABOUT */
        .pz-about { padding: 6rem 0; background: var(--surface); }
        .pz-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media(max-width:1024px) { .pz-about-grid { grid-template-columns: 1fr; gap: 3rem; } .pz-about-img-badge { right: 2rem; } }
        .pz-about-img { border-radius: 12px; overflow: hidden; position: relative; }
        .pz-about-img img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
        .pz-about-img-badge { position: absolute; bottom: 2rem; right: -1.5rem; background: var(--accent); padding: 1.25rem 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 10px 30px rgba(255,107,0,0.4); }
        .pz-about-img-badge .big { font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; color: #fff; display: block; line-height: 1; }
        .pz-about-img-badge .small { font-size: .65rem; color: rgba(255,255,255,0.8); letter-spacing: .1em; text-transform: uppercase; }
        .pz-about-features { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2.5rem; }
        .pz-about-feature { display: flex; gap: 1rem; align-items: flex-start; }
        .pz-feature-icon { width: 44px; height: 44px; border-radius: 8px; background: rgba(255,107,0,0.1); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .pz-feature-text .title { font-weight: 500; margin-bottom: .25rem; font-size: .9rem; }
        .pz-feature-text .desc { font-size: .8rem; color: var(--muted); line-height: 1.5; }

        /* RESERVATION */
        .pz-reservation { padding: 6rem 0; background: radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.1) 0%, transparent 60%), var(--bg); }
        .pz-reservation-inner { max-width: 700px; margin: 0 auto; text-align: center; }
        .pz-reservation-form { margin-top: 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media(max-width:768px) { .pz-reservation-form { grid-template-columns: 1fr; } .pz-form-full, .pz-form-submit { grid-column: span 1; } }
        .pz-form-group { text-align: left; }
        .pz-form-label { font-size: .7rem; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; margin-bottom: .5rem; display: block; }
        .pz-form-input, .pz-form-select { width: 100%; padding: .8rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-family: var(--font-body); font-size: .88rem; transition: border-color .2s; outline: none; -webkit-appearance: none; appearance: none; }
        .pz-form-input:focus, .pz-form-select:focus { border-color: var(--accent); }
        .pz-form-full { grid-column: span 2; }
        .pz-form-submit { grid-column: span 2; padding: 1rem; background: var(--accent); color: #fff; border: none; border-radius: 4px; font-size: .9rem; font-weight: 500; cursor: pointer; transition: all .3s; margin-top: .5rem; box-shadow: 0 0 30px rgba(255,107,0,0.2); }
        .pz-form-submit:hover { background: #ff8c2a; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,107,0,0.4); }
        .pz-form-submit.sent { background: #22c55e; }

        /* TESTIMONIALS */
        .pz-testimonials { padding: 6rem 0; background: var(--surface); }
        .pz-t-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
        @media(max-width:1024px) { .pz-t-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .pz-t-grid { grid-template-columns: 1fr; } }
        .pz-t-card { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 10px; padding: 2rem; transition: transform .3s; }
        .pz-t-card:hover { transform: translateY(-4px); }
        .pz-t-stars { color: var(--accent2); font-size: .8rem; letter-spacing: .1em; margin-bottom: 1rem; }
        .pz-t-text { font-size: .88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
        .pz-t-author { display: flex; align-items: center; gap: .75rem; }
        .pz-t-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .pz-t-name { font-weight: 500; font-size: .85rem; }
        .pz-t-loc { font-size: .7rem; color: var(--muted); }

        /* INFO */
        .pz-info { padding: 5rem 0; background: var(--bg); }
        .pz-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        @media(max-width:1024px) { .pz-info-grid { grid-template-columns: 1fr; } }
        .pz-info-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 2.5rem; }
        .pz-info-items { display: flex; flex-direction: column; gap: 1.5rem; }
        .pz-info-item { display: flex; gap: 1rem; align-items: flex-start; }
        .pz-info-icon { font-size: 1.3rem; }
        .pz-info-text .label { font-size: .7rem; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; margin-bottom: .2rem; }
        .pz-info-text .value { font-size: .9rem; font-weight: 500; line-height: 1.5; }
        .pz-map-placeholder { border-radius: 12px; overflow: hidden; background: rgba(255,107,0,0.05); border: 1px solid var(--border); aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: var(--muted); font-size: .85rem; }
        .pz-map-icon { font-size: 3rem; }

        /* FOOTER */
        .pz-footer { background: var(--surface); border-top: 1px solid var(--border); padding: 3rem 0; }
        .pz-footer-inner { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; }
        @media(max-width:1024px) { .pz-footer-inner { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .pz-footer-inner { grid-template-columns: 1fr; } }
        .pz-footer-brand .logo { font-family: var(--font-display); font-size: 1.4rem; font-weight: 900; color: var(--text); }
        .pz-footer-brand .logo em { color: var(--accent); font-style: italic; }
        .pz-footer-brand .tagline { font-size: .82rem; color: var(--muted); margin-top: .5rem; line-height: 1.6; }
        .pz-footer-col h4 { font-size: .8rem; font-weight: 500; margin-bottom: 1rem; letter-spacing: .05em; }
        .pz-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .6rem; padding: 0; }
        .pz-footer-col ul a { font-size: .8rem; color: var(--muted); text-decoration: none; transition: color .2s; }
        .pz-footer-col ul a:hover { color: var(--accent); }
        .pz-footer-bottom { border-top: 1px solid var(--border); margin-top: 3rem; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; font-size: .72rem; color: var(--muted); flex-wrap: wrap; gap: 1rem; }

        /* FLOAT BTN */
        .pz-float-order { position: fixed; bottom: 2rem; right: 2rem; z-index: 500; background: var(--accent); color: #fff; border: none; padding: 1rem 1.75rem; border-radius: 50px; font-size: .88rem; font-weight: 600; cursor: pointer; box-shadow: 0 8px 30px rgba(255,107,0,0.5); transition: all .3s; display: flex; align-items: center; gap: .5rem; text-decoration: none; }
        .pz-float-order:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(255,107,0,0.6); }
        .pz-pulse { width: 8px; height: 8px; border-radius: 50%; background: #fff; animation: pz-pulse 1.5s ease-in-out infinite; }
        @keyframes pz-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: .5; } }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="pz-wrap">
        {/* MOBILE NAV */}
        <div className={`pz-mobile-nav${mobileNavOpen ? " open" : ""}`}>
          <button className="close-btn" onClick={() => setMobileNavOpen(false)}>✕</button>
          <a href="#cardapio" onClick={() => setMobileNavOpen(false)}>Cardápio</a>
          <a href="#sobre" onClick={() => setMobileNavOpen(false)}>Sobre</a>
          <a href="#reserva" onClick={() => setMobileNavOpen(false)}>Reservar</a>
          <a href="#contato" onClick={() => setMobileNavOpen(false)}>Contato</a>
        </div>

        {/* NAV */}
        <nav className="pz-nav">
          <a href="#" className="pz-nav-logo"><em>Gustoso</em> Pizzaria</a>
          <ul className="pz-nav-links">
            <li><a href="#cardapio">Cardápio</a></li>
            <li><a href="#sobre">Nossa História</a></li>
            <li><a href="#reserva">Reservas</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <a href="#reserva" className="pz-nav-cta">Reservar mesa</a>
          <button className="pz-nav-mobile-btn" onClick={() => setMobileNavOpen(true)}>☰</button>
        </nav>

        {/* HERO */}
        <section className="pz-hero">
          <div className="pz-hero-bg" />
          <div className="pz-hero-img-bg" />
          <div className="pz-hero-content pz-container">
            <div className="pz-hero-tag">São Paulo • Desde 1998</div>
            <h1 className="pz-hero-title">
              A pizza <br />
              <span className="italic">que você</span><br />
              <span className="stroke">merecia.</span>
            </h1>
            <p className="pz-hero-sub">Massa artesanal fermentada por 72 horas, molho de tomate San Marzano e os melhores ingredientes do Brasil e da Itália.</p>
            <div className="pz-hero-actions">
              <button className="pz-btn-primary" onClick={() => document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" })}>Ver cardápio completo</button>
              <button className="pz-btn-outline" onClick={() => document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" })}>Reservar mesa →</button>
            </div>
            <div className="pz-hero-badges">
              {[{ icon: "🏆", num: "#1", label: "Melhor Pizza SP" }, { icon: "⭐", num: "4.9", label: "Google Reviews" }, { icon: "🔥", num: "1.200°", label: "Forno a lenha" }].map((b) => (
                <div key={b.label} className="pz-hero-badge">
                  <div className="icon">{b.icon}</div>
                  <div className="text"><span className="num">{b.num}</span><span className="label">{b.label}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="pz-scroll-hint">
            <div className="pz-scroll-line" />
            <span className="pz-scroll-label">Scroll</span>
          </div>
        </section>

        {/* GALLERY STRIP */}
        <div className="pz-gallery reveal">
          <div className="pz-gallery-track">
            {[...galleryImgs, ...galleryImgs].map((src, i) => (
              <div key={i} className="pz-gallery-img">
                <img src={src} alt="Pizza" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED PIZZAS */}
        <section className="pz-featured" id="cardapio">
          <div className="pz-container">
            <div className="reveal">
              <div className="pz-section-label">Especialidades</div>
              <h2 className="pz-section-title">Nossas<br />Estrelas</h2>
              <p className="pz-section-sub">Receitas exclusivas desenvolvidas pelo Chef Marco Rossi, trazidas diretamente de Nápoles.</p>
            </div>
            <div className="pz-featured-grid reveal">
              {[
                { badge: "⭐ Chef indica", badgeStyle: {}, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", name: "Margherita del Chef", desc: "Molho San Marzano DOP, mozzarella di bufala importada, manjericão fresco, azeite extravirgem siciliano.", price: "R$ 89" },
                { badge: "🔥 Mais pedida", badgeStyle: { background: "#ffd166", color: "#000" }, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", name: "Calabresa Artesanal", desc: "Calabresa defumada especial, cebola caramelizada na manteiga, mozzarella fior di latte, pimenta calabresa.", price: "R$ 79" },
              ].map((pizza, i) => (
                <div key={i} className="pz-pizza-card">
                  <div className="pz-pizza-card-img">
                    <span className="pz-pizza-badge" style={pizza.badgeStyle}>{pizza.badge}</span>
                    <img src={pizza.img} alt={pizza.name} loading="lazy" />
                  </div>
                  <div className="pz-pizza-card-info">
                    <div className="pz-pizza-name">{pizza.name}</div>
                    <p className="pz-pizza-desc">{pizza.desc}</p>
                    <div className="pz-pizza-footer">
                      <div className="pz-pizza-price">{pizza.price} <span>/ média</span></div>
                      <button
                        className={`pz-add-btn${addedBtns[i] ? " added" : ""}`}
                        onClick={() => handleAddBtn(i)}
                        title="Adicionar ao pedido"
                      >
                        {addedBtns[i] ? "✓" : "+"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENU COMPLETO */}
        <section className="pz-menu-section">
          <div className="pz-container">
            <div className="reveal">
              <div className="pz-section-label">Cardápio Completo</div>
              <h2 className="pz-section-title">Para todos<br />os gostos</h2>
            </div>
            <div className="pz-menu-tabs">
              {tabs.map((tab, i) => (
                <button key={tab} className={`pz-menu-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{tab}</button>
              ))}
            </div>
            <div className="pz-menu-grid reveal">
              {menuItems.map((item) => (
                <div key={item.name} className="pz-menu-item">
                  <div className="pz-menu-item-info">
                    <div className="name">{item.name}</div>
                    <div className="desc">{item.desc}</div>
                  </div>
                  <div className="pz-menu-item-right">
                    <div className="pz-menu-price">{item.price}</div>
                    <div className="pz-menu-size">{item.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="pz-about" id="sobre">
          <div className="pz-container">
            <div className="pz-about-grid reveal">
              <div className="pz-about-img">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" alt="Chef preparando pizza" loading="lazy" />
                <div className="pz-about-img-badge">
                  <span className="big">25</span>
                  <span className="small">anos de tradição</span>
                </div>
              </div>
              <div>
                <div className="pz-section-label">Nossa História</div>
                <h2 className="pz-section-title">Paixão<br />de família.</h2>
                <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: ".95rem", marginBottom: "1rem" }}>Em 1998, o casal Marco e Lucia Rossi chegou de Nápoles trazendo na bagagem as receitas secretas da família e o sonho de compartilhar a verdadeira pizza italiana com o Brasil.</p>
                <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: ".95rem" }}>Hoje, 25 anos depois, somos a pizzaria mais premiada de São Paulo, mantendo os mesmos valores: ingredientes honestos, massa fermentada naturalmente e o calor do forno a lenha.</p>
                <div className="pz-about-features">
                  {[{ icon: "🌾", title: "Massa fermentada 72h", desc: "Processo lento que desenvolve sabor e textura únicos. Farinha especial importada da Itália." }, { icon: "🍅", title: "Tomates San Marzano DOP", desc: "Importados diretamente da Campânia. Doçura e acidez perfeitas para o molho autêntico." }, { icon: "🔥", title: "Forno a lenha a 1.200°C", desc: "Cozimento em 90 segundos que cria a borda perfeita — crocante por fora, macia por dentro." }].map((f) => (
                    <div key={f.title} className="pz-about-feature">
                      <div className="pz-feature-icon">{f.icon}</div>
                      <div className="pz-feature-text">
                        <div className="title">{f.title}</div>
                        <div className="desc">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESERVATION */}
        <section className="pz-reservation" id="reserva">
          <div className="pz-reservation-inner pz-container">
            <div className="reveal">
              <div className="pz-section-label" style={{ justifyContent: "center", display: "flex" }}>Reservas</div>
              <h2 className="pz-section-title" style={{ textAlign: "center" }}>Reserve sua<br />mesa</h2>
              <p style={{ textAlign: "center", color: "var(--muted)", fontSize: ".95rem" }}>Garanta seu lugar. Recomendamos reservar com antecedência, especialmente nos fins de semana.</p>
            </div>
            <form className="pz-reservation-form reveal" onSubmit={handleReservation}>
              <div className="pz-form-group">
                <label className="pz-form-label">Nome completo</label>
                <input type="text" className="pz-form-input" placeholder="João da Silva" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="pz-form-group">
                <label className="pz-form-label">Telefone / WhatsApp</label>
                <input type="tel" className="pz-form-input" placeholder="(11) 99999-9999" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} />
              </div>
              <div className="pz-form-group">
                <label className="pz-form-label">Data</label>
                <input type="date" className="pz-form-input" required min={today} value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
              </div>
              <div className="pz-form-group">
                <label className="pz-form-label">Horário</label>
                <select className="pz-form-select pz-form-input" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}>
                  {["18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"].map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div className="pz-form-group">
                <label className="pz-form-label">Número de pessoas</label>
                <select className="pz-form-select pz-form-input" value={form.pessoas} onChange={(e) => setForm({ ...form, pessoas: e.target.value })}>
                  {["1-2 pessoas","3-4 pessoas","5-6 pessoas","7+ pessoas"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="pz-form-group">
                <label className="pz-form-label">Ocasião especial?</label>
                <select className="pz-form-select pz-form-input" value={form.ocasiao} onChange={(e) => setForm({ ...form, ocasiao: e.target.value })}>
                  {["Jantar comum","Aniversário","Encontro romântico","Reunião de família"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="pz-form-group pz-form-full">
                <label className="pz-form-label">Observações</label>
                <input type="text" className="pz-form-input" placeholder="Alergias, preferências, pedidos especiais..." value={form.obs} onChange={(e) => setForm({ ...form, obs: e.target.value })} />
              </div>
              <button type="submit" className={`pz-form-submit${formSent ? " sent" : ""}`}>
                {formSent ? "✓ Reserva confirmada! Entraremos em contato." : "Confirmar reserva →"}
              </button>
            </form>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="pz-testimonials">
          <div className="pz-container">
            <div className="reveal" style={{ textAlign: "center" }}>
              <div className="pz-section-label" style={{ justifyContent: "center", display: "flex" }}>O que dizem</div>
              <h2 className="pz-section-title">4.9 ⭐ no Google</h2>
            </div>
            <div className="pz-t-grid reveal">
              {[
                { text: "A melhor pizza que já comi fora da Itália. A massa é algo completamente diferente — leve, saborosa e com aquela borda perfeita de forno a lenha.", name: "Ricardo Mendes", loc: "São Paulo, SP", av: "👨" },
                { text: "Lugar maravilhoso para ocasiões especiais. Fizemos nosso aniversário lá e foi perfeito — ambiente, atendimento e claro, a pizza absurdamente boa.", name: "Fernanda Costa", loc: "Brooklin, SP", av: "👩" },
                { text: "Frequento toda semana há 3 anos. A constância é impressionante — sempre igual, sempre perfeita. Isso é respeito pelo cliente.", name: "Carlos Rogério", loc: "Pinheiros, SP", av: "👴" },
              ].map((t) => (
                <div key={t.name} className="pz-t-card">
                  <div className="pz-t-stars">★★★★★</div>
                  <p className="pz-t-text">"{t.text}"</p>
                  <div className="pz-t-author">
                    <div className="pz-t-avatar">{t.av}</div>
                    <div><div className="pz-t-name">{t.name}</div><div className="pz-t-loc">{t.loc}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO + MAP */}
        <section className="pz-info" id="contato">
          <div className="pz-container">
            <div className="pz-info-grid reveal">
              <div className="pz-info-card">
                <div className="pz-section-label">Informações</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>Como nos encontrar</h3>
                <div className="pz-info-items">
                  {[
                    { icon: "📍", label: "Endereço", value: "Rua Augusta, 1456 — Jardins\nSão Paulo, SP — 01304-001" },
                    { icon: "🕐", label: "Horário de Funcionamento", value: "Terça a Dom: 18h – 23h\nSex e Sáb: até 00h | Seg: fechado" },
                    { icon: "📞", label: "Telefone / WhatsApp", value: "(11) 3456-7890\n(11) 99999-1234" },
                    { icon: "📧", label: "E-mail", value: "contato@gustosopizzaria.com.br" },
                  ].map((item) => (
                    <div key={item.label} className="pz-info-item">
                      <div className="pz-info-icon">{item.icon}</div>
                      <div className="pz-info-text">
                        <div className="label">{item.label}</div>
                        <div className="value" style={{ whiteSpace: "pre-line" }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pz-map-placeholder">
                <div className="pz-map-icon">🗺️</div>
                <div>Mapa do Google integrado aqui</div>
                <div style={{ fontSize: ".7rem", color: "var(--muted)" }}>Rua Augusta, 1456 — Jardins, SP</div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pz-footer">
          <div className="pz-container">
            <div className="pz-footer-inner">
              <div className="pz-footer-brand">
                <div className="logo"><em>Gustoso</em> Pizzaria</div>
                <p className="tagline">Pizza artesanal napolitana no coração de São Paulo desde 1998. Feita com amor, servida com paixão.</p>
              </div>
              <div className="pz-footer-col">
                <h4>Navegação</h4>
                <ul>
                  <li><a href="#cardapio">Cardápio</a></li>
                  <li><a href="#sobre">Nossa História</a></li>
                  <li><a href="#reserva">Reservas</a></li>
                  <li><a href="#contato">Contato</a></li>
                </ul>
              </div>
              <div className="pz-footer-col">
                <h4>Redes Sociais</h4>
                <ul>
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">TikTok</a></li>
                  <li><a href="#">iFood</a></li>
                </ul>
              </div>
            </div>
            <div className="pz-footer-bottom">
              <span>© 2025 Gustoso Pizzaria. Todos os direitos reservados.</span>
              <span>CNPJ: 00.000.000/0001-00</span>
            </div>
          </div>
        </footer>

        {/* FLOATING CTA */}
        <a href="#reserva" className="pz-float-order">
          <div className="pz-pulse" />
          Reservar mesa agora
        </a>
      </div>
    </>
  );
}
