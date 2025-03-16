import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

const tags = [
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
];

export default function RecommendedTopics() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>Recommended Topics</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {tags.map(tag => (
            <Badge key={tag} variant='secondary' className='font-light'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light text-emerald-600'>
          See more topics
        </Link>
      </CardFooter>
    </Card>
  )
}