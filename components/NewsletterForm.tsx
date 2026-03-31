"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call — wire to real endpoint later
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <p className="text-center font-body text-sm tracking-widest uppercase text-gold animate-fade-in">
          Bienvenue dans l&apos;atelier.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@adresse.com"
            required
            disabled={status === "loading"}
            className="
              flex-1 bg-transparent border border-cream/20 text-cream placeholder:text-cream/30
              font-body text-sm px-5 py-3.5 outline-none
              focus:border-gold/60 transition-colors duration-300
              disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="
              px-8 py-3.5 bg-gold text-ink font-body text-xs tracking-[0.2em] uppercase
              hover:bg-gold-light transition-colors duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              whitespace-nowrap
            "
          >
            {status === "loading" ? "..." : "S'inscrire"}
          </button>
        </div>
      )}
      {status === "error" && (
        <p className="mt-2 text-center text-xs text-error/80">
          Une erreur s&apos;est produite. Veuillez réessayer.
        </p>
      )}
    </form>
  );
}
