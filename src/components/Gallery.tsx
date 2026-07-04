'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const images = [
  {
    src: '/images/ukazky/struktura-obsah-diplomove-prace.jpg',
    alt: 'Struktura a obsah diplomové práce',
    title: 'Struktura a obsah diplomové práce',
  },
  {
    src: '/images/ukazky/korektura-textu-diplomove-prace.jpg',
    alt: 'Korektura textu v diplomové práci',
    title: 'Korektura textu v diplomové práci',
  },
  {
    src: '/images/ukazky/grafy-tabulky-diplomova-prace.jpg',
    alt: 'Grafy a tabulky v diplomové práci',
    title: 'Grafy a tabulky v diplomové práci',
  },
  {
    src: '/images/ukazky/seznamy-diplomova-prace.jpg',
    alt: 'Seznamy ilustrací v diplomové práci',
    title: 'Seznamy v diplomové práci',
  },
  {
    src: '/images/ukazky/tabulatory-diplomova-prace.jpg',
    alt: 'Tabulátory a zarovnání v diplomové práci',
    title: 'Tabulátory v diplomové práci',
  },
  {
    src: '/images/ukazky/citace-zdroje-diplomova-prace.jpg',
    alt: 'Správné citování v diplomové práci',
    title: 'Tvorba citací a zdrojů',
  },
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [])
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox, prev, next])

  return (
    <>
      <section
        id="ukazky"
        className="py-20"
        style={{
          backgroundColor: '#0d1f2d',
          backgroundImage: 'url(/images/pozadi-bubliny.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundAttachment: 'scroll',
          backgroundPosition: '50% 50%',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="section-title text-white mb-4">Jak může vypadat vaše diplomová práce?</h2>
          <p className="section-subtitle mb-12" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Prohlédněte si ukázky diplomových prací, které prošly kompletní jazykovou
            a stylistickou korekturou včetně kontroly formální stránky textu.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand"
                style={{ aspectRatio: '3/4' }}
                aria-label={`Zobrazit: ${img.title}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100" style={{ backgroundColor: 'rgba(13,31,45,0.5)' }}>
                  <span className="text-white text-4xl font-light leading-none">+</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl leading-none hover:text-white/70 focus:outline-none"
            onClick={closeLightbox}
            aria-label="Zavřít"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-white/70 focus:outline-none px-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Předchozí"
          >
            ‹
          </button>
          <div
            className="relative max-w-3xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={800}
              height={1100}
              className="object-contain max-h-[85vh] w-auto mx-auto rounded"
            />
            <p className="text-white/60 text-sm text-center mt-3">
              {images[lightboxIndex].title} ({lightboxIndex + 1}/{images.length})
            </p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-white/70 focus:outline-none px-2"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Další"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
