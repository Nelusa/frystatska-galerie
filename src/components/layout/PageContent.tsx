"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { usePathname } from "next/navigation"

export function PageContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)
  const main = useRef<HTMLElement>(null)

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const animation = main.current?.animate(
      [{ opacity: 0.88 }, { opacity: 1 }],
      { duration: 180, easing: "ease-out" },
    )
    return () => animation?.cancel()
  }, [pathname])

  return <main
    ref={main}
    className="flex-1">{children}</main>
}
