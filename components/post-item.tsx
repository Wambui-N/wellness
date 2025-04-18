import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Post } from '@/lib/types'
import { combineName, formatDate } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/ui/use-toast'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Bookmark, BookmarkCheck, Sparkle, ThumbsUp, MessageSquare } from 'lucide-react'

export default function PostItem({ post }: { post: Post }) {
  const { user } = useUser()
  const { toast } = useToast()
  const userData = useQuery(api.users.current)
  const savePost = useMutation(api.posts.savePost)
  const unsavePost = useMutation(api.posts.unsavePost)

  const isSaved = userData && post.savedBy?.includes(userData._id)

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!userData) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to save posts.',
        variant: 'destructive'
      })
      return
    }

    try {
      if (isSaved) {
        await unsavePost({ postId: post._id })
      } else {
        await savePost({ postId: post._id })
      }
    } catch (error) {
      console.error('Failed to save post:', error)
      toast({
        title: 'Error',
        description: 'Failed to save post. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <li className='group relative mb-6 overflow-hidden rounded-xl border bg-white p-4 transition-all hover:shadow-sm'>
      <Link href={`/posts/${post.slug}`} className='block'>
        {/* Author and Metadata */}
        <div className='mb-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-8 ring-2 ring-white'>
              <AvatarImage
                src={post.author?.imageUrl}
                alt={combineName(post.author)}
                className='object-cover'
              />
              <AvatarFallback className='bg-primary/10 text-primary'>
                {post.author?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-sm font-medium'>{combineName(post.author)}</h2>
              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                <Sparkle className='h-3 w-3 fill-yellow-500 text-yellow-500' />
                <span>{formatDate(post._creationTime)}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`h-8 w-8 rounded-full hover:bg-primary/10 ${
              isSaved ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className='h-4 w-4' />
            ) : (
              <Bookmark className='h-4 w-4' />
            )}
          </Button>
        </div>

        {/* Post Content */}
        <div className='flex gap-4'>
          <div className='flex-1 space-y-3'>
            <div className='space-y-1'>
              <h3 className='font-serif text-xl font-bold leading-tight group-hover:text-primary'>
                {post.title}
              </h3>
              <p className='text-sm text-muted-foreground line-clamp-2'>
                {post.excerpt}
              </p>
            </div>

            {/* Tags */}
            {post.tagNames && post.tagNames.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {post.tagNames.map(tag => (
                  <Badge
                    key={tag}
                    variant='secondary'
                    className='bg-primary/10 text-primary hover:bg-primary/20'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <ThumbsUp className='h-4 w-4' />
                <span>{post.likes}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MessageSquare className='h-4 w-4' />
                <span>{post.commentCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImageUrl && (
            <div className='relative aspect-square w-24 overflow-hidden rounded-lg'>
              <Image
                alt=''
                src={post.coverImageUrl}
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                fill
              />
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}