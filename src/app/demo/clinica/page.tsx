"use client";

import { useState, useEffect } from "react";

export default function ClinicaPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [agendaForm, setAgendaForm] = useState({ nome: "", tel: "", especialidade: "Clínica Médica", data: "", periodo: "Manhã (7h-12h)", convenio: "Particular" });
  const [agendaSent, setAgendaSent] = useState(false);

  const today = new Date().toISOString().split("T")[0];

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

  function handleAgenda(e: React.FormEvent) {
    e.preventDefault();
    setAgendaSent(true);
    setTimeout(() => { setAgendaSent(false); setAgendaForm({ nome: "", tel: "", especialidade: "Clínica Médica", data: "", periodo: "Manhã (7h-12h)", convenio: "Particular" }); }, 4000);
  }

  const especialidades = [
    { icon: "🩺", title: "Clínica Médica", desc: "Consultas gerais, check-ups, prevenção e tratamento de doenças crônicas. Médicos generalistas experientes.", count: "6 médicos disponíveis", bg: "#eff6ff" },
    { icon: "🦷", title: "Odontologia", desc: "Tratamentos completos: limpeza, canal, implantes, ortodontia, clareamento e estética dental avançada.", count: "4 dentistas disponíveis", bg: "#fdf4ff" },
    { icon: "🧠", title: "Psicologia", desc: "Psicoterapia individual, casal e família. Atendimento presencial e online. Abordagens cognitivo-comportamental.", count: "Presencial e online", bg: "#f0fdf4" },
    { icon: "❤️", title: "Cardiologia", desc: "Eletrocardiograma, ecocardiograma, teste ergométrico, holter e acompanhamento cardiovascular completo.", count: "Exames no local", bg: "#fff7ed" },
    { icon: "🍎", title: "Nutrição", desc: "Acompanhamento nutricional personalizado, reeducação alimentar, nutrição esportiva e clínica.", count: "Planos personalizados", bg: "#fef3c7" },
    { icon: "💆", title: "Fisioterapia", desc: "Reabilitação ortopédica, neurológica e respiratória. RPG, pilates clínico, osteopatia e acupuntura.", count: "Equipamentos modernos", bg: "#ecfdf5" },
  ];

  const team = [
    { img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80", name: "Dr. Ricardo Alves", role: "Clínica Médica", crm: "CRM-SP 123.456" },
    { img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80", name: "Dra. Ana Santos", role: "Cardiologia", crm: "CRM-SP 234.567" },
    { img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80", name: "Dr. Carlos Lima", role: "Odontologia", crm: "CRO-SP 45.678" },
    { img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80", name: "Dra. Mariana Costa", role: "Psicologia", crm: "CRP 06/123456" },
  ];

  const testimonials = [
    { text: "Atendimento impecável desde a recepção até o médico. Ambiente acolhedor e profissionais que realmente se importam. Nunca mais troquei de clínica.", name: "Marina Oliveira", since: "Paciente há 3 anos", av: "M" },
    { text: "Toda minha família é atendida aqui. A praticidade de ter pediatria, cardiologia e nutrição no mesmo lugar é incrível. Altamente recomendo.", name: "Paulo Rodrigues", since: "Paciente há 2 anos", av: "P" },
    { text: "Os resultados dos exames chegam pelo WhatsApp rapidinho. A facilidade de agendar online foi o que me conquistou. Médicos excelentes e humanos.", name: "Juliana Ferreira", since: "Paciente há 1 ano", av: "J" },
  ];

  const convenios = ["🏥 Unimed","💙 Bradesco Saúde","🔵 Amil","🟣 SulAmérica","🟢 Hapvida","🔴 NotreDame","🟡 Golden Cross","🔷 Omint","⚫ Porto Seguro","🟤 + 35 convênios"];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --cl-bg: #f7f9fc; --cl-surface: #fff; --cl-primary: #0057ff; --cl-primary-dark: #003dcc;
          --cl-primary-light: #e8f0ff; --cl-text: #0f1923; --cl-muted: #6b7a8e; --cl-border: #e4e8f0;
          --cl-accent: #00c896;
          --cl-font-display: 'Fraunces', serif; --cl-font-body: 'Plus Jakarta Sans', sans-serif;
        }
        .cl-wrap * { box-sizing: border-box; }
        .cl-wrap { background: var(--cl-bg); color: var(--cl-text); font-family: var(--cl-font-body); overflow-x: hidden; }

        /* NAV */
        .cl-nav { position: fixed; top: 2.75rem; left: 0; right: 0; z-index: 100; background: rgba(247,249,252,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--cl-border); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
        .cl-nav-logo { font-family: var(--cl-font-display); font-size: 1.35rem; font-weight: 700; color: var(--cl-text); text-decoration: none; display: flex; align-items: center; gap: .4rem; }
        .cl-nav-logo span { color: var(--cl-primary); }
        .cl-logo-icon { width: 32px; height: 32px; background: var(--cl-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: .9rem; }
        .cl-nav-links { display: flex; gap: 2rem; list-style: none; align-items: center; }
        .cl-nav-links a { color: var(--cl-muted); text-decoration: none; font-size: .85rem; font-weight: 500; transition: color .2s; }
        .cl-nav-links a:hover { color: var(--cl-text); }
        .cl-nav-cta { background: var(--cl-primary); color: #fff; border: none; padding: .6rem 1.5rem; border-radius: 40px; font-size: .83rem; font-weight: 600; cursor: pointer; transition: all .25s; text-decoration: none; }
        .cl-nav-cta:hover { background: var(--cl-primary-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,87,255,0.3); }
        .cl-nav-mobile-btn { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--cl-text); }
        @media(max-width:768px) { .cl-nav-links, .cl-nav-cta { display: none; } .cl-nav-mobile-btn { display: block; } .cl-hero { padding: 8rem 1.5rem 4rem; } }

        /* MOBILE NAV */
        .cl-mobile-nav { display: none; position: fixed; inset: 0; z-index: 200; background: rgba(247,249,252,.98); flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
        .cl-mobile-nav.open { display: flex; }
        .cl-mobile-nav a { font-family: var(--cl-font-display); font-size: 2rem; color: var(--cl-text); text-decoration: none; font-weight: 700; }
        .cl-mobile-nav .close-btn { position: absolute; top: 5rem; right: 2rem; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--cl-text); }

        /* HERO */
        .cl-hero { padding: 10rem 2rem 6rem; background: linear-gradient(160deg,#f0f5ff 0%,#fff 60%,#f0fff8 100%); position: relative; overflow: hidden; min-height: 90vh; display: flex; align-items: center; }
        .cl-hero::before { content: ''; position: absolute; top: -20%; right: -10%; width: 600px; height: 600px; background: radial-gradient(circle,rgba(0,87,255,0.07) 0%,transparent 60%); border-radius: 50%; }
        .cl-hero::after { content: ''; position: absolute; bottom: -10%; left: -5%; width: 400px; height: 400px; background: radial-gradient(circle,rgba(0,200,150,0.07) 0%,transparent 60%); border-radius: 50%; }
        .cl-hero-grid { max-width: 1280px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 2; }
        @media(max-width:1024px) { .cl-hero-grid { grid-template-columns: 1fr; gap: 3rem; } .cl-hero-right { display: none; } }
        .cl-hero-eyebrow { display: inline-flex; align-items: center; gap: .5rem; background: var(--cl-primary-light); border: 1px solid rgba(0,87,255,0.2); border-radius: 40px; padding: .4rem 1rem; font-size: .72rem; font-weight: 600; color: var(--cl-primary); letter-spacing: .05em; text-transform: uppercase; margin-bottom: 1.5rem; }
        .cl-hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cl-primary); animation: cl-dot-pulse 1.5s ease-in-out infinite; }
        @keyframes cl-dot-pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        .cl-hero-title { font-family: var(--cl-font-display); font-size: clamp(3rem,5vw,4.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1.25rem; color: var(--cl-text); }
        .cl-hero-title em { font-style: italic; color: var(--cl-primary); }
        .cl-hero-sub { font-size: 1rem; color: var(--cl-muted); line-height: 1.75; margin-bottom: 2.5rem; max-width: 460px; }
        .cl-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .cl-btn-primary { padding: .875rem 2rem; background: var(--cl-primary); color: #fff; border: none; border-radius: 40px; font-size: .88rem; font-weight: 600; cursor: pointer; transition: all .3s; box-shadow: 0 4px 20px rgba(0,87,255,0.25); text-decoration: none; display: inline-flex; align-items: center; gap: .4rem; }
        .cl-btn-primary:hover { background: var(--cl-primary-dark); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,87,255,0.35); }
        .cl-btn-outline { padding: .875rem 2rem; background: #fff; border: 1.5px solid var(--cl-border); color: var(--cl-text); border-radius: 40px; font-size: .88rem; font-weight: 600; cursor: pointer; transition: all .25s; text-decoration: none; display: inline-flex; align-items: center; gap: .4rem; }
        .cl-btn-outline:hover { border-color: var(--cl-primary); color: var(--cl-primary); }
        .cl-hero-stats { display: flex; gap: 2rem; margin-top: 3rem; flex-wrap: wrap; }
        .cl-h-stat .num { font-family: var(--cl-font-display); font-size: 2rem; font-weight: 700; color: var(--cl-text); display: block; }
        .cl-h-stat .label { font-size: .72rem; color: var(--cl-muted); font-weight: 500; }
        .cl-hero-right { position: relative; }
        .cl-hero-card-main { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        .cl-hero-card-main img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
        .cl-hero-floating-1 { position: absolute; top: 2rem; left: -2rem; background: #fff; border-radius: 16px; padding: 1rem 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; align-items: center; gap: .75rem; min-width: 200px; }
        .cl-hero-floating-2 { position: absolute; bottom: 2rem; right: -2rem; background: #fff; border-radius: 16px; padding: 1rem 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; align-items: center; gap: .75rem; min-width: 180px; }
        .cl-float-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
        .cl-float-text .name { font-size: .82rem; font-weight: 600; color: var(--cl-text); }
        .cl-float-text .sub { font-size: .68rem; color: var(--cl-muted); }
        .cl-float-rating { display: flex; align-items: center; gap: .2rem; margin-top: .1rem; }
        .cl-star { color: #fbbf24; font-size: .65rem; }

        /* PARTNERS */
        .cl-partners { padding: 3rem 0; background: #fff; border-top: 1px solid var(--cl-border); border-bottom: 1px solid var(--cl-border); }
        .cl-partners-label { text-align: center; font-size: .7rem; letter-spacing: .2em; color: var(--cl-muted); text-transform: uppercase; margin-bottom: 1.5rem; }
        .cl-partners-logos { display: flex; justify-content: center; align-items: center; gap: 3rem; flex-wrap: wrap; }
        .cl-partner-logo { font-family: var(--cl-font-display); font-size: 1.1rem; font-weight: 700; color: var(--cl-border); letter-spacing: .05em; }

        /* CONTAINER */
        .cl-container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .cl-section-label { font-size: .7rem; letter-spacing: .2em; color: var(--cl-primary); text-transform: uppercase; font-weight: 600; margin-bottom: .75rem; }
        .cl-section-title { font-family: var(--cl-font-display); font-size: clamp(2.5rem,4vw,3.5rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 1rem; line-height: 1.1; }
        .cl-section-sub { font-size: .95rem; color: var(--cl-muted); line-height: 1.7; max-width: 480px; }

        /* ESPECIALIDADES */
        .cl-especialidades { padding: 7rem 0; background: var(--cl-bg); }
        .cl-spec-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 4rem; }
        @media(max-width:1024px) { .cl-spec-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .cl-spec-grid { grid-template-columns: 1fr; } }
        .cl-spec-card { background: #fff; border-radius: 16px; padding: 2rem; border: 1px solid var(--cl-border); transition: all .35s cubic-bezier(.16,1,.3,1); cursor: pointer; }
        .cl-spec-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,87,255,0.08); border-color: rgba(0,87,255,0.2); }
        .cl-spec-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.5rem; }
        .cl-spec-title { font-family: var(--cl-font-display); font-size: 1.2rem; font-weight: 700; margin-bottom: .6rem; }
        .cl-spec-desc { font-size: .83rem; color: var(--cl-muted); line-height: 1.65; }
        .cl-spec-count { margin-top: 1.25rem; font-size: .78rem; font-weight: 600; color: var(--cl-primary); display: flex; align-items: center; gap: .3rem; }

        /* HOW */
        .cl-how { padding: 7rem 0; background: #fff; }
        .cl-steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; margin-top: 4rem; position: relative; }
        .cl-steps-grid::before { content: ''; position: absolute; top: 26px; left: 12.5%; right: 12.5%; height: 1px; background: linear-gradient(90deg,transparent,var(--cl-border),var(--cl-border),transparent); }
        @media(max-width:1024px) { .cl-steps-grid { grid-template-columns: 1fr 1fr; } .cl-steps-grid::before { display: none; } }
        @media(max-width:768px) { .cl-steps-grid { grid-template-columns: 1fr; } }
        .cl-step-item { text-align: center; position: relative; }
        .cl-step-num { width: 52px; height: 52px; border-radius: 50%; background: var(--cl-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; margin: 0 auto 1.5rem; position: relative; z-index: 1; box-shadow: 0 0 0 8px rgba(0,87,255,0.1); }
        .cl-step-title { font-weight: 700; font-size: .95rem; margin-bottom: .5rem; }
        .cl-step-desc { font-size: .8rem; color: var(--cl-muted); line-height: 1.6; }

        /* AGENDA */
        .cl-agenda { padding: 7rem 0; background: linear-gradient(135deg,#0057ff 0%,#003dcc 100%); position: relative; overflow: hidden; }
        .cl-agenda::before { content: ''; position: absolute; top: -30%; right: -10%; width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 60%); }
        .cl-agenda-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media(max-width:1024px) { .cl-agenda-grid { grid-template-columns: 1fr; } }
        .cl-agenda-left h2 { font-family: var(--cl-font-display); font-size: clamp(2.5rem,4vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; }
        .cl-agenda-left p { color: rgba(255,255,255,.7); font-size: .95rem; line-height: 1.7; margin-bottom: 2rem; }
        .cl-agenda-benefits { display: flex; flex-direction: column; gap: 1rem; }
        .cl-agenda-benefit { display: flex; align-items: center; gap: .75rem; color: rgba(255,255,255,.9); font-size: .88rem; }
        .cl-benefit-check { width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; font-size: .65rem; flex-shrink: 0; }
        .cl-agenda-form { background: #fff; border-radius: 20px; padding: 2.5rem; }
        .cl-agenda-form h3 { font-family: var(--cl-font-display); font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; }
        .cl-form-group { margin-bottom: 1.25rem; }
        .cl-form-label { font-size: .72rem; font-weight: 600; color: var(--cl-text); letter-spacing: .05em; text-transform: uppercase; margin-bottom: .5rem; display: block; }
        .cl-form-input, .cl-form-select { width: 100%; padding: .8rem 1rem; background: var(--cl-bg); border: 1.5px solid var(--cl-border); border-radius: 10px; color: var(--cl-text); font-family: var(--cl-font-body); font-size: .88rem; transition: border-color .2s; outline: none; -webkit-appearance: none; }
        .cl-form-input:focus, .cl-form-select:focus { border-color: var(--cl-primary); background: #fff; }
        .cl-btn-submit { width: 100%; padding: 1rem; background: var(--cl-primary); color: #fff; border: none; border-radius: 40px; font-size: .9rem; font-weight: 700; cursor: pointer; transition: all .3s; margin-top: .5rem; }
        .cl-btn-submit:hover { background: var(--cl-primary-dark); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,87,255,0.4); }
        .cl-btn-submit.sent { background: var(--cl-accent); }
        .cl-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media(max-width:768px) { .cl-form-grid { grid-template-columns: 1fr; } }

        /* TEAM */
        .cl-team { padding: 7rem 0; background: var(--cl-bg); }
        .cl-team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; margin-top: 4rem; }
        @media(max-width:1024px) { .cl-team-grid { grid-template-columns: 1fr 1fr; } }
        .cl-team-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid var(--cl-border); transition: transform .35s, box-shadow .35s; }
        .cl-team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .cl-team-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .cl-team-info { padding: 1.25rem; }
        .cl-team-name { font-weight: 700; font-size: .95rem; margin-bottom: .2rem; }
        .cl-team-role { font-size: .75rem; color: var(--cl-primary); font-weight: 600; }
        .cl-team-crm { font-size: .68rem; color: var(--cl-muted); margin-top: .2rem; }

        /* DEPOIMENTOS */
        .cl-testimonials { padding: 7rem 0; background: #fff; }
        .cl-t-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
        @media(max-width:1024px) { .cl-t-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .cl-t-grid { grid-template-columns: 1fr; } }
        .cl-t-card { background: var(--cl-bg); border-radius: 16px; padding: 2rem; border: 1px solid var(--cl-border); transition: transform .3s; }
        .cl-t-card:hover { transform: translateY(-4px); }
        .cl-t-rating { color: #fbbf24; font-size: .85rem; margin-bottom: 1rem; letter-spacing: .05em; }
        .cl-t-text { font-size: .88rem; color: var(--cl-muted); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
        .cl-t-author { display: flex; align-items: center; gap: .75rem; }
        .cl-t-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg,var(--cl-primary),var(--cl-accent)); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: .9rem; }
        .cl-t-name { font-weight: 600; font-size: .85rem; }
        .cl-t-loc { font-size: .7rem; color: var(--cl-muted); }

        /* CONVÊNIOS */
        .cl-convenios { padding: 5rem 0; background: var(--cl-bg); border-top: 1px solid var(--cl-border); }
        .cl-conv-label { text-align: center; font-size: .7rem; letter-spacing: .2em; color: var(--cl-muted); text-transform: uppercase; margin-bottom: 2rem; }
        .cl-conv-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 1rem; }
        @media(max-width:1024px) { .cl-conv-grid { grid-template-columns: repeat(3,1fr); } }
        @media(max-width:768px) { .cl-conv-grid { grid-template-columns: 1fr 1fr; } }
        .cl-conv-item { background: #fff; border: 1px solid var(--cl-border); border-radius: 12px; padding: 1.25rem; text-align: center; font-weight: 600; font-size: .82rem; color: var(--cl-muted); transition: all .2s; }
        .cl-conv-item:hover { border-color: var(--cl-primary); color: var(--cl-primary); }

        /* FOOTER */
        .cl-footer { background: var(--cl-text); color: #fff; padding: 4rem 0 2rem; }
        .cl-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        @media(max-width:1024px) { .cl-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:768px) { .cl-footer-grid { grid-template-columns: 1fr; } }
        .cl-footer-logo { font-family: var(--cl-font-display); font-size: 1.3rem; font-weight: 700; margin-bottom: .75rem; }
        .cl-footer-logo span { color: #6ee7b7; }
        .cl-footer-tagline { font-size: .82rem; color: rgba(255,255,255,.5); line-height: 1.6; }
        .cl-footer-col h4 { font-size: .8rem; font-weight: 600; margin-bottom: 1rem; color: rgba(255,255,255,.5); letter-spacing: .1em; text-transform: uppercase; }
        .cl-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .6rem; padding: 0; }
        .cl-footer-col ul a { font-size: .82rem; color: rgba(255,255,255,.7); text-decoration: none; transition: color .2s; }
        .cl-footer-col ul a:hover { color: #fff; }
        .cl-footer-bottom { border-top: 1px solid rgba(255,255,255,.1); margin-top: 3rem; padding-top: 1.5rem; display: flex; justify-content: space-between; font-size: .72rem; color: rgba(255,255,255,.4); flex-wrap: wrap; gap: 1rem; }

        /* FLOAT */
        .cl-float-order { position: fixed; bottom: 2rem; right: 2rem; z-index: 500; background: var(--cl-primary); color: #fff; border: none; padding: .9rem 1.75rem; border-radius: 50px; font-size: .85rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 25px rgba(0,87,255,0.4); transition: all .3s; text-decoration: none; display: flex; align-items: center; gap: .5rem; }
        .cl-float-order:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,87,255,0.5); }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="cl-wrap">
        {/* MOBILE NAV */}
        <div className={`cl-mobile-nav${mobileNavOpen ? " open" : ""}`}>
          <button className="close-btn" onClick={() => setMobileNavOpen(false)}>✕</button>
          <a href="#especialidades" onClick={() => setMobileNavOpen(false)}>Especialidades</a>
          <a href="#equipe" onClick={() => setMobileNavOpen(false)}>Equipe</a>
          <a href="#agenda" onClick={() => setMobileNavOpen(false)}>Agendar</a>
          <a href="#contato" onClick={() => setMobileNavOpen(false)}>Contato</a>
        </div>

        {/* NAV */}
        <nav className="cl-nav">
          <a href="#" className="cl-nav-logo">
            <div className="cl-logo-icon">⚕️</div>
            Clínica <span>Vita</span>
          </a>
          <ul className="cl-nav-links">
            <li><a href="#especialidades">Especialidades</a></li>
            <li><a href="#equipe">Nossa Equipe</a></li>
            <li><a href="#convenios">Convênios</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <a href="#agenda" className="cl-nav-cta">📅 Agendar consulta</a>
          <button className="cl-nav-mobile-btn" onClick={() => setMobileNavOpen(true)}>☰</button>
        </nav>

        {/* HERO */}
        <section className="cl-hero">
          <div className="cl-hero-grid">
            <div>
              <div className="cl-hero-eyebrow"><div className="dot" />Aberto de 2ª a Sáb • 7h às 20h</div>
              <h1 className="cl-hero-title">Sua saúde em<br />mãos <em>especialistas</em></h1>
              <p className="cl-hero-sub">Clínica multidisciplinar com mais de 15 especialidades. Atendimento humanizado, tecnologia de ponta e o cuidado que você merece.</p>
              <div className="cl-hero-actions">
                <a href="#agenda" className="cl-btn-primary">📅 Agendar consulta</a>
                <a href="#especialidades" className="cl-btn-outline">Ver especialidades →</a>
              </div>
              <div className="cl-hero-stats">
                {[{ num: "+15k", label: "Pacientes atendidos" }, { num: "98%", label: "Satisfação" }, { num: "24", label: "Especialistas" }].map(s => (
                  <div key={s.label} className="cl-h-stat"><span className="num">{s.num}</span><span className="label">{s.label}</span></div>
                ))}
              </div>
            </div>
            <div className="cl-hero-right">
              <div className="cl-hero-card-main">
                <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&q=80" alt="Médica sorrindo" loading="lazy" />
              </div>
              <div className="cl-hero-floating-1">
                <div className="cl-float-icon" style={{ background: "#e8f0ff" }}>🏆</div>
                <div className="cl-float-text">
                  <div className="name">Melhor Clínica SP</div>
                  <div className="cl-float-rating"><span className="cl-star">★★★★★</span></div>
                  <div className="sub">Prêmio Saúde 2024</div>
                </div>
              </div>
              <div className="cl-hero-floating-2">
                <div className="cl-float-icon" style={{ background: "#dcfce7" }}>✅</div>
                <div className="cl-float-text">
                  <div className="name">+40 convênios</div>
                  <div className="sub">aceitos na clínica</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <div className="cl-partners">
          <p className="cl-partners-label">Convênios parceiros</p>
          <div className="cl-partners-logos">
            {["UNIMED", "BRADESCO SAÚDE", "AMIL", "SULAMERICA", "HAPVIDA", "NOTREDAME"].map(p => (
              <div key={p} className="cl-partner-logo">{p}</div>
            ))}
          </div>
        </div>

        {/* ESPECIALIDADES */}
        <section className="cl-especialidades" id="especialidades">
          <div className="cl-container">
            <div className="reveal">
              <div className="cl-section-label">Especialidades</div>
              <h2 className="cl-section-title">Cuidado completo<br />para toda a família</h2>
              <p className="cl-section-sub">Mais de 15 especialidades médicas no mesmo local. Do check-up à reabilitação — estamos aqui para você.</p>
            </div>
            <div className="cl-spec-grid reveal">
              {especialidades.map(e => (
                <div key={e.title} className="cl-spec-card">
                  <div className="cl-spec-icon" style={{ background: e.bg }}>{e.icon}</div>
                  <div className="cl-spec-title">{e.title}</div>
                  <p className="cl-spec-desc">{e.desc}</p>
                  <div className="cl-spec-count">→ {e.count}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="cl-how">
          <div className="cl-container">
            <div className="reveal" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
              <div className="cl-section-label">Como funciona</div>
              <h2 className="cl-section-title">Agendar é simples</h2>
            </div>
            <div className="cl-steps-grid reveal">
              {[
                { n: "1", title: "Escolha a especialidade", desc: "Selecione o tipo de consulta e o médico de sua preferência." },
                { n: "2", title: "Selecione data e horário", desc: "Veja a agenda em tempo real e escolha o melhor horário para você." },
                { n: "3", title: "Confirme seus dados", desc: "Preencha seus dados e convênio. Receba confirmação por WhatsApp." },
                { n: "4", title: "Compareça à consulta", desc: "Chegue 15 minutos antes. Ou consulte online de onde quiser." },
              ].map(s => (
                <div key={s.n} className="cl-step-item">
                  <div className="cl-step-num">{s.n}</div>
                  <div className="cl-step-title">{s.title}</div>
                  <p className="cl-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENDA */}
        <section className="cl-agenda" id="agenda">
          <div className="cl-container">
            <div className="cl-agenda-grid reveal">
              <div className="cl-agenda-left">
                <h2>Agende sua<br />consulta hoje</h2>
                <p>Atendemos todos os principais convênios e particular. Confirmação imediata por WhatsApp.</p>
                <div className="cl-agenda-benefits">
                  {["Confirmação em até 2 horas","Lembretes automáticos por WhatsApp","Cancelamento gratuito até 24h antes","Prontuário eletrônico digital","Resultados de exames online"].map(b => (
                    <div key={b} className="cl-agenda-benefit"><div className="cl-benefit-check">✓</div>{b}</div>
                  ))}
                </div>
              </div>
              <div className="cl-agenda-form">
                <h3>Faça seu agendamento</h3>
                <form onSubmit={handleAgenda}>
                  <div className="cl-form-grid">
                    <div className="cl-form-group">
                      <label className="cl-form-label">Nome</label>
                      <input type="text" className="cl-form-input" placeholder="Seu nome completo" required value={agendaForm.nome} onChange={e => setAgendaForm({ ...agendaForm, nome: e.target.value })} />
                    </div>
                    <div className="cl-form-group">
                      <label className="cl-form-label">WhatsApp</label>
                      <input type="tel" className="cl-form-input" placeholder="(11) 99999-9999" required value={agendaForm.tel} onChange={e => setAgendaForm({ ...agendaForm, tel: e.target.value })} />
                    </div>
                  </div>
                  <div className="cl-form-group">
                    <label className="cl-form-label">Especialidade</label>
                    <select className="cl-form-select" value={agendaForm.especialidade} onChange={e => setAgendaForm({ ...agendaForm, especialidade: e.target.value })}>
                      {["Clínica Médica","Odontologia","Psicologia","Cardiologia","Nutrição","Fisioterapia"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="cl-form-grid">
                    <div className="cl-form-group">
                      <label className="cl-form-label">Data preferida</label>
                      <input type="date" className="cl-form-input" required min={today} value={agendaForm.data} onChange={e => setAgendaForm({ ...agendaForm, data: e.target.value })} />
                    </div>
                    <div className="cl-form-group">
                      <label className="cl-form-label">Período</label>
                      <select className="cl-form-select" value={agendaForm.periodo} onChange={e => setAgendaForm({ ...agendaForm, periodo: e.target.value })}>
                        {["Manhã (7h-12h)","Tarde (13h-17h)","Final do dia (17h-20h)"].map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="cl-form-group">
                    <label className="cl-form-label">Convênio</label>
                    <select className="cl-form-select" value={agendaForm.convenio} onChange={e => setAgendaForm({ ...agendaForm, convenio: e.target.value })}>
                      {["Particular","Unimed","Bradesco Saúde","Amil","SulAmérica","Hapvida","Outro convênio"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <button type="submit" className={`cl-btn-submit${agendaSent ? " sent" : ""}`}>
                    {agendaSent ? "✓ Agendamento enviado! Confirmaremos por WhatsApp." : "Agendar consulta →"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPE */}
        <section className="cl-team" id="equipe">
          <div className="cl-container">
            <div className="reveal" style={{ textAlign: "center" }}>
              <div className="cl-section-label">Nossa Equipe</div>
              <h2 className="cl-section-title">Especialistas<br />dedicados a você</h2>
            </div>
            <div className="cl-team-grid reveal">
              {team.map(m => (
                <div key={m.name} className="cl-team-card">
                  <img className="cl-team-img" src={m.img} alt={m.name} loading="lazy" />
                  <div className="cl-team-info">
                    <div className="cl-team-name">{m.name}</div>
                    <div className="cl-team-role">{m.role}</div>
                    <div className="cl-team-crm">{m.crm}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="cl-testimonials">
          <div className="cl-container">
            <div className="reveal" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 4rem" }}>
              <div className="cl-section-label">Depoimentos</div>
              <h2 className="cl-section-title">Pacientes que<br />confiam na Vita</h2>
            </div>
            <div className="cl-t-grid reveal">
              {testimonials.map(t => (
                <div key={t.name} className="cl-t-card">
                  <div className="cl-t-rating">★★★★★</div>
                  <p className="cl-t-text">"{t.text}"</p>
                  <div className="cl-t-author">
                    <div className="cl-t-avatar">{t.av}</div>
                    <div><div className="cl-t-name">{t.name}</div><div className="cl-t-loc">{t.since}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONVÊNIOS */}
        <section className="cl-convenios" id="convenios">
          <div className="cl-container">
            <p className="cl-conv-label">Convênios aceitos</p>
            <div className="cl-conv-grid">
              {convenios.map(c => <div key={c} className="cl-conv-item">{c}</div>)}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cl-footer" id="contato">
          <div className="cl-container">
            <div className="cl-footer-grid">
              <div>
                <div className="cl-footer-logo">Clínica <span>Vita</span></div>
                <p className="cl-footer-tagline">Cuidando da sua saúde com ciência, tecnologia e humanidade. Porque você merece o melhor atendimento.</p>
              </div>
              <div className="cl-footer-col">
                <h4>Especialidades</h4>
                <ul>{["Clínica Médica","Odontologia","Psicologia","Cardiologia"].map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
              </div>
              <div className="cl-footer-col">
                <h4>Institucional</h4>
                <ul>{["Sobre a Clínica","Nossa Equipe","Convênios","Blog de Saúde"].map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
              </div>
              <div className="cl-footer-col">
                <h4>Contato</h4>
                <ul>
                  <li><a href="#">📍 Av. Paulista, 1000</a></li>
                  <li><a href="#">📞 (11) 3333-4444</a></li>
                  <li><a href="#">📱 (11) 99999-5555</a></li>
                  <li><a href="#">✉️ contato@clinicavita.com</a></li>
                </ul>
              </div>
            </div>
            <div className="cl-footer-bottom">
              <span>© 2025 Clínica Vita. Todos os direitos reservados.</span>
              <span>CNPJ: 00.000.000/0001-00 • CFM/CRM registrado</span>
            </div>
          </div>
        </footer>

        <a href="#agenda" className="cl-float-order">📅 Agendar consulta</a>
      </div>
    </>
  );
}
