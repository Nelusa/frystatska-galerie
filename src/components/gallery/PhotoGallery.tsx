"use client"

import { useEffect, useRef, useState } from "react"

import { X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryImage {
  src: string
  alt: string
  title?: string
}
interface PhotoGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

export function PhotoGallery({ images, columns = 3 }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const selected = selectedImage === null ? undefined : images[selectedImage]
  const isOpen = Boolean(selected)
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  useEffect(() => {
    if (!isOpen) return
    const element = dialog.current
    element?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      element?.close()
      document.body.style.overflow = overflow
    }
  }, [isOpen]) // Keep focus in the open dialog when switching photos.

  const move = (direction: number) => setSelectedImage(current =>
    current === null ? null : (current + direction + images.length) % images.length)

  return (
    <>
      <div className={cn("grid gap-4", gridCols[columns])}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Zvětšit fotku ${index + 1}: ${image.alt}`}
            className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer group hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedImage(index)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105" />
            {image.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <dialog
          ref={dialog}
          aria-label={`Fotka ${(selectedImage ?? 0) + 1} z ${images.length}`}
          className="fixed inset-0 m-0 max-w-none max-h-none w-screen h-[100dvh] bg-black/90 backdrop:bg-transparent text-white p-4"
          onClose={() => setSelectedImage(null)}
          onCancel={() => setSelectedImage(null)}
          onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
          onKeyDown={event => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              move(event.key === "ArrowLeft" ? -1 : 1)
            }
          }}>
          <div className="relative max-w-7xl h-[90vh] w-full mx-auto top-[5vh] pointer-events-none">
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              className="object-contain"
              priority />
            {selected.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg font-medium">{selected.title}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zavřít fotku"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => dialog.current?.close()}>
            <X className="h-6 w-6" />
          </Button>
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Předchozí fotka"
                className="absolute left-4 top-1/2 text-white hover:bg-white/20"
                onClick={() => move(-1)}>←</Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Další fotka"
                className="absolute right-4 top-1/2 text-white hover:bg-white/20"
                onClick={() => move(1)}>→</Button>
            </>
          )}
        </dialog>
      )}
    </>
  )
}
