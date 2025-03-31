import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Post } from '@/lib/types'
import { combineName, formatDate } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/ui/use-toast'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { Bookmark, BookmarkCheck, Sparkle, ThumbsUp } from 'lucide-react'

export default function PostItem({ post }: { post: Post }) {
  const { user } = useUser()
  const { toast } = useToast()
  const userData = useQuery(api.users.current)
  const savePost = useMutation(api.posts.savePost)
  const unsavePost = useMutation(api.posts.unsavePost)

  const isSaved = userData && post.savedBy?.includes(userData._id)

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the save button
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
    <li className='mb-4 pb-10 pt-5 sm:border-b'>
      <Link href={`/posts/${post.slug}`} className='block'>
        {/* Author */}
        <div className='inline-flex items-center gap-3'>
          <Avatar className='size-6'>
            <AvatarImage
              src={post.author?.imageUrl}
              alt={combineName(post.author)}
            />
            <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-sm'>{combineName(post.author)}</h2>
          </div>
        </div>

        <div className='mt-4 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center'>
          {/* Post details */}
          <div className='mt-4 w-full sm:mt-0 sm:w-3/4'>
            <div className='space-y-1'>
              <h3 className='font-serif text-xl font-bold'>{post.title}</h3>
              <p className='text-sm text-muted-foreground'>{post.excerpt}</p>
            </div>

            {/* Tags */}
            {post.tagNames && post.tagNames.length > 0 && (
              <div className='mt-3 flex flex-wrap gap-2'>
                {post.tagNames.map(tag => (
                  <Badge key={tag} variant='secondary' className='font-light'>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className='mt-4 flex items-center justify-between text-sm text-muted-foreground'>
              <div className='flex items-center gap-4'>
                <Sparkle className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                <span>{formatDate(post._creationTime)}</span>
                <Separator orientation='vertical' className='h-4' />
                <div className='flex items-center gap-2'>
                  <ThumbsUp className='h-4 w-4' />
                  <span>{post.likes}</span>
                </div>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 hover:text-foreground ${
                    isSaved ? 'text-primary' : ''
                  }`}
                >
                  {isSaved ? (
                    <BookmarkCheck className='h-4 w-4' />
                  ) : (
                    <Bookmark className='h-4 w-4' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className='relative aspect-video w-full sm:w-1/4'>
            {post.coverImageUrl && (
              <Image
                alt=''
                src={post.coverImageUrl}
                className='h-full w-full rounded-md object-cover'
                fill
              />
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}