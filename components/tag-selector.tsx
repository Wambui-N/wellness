"use client"
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface TagSelectorProps {
  tags: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}

export default function TagSelector({ tags, value, onChange, error }: TagSelectorProps) {
  const handleToggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter(t => t !== tag))
    } else {
      onChange([...value, tag])
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={value.includes(tag) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/30"
            onClick={() => handleToggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

