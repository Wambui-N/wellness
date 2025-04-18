'use client'

import Link from 'next/link'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { combineName } from '@/lib/utils'

import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from './ui/button'

export default function WhoToFollow() {
  const users = useQuery(api.users.getRecentUsers)

  if (users === null) {
    return null
  }

  return (
    <Card className='flex-1 glass-card'>
      <CardHeader>
        <CardTitle className='glass-text'>Favorite Authors</CardTitle>
      </CardHeader>

      <CardContent>
        {!users && <Spinner />}

        <ul className='flex flex-col gap-3'>
          {users?.map(user => (
            <li key={user._id} className='flex items-center justify-between'>
              <div className='inline-flex items-center gap-2'>
                <Avatar className='size-5 glass-ring'>
                  <AvatarImage src={user?.imageUrl} alt={combineName(user)} />
                  <AvatarFallback className='bg-white/20 glass-text'>
                    {user?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <h2 className='text-xs font-medium glass-text'>{combineName(user)}</h2>
              </div>

              <Button
                size='sm'
                variant='outline'
                asChild
                className='rounded-full font-light bg-white/10 border-white/20 glass-text hover:bg-white/20'
              >
                <Link href={`/${user.firstName?.toLowerCase() || 'user'}-${user.lastName?.toLowerCase() || 'profile'}`}>
                  Read Posts
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Link href='/authors' className='text-sm font-light glass-text-muted hover:glass-text transition-colors'>
          View all authors
        </Link>
      </CardFooter>
    </Card>
  )
}