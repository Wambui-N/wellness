'use client'

import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Id } from '@/convex/_generated/dataModel'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentForm from './comment-form'
import { Comment } from '@/lib/types'

interface CommentItemProps {
  comment: Comment
  postId: Id<'posts'>
  onCommentAdded?: () => void
}

export default function CommentItem({ comment, postId, onCommentAdded }: CommentItemProps) {
  const { user } = useUser()
  const { toast } = useToast()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const likeComment = useMutation(api.comments.likeComment)
  const replies = useQuery(api.comments.getReplies, { parentId: comment._id })

  const isLiked = user && comment.likedBy?.includes(user.id as Id<'users'>)
  const hasReplies = replies && replies.length > 0

  const handleLike = async () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to like comments.',
        variant: 'destructive'
      })
      return
    }

    try {
      await likeComment({ commentId: comment._id })
    } catch (error) {
      console.error('Failed to like comment:', error)
      toast({
        title: 'Error',
        description: 'Failed to like comment. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <Avatar>
          <AvatarImage src={comment.author.imageUrl} alt={comment.author.name ?? 'User'} />
          <AvatarFallback>{comment.author.name?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
        <div className='flex-1 space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>{comment.author.name ?? 'Anonymous User'}</span>
            <span className='text-sm text-muted-foreground'>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className='text-sm'>{comment.content}</p>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              className={`text-muted-foreground hover:text-foreground ${isLiked ? 'text-primary' : ''}`}
              onClick={handleLike}
            >
              <Heart className='h-4 w-4 mr-1' />
              {comment.likes}
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground'
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageCircle className='h-4 w-4 mr-1' />
              Reply
            </Button>
            {hasReplies && (
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground hover:text-foreground'
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide replies' : `Show ${replies.length} replies`}
              </Button>
            )}
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className='ml-12'>
          <CommentForm
            postId={postId}
            parentId={comment._id}
            onSuccess={() => {
              setShowReplyForm(false)
              onCommentAdded?.()
            }}
          />
        </div>
      )}

      {showReplies && replies && (
        <div className='ml-12 space-y-4'>
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              postId={postId}
              onCommentAdded={onCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  )
} 