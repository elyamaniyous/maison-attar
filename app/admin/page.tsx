"use client";

import Link from "next/link";

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Commandes totales", value: "47", sub: "+3 ce mois-ci", trend: "up" },
  { label: "Chiffre d'affaires", value: "58 420 €", sub: "+12% vs mois dernier", trend: "up" },
  { label: "Panier moyen", value: "1 243 €", sub: "vs 1 180 € M-1", trend: "up" },
  { label: "En fabrication", value: "6", sub: "tables en cours", trend: "neutral" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Confirmée", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  in_fabrication: { label: "En fabrication", color: "bg-[#C4A265]/15 text-[#C4A265] border-[#C4A265]/20" },
  zellige_pose: { label: "Zellige posé", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  expedition: { label: "Expédition", color: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
  delivered: { label: "Livrée", color: "bg-[#4A4A4A]/40 text-[#8A8A8A] border-[#4A4A4A]/20" },
};

const RECENT_ORDERS = [
  {
    id: "ATT-2024-047",
    date: "28 mars 2026",
    customer: "Sophie Marceau",
    product: "Table Sur Mesure — Arabesque",
    total: "2 490 €",
    status: "in_fabrication",
    maalem: "Hassan Bensouda",
  },
  {
    id: "ATT-2024-046",
    date: "25 mars 2026",
    customer: "Pierre Leblanc",
    product: "Nuit de Fès — Standard",
    total: "1 490 €",
    status: "zellige_pose",
    maalem: "Driss Aït Taleb",
  },
  {
    id: "ATT-2024-045",
    date: "21 mars 2026",
    customer: "Claire Fontaine",
    product: "Table Grande — Étoile",
    total: "1 890 €",
    status: "expedition",
    maalem: "Mohammed Cherkaoui",
  },
  {
    id: "ATT-2024-044",
    date: "18 mars 2026",
    customer: "Jean-Marc Dupont",
    product: "Console XL — Géométrique",
    total: "1 190 €",
    status: "confirmed",
    maalem: "Non assigné",
  },
  {
    id: "ATT-2024-043",
    date: "12 mars 2026",
    customer: "Isabelle Moreau",
    product: "Table Petite — Damier",
    total: "990 €",
    status: "delivered",
    maalem: "Youssef El Ouali",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Nouvelle commande",
    desc: "Saisir une commande manuelle",
    href: "/admin/commandes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Configurateur",
    desc: "Gérer les options et prix",
    href: "/admin/configurateur",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Ajouter un produit",
    desc: "Créer une nouvelle référence",
    href: "/admin/produits",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Maalems",
    desc: "Gérer les artisans",
    href: "/admin/maalems",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

// ─── Trend arrow ──────────────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C8A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    );
  }
  if (trend === "down") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B85C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  }
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl font-display tracking-wide">Vue d'ensemble</h2>
        <p className="text-[#4A4A4A] text-sm mt-0.5">Tableau de bord — Mars 2026</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5"
          >
            <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">{stat.label}</p>
            <p className="text-white text-2xl font-display tracking-wide">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon trend={stat.trend} />
              <span className={`text-xs ${stat.trend === "up" ? "text-[#5C8A5E]" : stat.trend === "down" ? "text-[#B85C5C]" : "text-[#4A4A4A]"}`}>
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626]">
            <h3 className="text-white text-sm font-medium">Commandes récentes</h3>
            <Link
              href="/admin/commandes"
              className="text-[#C4A265] text-xs hover:text-[#D4B87A] transition-colors"
            >
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-[#1F1F1F]">
            {RECENT_ORDERS.map((order) => {
              const status = STATUS_MAP[order.status];
              return (
                <div
                  key={order.id}
                  className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-sm font-medium">{order.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-[#4A4A4A] text-xs truncate">{order.customer} — {order.product}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white text-sm font-mono">{order.total}</p>
                    <p className="text-[#4A4A4A] text-xs">{order.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[#262626]">
              <h3 className="text-white text-sm font-medium">Actions rapides</h3>
            </div>
            <div className="p-3 space-y-1">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-3 rounded hover:bg-white/5 transition-colors group"
                >
                  <span className="text-[#4A4A4A] group-hover:text-[#C4A265] transition-colors shrink-0">
                    {action.icon}
                  </span>
                  <div>
                    <p className="text-white text-sm">{action.label}</p>
                    <p className="text-[#4A4A4A] text-xs">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Fabrication progress */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5">
            <h3 className="text-white text-sm font-medium mb-4">Répartition statuts</h3>
            <div className="space-y-3">
              {[
                { label: "En fabrication", count: 6, total: 47, color: "#C4A265" },
                { label: "Zellige posé", count: 3, total: 47, color: "#5C8A5E" },
                { label: "En expédition", count: 2, total: 47, color: "#8B5CF6" },
                { label: "Livrées", count: 34, total: 47, color: "#4A4A4A" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#8A8A8A]">{item.label}</span>
                    <span className="text-white font-mono">{item.count}</span>
                  </div>
                  <div className="h-1 bg-[#262626] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.count / item.total) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Maalems workload */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[#262626]">
          <h3 className="text-white text-sm font-medium">Charge des maalems</h3>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 divide-x divide-[#262626]">
          {[
            { name: "Hassan Bensouda", pieces: 2, revenue: "4 280 €", status: "Actif" },
            { name: "Youssef El Ouali", pieces: 1, revenue: "1 490 €", status: "Actif" },
            { name: "Driss Aït Taleb", pieces: 2, revenue: "2 980 €", status: "Actif" },
            { name: "Mohammed Cherkaoui", pieces: 1, revenue: "1 890 €", status: "Expédition" },
          ].map((m) => (
            <div key={m.name} className="p-5">
              <div className="w-8 h-8 rounded-full bg-[#C4A265]/10 flex items-center justify-center text-[#C4A265] text-xs font-medium mb-3">
                {m.name.charAt(0)}
              </div>
              <p className="text-white text-sm font-medium">{m.name.split(" ")[0]}</p>
              <p className="text-[#4A4A4A] text-xs">{m.name.split(" ").slice(1).join(" ")}</p>
              <div className="mt-3 space-y-1">
                <p className="text-[#8A8A8A] text-xs">{m.pieces} pièce{m.pieces > 1 ? "s" : ""} en cours</p>
                <p className="text-white text-sm font-mono">{m.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
