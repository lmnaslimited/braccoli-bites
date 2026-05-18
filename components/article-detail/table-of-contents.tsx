'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse headings from content (assuming markdown-like structure)
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    
    const extractedHeadings: Heading[] = matches.map((match, index) => {
      const marker = match[1] ?? ''
      const title = match[2] ?? ''

      return {
        id: `heading-${index}`,
        title,
        level: marker.length,
      }
    })

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      // Find the active heading based on scroll position
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let activeHeading = ''

      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          activeHeading = element.id
        }
      })

      setActiveId(activeHeading)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (headings.length === 0) return null

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
        On this page
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'block text-sm transition-colors hover:text-accent',
              heading.level > 2 && 'ml-4',
              heading.level > 3 && 'ml-8',
              activeId === heading.id
                ? 'text-accent font-semibold'
                : 'text-muted-foreground'
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
