"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  "table-basse":     "Table Basse",
  "table-a-manger":  "Table à Manger",
  "table-d-appoint": "Table d'Appoint",
  "console":         "Console",
};

interface ProductCardProps {
  product: Product;
  animationDelay?: number;
}

export default function ProductCard({ product, animationDelay = 0 }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0] ?? "",
      });
    }
  };

  return (
    <article
      className="animate-fade-up group"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <Link href={`/collection/${product.slug}`} className="block">
        {/* Image */}
        <div className="img-zoom relative aspect-[4/3] bg-warm-gray mb-4">
          {/* Placeholder with zellige motif */}
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
            <span className="font-display text-sm italic text-ink-muted">
              {product.name}
            </span>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistClick}
            aria-label={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/90 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-cream z-10 ${
              inWishlist ? "opacity-100" : ""
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill={inWishlist ? "currentColor" : "none"}
              className={inWishlist ? "text-gold" : "text-ink"}
            >
              <path
                d="M8 13.5S2 9.5 2 5.5C2 3.5 3.5 2 5.5 2c1.1 0 2.1.6 2.5 1.5C8.4 2.6 9.4 2 10.5 2 12.5 2 14 3.5 14 5.5c0 4-6 8-6 8z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream/60 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-ink-muted font-body bg-cream px-3 py-1.5">
                Sur commande
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-body">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </p>
          <h3 className="font-display text-xl text-ink group-hover:text-ink-light transition-colors duration-200 leading-tight">
            {product.name}
          </h3>
          <div className="flex items-baseline justify-between">
            <p className="font-body text-base text-ink font-medium">
              {product.price.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
              })}
            </p>
            <p className="text-xs text-ink-muted font-body">
              {product.fabricationHours}h de travail
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
