"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Notre Histoire", href: "/notre-histoire" },
  { label: "Les Maalems", href: "/maalems" },
  { label: "Journal", href: "/journal" },
  { label: "Configurateur", href: "/configurateur" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getCartCount, openCart } = useCart();
  const { getWishlistCount } = useWishlist();
  const drawerRef = useRef<HTMLDivElement>(null);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trap focus and close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/95 backdrop-blur-sm border-b border-border shadow-sm"
            : "bg-transparent",
        ].join(" ")}
        style={{ height: "var(--header-height, 80px)" }}
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
          {/* Left — Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 justify-self-start" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-ink text-[10px] lg:text-[11px] tracking-[0.15em] uppercase font-body font-medium hover:text-ink-light transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile — Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
            onClick={() => setDrawerOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={drawerOpen}
          >
            <span
              className="block w-5 h-px bg-ink transition-all duration-300 group-hover:w-6"
            />
            <span
              className="block w-4 h-px bg-ink transition-all duration-300 group-hover:w-6"
            />
            <span
              className="block w-5 h-px bg-ink transition-all duration-300 group-hover:w-6"
            />
          </button>

          {/* Center — Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="font-display text-[16px] md:text-[18px] lg:text-[20px] tracking-[0.25em] md:tracking-[0.3em] font-medium text-ink hover:text-ink-light transition-colors duration-200 uppercase whitespace-nowrap"
              aria-label="Maison Attar — Accueil"
            >
              MAISON ATTAR
            </Link>
          </div>

          {/* Right — Icons */}
          <div className="flex items-center justify-end gap-1 md:gap-2">
            {/* Search */}
            <button
              className="w-10 h-10 flex items-center justify-center text-ink hover:text-gold transition-colors duration-200 rounded-full hover:bg-warm-gray/50"
              aria-label="Rechercher"
            >
              <IconSearch />
            </button>

            {/* Wishlist */}
            <Link
              href="/favoris"
              className="relative w-10 h-10 flex items-center justify-center text-ink hover:text-gold transition-colors duration-200 rounded-full hover:bg-warm-gray/50"
              aria-label={`Liste de souhaits (${wishlistCount} article${wishlistCount !== 1 ? "s" : ""})`}
            >
              <IconHeart />
              {wishlistCount > 0 && (
                <Badge count={wishlistCount} />
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center text-ink hover:text-gold transition-colors duration-200 rounded-full hover:bg-warm-gray/50"
              aria-label={`Panier (${cartCount} article${cartCount !== 1 ? "s" : ""})`}
            >
              <IconBag />
              {cartCount > 0 && (
                <Badge count={cartCount} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-500 md:hidden",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
          onClick={closeDrawer}
        />

        {/* Drawer panel */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className={[
            "absolute top-0 left-0 bottom-0 w-[280px] bg-cream flex flex-col",
            "transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <span className="font-display text-[16px] tracking-[0.25em] font-medium text-ink uppercase">
              Menu
            </span>
            <button
              onClick={closeDrawer}
              className="w-9 h-9 flex items-center justify-center text-ink hover:text-gold transition-colors"
              aria-label="Fermer le menu"
            >
              <IconClose />
            </button>
          </div>

          {/* Drawer Nav */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className="font-display text-[28px] font-light text-ink hover:text-gold transition-colors duration-200 tracking-wide"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="px-8 py-8 border-t border-border">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ink-muted font-body">
              Fabrique à Fès, Maroc
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-gold text-cream text-[9px] font-medium font-body rounded-full flex items-center justify-center px-[3px] leading-none">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
