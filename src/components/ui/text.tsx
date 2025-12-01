import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {forwardRef, ElementType, ComponentPropsWithoutRef, ReactNode} from "react"

export type TextVariant =
    | 'inherit'
    | 'hero'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'description'
    | 'label'
    | 'caption'
    | 'notification';

export type TextColor = 'inherit' | 'base' | 'neutral' | 'primary' | 'success' | 'info' | 'warn' | 'error' | 'white';

export interface TextBaseProps {
  children?: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
}

export type PropsAs<Props, T extends ElementType> = Props & Omit<ComponentPropsWithoutRef<T>, keyof Props>;

const textVariants = cva("", {
  variants: {
    variant: {
      inherit: "",
      hero: "text-5xl font-bold",
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
      body1: "text-base font-normal",
      body2: "text-sm font-normal",
      description: "text-lg font-normal",
      label: "text-sm font-medium",
      caption: "text-xs leading-[0.75rem] font-normal",
      notification: "text-sm leading-[0.75rem] font-semibold",
    },
    color: {
      inherit: "text-inherit",
      base: "text-foreground",
      neutral: "text-muted-foreground",
      primary: "text-primary",
      success: "text-success",
      info: "text-info",
      warn: "text-warning",
      error: "text-destructive",
      white: "text-white",
    },
  },
  defaultVariants: {
    variant: "inherit",
    color: "inherit",
  },
})

export interface TextProps<T extends ElementType> extends TextBaseProps {
  as?: T
  className?: string
}

const getDefaultElement = (variant?: TextVariant): ElementType => {
  if (!variant || variant === 'inherit') return 'div'

  const variantToElement: Record<TextVariant, ElementType> = {
    inherit: 'div',
    hero: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    description: 'p',
    body1: 'p',
    body2: 'p',
    label: 'label',
    caption: 'span',
    notification: 'span',
  }

  return variantToElement[variant] || 'div'
}

const Text = forwardRef<HTMLDivElement, PropsAs<TextProps<ElementType>, ElementType>>(
  ({ className, variant, color, as, children, ...props }, ref) => {
    const Component = as || getDefaultElement(variant)
    return (
      <Component
        className={cn(textVariants({ variant, color, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
