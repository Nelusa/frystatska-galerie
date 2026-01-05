import { PhotoGallery } from "@/components/gallery/PhotoGallery"
import { Text } from "@/components/ui/text"

const galleryImages = [
  {
    src: "/gallery/gallery-1.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-2.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-3.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-4.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-5.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-6.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-7.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-8.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-9.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-10.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-11.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-12.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-13.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-14.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-15.jpg",
    alt: "Fryštátská Galerie"
  },
  {
    src: "/gallery/gallery-16.jpg",
    alt: "Fryštátská Galerie"
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Text
              as="h1"
              variant="hero"
              className="mb-4 tracking-tighter">
              Fotky naší galerie
            </Text>
            <Text
              variant="description"
              color="neutral"
              className="max-w-2xl mx-auto">
              Prohlédněte si naši galerii a nechte se inspirovat atmosférou Fryštátské Galerie
            </Text>
          </div>

          <PhotoGallery
            images={galleryImages}
            columns={3} />
        </div>
      </section>
    </div>
  )
}

