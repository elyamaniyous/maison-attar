"use client";

import { useRef, useState } from "react";
import { cmsApi, ApiError } from "@/lib/admin-api";

export interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: "products" | "maalems" | "articles" | "general";
  label?: string;
  className?: string;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function ImageUploader({
  value,
  onChange,
  category = "general",
  label,
  className = "",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function validate(file: File): string | null {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Format non supporté. Utilisez JPG, PNG ou WebP.";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "Le fichier dépasse 10 Mo.";
    }
    return null;
  }

  async function upload(file: File) {
    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await cmsApi.upload(file, category);
      onChange(result.url);
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
    if (file) upload(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function clear() {
    onChange("");
    setError(null);
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs text-[#8A8A8A] uppercase tracking-widest">
          {label}
        </label>
      )}

      {value ? (
        /* Preview */
        <div className="relative group w-full rounded-lg overflow-hidden border border-[#262626] bg-[#1A1A1A]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Aperçu"
            className="w-full max-h-48 object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C4A265] hover:bg-[#D4B87A] disabled:opacity-60 text-[#0F0F0F] text-xs font-medium rounded transition-colors"
            >
              {uploading ? (
                <>
                  <div className="w-3 h-3 border border-[#0F0F0F]/40 border-t-[#0F0F0F] rounded-full animate-spin" />
                  Upload…
                </>
              ) : (
                "Remplacer"
              )}
            </button>
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B85C5C]/80 hover:bg-[#B85C5C] text-white text-xs font-medium rounded transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 w-full min-h-[120px] rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            dragOver
              ? "border-[#C4A265] bg-[#C4A265]/5"
              : "border-[#262626] bg-[#1A1A1A] hover:border-[#C4A265]/50 hover:bg-[#C4A265]/5"
          } ${uploading ? "pointer-events-none" : ""}`}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#C4A265]/40 border-t-[#C4A265] rounded-full animate-spin" />
              <p className="text-[#8A8A8A] text-xs">Upload en cours…</p>
            </>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={dragOver ? "#C4A265" : "#4A4A4A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-[#8A8A8A] text-xs text-center px-4">
                Glissez une image ici ou{" "}
                <span className="text-[#C4A265]">cliquez pour sélectionner</span>
              </p>
              <p className="text-[#4A4A4A] text-[10px]">JPG, PNG, WebP — max 10 Mo</p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-[#B85C5C] text-xs">{error}</p>
      )}

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
