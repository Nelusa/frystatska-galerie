"use client"

import type { MouseEvent } from "react"

import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useFavorites, FavoriteProduct } from "@/lib/useFavorites"
import { cn } from "@/lib/utils"


interface FavoriteButtonProps {
  product: FavoriteProduct
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showText?: boolean
  onToggle?: (isFavorite: boolean) => void
}

export function FavoriteButton({
  product,
  variant = "secondary",
  size = "icon",
  className,
  showText = false,
  onToggle
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoaded) return

    toggleFavorite(product)
    onToggle?.(!isFavorite(product._id))

  }

  const favorite = isFavorite(product._id)

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        className
      )}
      onClick={handleClick}
      disabled={!isLoaded}
      aria-pressed={favorite}
      aria-label={favorite ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
    >
      <Heart
        aria-hidden="true"
        className={cn(
          "transition-[fill] duration-150",
          favorite && "fill-current"
        )}
      />
      {showText && (
        <span className="ml-2">
          {favorite ? "Odebrat" : "Oblíbené"}
        </span>
      )}
    </Button>
  )
}
