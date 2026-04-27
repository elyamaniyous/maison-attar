"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // We show placeholder divs since images are not present
  const totalImages = images.length > 0 ? images.length : 4;
  const placeholderImages = Array.from({ length: totalImages }, (_, i) => i);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] zellige-pattern-cream overflow-hidden rounded-sm group">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Zellige pattern placeholder */}
          <div className="w-16 h-16 opacity-20">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <polygon points="32,16 48,24 48,40 32,48 16,40 16,24" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </div>
          <p className="font-display text-lg text-ink-muted italic">{productName}</p>
          <p className="text-xs text-ink-muted/60 uppercase tracking-widest font-body">
            Vue {activeIndex + 1}/{totalImages}
          </p>
        </div>

        {/* Navigation arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream"
              aria-label="Image précédente"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % totalImages)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream"
              aria-label="Image suivante"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Dot indicator */}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {placeholderImages.map((i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-ink w-4" : "bg-ink-muted/40"
                }`}
                aria-label={`Vue ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {totalImages > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {placeholderImages.map((i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-[4/3] zellige-pattern-cream relative overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? "ring-1 ring-ink ring-offset-1"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Vue ${i + 1}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 opacity-20">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              {i === activeIndex && (
                <div className="absolute inset-0 bg-ink/5" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
