"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useState } from "react";
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
  index?: number;
}

export default function ProductCard({ product, animationDelay = 0, index = 0 }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [hovered, setHovered] = useState(false);

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

  const staggerDelay = animationDelay / 1000 || index * 0.08;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.7,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <Link href={`/collection/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray mb-5">
          {/* Zooming inner */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Zellige pattern placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
              <motion.div
                className="w-14 h-14"
                animate={{ opacity: hovered ? 0.08 : 0.12, rotate: hovered ? 45 : 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon
                    points="32,4 60,20 60,44 32,60 4,44 4,20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <polygon
                    points="32,16 48,24 48,40 32,48 16,40 16,24"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <polygon
                    points="32,22 42,28 42,38 32,44 22,38 22,28"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    fill="none"
                  />
                  <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </motion.div>
              <span className="font-display text-sm italic text-ink/30">
                {product.name}
              </span>
            </div>
          </motion.div>

          {/* Gold line at bottom — animates from 0 to 100% on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gold z-20"
            initial={{ width: "0%" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Subtle dark overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-ink/5 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Wishlist button — appears on hover, top-right */}
          <AnimatePresence>
            {(hovered || inWishlist) && (
              <motion.button
                key="wishlist"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleWishlistClick}
                aria-label={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/95 backdrop-blur-sm z-30 hover:bg-cream transition-colors duration-200"
              >
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill={inWishlist ? "currentColor" : "none"}
                  className={inWishlist ? "text-gold" : "text-ink"}
                  animate={{ scale: inWishlist ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M8 13.5S2 9.5 2 5.5C2 3.5 3.5 2 5.5 2c1.1 0 2.1.6 2.5 1.5C8.4 2.6 9.4 2 10.5 2 12.5 2 14 3.5 14 5.5c0 4-6 8-6 8z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream/50 flex items-center justify-center z-20">
              <span className="text-xs uppercase tracking-widest text-ink-muted font-body bg-cream/90 px-3 py-1.5 backdrop-blur-sm">
                Sur commande
              </span>
            </div>
          )}
        </div>

        {/* Card info */}
        <div className="space-y-2">
          {/* Category in gold uppercase */}
          <p className="text-[10px] uppercase tracking-[0.15em] text-gold font-body">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </p>

          {/* Product name in Cormorant Garamond */}
          <h3 className="font-display text-[1.25rem] leading-snug text-ink transition-colors duration-300 group-hover:text-ink/70">
            {product.name}
          </h3>

          <div className="flex items-baseline justify-between pt-0.5">
            <p className="font-body text-base text-ink font-medium tracking-tight">
              {product.price.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
              })}
            </p>
            <p className="text-[11px] text-ink-muted font-body">
              {product.fabricationHours}h de travail
            </p>
          </div>
        </div>
      </Link>

      {/* Subtle shadow that deepens on hover — applied via motion on the outer wrapper */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-sm"
        animate={{
          boxShadow: hovered
            ? "0 20px 60px -10px rgba(26,26,26,0.12)"
            : "0 0px 0px 0px rgba(26,26,26,0)",
        }}
        transition={{ duration: 0.4 }}
        style={{ zIndex: -1 }}
      />
    </motion.article>
  );
}
