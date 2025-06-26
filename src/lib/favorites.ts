import { useState, useEffect } from 'react'

export interface FavoriteProduct {
  _id: string
  title: string
  slug: { current: string }
  image?: any
  price: number
  artist?: string
  _type: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('frystatska-galerie-favorites')
      if (stored) {
        try {
          setFavorites(JSON.parse(stored))
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error)
          setFavorites([])
        }
      }
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('frystatska-galerie-favorites', JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addToFavorites = (product: FavoriteProduct) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav._id === product._id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(fav => fav._id !== productId))
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
