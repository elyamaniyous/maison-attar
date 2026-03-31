"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

// ─── Zellige Motif Placeholder ────────────────────────────────────────────────
function ZelligePlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
      <div className="w-10 h-10 opacity-15">
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
      <span className="font-display text-sm italic text-ink-muted text-center px-2 leading-tight">
        {name}
      </span>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyWishlist() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 animate-fade-up text-center">
      {/* Decorative heart + zellige */}
      <div className="w-20 h-20 mb-8 relative">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <polygon
            points="40,8 72,24 72,56 40,72 8,56 8,24"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeOpacity="0.15"
          />
          <polygon
            points="40,20 60,30 60,50 40,60 20,50 20,30"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
            strokeOpacity="0.12"
          />
          <path
            d="M40 50S24 40 24 29c0-5.5 4.4-9 8-9 2.2 0 4.2 1.2 5 3 .8-1.8 2.8-3 5-3 3.6 0 8 3.5 8 9 0 11-16 21-16 21z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <h2 className="font-display text-3xl text-ink mb-3 tracking-wide">
        Vous n&apos;avez pas encore de favoris
      </h2>
      <p className="text-ink-muted font-body text-sm text-center max-w-xs mb-10 leading-relaxed">
        Explorez notre collection et sauvegardez les pieces qui vous touchent.
        Votre liste est sauvegardee localement, sans compte necessaire.
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

// ─── Wishlist Item Card ───────────────────────────────────────────────────────
function WishlistCard({
  item,
  onRemove,
  onAddToCart,
  justAdded,
}: {
  item: { id: string; name: string; slug: string; price: number; image: string };
  onRemove: () => void;
  onAddToCart: () => void;
  justAdded: boolean;
}) {
  return (
    <article className="group animate-fade-up relative">
      {/* Image */}
      <div className="img-zoom relative aspect-[4/3] bg-warm-gray mb-4 overflow-hidden">
        <Link href={`/collection/${item.slug}`} className="block w-full h-full">
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
        </Link>

        {/* Remove button */}
        <button
          onClick={onRemove}
          aria-label="Retirer des favoris"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/90 backdrop-blur-sm text-ink hover:bg-cream hover:text-error transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-gold"
          >
            <path
              d="M8 13.5S2 9.5 2 5.5C2 3.5 3.5 2 5.5 2c1.1 0 2.1.6 2.5 1.5C8.4 2.6 9.4 2 10.5 2 12.5 2 14 3.5 14 5.5c0 4-6 8-6 8z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <Link href={`/collection/${item.slug}`}>
          <h3 className="font-display text-xl text-ink group-hover:text-ink-light transition-colors duration-200 leading-tight">
            {item.name}
          </h3>
        </Link>
        <p className="font-body text-base text-ink font-medium">
          {item.price.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
          })}
        </p>

        {/* Add to cart */}
        <button
          onClick={onAddToCart}
          className={`w-full mt-1 py-3 text-xs uppercase tracking-widest font-body transition-all duration-300 ${
            justAdded
              ? "bg-success text-cream cursor-default"
              : "bg-ink text-cream hover:bg-gold"
          }`}
          disabled={justAdded}
        >
          {justAdded ? (
            <span className="flex items-center justify-center gap-2">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ajoute au panier
            </span>
          ) : (
            "Ajouter au panier"
          )}
        </button>

        {/* View product link */}
        <Link
          href={`/collection/${item.slug}`}
          className="block text-center text-xs text-ink-muted font-body hover:text-ink transition-colors duration-200 link-underline py-1"
        >
          Voir la fiche produit
        </Link>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FavorisPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Track which items were just added to cart (for success state)
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());

  const handleAddToCart = (item: typeof items[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      configuration: {},
    });
    setJustAdded((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setJustAdded((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 2500);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-12 animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-body mb-3">
          Maison Attar
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-display text-4xl md:text-5xl text-ink tracking-wide">
            Vos Favoris
          </h1>
          {items.length > 0 && (
            <span className="text-xs uppercase tracking-widest text-ink-muted font-body">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>
        <div className="mt-4 h-px w-16 bg-gold" />
      </div>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {items.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={() => removeFromWishlist(item.id)}
                onAddToCart={() => handleAddToCart(item)}
                justAdded={justAdded.has(item.id)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-up">
            <p className="text-sm text-ink-muted font-body">
              Vos favoris sont sauvegardes sur cet appareil.
            </p>
            <Link
              href="/collection"
              className="inline-block text-xs uppercase tracking-widest text-ink-muted font-body hover:text-ink transition-colors duration-200 link-underline"
            >
              Continuer mes achats
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

