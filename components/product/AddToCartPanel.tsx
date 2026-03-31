"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductConfigurator from "./ProductConfigurator";

interface AddToCartPanelProps {
  productId: string;
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: string;
  fabricationHours: number;
  zelliges: string[];
  sizes: string[];
  bases: string[];
  estimatedDelivery: string;
  inStock: boolean;
}

export default function AddToCartPanel({
  productId,
  productName,
  productSlug,
  productPrice,
  productImage,
  fabricationHours,
  zelliges,
  sizes,
  bases,
  estimatedDelivery,
  inStock,
}: AddToCartPanelProps) {
  const { addToCart, openCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [config, setConfig] = useState({
    zellige: zelliges[0],
    size: sizes[0],
    base: bases[0],
  });
  const [addedToCart, setAddedToCart] = useState(false);

  const inWishlist = isInWishlist(productId);

  const handleConfigChange = useCallback(
    (newConfig: { zellige: string; size: string; base: string }) => {
      setConfig(newConfig);
    },
    []
  );

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      slug: productSlug,
      price: productPrice,
      image: productImage,
      configuration: config,
    });
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        name: productName,
        slug: productSlug,
        price: productPrice,
        image: productImage,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Fabrication time */}
      <div className="flex items-center gap-2.5 text-ink-muted">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M8 4.5V8L10.5 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
        <span className="text-sm font-body">
          Fabrication&nbsp;: environ{" "}
          <span className="text-ink font-medium">{fabricationHours} heures</span> de travail artisanal
        </span>
      </div>

      {/* Configurator */}
      <ProductConfigurator
        zelliges={zelliges}
        sizes={sizes}
        bases={bases}
        onChange={handleConfigChange}
      />

      {/* Estimated delivery */}
      <div className="flex items-start gap-2.5 py-4 border-y border-border">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
          <path d="M2 5h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1"/>
          <path d="M5 5V3a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1"/>
        </svg>
        <div>
          <p className="text-sm text-ink-muted font-body">
            Livraison estimée
          </p>
          <p className="text-sm text-ink font-medium font-body mt-0.5">
            Semaine du {estimatedDelivery}
          </p>
          <p className="text-xs text-ink-muted font-body mt-1">
            Chaque pièce est fabriquée sur commande à Fès
          </p>
        </div>
      </div>

      {/* Add to cart */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-4 px-6 font-body text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group ${
            !inStock
              ? "bg-warm-gray text-ink-muted cursor-not-allowed"
              : addedToCart
              ? "bg-success text-cream"
              : "bg-ink text-cream hover:bg-gold"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {!inStock ? (
              "Indisponible"
            ) : addedToCart ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Ajouté au panier
              </>
            ) : (
              <>
                Ajouter au panier
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </>
            )}
          </span>
        </button>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="w-full py-3 px-6 border border-border font-body text-sm text-ink-light hover:border-ink hover:text-ink transition-all duration-200 flex items-center justify-center gap-2.5 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={inWishlist ? "currentColor" : "none"}
            className={`transition-all duration-200 ${inWishlist ? "text-gold" : "group-hover:scale-110"}`}
          >
            <path
              d="M8 13.5S2 9.5 2 5.5C2 3.5 3.5 2 5.5 2c1.1 0 2.1.6 2.5 1.5C8.4 2.6 9.4 2 10.5 2 12.5 2 14 3.5 14 5.5c0 4-6 8-6 8z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
          {inWishlist ? "Dans vos favoris" : "Ajouter aux favoris"}
        </button>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        {[
          { icon: "🔒", label: "Paiement sécurisé" },
          { icon: "📦", label: "Livraison soignée" },
          { icon: "↩", label: "Retours 30 jours" },
        ].map(({ icon, label }) => (
          <div key={label} className="text-center">
            <span className="text-base">{icon}</span>
            <p className="text-xs text-ink-muted font-body mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
