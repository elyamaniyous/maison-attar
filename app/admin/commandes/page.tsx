"use client";

import { useState } from "react";

// ─── Types & mock data ────────────────────────────────────────────────────────

type OrderStatus = "confirmed" | "in_fabrication" | "zellige_pose" | "expedition" | "delivered";

interface MockOrder {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  product: string;
  configuration: {
    taille: string;
    forme: string;
    pieds: string;
    couleur: string;
    zellige: string;
  };
  total: number;
  costPrice: number;
  status: OrderStatus;
  maalem: string;
  estimatedDelivery: string;
  whatsappGroup: string;
  photos: string[];
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; next: OrderStatus | null }> = {
  confirmed: { label: "Confirmée", color: "bg-blue-500/15 text-blue-400 border-blue-500/20", next: "in_fabrication" },
  in_fabrication: { label: "En fabrication", color: "bg-[#C4A265]/15 text-[#C4A265] border-[#C4A265]/20", next: "zellige_pose" },
  zellige_pose: { label: "Zellige posé", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", next: "expedition" },
  expedition: { label: "En expédition", color: "bg-violet-500/15 text-violet-400 border-violet-500/20", next: "delivered" },
  delivered: { label: "Livrée", color: "bg-[#3A3A3A] text-[#8A8A8A] border-[#3A3A3A]", next: null },
};

const STATUS_ORDER: OrderStatus[] = ["confirmed", "in_fabrication", "zellige_pose", "expedition", "delivered"];

const INITIAL_ORDERS: MockOrder[] = [
  {
    id: "ATT-2026-047",
    date: "28 mars 2026",
    customer: "Sophie Marceau",
    email: "sophie.marceau@gmail.com",
    phone: "+33 6 12 34 56 78",
    product: "Table Sur Mesure — Arabesque",
    configuration: { taille: "Sur Mesure (160×100 cm)", forme: "Rectangulaire", pieds: "Acier Laiton", couleur: "Laiton Brossé", zellige: "Arabesque" },
    total: 2490,
    costPrice: 1120,
    status: "in_fabrication",
    maalem: "Hassan Bensouda",
    estimatedDelivery: "15 juin 2026",
    whatsappGroup: "https://chat.whatsapp.com/ATT-047-group",
    photos: [],
  },
  {
    id: "ATT-2026-046",
    date: "25 mars 2026",
    customer: "Pierre Leblanc",
    email: "p.leblanc@outlook.fr",
    phone: "+33 6 98 76 54 32",
    product: "Nuit de Fès — Standard",
    configuration: { taille: "Standard (90×60 cm)", forme: "Ronde", pieds: "Acier Forgé Noir", couleur: "Noir Mat", zellige: "Étoile" },
    total: 1490,
    costPrice: 630,
    status: "zellige_pose",
    maalem: "Driss Aït Taleb",
    estimatedDelivery: "2 mai 2026",
    whatsappGroup: "https://chat.whatsapp.com/ATT-046-group",
    photos: [],
  },
  {
    id: "ATT-2026-045",
    date: "21 mars 2026",
    customer: "Claire Fontaine",
    email: "claire.fontaine@design.fr",
    phone: "+33 6 55 44 33 22",
    product: "Table Grande — Étoile",
    configuration: { taille: "Grande (120×80 cm)", forme: "Ovale", pieds: "Acier Laiton", couleur: "Bronze Antique", zellige: "Étoile" },
    total: 1890,
    costPrice: 840,
    status: "expedition",
    maalem: "Mohammed Cherkaoui",
    estimatedDelivery: "10 avril 2026",
    whatsappGroup: "https://chat.whatsapp.com/ATT-045-group",
    photos: [],
  },
  {
    id: "ATT-2026-044",
    date: "18 mars 2026",
    customer: "Jean-Marc Dupont",
    email: "jm.dupont@archi.com",
    phone: "+33 7 11 22 33 44",
    product: "Console XL — Géométrique",
    configuration: { taille: "XL (140×100 cm)", forme: "Rectangulaire", pieds: "Cube Minéral", couleur: "Blanc Naturel", zellige: "Géométrique" },
    total: 1190,
    costPrice: 520,
    status: "confirmed",
    maalem: "Non assigné",
    estimatedDelivery: "30 juin 2026",
    whatsappGroup: "",
    photos: [],
  },
  {
    id: "ATT-2026-043",
    date: "12 mars 2026",
    customer: "Isabelle Moreau",
    email: "i.moreau@free.fr",
    phone: "+33 6 77 88 99 00",
    product: "Table Petite — Damier",
    configuration: { taille: "Petite (60×40 cm)", forme: "Carrée", pieds: "Cylindre Blanc", couleur: "Blanc Naturel", zellige: "Damier" },
    total: 990,
    costPrice: 420,
    status: "delivered",
    maalem: "Youssef El Ouali",
    estimatedDelivery: "25 mars 2026",
    whatsappGroup: "https://chat.whatsapp.com/ATT-043-group",
    photos: [],
  },
  {
    id: "ATT-2026-042",
    date: "5 mars 2026",
    customer: "Antoine Bernard",
    email: "a.bernard@bernard-partners.fr",
    phone: "+33 6 33 44 55 66",
    product: "Table Standard — Arabesque",
    configuration: { taille: "Standard (90×60 cm)", forme: "Ronde", pieds: "Pieds Compas", couleur: "Laiton Brossé", zellige: "Arabesque" },
    total: 1690,
    costPrice: 740,
    status: "delivered",
    maalem: "Hassan Bensouda",
    estimatedDelivery: "20 mars 2026",
    whatsappGroup: "https://chat.whatsapp.com/ATT-042-group",
    photos: [],
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

// ─── Status progress bar ──────────────────────────────────────────────────────

function StatusProgress({ status }: { status: OrderStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(status);
  return (
    <div className="flex items-center gap-0">
      {STATUS_ORDER.map((s, i) => {
        const cfg = STATUS_CONFIG[s];
        const done = i <= currentIdx;
        return (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  done ? "bg-[#C4A265] border-[#C4A265]" : "bg-[#262626] border-[#3A3A3A]"
                }`}
              >
                {done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`text-[9px] mt-1 whitespace-nowrap ${done ? "text-[#C4A265]" : "text-[#4A4A4A]"}`}>
                {cfg.label}
              </span>
            </div>
            {i < STATUS_ORDER.length - 1 && (
              <div className={`flex-1 h-px mb-4 ${i < currentIdx ? "bg-[#C4A265]" : "bg-[#262626]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Order detail panel ───────────────────────────────────────────────────────

function OrderDetail({
  order,
  onStatusAdvance,
}: {
  order: MockOrder;
  onStatusAdvance: (id: string, next: OrderStatus) => void;
}) {
  const cfg = STATUS_CONFIG[order.status];
  const margin = Math.round(((order.total - order.costPrice) / order.total) * 100);
  const [uploadSimulated, setUploadSimulated] = useState(false);

  return (
    <div className="border-t border-[#262626] bg-[#111] px-6 py-5 space-y-5">
      {/* Progress */}
      <div>
        <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">Progression</p>
        <StatusProgress status={order.status} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Customer info */}
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">Client</p>
          <p className="text-white text-sm font-medium">{order.customer}</p>
          <p className="text-[#8A8A8A] text-xs mt-1">{order.email}</p>
          <p className="text-[#8A8A8A] text-xs">{order.phone}</p>
          <div className="mt-3 pt-3 border-t border-[#262626]">
            <p className="text-[#4A4A4A] text-xs">Livraison estimée</p>
            <p className="text-[#C4A265] text-xs font-medium mt-0.5">{order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">Configuration</p>
          <dl className="space-y-1.5">
            {Object.entries(order.configuration).map(([key, val]) => (
              <div key={key} className="flex items-start gap-2">
                <dt className="text-[#4A4A4A] text-xs capitalize w-16 shrink-0">{key}</dt>
                <dd className="text-white text-xs">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Pricing & maalem */}
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
          <p className="text-[#4A4A4A] text-xs uppercase tracking-widest mb-3">Finances & Maalem</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#4A4A4A] text-xs">Prix de vente</span>
              <span className="text-white text-xs font-mono">{order.total.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A4A] text-xs">Coût de revient</span>
              <span className="text-white text-xs font-mono">{order.costPrice.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between border-t border-[#262626] pt-2">
              <span className="text-[#4A4A4A] text-xs">Marge</span>
              <span className={`text-xs font-mono font-medium ${margin >= 50 ? "text-emerald-400" : "text-[#C4A265]"}`}>
                {margin}% ({(order.total - order.costPrice).toLocaleString("fr-FR")} €)
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#262626]">
            <p className="text-[#4A4A4A] text-xs">Maalem assigné</p>
            <p className="text-white text-sm font-medium mt-0.5">{order.maalem}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {cfg.next && (
          <button
            onClick={() => onStatusAdvance(order.id, cfg.next!)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Passer à : {STATUS_CONFIG[cfg.next].label}
          </button>
        )}

        <button
          onClick={() => {
            setUploadSimulated(true);
            setTimeout(() => setUploadSimulated(false), 2500);
          }}
          className={`flex items-center gap-2 px-4 py-2 border rounded text-sm transition-colors ${
            uploadSimulated
              ? "border-[#5C8A5E] text-[#5C8A5E]"
              : "border-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:border-[#3A3A3A]"
          }`}
        >
          {uploadSimulated ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Photo envoyée
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Uploader photo
            </>
          )}
        </button>

        {order.whatsappGroup && (
          <a
            href={order.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#2A2A2A] text-[#8A8A8A] hover:text-[#5C8A5E] hover:border-[#5C8A5E]/30 rounded text-sm transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Groupe WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommandesAdminPage() {
  const [orders, setOrders] = useState<MockOrder[]>(INITIAL_ORDERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  function handleStatusAdvance(id: string, next: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next } : o))
    );
  }

  const filtered = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== "delivered").length;

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Commandes</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">
            {orders.length} commandes — {activeOrders} en cours — {totalRevenue.toLocaleString("fr-FR")} € de CA
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouvelle commande
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded text-xs transition-colors ${
            filterStatus === "all"
              ? "bg-[#C4A265]/15 text-[#C4A265] border border-[#C4A265]/20"
              : "border border-[#2A2A2A] text-[#4A4A4A] hover:text-white hover:border-[#3A3A3A]"
          }`}
        >
          Toutes ({orders.length})
        </button>
        {(Object.entries(STATUS_CONFIG) as [OrderStatus, typeof STATUS_CONFIG[OrderStatus]][]).map(([key, cfg]) => {
          const count = orders.filter((o) => o.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded text-xs border transition-colors ${
                filterStatus === key ? cfg.color : "border-[#2A2A2A] text-[#4A4A4A] hover:text-white hover:border-[#3A3A3A]"
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#262626]">
              {["N° Commande", "Date", "Client", "Produit", "Total", "Marge", "Statut", "Maalem", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] text-[#4A4A4A] uppercase tracking-widest font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const margin = Math.round(((order.total - order.costPrice) / order.total) * 100);
              const isExpanded = expandedId === order.id;
              return (
                <>
                  <tr
                    key={order.id}
                    className={`border-b border-[#1F1F1F] cursor-pointer transition-colors ${
                      isExpanded ? "bg-[#111]" : "hover:bg-white/[0.02]"
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-white text-sm font-mono">{order.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[#8A8A8A] text-xs">{order.date}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-white text-sm">{order.customer}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[#8A8A8A] text-xs max-w-[180px] block truncate">{order.product}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-white text-sm font-mono">{order.total.toLocaleString("fr-FR")} €</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-mono ${margin >= 50 ? "text-emerald-400" : "text-[#C4A265]"}`}>
                        {margin}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs ${order.maalem === "Non assigné" ? "text-[#B85C5C]" : "text-[#8A8A8A]"}`}>
                        {order.maalem}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A4A4A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-auto transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${order.id}-detail`}>
                      <td colSpan={9} className="p-0">
                        <OrderDetail
                          order={order}
                          onStatusAdvance={handleStatusAdvance}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[#4A4A4A] text-sm">Aucune commande pour ce filtre</p>
          </div>
        )}
      </div>
    </div>
  );
}
