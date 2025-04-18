'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { combineName } from '@/lib/utils'

export default function RecentPosts() {
  const posts = useQuery(api.posts.getRecentPosts)

  if (posts === null) {
    return null
  }

  return (
    <Card className='flex-1 glass-card'>
      <CardHeader>
        <CardTitle className='glass-text'>Staff picks</CardTitle>
      </CardHeader>

      <CardContent>
        {!posts && <Spinner />}

        <ul className='flex flex-col'>
          {posts?.map(post => (
            <li key={post._id}>
              <Link
                href={`/posts/${post.slug}`}
                className='block px-4 py-2 rounded-lg transition-colors hover:bg-white/10'
              >
                <div className='inline-flex items-end gap-2'>
                  <Avatar className='size-5 glass-ring'>
                    <AvatarImage
                      src={post.author?.imageUrl}
                      alt={combineName(post.author)}
                    />
                    <AvatarFallback className='bg-white/20 glass-text'>
                      {post.author?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className='text-xs leading-3 glass-text-muted'>
                    {combineName(post.author)}
                  </h2>
                </div>
                <h3 className='text-sm font-semibold glass-text'>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light glass-text-muted hover:glass-text transition-colors'>
          See the full list
        </Link>
      </CardFooter>
    </Card>
  )
}