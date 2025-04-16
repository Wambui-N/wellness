import type { LucideIcon } from 'lucide-react'

interface DetailCardProps {
  title: string
  text: string
  icon?: LucideIcon
  color?: string
  bgColor?: string
  iconColor?: string
}

export default function DetailCard({
  title,
  text,
  icon: Icon,
  color = 'border-[#020C12]/10',
  bgColor = 'bg-white',
  iconColor = 'text-[#81c4ee]'
}: DetailCardProps) {
  return (
    <div
      className={`h-full rounded-xl ${bgColor} border ${color} p-6 transition-all duration-300 hover:border-[#020C12]/20 hover:border-opacity-100 hover:shadow-md`}
    >
      <div className='flex h-full flex-col'>
        {Icon && (
          <div
            className={`h-12 w-12 rounded-full ${iconColor} mb-4 flex items-center justify-center bg-white shadow-sm`}
          >
            <Icon className='h-6 w-6' />
          </div>
        )}
        <h3 className='mb-3 text-xl font-semibold text-[#020C12]'>{title}</h3>
        <p className='leading-relaxed text-[#020C12]/70'>{text}</p>
      </div>
    </div>
  )
}
