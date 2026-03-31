"use client";

import { maalems } from "@/lib/data";

export default function MaalemsAdminPage() {
  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-display tracking-wide">Maalems</h2>
          <p className="text-[#4A4A4A] text-sm mt-0.5">{maalems.length} artisans dans le réseau Maison Attar</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C4A265] hover:bg-[#D4B87A] text-[#0F0F0F] text-sm font-medium rounded transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Ajouter un maalem
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {maalems.map((maalem) => (
          <div
            key={maalem.id}
            className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-5 hover:border-[#3A3A3A] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#C4A265]/10 flex items-center justify-center text-[#C4A265] text-xl font-display shrink-0">
                {maalem.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-base font-medium">{maalem.name}</p>
                <p className="text-[#C4A265] text-xs mt-0.5">{maalem.specialty}</p>
                <p className="text-[#4A4A4A] text-xs mt-2 line-clamp-2">{maalem.bio.substring(0, 120)}…</p>
                <div className="flex items-center gap-4 mt-3">
                  <div>
                    <p className="text-[#4A4A4A] text-[10px] uppercase tracking-widest">Expérience</p>
                    <p className="text-white text-sm font-mono">{maalem.yearsExperience} ans</p>
                  </div>
                  <div className="w-px h-8 bg-[#262626]" />
                  <div>
                    <p className="text-[#4A4A4A] text-[10px] uppercase tracking-widest">Pièces créées</p>
                    <p className="text-white text-sm font-mono">{maalem.piecesCreated.toLocaleString("fr-FR")}</p>
                  </div>
                  <div className="w-px h-8 bg-[#262626]" />
                  <div>
                    <p className="text-[#4A4A4A] text-[10px] uppercase tracking-widest">En cours</p>
                    <p className="text-[#C4A265] text-sm font-mono">
                      {maalem.id === "maalem-01" ? 2 : maalem.id === "maalem-03" ? 2 : 1}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <blockquote className="mt-4 pt-4 border-t border-[#262626]">
              <p className="text-[#4A4A4A] text-xs italic leading-relaxed">
                &ldquo;{maalem.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}
