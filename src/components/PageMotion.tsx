import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMotionProps {
  children: ReactNode
}

/** Lightweight route enter animation without an animation library. */
export function PageMotion({ children }: PageMotionProps) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  )
}
