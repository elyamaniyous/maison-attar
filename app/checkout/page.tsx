"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

type PaymentMethod = "stripe" | "alma";
type CheckoutStep = "informations" | "paiement" | "confirmation";

// ─── EU Countries ─────────────────────────────────────────────────────────────
const EU_COUNTRIES = [
  { code: "FR", label: "France" },
  { code: "BE", label: "Belgique" },
  { code: "CH", label: "Suisse" },
  { code: "LU", label: "Luxembourg" },
  { code: "DE", label: "Allemagne" },
  { code: "NL", label: "Pays-Bas" },
  { code: "ES", label: "Espagne" },
  { code: "IT", label: "Italie" },
  { code: "PT", label: "Portugal" },
  { code: "AT", label: "Autriche" },
  { code: "DK", label: "Danemark" },
  { code: "SE", label: "Suede" },
  { code: "NO", label: "Norvege" },
  { code: "FI", label: "Finlande" },
  { code: "PL", label: "Pologne" },
  { code: "CZ", label: "Republique tcheque" },
  { code: "GR", label: "Grece" },
  { code: "IE", label: "Irlande" },
  { code: "GB", label: "Royaume-Uni" },
  { code: "MA", label: "Maroc" },
  { code: "AE", label: "Emirats Arabes Unis" },
  { code: "US", label: "Etats-Unis" },
];

// ─── Maalems pool (for confirmation message) ──────────────────────────────────
const MAALEMS = [
  "Mohammed El Fassi",
  "Ibrahim Benali",
  "Youssef Tazi",
  "Hassan Belmekki",
];

function randomMaalem() {
  return MAALEMS[Math.floor(Math.random() * MAALEMS.length)];
}

function generateOrderNumber() {
  return `MA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
}

// ─── Form Field ───────────────────────────────────────────────────────────────
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

function Field({ label, error, id, className = "", ...props }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-widest text-ink-muted font-body"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-transparent border border-border px-4 py-3 text-sm font-body text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-gold transition-colors duration-200 ${
          error ? "border-error" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-error font-body">{error}</p>
      )}
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}

function SelectField({ label, error, id, children, className = "", ...props }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-widest text-ink-muted font-body"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none bg-transparent border border-border px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-gold transition-colors duration-200 cursor-pointer ${
            error ? "border-error" : ""
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-error font-body">{error}</p>}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: CheckoutStep }) {
  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "informations", label: "Informations" },
    { key: "paiement", label: "Paiement" },
  ];

  const stepIndex = currentStep === "confirmation"
    ? 2
    : steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((step, i) => {
        const done = i < stepIndex;
        const active = i === stepIndex;
        return (
          <React.Fragment key={step.key}>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-body transition-all duration-300 ${
                  done
                    ? "bg-gold text-cream"
                    : active
                    ? "bg-ink text-cream"
                    : "bg-border text-ink-muted"
                }`}
              >
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs uppercase tracking-widest font-body hidden sm:block ${
                  active ? "text-ink" : done ? "text-gold" : "text-ink-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-4 transition-colors duration-300 ${
                  done ? "bg-gold" : "bg-border"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Mini Order Summary ───────────────────────────────────────────────────────
function MiniOrderSummary({ total }: { total: number }) {
  const { items } = useCart();

  return (
    <div className="border border-border bg-warm-gray-light p-6 space-y-4 sticky top-28">
      <h3 className="font-display text-lg text-ink">Votre commande</h3>

      <div className="space-y-3 max-h-52 overflow-y-auto no-scrollbar">
        {items.map((item) => (
          <div
            key={`${item.id}-${JSON.stringify(item.configuration)}`}
            className="flex justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body text-ink truncate">{item.name}</p>
              <div className="flex gap-2 flex-wrap">
                {item.configuration.zellige && (
                  <span className="text-xs text-ink-muted">{item.configuration.zellige}</span>
                )}
                {item.configuration.size && (
                  <span className="text-xs text-ink-muted">{item.configuration.size}</span>
                )}
                <span className="text-xs text-ink-muted">x{item.quantity}</span>
              </div>
            </div>
            <p className="text-sm font-body text-ink flex-shrink-0">
              {(item.price * item.quantity).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2 text-sm font-body">
        <div className="flex justify-between text-ink-muted">
          <span>Livraison</span>
          <span className="text-success">Offerte</span>
        </div>
        <div className="flex justify-between font-medium text-base text-ink">
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

      {/* Trust signals — compact */}
      <div className="border-t border-border pt-4 space-y-2">
        {[
          "Paiement securise SSL & 3D Secure",
          "Livraison offerte en Europe",
          "Fabrication artisanale a Fes",
        ].map((text) => (
          <div key={text} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 text-gold flex-shrink-0">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M7 1L2 3.5v3.5c0 3 2.2 5 5 5.5 2.8-.5 5-2.5 5-5.5V3.5L7 1z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 7l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs text-ink-muted">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Informations ─────────────────────────────────────────────────────
function StepInformations({
  info,
  onChange,
  onNext,
}: {
  info: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  const validate = () => {
    const e: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!info.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email))
      e.email = "Adresse email invalide";
    if (!info.firstName.trim()) e.firstName = "Prenom requis";
    if (!info.lastName.trim()) e.lastName = "Nom requis";
    if (!info.address.trim()) e.address = "Adresse requise";
    if (!info.city.trim()) e.city = "Ville requise";
    if (!info.postalCode.trim()) e.postalCode = "Code postal requis";
    if (!info.country) e.country = "Pays requis";
    if (!info.phone.trim()) e.phone = "Telephone requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Contact */}
      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-ink mb-1">Contact</h2>
          <div className="h-px w-10 bg-gold mt-2" />
        </div>
        <Field
          id="email"
          label="Adresse email"
          type="email"
          placeholder="votre@email.com"
          autoComplete="email"
          value={info.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors.email}
        />
      </section>

      {/* Shipping */}
      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-ink mb-1">Livraison</h2>
          <div className="h-px w-10 bg-gold mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            id="firstName"
            label="Prenom"
            type="text"
            autoComplete="given-name"
            value={info.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            error={errors.firstName}
          />
          <Field
            id="lastName"
            label="Nom"
            type="text"
            autoComplete="family-name"
            value={info.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            error={errors.lastName}
          />
        </div>

        <Field
          id="address"
          label="Adresse"
          type="text"
          placeholder="12, rue de Rivoli"
          autoComplete="street-address"
          value={info.address}
          onChange={(e) => onChange("address", e.target.value)}
          error={errors.address}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            id="city"
            label="Ville"
            type="text"
            autoComplete="address-level2"
            value={info.city}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
          />
          <Field
            id="postalCode"
            label="Code postal"
            type="text"
            autoComplete="postal-code"
            value={info.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            error={errors.postalCode}
          />
        </div>

        <SelectField
          id="country"
          label="Pays"
          autoComplete="country"
          value={info.country}
          onChange={(e) => onChange("country", e.target.value)}
          error={errors.country}
        >
          <option value="">Selectionnez votre pays</option>
          {EU_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </SelectField>
      </section>

      {/* Phone */}
      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-ink mb-1">Telephone</h2>
          <div className="h-px w-10 bg-gold mt-2" />
        </div>
        <Field
          id="phone"
          label="Numero de telephone"
          type="tel"
          placeholder="+33 6 12 34 56 78"
          autoComplete="tel"
          value={info.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          error={errors.phone}
        />
      </section>

      <button
        type="submit"
        className="w-full bg-ink text-cream text-xs uppercase tracking-widest py-4 font-body hover:bg-gold transition-colors duration-300 mt-2"
      >
        Continuer vers le paiement
      </button>
    </form>
  );
}

// ─── Step 2: Payment ──────────────────────────────────────────────────────────
function StepPaiement({
  info,
  total,
  paymentMethod,
  onPaymentChange,
  onBack,
  onConfirm,
}: {
  info: ShippingInfo;
  total: number;
  paymentMethod: PaymentMethod;
  onPaymentChange: (m: PaymentMethod) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const installment = Math.ceil(total / 3);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    onConfirm();
  };

  return (
    <form onSubmit={handleConfirm} className="space-y-10">
      {/* Delivery recap */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl text-ink mb-1">Livraison</h2>
          <div className="h-px w-10 bg-gold mt-2" />
        </div>
        <div className="border border-border p-5 space-y-1 text-sm font-body text-ink-muted">
          <p className="text-ink font-medium">
            {info.firstName} {info.lastName}
          </p>
          <p>{info.address}</p>
          <p>
            {info.postalCode} {info.city}
          </p>
          <p>
            {EU_COUNTRIES.find((c) => c.code === info.country)?.label ?? info.country}
          </p>
          <p className="pt-1 text-ink-muted">{info.email}</p>
          <p>{info.phone}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-200 font-body link-underline"
        >
          Modifier
        </button>
      </section>

      {/* Payment method */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl text-ink mb-1">Mode de paiement</h2>
          <div className="h-px w-10 bg-gold mt-2" />
        </div>

        <div className="space-y-3">
          {/* Full payment */}
          <label
            className={`flex items-start gap-4 border p-5 cursor-pointer transition-colors duration-200 ${
              paymentMethod === "stripe"
                ? "border-ink bg-warm-gray-light"
                : "border-border hover:border-ink-muted"
            }`}
          >
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => onPaymentChange("stripe")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === "stripe" ? "border-ink" : "border-border"
                }`}
              >
                {paymentMethod === "stripe" && (
                  <div className="w-2 h-2 rounded-full bg-ink" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium font-body text-ink">
                Payer maintenant
              </p>
              <p className="text-xs text-ink-muted font-body mt-1">
                Carte bancaire — Visa, Mastercard, American Express
              </p>
              {paymentMethod === "stripe" && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="border border-border px-4 py-3 text-sm font-body text-ink-muted bg-warm-gray-light/50">
                    <span className="text-xs uppercase tracking-widest">Numero de carte</span>
                    <p className="mt-1 text-ink opacity-50">•••• •••• •••• ••••</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-border px-4 py-3 text-sm font-body text-ink-muted bg-warm-gray-light/50">
                      <span className="text-xs uppercase tracking-widest">Expiration</span>
                      <p className="mt-1 text-ink opacity-50">MM/AA</p>
                    </div>
                    <div className="border border-border px-4 py-3 text-sm font-body text-ink-muted bg-warm-gray-light/50">
                      <span className="text-xs uppercase tracking-widest">CVC</span>
                      <p className="mt-1 text-ink opacity-50">•••</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    Paiement traite par{" "}
                    <span className="font-medium text-ink">Stripe</span> — vos donnees sont cryptees et securisees
                  </p>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 text-ink-muted mt-0.5">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="27" height="19" rx="2.5" stroke="currentColor" strokeOpacity="0.3" />
                <path d="M5 14h4M17 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="4" y="7" width="20" height="2" rx="0.5" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
          </label>

          {/* Alma 3x */}
          <label
            className={`flex items-start gap-4 border p-5 cursor-pointer transition-colors duration-200 ${
              paymentMethod === "alma"
                ? "border-ink bg-warm-gray-light"
                : "border-border hover:border-ink-muted"
            }`}
          >
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="radio"
                name="paymentMethod"
                value="alma"
                checked={paymentMethod === "alma"}
                onChange={() => onPaymentChange("alma")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === "alma" ? "border-ink" : "border-border"
                }`}
              >
                {paymentMethod === "alma" && (
                  <div className="w-2 h-2 rounded-full bg-ink" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium font-body text-ink">
                  Payer en 3x sans frais
                </p>
                <span className="text-[10px] uppercase tracking-widest bg-gold/15 text-gold-dark px-2 py-0.5 font-body">
                  Populaire
                </span>
              </div>
              <p className="text-xs text-ink-muted font-body mt-1">
                Avec{" "}
                <span className="italic font-medium text-ink">Alma</span> — sans frais supplementaires
              </p>
              {paymentMethod === "alma" && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="border border-border/60 p-3 text-center bg-warm-gray-light/50">
                        <p className="text-[10px] uppercase tracking-widest text-ink-muted font-body mb-1">
                          {n === 1 ? "Aujourd'hui" : `Mois ${n}`}
                        </p>
                        <p className="text-base font-display text-ink">
                          {installment.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    Total:{" "}
                    {total.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    })}{" "}
                    — aucun frais supplementaire. Traite par Alma, solution de paiement francaise securisee.
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>
      </section>

      {/* Atelier note */}
      <div className="border-l-2 border-gold pl-5 py-1">
        <p className="text-sm font-body text-ink-muted italic leading-relaxed">
          &ldquo;Votre piece commence a Fes dans les 48h suivant votre commande.
          Chaque zellige est coupe a la main — comptez 6 a 8 semaines de fabrication.&rdquo;
        </p>
      </div>

      {/* Terms */}
      <div className="space-y-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                termsAccepted
                  ? "bg-ink border-ink"
                  : termsError
                  ? "border-error"
                  : "border-border"
              }`}
            >
              {termsAccepted && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5l2.5 2.5L8 1" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-ink-muted font-body leading-relaxed">
            J&apos;accepte les{" "}
            <Link href="/cgv" className="text-ink hover:text-gold transition-colors underline underline-offset-2">
              conditions generales de vente
            </Link>{" "}
            et la{" "}
            <Link href="/confidentialite" className="text-ink hover:text-gold transition-colors underline underline-offset-2">
              politique de confidentialite
            </Link>{" "}
            de Maison Attar.
          </span>
        </label>
        {termsError && (
          <p className="text-xs text-error font-body pl-7">
            Veuillez accepter les conditions pour continuer
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-ink text-cream text-xs uppercase tracking-widest py-4 font-body hover:bg-gold transition-colors duration-300"
      >
        Confirmer la commande —{" "}
        {total.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
        })}
      </button>

      {/* Secure badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink-muted font-body">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M6 1L1 3.5V7c0 2.8 2 5 5 5.5C9 12 11 9.8 11 7V3.5L6 1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7l1.5 1.5L8 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Paiement 100% securise — cryptage SSL 256 bits
      </div>
    </form>
  );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────
function Confirmation({
  orderNumber,
  maalemName,
}: {
  orderNumber: string;
  maalemName: string;
}) {
  return (
    <div className="text-center py-16 px-6 animate-fade-up max-w-lg mx-auto">
      {/* Animated checkmark */}
      <div className="relative w-20 h-20 mx-auto mb-10">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            strokeDasharray="226"
            strokeDashoffset="226"
            style={{
              animation: "drawCircle 0.8s ease-out 0.2s forwards",
            }}
          />
          <path
            d="M24 40l12 12 20-20"
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="50"
            strokeDashoffset="50"
            style={{
              animation: "drawCheck 0.5s ease-out 0.9s forwards",
            }}
          />
        </svg>
        <style>{`
          @keyframes drawCircle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      {/* Headline */}
      <p className="text-xs uppercase tracking-widest text-gold font-body mb-4">
        Commande confirmee
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-ink mb-3 leading-tight">
        Votre commande est entre
        <br />
        les mains de{" "}
        <span className="italic text-gold-dark">{maalemName}</span>
      </h2>

      <div className="h-px w-16 bg-gold/40 mx-auto my-7" />

      <p className="text-sm text-ink-muted font-body leading-relaxed mb-2">
        Nous vous enverrons des nouvelles de l&apos;atelier dans{" "}
        <span className="text-ink font-medium">72 heures</span>.
      </p>
      <p className="text-sm text-ink-muted font-body leading-relaxed mb-10">
        Votre piece sera fabriquee artisanalement a Fes sur une periode de 6 a 8 semaines.
      </p>

      {/* Order number */}
      <div className="inline-block border border-border px-8 py-4 mb-10">
        <p className="text-[10px] uppercase tracking-widest text-ink-muted font-body mb-1">
          Reference de commande
        </p>
        <p className="font-display text-xl text-ink">{orderNumber}</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/suivi?order=${orderNumber}`}
          className="inline-block bg-ink text-cream text-xs uppercase tracking-widest px-8 py-3.5 font-body hover:bg-gold transition-colors duration-300"
        >
          Suivre ma commande
        </Link>
        <Link
          href="/collection"
          className="inline-block text-xs uppercase tracking-widest text-ink-muted font-body hover:text-ink transition-colors duration-200 link-underline py-3.5"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

// ─── Empty Cart State ─────────────────────────────────────────────────────────
function EmptyCartRedirect() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 animate-fade-up text-center">
      <div className="w-16 h-16 mb-8 opacity-20">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <polygon points="32,16 48,24 48,40 32,48 16,40 16,24" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <h2 className="font-display text-3xl text-ink mb-3">Votre panier est vide</h2>
      <p className="text-ink-muted font-body text-sm mb-8 max-w-xs leading-relaxed">
        Ajoutez des pieces a votre panier avant de proceder au paiement.
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  const [step, setStep] = useState<CheckoutStep>("informations");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [orderNumber] = useState(generateOrderNumber);
  const [maalemName] = useState(randomMaalem);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "FR",
    phone: "",
  });

  const handleFieldChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    clearCart();
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <section className="max-w-4xl mx-auto px-6">
        <EmptyCartRedirect />
      </section>
    );
  }

  if (step === "confirmation") {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <Confirmation orderNumber={orderNumber} maalemName={maalemName} />
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      {/* Page header */}
      <div className="mb-10">
        <Link
          href="/panier"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted font-body hover:text-ink transition-colors duration-200 mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Panier
        </Link>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-body mb-2">
          Maison Attar
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-wide">
          Finaliser la commande
        </h1>
        <div className="mt-4 h-px w-16 bg-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
        {/* Left: form */}
        <div>
          <StepIndicator currentStep={step} />

          {step === "informations" && (
            <StepInformations
              info={shippingInfo}
              onChange={handleFieldChange}
              onNext={() => {
                setStep("paiement");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {step === "paiement" && (
            <StepPaiement
              info={shippingInfo}
              total={total}
              paymentMethod={paymentMethod}
              onPaymentChange={setPaymentMethod}
              onBack={() => setStep("informations")}
              onConfirm={handleConfirm}
            />
          )}
        </div>

        {/* Right: order summary */}
        <div>
          <MiniOrderSummary total={total} />
        </div>
      </div>
    </section>
  );
}
