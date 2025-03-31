'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

interface CommentFormProps {
  postId: Id<'posts'>
  parentId?: Id<'comments'>
  onSuccess?: () => void
}

export default function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const { user } = useUser()
  const { toast } = useToast()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createComment = useMutation(api.comments.createComment)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to leave a comment.',
        variant: 'destructive'
      })
      return
    }

    try {
      setIsSubmitting(true)
      await createComment({
        content,
        postId,
        parentId
      })
      setContent('')
      toast({
        title: 'Success',
        description: parentId ? 'Reply posted successfully!' : 'Comment posted successfully!'
      })
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create comment:', error)
      toast({
        title: 'Error',
        description: 'Failed to create comment. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
      </Button>
    </form>
  )
} 