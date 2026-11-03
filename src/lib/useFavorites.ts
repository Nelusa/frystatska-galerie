"use client"

import { useState, useEffect } from "react"

import { FAVORITES_KEY, parseFavorites } from "./favoritesStorage"

import type { FavoriteProduct } from "./favoritesStorage"

export type { FavoriteProduct } from "./favoritesStorage"

const FAVORITES_UPDATED_EVENT = "favorites-updated"
let memoryFavorites: FavoriteProduct[] = []
let storageUnavailable = false

function readFavorites() {
  if (storageUnavailable) return memoryFavorites
  try {
    memoryFavorites = parseFavorites(window.localStorage.getItem(FAVORITES_KEY))
  } catch {
    storageUnavailable = true
  }
  return memoryFavorites
}

function updateFavorites(update: (current: FavoriteProduct[]) => FavoriteProduct[]) {
  const next = update(readFavorites())
  // Keep all mounted controls in sync even when browser storage is blocked or full.
  memoryFavorites = next
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
    storageUnavailable = false
  } catch {
    storageUnavailable = true
  }
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const refresh = () => setFavorites(readFavorites())
    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_KEY || event.key === null) {
        storageUnavailable = false
        refresh()
      }
    }
    refresh()
    setIsLoaded(true)
    window.addEventListener(FAVORITES_UPDATED_EVENT, refresh)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, refresh)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const addToFavorites = (product: FavoriteProduct) => updateFavorites(current =>
    current.some(item => item._id === product._id) ? current : [...current, product])
  const removeFromFavorites = (id: string) => updateFavorites(current => current.filter(item => item._id !== id))
  const toggleFavorite = (product: FavoriteProduct) => updateFavorites(current =>
    current.some(item => item._id === product._id)
      ? current.filter(item => item._id !== product._id)
      : [...current, product])
  const isFavorite = (id: string) => favorites.some(item => item._id === id)
  const clearFavorites = () => updateFavorites(() => [])

  return { favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite, clearFavorites, isLoaded }
}
