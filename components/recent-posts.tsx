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
    <Card className='flex-1 bg-black/80 backdrop-blur-md border-white/20 shadow-2xl'>
      <CardHeader>
        <CardTitle className='text-white'>Staff picks</CardTitle>
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
                  <Avatar className='size-5 ring-1 ring-white/20'>
                    <AvatarImage
                      src={post.author?.imageUrl}
                      alt={combineName(post.author)}
                    />
                    <AvatarFallback className='bg-white/20 text-white'>
                      {post.author?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className='text-xs leading-3 text-white/80'>
                    {combineName(post.author)}
                  </h2>
                </div>
                <h3 className='text-sm font-semibold text-white'>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Link href='/' className='text-sm font-light text-white/80 hover:text-white transition-colors'>
          See the full list
        </Link>
      </CardFooter>
    </Card>
  )
}