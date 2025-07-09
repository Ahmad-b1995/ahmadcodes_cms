import { ReactNode } from 'react'

interface ContentLayoutProps {
  title?: string // Make it optional since we're not using it yet
  children: ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="container relative">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
} 