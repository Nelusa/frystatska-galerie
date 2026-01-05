import { useState, useEffect } from "react"

import type { SanityImage } from "@/lib/sanity"

export interface FavoriteProduct {
  _id: string
  title: string
  slug: { current: string }
  image?: SanityImage
  price: number
  artist?: string
  _type: string
}

const FAVORITES_UPDATED_EVENT = "favorites-updated"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Načtení oblíbených z localStorage
  const loadFavorites = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("frystatska-galerie-favorites")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setFavorites(parsed)
        } catch (error) {
          console.error("Error parsing favorites from localStorage:", error)
          setFavorites([])
        }
      }
      setIsLoaded(true)
    }
  }

  const saveFavorites = (newFavorites: FavoriteProduct[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("frystatska-galerie-favorites", JSON.stringify(newFavorites))
      window.dispatchEvent(new CustomEvent(FAVORITES_UPDATED_EVENT, {
        detail: { favorites: newFavorites }
      }))
    }
  }

  useEffect(() => {
    loadFavorites()

    const handleFavoritesUpdate = (event: CustomEvent) => {
      setFavorites(event.detail.favorites)
    }

    window.addEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate as EventListener)

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate as EventListener)
    }
  }, [])

  const addToFavorites = (product: FavoriteProduct) => {
    const newFavorites = favorites.find(fav => fav._id === product._id)
      ? favorites
      : [...favorites, product]

    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter(fav => fav._id !== productId)
    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  const toggleFavorite = (product: FavoriteProduct) => {
    const isFavorite = favorites.some(fav => fav._id === product._id)
    if (isFavorite) {
      removeFromFavorites(product._id)
    } else {
      addToFavorites(product)
    }
  }

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav._id === productId)
  }

  const clearFavorites = () => {
    setFavorites([])
    saveFavorites([])
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded
  }
}
