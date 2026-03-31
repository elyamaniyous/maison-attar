"use client";

export default function ShareButton() {
  function handleCopy() {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-gold text-ink font-body text-sm tracking-wider uppercase hover:bg-gold-light transition-colors duration-300"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="w-4 h-4"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M10 2H4a1 1 0 00-1 1v9M6 4h6a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Copier le lien
    </button>
  );
}
