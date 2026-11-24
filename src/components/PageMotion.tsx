import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMotionProps {
  children: ReactNode
}

// tiny fade-in on route change, no animation lib needed
export function PageMotion({ children }: PageMotionProps) {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  )
}
