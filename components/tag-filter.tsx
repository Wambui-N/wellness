import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const tags = [
  "All",
  "Mental Health",
  "Fitness",
  "Nutrition",
  "Self-Care",
  "Mindfulness",
  "Sleep Health",
  "Holistic Health",
  "Stress Relief",
  "Healthy Eating",
  "Yoga",
  "Meditation",
  "Exercise",
  "Work-Life Balance",
  "Gut Health",
  "Well-being",
]

interface TagFilterProps {
  selectedTag: string
  onTagSelect: (tag: string) => void
}

export default function TagFilter({ selectedTag, onTagSelect }: TagFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsScrolling(true)
    const scrollAmount = 300
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    container.scrollTo({ left: targetScroll, behavior: 'smooth' })
    
    setTimeout(() => setIsScrolling(false), 500)
  }

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    )
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScroll()
    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  return (
    <div className="relative mb-8">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-all hover:bg-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-4 px-1"
      >
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className={cn(
              "cursor-pointer whitespace-nowrap px-4 py-2 text-sm transition-all duration-200",
              "hover:bg-primary/20 hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              selectedTag === tag 
                ? "bg-primary text-white shadow-md" 
                : "bg-white/80 text-foreground hover:border-primary/50",
              isScrolling && "pointer-events-none"
            )}
            onClick={() => onTagSelect(tag)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onTagSelect(tag)
              }
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-all hover:bg-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
} 