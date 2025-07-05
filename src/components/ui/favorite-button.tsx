"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites, FavoriteProduct } from "@/lib/useFavorites"
import { cn } from "@/lib/utils"
import { useState, MouseEvent } from "react"

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
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoaded) return

    setIsAnimating(true)
    toggleFavorite(product)
    onToggle?.(!isFavorite(product._id))

    setTimeout(() => setIsAnimating(false), 300)
  }

  const favorite = isFavorite(product._id)

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-300",
        favorite && "text-red-500",
        isAnimating && "scale-110",
        className
      )}
      onClick={handleClick}
      disabled={!isLoaded}
      aria-label={favorite ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
    >
      <Heart
        className={cn(
          "transition-all duration-300",
          favorite && "fill-current",
          isAnimating && "scale-125"
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
