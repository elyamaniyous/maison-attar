"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

// ─── Zellige motif SVG (matches ProductCard style) ───────────────────────────
function ZelligePlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
      <div className="w-6 h-6 opacity-20">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="32,4 60,20 60,44 32,60 4,44 4,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <polygon
            points="32,16 48,24 48,40 32,48 16,40 16,24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <span className="font-display text-[10px] italic text-ink-muted text-center px-1 leading-tight">
        {name}
      </span>
    </div>
  );
}

// ─── Trust Signal Row ─────────────────────────────────────────────────────────
function TrustSignal({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 text-gold flex-shrink-0">{icon}</div>
      <span className="text-xs text-ink-muted leading-tight">{label}</span>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 animate-fade-up">
      {/* Decorative motif */}
      <div className="w-20 h-20 mb-8 opacity-20">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="40,5 75,22 75,58 40,75 5,58 5,22"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <polygon
            points="40,18 62,30 62,50 40,62 18,50 18,30"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="40" y1="5" x2="40" y2="18" stroke="currentColor" strokeWidth="0.75" />
          <line x1="40" y1="62" x2="40" y2="75" stroke="currentColor" strokeWidth="0.75" />
          <line x1="5" y1="22" x2="18" y2="30" stroke="currentColor" strokeWidth="0.75" />
          <line x1="62" y1="50" x2="75" y2="58" stroke="currentColor" strokeWidth="0.75" />
          <line x1="75" y1="22" x2="62" y2="30" stroke="currentColor" strokeWidth="0.75" />
          <line x1="18" y1="50" x2="5" y2="58" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      <h2 className="font-display text-3xl text-ink mb-3 tracking-wide">
        Votre panier est vide
      </h2>
      <p className="text-ink-muted font-body text-sm text-center max-w-xs mb-10 leading-relaxed">
        Chaque pièce est fabriquée à la main par nos maalems à Fès.
        Prenez le temps de découvrir notre collection.
      </p>
      <Link
        href="/collection"
        className="inline-block bg-ink text-cream text-xs uppercase tracking-widest px-10 py-3.5 font-body hover:bg-gold transition-colors duration-300"
      >
        Decouvrir la collection
      </Link>
    </div>
  );
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────
function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: ReturnType<typeof useCart>["items"][number];
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  return (
    <div className="flex gap-5 py-7 border-b border-border last:border-b-0">
      {/* Image */}
      <div className="relative w-20 h-20 bg-warm-gray flex-shrink-0">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ZelligePlaceholder name={item.name} />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-display text-lg text-ink leading-tight">{item.name}</h3>
            {/* Configuration summary */}
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
              {item.configuration.zellige && (
                <span className="text-xs text-ink-muted font-body">
                  Zellige: {item.configuration.zellige}
                </span>
              )}
              {item.configuration.size && (
                <span className="text-xs text-ink-muted font-body">
                  Taille: {item.configuration.size}
                </span>
              )}
              {item.configuration.base && (
                <span className="text-xs text-ink-muted font-body">
                  Base: {item.configuration.base}
                </span>
              )}
            </div>
          </div>

          {/* Remove */}
          <button
            onClick={onRemove}
            aria-label="Retirer du panier"
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-ink-muted hover:text-ink transition-colors duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-border">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              aria-label="Diminuer la quantite"
              className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-warm-gray-light transition-colors duration-150"
            >
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                <line x1="0" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-sm font-body text-ink border-x border-border">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              aria-label="Augmenter la quantite"
              className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-warm-gray-light transition-colors duration-150"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Price */}
          <p className="font-body text-base font-medium text-ink">
            {(item.price * item.quantity).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────
function OrderSummary({ total }: { total: number }) {
  const installment = Math.ceil(total / 3);

  return (
    <div className="bg-warm-gray-light border border-border p-7 space-y-5 sticky top-28">
      <h2 className="font-display text-xl text-ink tracking-wide">
        Recapitulatif
      </h2>

      <div className="space-y-3 text-sm font-body">
        <div className="flex justify-between text-ink-muted">
          <span>Sous-total</span>
          <span className="text-ink">
            {total.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Livraison</span>
          <span className="text-success font-medium">Offerte</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between font-medium text-base text-ink">
          <span>Total</span>
          <span>
            {total.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      {/* Alma installment note */}
      <div className="border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink-muted font-body leading-relaxed">
        <span className="text-ink font-medium">Paiement en 3x sans frais</span>
        <br />
        <span className="text-gold font-medium">
          {installment.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
          })}
        </span>
        {" "}/ mois avec{" "}
        <span className="italic">Alma</span>
      </div>

      {/* CTA */}
      <Link
        href="/checkout"
        className="block w-full bg-ink text-cream text-center text-xs uppercase tracking-widest py-4 font-body hover:bg-gold transition-colors duration-300"
      >
        Proceder au paiement
      </Link>

      {/* Trust signals */}
      <div className="space-y-3 pt-1">
        <TrustSignal
          icon={
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M8 1.5L2 4v4c0 3.5 2.5 6 6 6.5 3.5-.5 6-3 6-6.5V4L8 1.5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.5 8l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          label="Paiement 100% securise — SSL & 3D Secure"
        />
        <TrustSignal
          icon={
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
              <rect x="2" y="8" width="12" height="6" rx="1" strokeLinecap="round" />
              <path d="M5 8V5.5a3 3 0 016 0V8" strokeLinecap="round" />
            </svg>
          }
          label="Livraison offerte partout en Europe"
        />
        <TrustSignal
          icon={
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
              <circle cx="8" cy="8" r="5.5" />
              <path d="M8 5v3.5l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          label="Fabrication artisanale 6 a 8 semaines a Fes"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PanierPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <section className="max-w-5xl mx-auto px-6">
        <EmptyCart />
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-body mb-3">
          Maison Attar
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-wide">
          Votre Panier
        </h1>
        <div className="mt-4 h-px w-16 bg-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
        {/* Left: Items */}
        <div>
          {/* Column headers — desktop */}
          <div className="hidden md:grid grid-cols-[auto_1fr] gap-5 pb-4 border-b border-border">
            <div className="w-20" />
            <div className="flex justify-between text-xs uppercase tracking-widest text-ink-muted font-body">
              <span>Article</span>
              <span>Prix</span>
            </div>
          </div>

          {/* Items */}
          <div>
            {items.map((item) => (
              <CartItemRow
                key={`${item.id}-${JSON.stringify(item.configuration)}`}
                item={item}
                onRemove={() =>
                  removeFromCart(item.id, item.configuration)
                }
                onUpdateQuantity={(qty) =>
                  updateQuantity(item.id, qty, item.configuration)
                }
              />
            ))}
          </div>

          {/* Continue shopping */}
          <div className="mt-8">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted font-body hover:text-ink transition-colors duration-200 link-underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Continuer mes achats
            </Link>
          </div>
        </div>

        {/* Right: Summary */}
        <div>
          <OrderSummary total={total} />
        </div>
      </div>
    </section>
  );
}
