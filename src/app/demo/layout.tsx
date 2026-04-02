// ─── Layout Demo ──────────────────────────────────────────────────────────────
// Layout compartilhado por TODAS as rotas /demo/*.
// Injeta o DemoBanner fixo no topo de cada demo.
// Os demos em si (pizzaria, clinica, ecommerce) renderizam como `children`.

import DemoBanner from "@/components/ui/DemoBanner";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Banner fixo "Este é um demo" — altura 44px */}
      <DemoBanner />

      {/* Offset para o conteúdo não ficar embaixo do banner */}
      <div className="pt-11">{children}</div>
    </>
  );
}
