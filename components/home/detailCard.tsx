import type { LucideIcon } from 'lucide-react'

interface DetailCardProps {
  title: string
  text: string
  color?: string
}

export default function DetailCard({
  title,
  text,
  color = 'border-gray-100'
}: DetailCardProps) {
  return (
    <div className={`h-full p-8 rounded-xl bg-white border ${color} shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex h-full flex-col">
        <h3 className="font-gloria mb-4 text-xl font-semibold text-black">{title}</h3>
        <p className="font-satoshi text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
