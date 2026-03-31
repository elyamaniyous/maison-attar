"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <section className="pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
            Maison Attar — Contact
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight">
            Nous écrire
          </h1>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20">

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-12">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-3xl text-ink mb-3">Message envoyé</h2>
                  <p className="font-body text-ink-muted text-base leading-relaxed max-w-md">
                    Merci pour votre message. Nous revenons vers vous dans les 24 heures ouvrées — généralement beaucoup plus vite.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                  className="font-body text-[12px] tracking-[0.1em] uppercase text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="block w-4 h-px bg-current" />
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Nom complet" required>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Sophie Martin"
                      className="w-full bg-transparent border-b border-border py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink transition-colors duration-200"
                    />
                  </FormField>
                  <FormField label="Adresse email" required>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="sophie@email.com"
                      className="w-full bg-transparent border-b border-border py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink transition-colors duration-200"
                    />
                  </FormField>
                </div>

                <FormField label="Sujet" required>
                  <div className="relative">
                    <select
                      name="subject"
                      id="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-border py-3 font-body text-[14px] text-ink focus:outline-none focus:border-ink transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Choisissez un sujet…</option>
                      <option value="commande">Commande en cours</option>
                      <option value="produit">Question sur un produit</option>
                      <option value="sur-mesure">Projet sur mesure</option>
                      <option value="livraison">Livraison</option>
                      <option value="retour">Retour / SAV</option>
                      <option value="presse">Presse & Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </FormField>

                <FormField label="Votre message" required>
                  <textarea
                    name="message"
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Décrivez votre demande en détail…"
                    className="w-full bg-transparent border-b border-border py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink transition-colors duration-200 resize-none"
                  />
                </FormField>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !formState.name || !formState.email || !formState.subject || !formState.message}
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-ink text-cream font-body text-[12px] tracking-[0.15em] uppercase hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    {loading ? (
                      <>
                        <span className="block w-4 h-4 border border-cream/30 border-t-cream rounded-full animate-spin" aria-hidden="true" />
                        Envoi…
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="font-body text-[11px] text-ink-muted mt-3">
                    Nous répondons sous 24h ouvrées. Pas de spam, promis.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Info panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-5">Coordonnées</p>
              <div className="space-y-4">
                <ContactInfoRow
                  icon={
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M2 7l10 7 10-7" />
                  }
                  label="Email"
                  value="contact@maisonattar.com"
                  href="mailto:contact@maisonattar.com"
                />
                <ContactInfoRow
                  icon={
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  }
                  label="Téléphone"
                  value="+212 5XX XX XX XX"
                  href="tel:+2125XXXXXXXX"
                />
                <ContactInfoRow
                  icon={
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4" />
                  }
                  label="Adresse"
                  value="Médina de Fès, Maroc"
                  href={undefined}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-5">Réseaux sociaux</p>
              <div className="space-y-4">
                <ContactInfoRow
                  icon={
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  }
                  label="Instagram"
                  value="@maisonattar"
                  href="https://www.instagram.com/maisonattar"
                  external
                />
                <ContactInfoRow
                  icon={
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.053-4.164-4.053-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.773.741 2.274a.3.3 0 01.069.284c-.076.311-.244.995-.277 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  }
                  label="Pinterest"
                  value="@maisonattar"
                  href="https://www.pinterest.com/maisonattar"
                  external
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-4">Horaires</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="font-body text-[12px] text-ink-light">Lun — Ven</span>
                  <span className="font-body text-[12px] text-ink font-medium">9h – 18h</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/40">
                  <span className="font-body text-[12px] text-ink-light">Samedi</span>
                  <span className="font-body text-[12px] text-ink font-medium">10h – 14h</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-body text-[12px] text-ink-light">Dimanche</span>
                  <span className="font-body text-[12px] text-ink-muted">Fermé</span>
                </div>
              </div>
              <p className="font-body text-[11px] text-ink-muted mt-3">Fuseau horaire : GMT+1 (Maroc)</p>
            </div>

            {/* Map placeholder */}
            <div className="rounded-sm overflow-hidden border border-border bg-warm-gray-light h-40 flex items-center justify-center" aria-label="Carte — Médina de Fès">
              <div className="text-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink-muted mx-auto mb-2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="font-body text-[11px] text-ink-muted">Médina de Fès, Maroc</p>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-2">
        {label}
        {required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

function ContactInfoRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="flex-shrink-0 text-ink-muted mt-0.5"
        aria-hidden="true"
      >
        {icon}
      </svg>
      <div>
        <p className="font-body text-[10px] uppercase tracking-wider text-ink-muted">{label}</p>
        <p className="font-body text-[13px] text-ink-light">{value}</p>
      </div>
    </div>
  );

  if (!href) return <div>{content}</div>;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block hover:opacity-70 transition-opacity duration-200"
    >
      {content}
    </a>
  );
}
