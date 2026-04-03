"use client";

// ─── Doçeria da Vovó ──────────────────────────────────────────────────────────
// Site completo para confeitaria artesanal. Tom: tecnológico e delicado.
// 9 seções: Hero · Categorias · Produtos · Sobre · Depoimentos ·
//           Como funciona · Galeria · CTA final · Footer

import { useEffect } from "react";
import Link from "next/link";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("sv");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const WA = "5511999999999";
const waLink = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const PRODUCTS = [
  {
    id: 1,
    name: "Bolo Red Velvet",
    desc: "Massa aveludada com recheio de cream cheese e cobertura cremosa",
    price: 85,
    cat: "Bolos",
    badge: "🔥 Mais pedido",
    badgeType: "hot",
    img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=480&q=80",
  },
  {
    id: 2,
    name: "Caixa de Brigadeiros",
    desc: "30 unidades em sabores variados — embalagem presente inclusa",
    price: 75,
    cat: "Brigadeiros",
    badge: "⭐ Novo",
    badgeType: "new",
    img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=480&q=80",
  },
  {
    id: 3,
    name: "Torta de Limão Siciliano",
    desc: "Base crocante, creme de limão siciliano e merengue maçaricado",
    price: 65,
    cat: "Tortas",
    badge: null,
    badgeType: null,
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=480&q=80",
  },
  {
    id: 4,
    name: "Cupcakes Floral (6un)",
    desc: "Cupcakes decorados com flores de açúcar feitas à mão",
    price: 48,
    cat: "Cupcakes",
    badge: "❤️ Favorito",
    badgeType: "fav",
    img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=480&q=80",
  },
  {
    id: 5,
    name: "Naked Cake de Frutas",
    desc: "Camadas de bolo com creme chantilly e frutas frescas da estação",
    price: 120,
    cat: "Bolos",
    badge: null,
    badgeType: null,
    img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=480&q=80",
  },
  {
    id: 6,
    name: "Kit Festa Completo",
    desc: "Bolo + 50 docinhos + cupcakes para tornar sua celebração inesquecível",
    price: 280,
    cat: "Kits",
    badge: "🔥 Mais pedido",
    badgeType: "hot",
    img: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=480&q=80",
  },
  {
    id: 7,
    name: "Bolo de Pote (4un)",
    desc: "Bolos cremosos em potinhos individuais, perfeitos para presentes",
    price: 36,
    cat: "Potes",
    badge: "⭐ Novo",
    badgeType: "new",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=480&q=80",
  },
  {
    id: 8,
    name: "Docinhos Finos (50un)",
    desc: "Seleção refinada de doces finos para casamentos e eventos especiais",
    price: 95,
    cat: "Doces Finos",
    badge: null,
    badgeType: null,
    img: "https://images.unsplash.com/photo-1550613428-7b3d3ea0a30b?w=480&q=80",
  },
];

const CATEGORIES = [
  { icon: "🎂", name: "Bolos Decorados", qty: 12 },
  { icon: "🍫", name: "Brigadeiros",     qty: 8  },
  { icon: "🍰", name: "Tortas Geladas",  qty: 6  },
  { icon: "🧁", name: "Cupcakes",        qty: 10 },
  { icon: "🍬", name: "Doces Finos",     qty: 15 },
  { icon: "🎁", name: "Kits Presente",   qty: 5  },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    hood: "Moema, SP",
    text: "O bolo de casamento foi simplesmente perfeito! Todos os convidados pediram o contato. Sabor e apresentação impecáveis.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
  },
  {
    name: "Fernanda Lima",
    hood: "Vila Madalena, SP",
    text: "Encomendei pelo WhatsApp e foi super fácil. Os brigadeiros chegaram lindos e com sabor que me fez lembrar da infância.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
  {
    name: "Juliana Ramos",
    hood: "Pinheiros, SP",
    text: "Já é a terceira vez que peço. Os cupcakes florais foram o destaque do aniversário da minha filha. Uma obra de arte comestível!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=640&q=80",
  "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=640&q=80",
  "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=640&q=80",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=640&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=640&q=80",
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=640&q=80",
];

// Partículas pré-determinadas (SSR safe — sem Math.random)
const PARTICLES = [
  { s: "✦", t: "8%",  l: "5%",  d: "0s",    dur: "7s",  sz: 14, o: 0.55 },
  { s: "♥", t: "14%", l: "93%", d: "1.3s",  dur: "8s",  sz: 11, o: 0.50 },
  { s: "✦", t: "28%", l: "2%",  d: "2.1s",  dur: "6s",  sz: 10, o: 0.40 },
  { s: "♥", t: "42%", l: "97%", d: "0.6s",  dur: "9s",  sz: 12, o: 0.45 },
  { s: "✦", t: "58%", l: "7%",  d: "1.9s",  dur: "7s",  sz: 9,  o: 0.35 },
  { s: "♥", t: "72%", l: "90%", d: "3.2s",  dur: "6s",  sz: 14, o: 0.55 },
  { s: "✦", t: "22%", l: "48%", d: "0.9s",  dur: "10s", sz: 8,  o: 0.28 },
  { s: "♥", t: "82%", l: "18%", d: "2.6s",  dur: "8s",  sz: 10, o: 0.38 },
  { s: "✦", t: "11%", l: "72%", d: "1.6s",  dur: "9s",  sz: 12, o: 0.48 },
  { s: "♥", t: "52%", l: "42%", d: "4.1s",  dur: "7s",  sz: 8,  o: 0.30 },
  { s: "✦", t: "88%", l: "68%", d: "0.4s",  dur: "8s",  sz: 10, o: 0.42 },
  { s: "♥", t: "35%", l: "80%", d: "2.4s",  dur: "6s",  sz: 12, o: 0.50 },
  { s: "✦", t: "65%", l: "55%", d: "1.1s",  dur: "11s", sz: 9,  o: 0.30 },
  { s: "♥", t: "18%", l: "30%", d: "3.8s",  dur: "7s",  sz: 11, o: 0.40 },
  { s: "✦", t: "76%", l: "35%", d: "0.7s",  dur: "9s",  sz: 13, o: 0.45 },
];

// ─── Badge color helper ───────────────────────────────────────────────────────
function badgeBg(type: string | null) {
  if (type === "hot") return "linear-gradient(135deg,#D4708A,#F2A7BB)";
  if (type === "new") return "linear-gradient(135deg,#C9A84C,#E8C97A)";
  return "linear-gradient(135deg,#E87BA0,#F2A7BB)";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DocariaPage() {
  useScrollReveal();

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}
      style={{ fontFamily:"var(--font-dm-sans,Arial,sans-serif)", color:"#2A1810", background:"#FDF6EC", overflowX:"hidden" }}
    >

      {/* ── Estilos globais da página ── */}
      <style>{`
        .doc *{box-sizing:border-box}

        /* Fonts */
        .pf{font-family:var(--font-playfair),Georgia,serif}
        .sm{font-family:var(--font-space-mono),monospace}

        /* Scroll reveal */
        .sr{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease}
        .sr.sv{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.1s}.d2{transition-delay:.18s}.d3{transition-delay:.26s}.d4{transition-delay:.34s}

        /* Keyframes */
        @keyframes fp{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-22px) rotate(150deg)}70%{transform:translateY(-10px) rotate(280deg)}}
        @keyframes fw{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}60%{box-shadow:0 0 0 16px rgba(37,211,102,0)}}
        @keyframes blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/40% 50% 60% 50%}75%{border-radius:70% 30% 50% 60%/30% 60% 40% 70%}}
        @keyframes badge-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes fade-hero{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gold-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes btn-pulse{0%,100%{box-shadow:0 0 0 0 rgba(212,112,138,.4)}60%{box-shadow:0 0 0 12px rgba(212,112,138,0)}}

        /* Nav */
        .doc-nav{position:fixed;top:44px;left:0;right:0;z-index:90;height:64px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;background:rgba(253,246,236,.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(242,167,187,.22);transition:all .3s ease}
        .doc-nav-logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#3D2314;text-decoration:none}
        .doc-nav-logo em{font-style:normal;color:#D4708A}
        .doc-nav-links{display:flex;align-items:center;gap:24px;list-style:none;margin:0;padding:0}
        .doc-nav-links a{font-size:14px;font-weight:500;color:#2A1810;text-decoration:none;opacity:.65;transition:opacity .2s,color .2s}
        .doc-nav-links a:hover{opacity:1;color:#D4708A}
        .nav-cta{background:linear-gradient(135deg,#D4708A,#C9A84C)!important;color:white!important;opacity:1!important;padding:8px 20px;border-radius:100px;font-weight:600!important;transition:transform .2s,box-shadow .2s!important}
        .nav-cta:hover{transform:translateY(-1px);box-shadow:0 4px 18px rgba(212,112,138,.35)!important}
        @media(max-width:768px){.doc-nav-links{display:none}.doc-nav{padding:0 20px}}

        /* Hero */
        .hero{min-height:calc(100vh - 44px);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;padding:128px 80px 80px;position:relative;overflow:hidden;background:linear-gradient(145deg,#FDF6EC 0%,#FDE8F0 55%,#FDF6EC 100%)}
        @media(max-width:960px){.hero{grid-template-columns:1fr;padding:120px 24px 60px;text-align:center}.hero-img{display:none!important}.hero-ctas,.hero-badge{justify-content:center;align-self:center}}

        /* Product cards */
        .pc{background:#fff;border-radius:20px;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;cursor:pointer;position:relative}
        .pc:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(201,168,76,.22)}
        .pc img{transition:transform .4s ease}
        .pc:hover img{transform:scale(1.05)}

        /* Category card */
        .cc{background:#fff;border-radius:16px;padding:20px 18px;text-align:center;border:1.5px solid rgba(242,167,187,.2);transition:all .3s ease;cursor:pointer;white-space:nowrap;flex-shrink:0;min-width:140px}
        .cc:hover{border-color:#F2A7BB;background:linear-gradient(145deg,#fff,#FFF0F5);transform:translateY(-3px);box-shadow:0 8px 28px rgba(242,167,187,.25)}

        /* Testimonial card */
        .tc{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);border:1px solid rgba(242,167,187,.25);border-radius:20px;padding:28px;transition:transform .3s,box-shadow .3s}
        .tc:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(242,167,187,.2)}

        /* Gallery */
        .gi{border-radius:18px;overflow:hidden;position:relative;cursor:pointer}
        .gi img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease}
        .gi:hover img{transform:scale(1.08)}
        .go{position:absolute;inset:0;background:rgba(242,167,187,.65);display:flex;align-items:center;justify-content:center;font-size:36px;opacity:0;transition:opacity .3s ease}
        .gi:hover .go{opacity:1}

        /* Float WhatsApp */
        .wf{position:fixed;bottom:28px;right:28px;z-index:200;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;animation:fw 2.5s ease-in-out infinite;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .2s}
        .wf:hover{transform:scale(1.1)}

        /* Responsive grids */
        @media(max-width:900px){
          .pgrid{grid-template-columns:1fr 1fr!important}
          .agrid{grid-template-columns:1fr!important}
          .tgrid{grid-template-columns:1fr!important}
          .sgrid{grid-template-columns:1fr!important}
          .ggrid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:520px){
          .pgrid{grid-template-columns:1fr!important}
          .ggrid{grid-template-columns:1fr!important}
        }
      `}</style>

      <div className="doc">

        {/* ── Nav ──────────────────────────────────────────────────────── */}
        <nav className="doc-nav">
          <a href="#hero" className="doc-nav-logo">
            Doçeria <em>da Vovó</em>
          </a>
          <ul className="doc-nav-links">
            <li><a href="#cardapio">Cardápio</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#depoimentos">Depoimentos</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li>
              <a href={waLink("Olá! Gostaria de fazer um pedido 🎂")} target="_blank" rel="noopener noreferrer" className="nav-cta">
                Fazer pedido →
              </a>
            </li>
          </ul>
        </nav>

        {/* ── S1 · Hero ────────────────────────────────────────────────── */}
        <section id="hero" className="hero">

          {/* Blob decorativo */}
          <div style={{
            position:"absolute", top:"-80px", right:"-80px",
            width:"560px", height:"560px", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(242,167,187,.22) 0%,transparent 70%)",
            animation:"blob 13s ease-in-out infinite",
            pointerEvents:"none", zIndex:0,
          }} />
          <div style={{
            position:"absolute", bottom:"-60px", left:"-60px",
            width:"380px", height:"380px", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(201,168,76,.12) 0%,transparent 70%)",
            animation:"blob 17s ease-in-out infinite reverse",
            pointerEvents:"none", zIndex:0,
          }} />

          {/* Partículas flutuantes */}
          {PARTICLES.map((p, i) => (
            <span key={i} style={{
              position:"absolute", top:p.t, left:p.l,
              fontSize:`${p.sz}px`, opacity:p.o,
              color: i % 2 === 0 ? "#C9A84C" : "#F2A7BB",
              animation:`fp ${p.dur} ${p.d} ease-in-out infinite`,
              pointerEvents:"none", zIndex:1, userSelect:"none",
            }}>
              {p.s}
            </span>
          ))}

          {/* Conteúdo */}
          <div style={{ position:"relative", zIndex:2 }}>

            {/* Badge flutuante */}
            <div
              className="hero-badge"
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"#fff",
                border:"1.5px solid rgba(201,168,76,.4)",
                borderRadius:"100px", padding:"6px 16px 6px 10px",
                fontSize:"13px", fontWeight:600, color:"#3D2314",
                marginBottom:"28px",
                animation:"badge-float 3.5s ease-in-out infinite",
                boxShadow:"0 4px 18px rgba(201,168,76,.15)",
              }}
            >
              🏆 +500 clientes felizes
            </div>

            {/* H1 */}
            <h1
              className="pf"
              style={{
                fontSize:"clamp(2.4rem,5.5vw,4rem)",
                fontWeight:700, lineHeight:1.18,
                color:"#2A1810", marginBottom:"22px",
                animation:"fade-hero .7s .1s ease both",
              }}
            >
              Feito com amor,{" "}
              <em style={{
                fontStyle:"italic",
                background:"linear-gradient(135deg,#D4708A,#C9A84C)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>
                entregue
              </em>
              <br />com carinho.
            </h1>

            {/* Subtítulo */}
            <p style={{
              fontSize:"17px", lineHeight:1.75,
              color:"rgba(42,24,16,.58)",
              marginBottom:"38px", maxWidth:"460px",
              animation:"fade-hero .7s .2s ease both",
            }}>
              Doces artesanais feitos com ingredientes frescos e muito amor.
              Encomende o seu e surpreenda quem você ama.
            </p>

            {/* CTAs */}
            <div
              className="hero-ctas"
              style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"40px", animation:"fade-hero .7s .3s ease both" }}
            >
              <a
                href="#cardapio"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  padding:"14px 30px", borderRadius:"100px",
                  background:"linear-gradient(135deg,#D4708A,#F2A7BB)",
                  color:"#fff", fontWeight:600, fontSize:"15px",
                  textDecoration:"none",
                  boxShadow:"0 6px 28px rgba(212,112,138,.38)",
                  transition:"all .3s ease",
                  animation:"btn-pulse 3s ease-in-out infinite",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)"}}
              >
                🎂 Ver cardápio
              </a>
              <a
                href={waLink("Olá! Quero fazer um pedido")}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  padding:"14px 30px", borderRadius:"100px",
                  background:"#fff",
                  border:"1.5px solid rgba(61,35,20,.14)",
                  color:"#2A1810", fontWeight:600, fontSize:"15px",
                  textDecoration:"none", transition:"all .3s ease",
                }}
                onMouseEnter={e=>{
                  (e.currentTarget as HTMLElement).style.borderColor="rgba(212,112,138,.45)";
                  (e.currentTarget as HTMLElement).style.transform="translateY(-2px)";
                }}
                onMouseLeave={e=>{
                  (e.currentTarget as HTMLElement).style.borderColor="rgba(61,35,20,.14)";
                  (e.currentTarget as HTMLElement).style.transform="translateY(0)";
                }}
              >
                📱 Pedir pelo WhatsApp
              </a>
            </div>

            {/* Micro social proof */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", animation:"fade-hero .7s .45s ease both" }}>
              {["🍰","🎂","🧁","🍫"].map((e,i)=><span key={i} style={{fontSize:"18px"}}>{e}</span>)}
              <span style={{ fontSize:"13px", color:"rgba(42,24,16,.42)" }}>
                Ingredientes frescos · Sob encomenda · Entrega em SP
              </span>
            </div>
          </div>

          {/* Imagem hero */}
          <div className="hero-img" style={{ position:"relative", zIndex:2 }}>
            <div style={{ position:"relative", maxWidth:"480px", margin:"0 auto" }}>
              {/* Aura */}
              <div style={{
                position:"absolute", inset:"-32px",
                background:"radial-gradient(ellipse,rgba(242,167,187,.3) 0%,transparent 65%)",
                borderRadius:"50%",
                animation:"blob 11s ease-in-out infinite",
                zIndex:0,
              }} />
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80"
                alt="Bolo decorado Doçeria da Vovó"
                loading="lazy"
                style={{
                  width:"100%", borderRadius:"32px",
                  objectFit:"cover", aspectRatio:"4/5",
                  position:"relative", zIndex:1,
                  boxShadow:"0 28px 80px rgba(61,35,20,.18)",
                }}
              />
              {/* Floating card — avaliação */}
              <div style={{
                position:"absolute", bottom:"28px", left:"-28px",
                background:"#fff", borderRadius:"16px",
                padding:"12px 18px",
                boxShadow:"0 10px 30px rgba(0,0,0,.1)",
                zIndex:2,
                animation:"badge-float 4s ease-in-out infinite",
              }}>
                <div style={{ fontSize:"16px", color:"#C9A84C" }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontSize:"12px", fontWeight:600, color:"#2A1810", marginTop:"2px" }}>500+ pedidos entregues</div>
              </div>
              {/* Floating card — prazo */}
              <div style={{
                position:"absolute", top:"28px", right:"-20px",
                background:"linear-gradient(135deg,#D4708A,#F2A7BB)",
                borderRadius:"14px", padding:"10px 14px",
                boxShadow:"0 8px 24px rgba(212,112,138,.35)",
                zIndex:2,
                animation:"badge-float 5s 1s ease-in-out infinite",
                color:"#fff",
              }}>
                <div style={{ fontSize:"11px", fontWeight:600, opacity:.85 }}>Entrega em</div>
                <div style={{ fontSize:"18px", fontWeight:700 }}>24–48h</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── S2 · Categorias ──────────────────────────────────────────── */}
        <section id="categorias" style={{ padding:"80px 24px", background:"#FDF6EC" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div className="sr" style={{ textAlign:"center", marginBottom:"48px" }}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"8px" }}>
                Nosso cardápio
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#2A1810" }}>
                O que temos para você
              </h2>
            </div>

            {/* Scroll horizontal */}
            <div style={{ display:"flex", gap:"16px", overflowX:"auto", paddingBottom:"8px", scrollbarWidth:"none" }}>
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="cc sr" style={{ transitionDelay:`${i*0.07}s` }}>
                  <div style={{ fontSize:"38px", marginBottom:"10px" }}>{cat.icon}</div>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"#2A1810", marginBottom:"4px" }}>{cat.name}</div>
                  <div className="sm" style={{ fontSize:"11px", color:"rgba(42,24,16,.42)" }}>{cat.qty} opções</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3 · Produtos em destaque ─────────────────────────────────── */}
        <section id="cardapio" style={{ padding:"80px 24px", background:"#FFF8F2" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div className="sr" style={{ textAlign:"center", marginBottom:"56px" }}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"8px" }}>
                Destaques
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#2A1810" }}>
                Nossos favoritos
              </h2>
              <p style={{ fontSize:"15px", color:"rgba(42,24,16,.5)", marginTop:"12px", maxWidth:"440px", margin:"12px auto 0" }}>
                Tudo feito na hora, com ingredientes frescos. Clique e peça pelo WhatsApp.
              </p>
            </div>

            <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
              {PRODUCTS.map((prod, i) => (
                <article key={prod.id} className={`pc sr ${["d1","d2","d3","d4"][i%4]}`}>

                  {/* Ribbon badge */}
                  {prod.badge && (
                    <div style={{
                      position:"absolute", top:"16px", left:"-2px",
                      background:badgeBg(prod.badgeType),
                      color:"#fff", fontSize:"11px", fontWeight:700,
                      padding:"4px 12px 4px 10px",
                      borderRadius:"0 100px 100px 0",
                      zIndex:10,
                      boxShadow:"2px 2px 8px rgba(0,0,0,.08)",
                    }}>
                      {prod.badge}
                    </div>
                  )}

                  {/* Foto */}
                  <div style={{ height:"210px", overflow:"hidden", position:"relative" }}>
                    <img
                      src={prod.img}
                      alt={prod.name}
                      loading="lazy"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    />
                    <div style={{
                      position:"absolute", bottom:"10px", right:"10px",
                      background:"rgba(255,255,255,.9)",
                      backdropFilter:"blur(8px)",
                      borderRadius:"100px", padding:"3px 10px",
                      fontSize:"11px", fontWeight:600, color:"#3D2314",
                    }}>
                      {prod.cat}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding:"20px" }}>
                    <h3 className="pf" style={{ fontSize:"18px", fontWeight:600, color:"#2A1810", marginBottom:"6px" }}>
                      {prod.name}
                    </h3>
                    <p style={{ fontSize:"13px", color:"rgba(42,24,16,.5)", lineHeight:1.55, marginBottom:"18px" }}>
                      {prod.desc}
                    </p>

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span className="sm" style={{
                        fontSize:"18px", fontWeight:700,
                        background:"linear-gradient(135deg,#C9A84C,#E8C97A)",
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                      }}>
                        R$ {prod.price.toFixed(2).replace(".", ",")}
                      </span>
                      <a
                        href={waLink(`Olá! Quero pedir: ${prod.name}`)}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          display:"inline-flex", alignItems:"center", gap:"6px",
                          padding:"9px 18px", borderRadius:"100px",
                          background:"linear-gradient(135deg,#D4708A,#F2A7BB)",
                          color:"#fff", fontSize:"13px", fontWeight:600,
                          textDecoration:"none",
                          boxShadow:"0 4px 14px rgba(212,112,138,.28)",
                          transition:"all .3s ease",
                        }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)"}}
                      >
                        Pedir agora
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4 · Sobre ───────────────────────────────────────────────── */}
        <section id="sobre" style={{ padding:"100px 24px", background:"#FDF6EC" }}>
          <div
            className="agrid"
            style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}
          >
            {/* Foto */}
            <div className="sr" style={{ position:"relative" }}>
              <div style={{
                position:"absolute", inset:"-20px",
                background:"radial-gradient(ellipse,rgba(242,167,187,.18) 0%,transparent 68%)",
                borderRadius:"50%",
                animation:"blob 15s ease-in-out infinite",
              }} />
              <img
                src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=540&q=80"
                alt="Nossa confeiteira"
                loading="lazy"
                style={{
                  width:"100%", borderRadius:"28px",
                  objectFit:"cover", aspectRatio:"4/5",
                  position:"relative", zIndex:1,
                  boxShadow:"0 22px 60px rgba(61,35,20,.14)",
                }}
              />
              {/* Selo anos */}
              <div style={{
                position:"absolute", top:"24px", right:"-18px",
                background:"linear-gradient(135deg,#C9A84C,#E8C97A)",
                borderRadius:"50%", width:"88px", height:"88px",
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                boxShadow:"0 8px 28px rgba(201,168,76,.42)",
                animation:"badge-float 4.5s ease-in-out infinite",
                zIndex:2,
              }}>
                <span style={{ fontSize:"26px", fontWeight:900, color:"#3D2314", lineHeight:1 }}>12</span>
                <span style={{ fontSize:"10px", fontWeight:600, color:"#3D2314" }}>anos</span>
              </div>
            </div>

            {/* Texto */}
            <div className="sr d2">
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"14px" }}>
                Nossa história
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:700, color:"#2A1810", marginBottom:"24px", lineHeight:1.2 }}>
                Uma história feita de açúcar e afeto
              </h2>
              <p style={{ fontSize:"15px", lineHeight:1.8, color:"rgba(42,24,16,.6)", marginBottom:"16px" }}>
                Tudo começou na cozinha da nossa vovó Maria, onde o cheiro de bolo quentinho era sinônimo de domingo em família.
                Com 12 anos de experiência, transformamos memórias afetivas em doces artesanais que chegam até você.
              </p>
              <p style={{ fontSize:"15px", lineHeight:1.8, color:"rgba(42,24,16,.6)", marginBottom:"38px" }}>
                Cada encomenda é preparada com cuidado, ingredientes selecionados e aquele toque especial que só quem cozinha com amor consegue dar.
              </p>

              {/* Diferenciais */}
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                {[
                  { icon:"🌿", title:"Ingredientes frescos", desc:"Selecionados diariamente para garantir o melhor sabor" },
                  { icon:"✋", title:"Feito sob encomenda",  desc:"Cada produto preparado especialmente para você" },
                  { icon:"🚗", title:"Entrega em São Paulo", desc:"Levamos o doce até a sua porta com cuidado" },
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"16px" }}>
                    <div style={{
                      width:"44px", height:"44px", borderRadius:"12px", flexShrink:0,
                      background:"linear-gradient(145deg,#FFF0F5,#FDE8F0)",
                      border:"1px solid rgba(242,167,187,.28)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"20px",
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize:"14px", fontWeight:600, color:"#2A1810" }}>{item.title}</div>
                      <div style={{ fontSize:"13px", color:"rgba(42,24,16,.48)", marginTop:"2px" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── S5 · Depoimentos ─────────────────────────────────────────── */}
        <section
          id="depoimentos"
          style={{ padding:"100px 24px", background:"linear-gradient(145deg,#FDE8F0 0%,#FDF6EC 50%,#FFF0F5 100%)" }}
        >
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div className="sr" style={{ textAlign:"center", marginBottom:"56px" }}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"8px" }}>
                Depoimentos
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#2A1810" }}>
                O que dizem nossos clientes
              </h2>
            </div>

            <div className="tgrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`tc sr ${["d1","d2","d3"][i]}`}>
                  <div style={{ fontSize:"16px", color:"#C9A84C", marginBottom:"16px" }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ fontSize:"14px", lineHeight:1.75, color:"rgba(42,24,16,.68)", fontStyle:"italic", marginBottom:"22px" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      style={{
                        width:"44px", height:"44px", borderRadius:"50%",
                        objectFit:"cover",
                        border:"2px solid rgba(242,167,187,.55)",
                      }}
                    />
                    <div>
                      <div style={{ fontSize:"14px", fontWeight:600, color:"#2A1810" }}>{t.name}</div>
                      <div style={{ fontSize:"12px", color:"rgba(42,24,16,.42)" }}>{t.hood}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S6 · Como funciona ───────────────────────────────────────── */}
        <section style={{ padding:"100px 24px", background:"#FFF8F2" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div className="sr" style={{ textAlign:"center", marginBottom:"64px" }}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"8px" }}>
                Simples assim
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#2A1810" }}>
                Como fazer seu pedido
              </h2>
            </div>

            <div className="sgrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"28px" }}>
              {[
                { step:"01", icon:"🎂", title:"Escolha seu produto",
                  desc:"Navegue pelo nosso cardápio e encontre o doce perfeito para a sua ocasião." },
                { step:"02", icon:"💬", title:"Fale no WhatsApp",
                  desc:"Entre em contato, escolha sabor, tamanho e data de entrega. Simples e rápido." },
                { step:"03", icon:"🚗", title:"Receba em casa",
                  desc:"Entregamos com cuidado na sua porta, embalado com todo o amor." },
              ].map((s, i) => (
                <div key={i} className={`sr ${["d1","d2","d3"][i]}`} style={{
                  padding:"40px 28px", borderRadius:"22px",
                  background:"#fff",
                  border:"1.5px solid rgba(242,167,187,.18)",
                  textAlign:"center", position:"relative", overflow:"hidden",
                }}>
                  {/* Número decorativo fundo */}
                  <span className="pf" style={{
                    position:"absolute", top:"-14px", right:"12px",
                    fontSize:"110px", fontWeight:900,
                    color:"rgba(242,167,187,.07)",
                    lineHeight:1, userSelect:"none", pointerEvents:"none",
                  }}>
                    {s.step}
                  </span>
                  <div style={{ fontSize:"46px", marginBottom:"16px" }}>{s.icon}</div>
                  <div className="sm" style={{ fontSize:"10px", fontWeight:700, color:"#D4708A", letterSpacing:".16em", textTransform:"uppercase", marginBottom:"12px" }}>
                    Passo {s.step}
                  </div>
                  <h3 className="pf" style={{ fontSize:"19px", fontWeight:600, color:"#2A1810", marginBottom:"12px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize:"14px", lineHeight:1.65, color:"rgba(42,24,16,.52)" }}>
                    {s.desc}
                  </p>

                  {/* Progresso visual */}
                  <div style={{ display:"flex", justifyContent:"center", gap:"6px", marginTop:"24px" }}>
                    {[0,1,2].map(j=>(
                      <div key={j} style={{
                        height:"3px", borderRadius:"100px",
                        width: j === i ? "24px" : "8px",
                        background: j <= i ? "#D4708A" : "rgba(242,167,187,.2)",
                        transition:"all .3s",
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S7 · Galeria ─────────────────────────────────────────────── */}
        <section id="galeria" style={{ padding:"100px 24px", background:"#FDF6EC" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
            <div className="sr" style={{ textAlign:"center", marginBottom:"56px" }}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#D4708A", marginBottom:"8px" }}>
                Galeria
              </p>
              <h2 className="pf" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", fontWeight:700, color:"#2A1810" }}>
                Feitos com amor
              </h2>
            </div>

            <div className="ggrid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
              {GALLERY.map((img, i) => (
                <div key={i} className={`gi sr ${["d1","d2","d3","d1","d2","d3"][i]}`}
                  style={{ height: [0,5].includes(i) ? "320px" : "240px" }}
                >
                  <img src={img} alt={`Galeria ${i+1}`} loading="lazy" />
                  <div className="go">♥</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S8 · CTA Final ───────────────────────────────────────────── */}
        <section style={{
          padding:"120px 24px",
          background:"linear-gradient(135deg,#F2A7BB 0%,#E8C97A 100%)",
          textAlign:"center", position:"relative", overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", top:"-80px", left:"-80px",
            width:"380px", height:"380px",
            background:"rgba(255,255,255,.13)",
            borderRadius:"50%",
            animation:"blob 11s ease-in-out infinite",
          }} />
          <div style={{
            position:"absolute", bottom:"-60px", right:"-60px",
            width:"300px", height:"300px",
            background:"rgba(255,255,255,.09)",
            borderRadius:"50%",
            animation:"blob 15s ease-in-out infinite reverse",
          }} />

          <div className="sr" style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize:"44px", marginBottom:"16px" }}>🍰</p>
            <h2 className="pf" style={{
              fontSize:"clamp(2.2rem,5vw,3.6rem)",
              fontWeight:700, color:"#3D2314",
              marginBottom:"20px", lineHeight:1.15,
            }}>
              Pronta para adoçar<br />o seu dia?
            </h2>
            <p style={{
              fontSize:"17px", color:"rgba(61,35,20,.65)",
              maxWidth:"460px", margin:"0 auto 42px",
              lineHeight:1.7,
            }}>
              Entre em contato e vamos criar juntos o doce perfeito para o seu momento especial.
            </p>

            <a
              href={waLink("Olá! Quero fazer um pedido especial 🎂")}
              target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"12px",
                padding:"18px 42px", borderRadius:"100px",
                background:"#3D2314", color:"#FDF6EC",
                fontSize:"16px", fontWeight:700, textDecoration:"none",
                boxShadow:"0 6px 32px rgba(61,35,20,.32)",
                transition:"all .3s ease",
              }}
              onMouseEnter={e=>{
                (e.currentTarget as HTMLElement).style.transform="translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow="0 14px 44px rgba(61,35,20,.38)";
              }}
              onMouseLeave={e=>{
                (e.currentTarget as HTMLElement).style.transform="translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow="0 6px 32px rgba(61,35,20,.32)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.843L.057 23.486a.75.75 0 00.916.916l5.643-1.472A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.73-.52-5.27-1.42l-.38-.22-3.93 1.03 1.03-3.93-.22-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Fazer pedido pelo WhatsApp
            </a>
          </div>
        </section>

        {/* ── S9 · Footer ──────────────────────────────────────────────── */}
        <footer style={{ background:"#3D2314", padding:"64px 24px 28px", color:"rgba(253,246,236,.65)" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
              gap:"48px", marginBottom:"48px",
            }}>

              {/* Logo + tagline */}
              <div>
                <div className="pf" style={{ fontSize:"22px", fontWeight:700, color:"#FDF6EC", marginBottom:"12px" }}>
                  Doçeria <span style={{ color:"#E8C97A" }}>da Vovó</span>
                </div>
                <p style={{ fontSize:"14px", lineHeight:1.65, marginBottom:"22px" }}>
                  Doces artesanais feitos com amor e ingredientes frescos. Cada pedaço conta uma história.
                </p>
                <div style={{ display:"flex", gap:"10px" }}>
                  {[
                    { bg:"#25D366", icon:"💬", href:waLink("Olá!") },
                    { bg:"linear-gradient(135deg,#F2A7BB,#D4708A)", icon:"📸", href:"#" },
                  ].map((s, i)=>(
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      width:"38px", height:"38px", borderRadius:"10px",
                      background:s.bg,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"17px", textDecoration:"none",
                      transition:"transform .2s",
                    }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)"}}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 style={{ color:"#FDF6EC", fontWeight:600, marginBottom:"16px", fontSize:"13px", letterSpacing:".06em", textTransform:"uppercase" }}>
                  Links rápidos
                </h4>
                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                  {["Cardápio","Sobre nós","Depoimentos","Galeria","Fazer pedido"].map(link=>(
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(/\s/g,"")}`} style={{
                        color:"rgba(253,246,236,.58)", fontSize:"14px",
                        textDecoration:"none", transition:"color .2s",
                      }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#E8C97A"}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(253,246,236,.58)"}}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Horário */}
              <div>
                <h4 style={{ color:"#FDF6EC", fontWeight:600, marginBottom:"16px", fontSize:"13px", letterSpacing:".06em", textTransform:"uppercase" }}>
                  Atendimento
                </h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", fontSize:"13px" }}>
                  {[
                    { dia:"Seg – Sex", hora:"09h às 18h" },
                    { dia:"Sábado",   hora:"09h às 14h" },
                    { dia:"Domingo",  hora:"Apenas urgências" },
                  ].map(item=>(
                    <div key={item.dia}>
                      <div style={{ color:"#E8C97A", fontWeight:600, fontSize:"12px", marginBottom:"1px" }}>{item.dia}</div>
                      <div>{item.hora}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entrega */}
              <div>
                <h4 style={{ color:"#FDF6EC", fontWeight:600, marginBottom:"16px", fontSize:"13px", letterSpacing:".06em", textTransform:"uppercase" }}>
                  Entrega
                </h4>
                <p style={{ fontSize:"14px", lineHeight:1.65, marginBottom:"14px" }}>
                  🚗 Entregas em toda São Paulo
                </p>
                <p style={{ fontSize:"13px", lineHeight:1.6, marginBottom:"16px" }}>
                  📍 Consulte sua região pelo WhatsApp
                </p>
                <div style={{
                  padding:"10px 14px", borderRadius:"10px",
                  background:"rgba(242,167,187,.1)",
                  border:"1px solid rgba(242,167,187,.2)",
                  fontSize:"13px", color:"#F2A7BB",
                }}>
                  ✓ Embalagem especial inclusa
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop:"1px solid rgba(253,246,236,.08)",
              paddingTop:"22px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:"12px", flexWrap:"wrap", fontSize:"12px",
            }}>
              <span>© {new Date().getFullYear()} Doçeria da Vovó · Feito com ♥</span>
              <span style={{ color:"rgba(253,246,236,.3)" }}>
                Site por{" "}
                <Link href="/" style={{ color:"#E8C97A", textDecoration:"none" }}>
                  DuduStudio
                </Link>
              </span>
            </div>
          </div>
        </footer>

        {/* ── WhatsApp flutuante ────────────────────────────────────────── */}
        <a
          href={waLink("Olá! Quero fazer um pedido 🍰")}
          target="_blank" rel="noopener noreferrer"
          className="wf"
          title="Fazer pedido no WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.843L.057 23.486a.75.75 0 00.916.916l5.643-1.472A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.73-.52-5.27-1.42l-.38-.22-3.93 1.03 1.03-3.93-.22-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>

      </div>
    </div>
  );
}
