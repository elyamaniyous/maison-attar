"use client";

import { useRef, useState } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";

export interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  category?: "products" | "maalems" | "articles" | "general";
  max?: number;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export default function MultiImageUploader({
  value,
  onChange,
  category = "general",
  max = 6,
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(file: File): string | null {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Format non supporté. Utilisez JPG, PNG ou WebP.";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "Le fichier dépasse 10 Mo.";
    }
    return null;
  }

  async function uploadAndAppend(file: File) {
    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (value.length >= max) {
      setError(`Maximum ${max} images atteint.`);
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await cmsApi.upload(file, category);
      onChange([...value, result.url]);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Erreur upload : ${err.message}`);
      } else {
        setError("Erreur inattendue lors de l'upload.");
      }
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadAndAppend(file);
    e.target.value = "";
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...value];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  }

  function moveDown(index: number) {
    if (index === value.length - 1) return;
    const next = [...value];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  }

  const atMax = value.length >= max;

  return (
    <div className="space-y-3">
      {/* Thumbnails grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative group rounded-lg overflow-hidden border border-[#262626] bg-[#1A1A1A] aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Monter"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === value.length - 1}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Descendre"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1 rounded bg-[#B85C5C]/80 hover:bg-[#B85C5C] text-white transition-colors"
                  title="Supprimer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Position badge */}
              <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center font-medium">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add image button */}
      <button
        type="button"
        onClick={() => !atMax && !uploading && inputRef.current?.click()}
        disabled={atMax || uploading}
        className={`flex items-center gap-2 px-3 py-2 border rounded text-sm transition-colors ${
          atMax
            ? "border-[#262626] text-[#4A4A4A] cursor-not-allowed"
            : "border-[#262626] hover:border-[#C4A265] text-[#8A8A8A] hover:text-[#C4A265] cursor-pointer"
        }`}
      >
        {uploading ? (
          <>
            <div className="w-3.5 h-3.5 border border-[#C4A265]/40 border-t-[#C4A265] rounded-full animate-spin" />
            Upload en cours…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Ajouter une image
            {atMax && ` (max ${max} atteint)`}
          </>
        )}
      </button>

      {error && (
        <p className="text-[#B85C5C] text-xs">{error}</p>
      )}

      <p className="text-[#4A4A4A] text-xs">
        {value.length}/{max} image{value.length !== 1 ? "s" : ""} — JPG, PNG, WebP, max 10 Mo
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
