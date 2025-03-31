'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Spinner } from '@/components/ui/spinner'
import CommentForm from './comment-form'
import CommentItem from './comment-item'

interface CommentsSectionProps {
  postId: Id<'posts'>
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const comments = useQuery(api.comments.getComments, { postId })

  if (comments === undefined) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  // Filter out replies as they're shown nested under their parent comments
  const topLevelComments = comments.filter(comment => !comment.parentId)

  return (
    <div className="space-y-8">
      <CommentForm postId={postId} />
      
      <div className="space-y-6">
        {topLevelComments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  )
} 