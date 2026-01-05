import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export enum IconCircleSize {
  Base = "base",
  Lg = "lg"
}

export interface IconCircleProps {
  icon?: LucideIcon;
  emoji?: string;
  size?: IconCircleSize;
  className?: string;
}

export const IconCircle = ({ icon: Icon, emoji, size = IconCircleSize.Base, className }: IconCircleProps) => {
  const sizeClasses = {
    [IconCircleSize.Base]: "w-10 h-10",
    [IconCircleSize.Lg]: "w-16 h-16"
  };

  const iconSizeClasses = {
    [IconCircleSize.Base]: "w-5 h-5",
    [IconCircleSize.Lg]: "w-8 h-8"
  };

  const emojiSizeClasses = {
    [IconCircleSize.Base]: "text-base",
    [IconCircleSize.Lg]: "text-lg"
  };

  return (
    <div
      className={cn(
      "flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      {Icon ? (
        <Icon className={cn("text-primary", iconSizeClasses[size])} />
      ) : emoji ? (
        <span className={cn("text-primary font-semibold", emojiSizeClasses[size])}>{emoji}</span>
      ) : null}
    </div>
  );
};


