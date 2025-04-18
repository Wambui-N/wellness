'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { toast } from '@/components/ui/use-toast'

import { combineName, formatDate } from '@/lib/utils'

import Editor from '@/components/editor/editor'
import { Spinner } from '@/components/ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import CommentsSection from '@/components/comments/comments-section'

import {
  Bookmark,
  BookmarkCheck,
  Ellipsis,
  MessageSquare,
  Share,
  ThumbsUp
} from 'lucide-react'
import { notFound } from 'next/navigation'

export default function Post({ slug }: { slug: string }) {
  const { user } = useUser()
  const post = useQuery(api.posts.getPostBySlug, { slug })
  const userData = useQuery(api.users.current)
  const commentCount = post?._id 
    ? useQuery(api.comments.getCommentsCount, { postId: post._id })
    : undefined
  
  const likePost = useMutation(api.posts.likePost)
  const unlikePost = useMutation(api.posts.unlikePost)
  const savePost = useMutation(api.posts.savePost)
  const unsavePost = useMutation(api.posts.unsavePost)

  if (post === null) {
    notFound()
  }

  if (!post) {
    return (
      <section className='pb-24 pt-32 sm:pt-40'>
        <div className='container flex max-w-3xl items-center justify-center'>
          <Spinner size='lg' />
        </div>
      </section>
    )
  }

  const isLiked = userData && post.likedBy?.includes(userData._id)
  const isSaved = userData && post.savedBy?.includes(userData._id)

  const handleLike = async () => {
    if (!userData) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to like posts.',
        variant: 'destructive'
      })
      return
    }

    try {
      if (isLiked) {
        await unlikePost({ postId: post._id })
      } else {
        await likePost({ postId: post._id })
      }
    } catch (error) {
      console.error('Failed to like post:', error)
      toast({
        title: 'Error',
        description: 'Failed to like post. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const handleSave = async () => {
    if (!userData) return
    if (isSaved) {
      await unsavePost({ postId: post._id })
    } else {
      await savePost({ postId: post._id })
    }
  }

  return (
    <section className='pb-24 pt-32 sm:pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='font-serif text-3xl font-bold'>{post.title}</h1>
        <p className='mt-3 text-muted-foreground'>{post.excerpt}</p>

        {/* Author */}
        <div className='mt-6 inline-flex items-center gap-3'>
          <Avatar>
            <AvatarImage
              src={post.author?.imageUrl}
              alt={combineName(post.author)}
            />
            <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className=' '>{combineName(post.author)}</h2>
            <p className='text-sm font-light text-muted-foreground'>
              {formatDate(post._creationTime)}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 font-light ${
                isLiked ? 'text-primary' : 'text-muted-foreground'
              } hover:text-foreground`}
              onClick={handleLike}
            >
              <ThumbsUp className='size-5' strokeWidth={1.5} />
              <span>{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className='flex items-center gap-2 font-light text-muted-foreground hover:text-foreground'
            >
              <MessageSquare className='size-5' strokeWidth={1.5} />
              <span>{commentCount ?? 0}</span>
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 font-light ${
                isSaved ? 'text-primary' : 'text-muted-foreground'
              } hover:text-foreground`}
              onClick={handleSave}
            >
              {isSaved ? (
                <BookmarkCheck className='size-5' strokeWidth={1.5} />
              ) : (
                <Bookmark className='size-5' strokeWidth={1.5} />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className='flex items-center gap-2 font-light text-muted-foreground hover:text-foreground'
            >
              <Share className='size-5' strokeWidth={1.5} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className='flex items-center gap-2 font-light text-muted-foreground hover:text-foreground'
            >
              <Ellipsis className='size-5' strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImageUrl && (
          <div className='mt-16'>
            <img src={post.coverImageUrl} alt={post.title} />
          </div>
        )}

        {/* Content */}
        <div className='mt-10'>
          <Editor post={post} editable={false} />
        </div>

        {/* Comments */}
        <div className='mt-16 border-t pt-8'>
          <h2 className='mb-8 text-2xl font-bold'>Comments</h2>
          <CommentsSection postId={post._id} />
        </div>
      </div>
    </section>
  )
}