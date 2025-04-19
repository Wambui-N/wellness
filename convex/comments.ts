import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getCurrentUserOrThrow } from './users'

export const getComments = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, { postId }) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('byPostId', q => q.eq('postId', postId))
      .collect()

    const commentsWithAuthors = await Promise.all(
      comments.map(async comment => {
        const author = await ctx.db.get(comment.authorId)
        if (!author) return null;
        
        const replies = await ctx.db
          .query('comments')
          .withIndex('byParentId', q => q.eq('parentId', comment._id))
          .collect()

        const repliesWithAuthors = await Promise.all(
          replies.map(async reply => {
            const replyAuthor = await ctx.db.get(reply.authorId)
            if (!replyAuthor) return null;
            return { ...reply, author: replyAuthor }
          })
        )

        return {
          ...comment,
          author,
          replies: repliesWithAuthors.filter((reply): reply is NonNullable<typeof reply> => reply !== null)
        }
      })
    )

    return commentsWithAuthors.filter((comment): comment is NonNullable<typeof comment> => comment !== null);
  }
})

export const getCommentsCount = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, { postId }) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('byPostId', q => q.eq('postId', postId))
      .collect()

    const replies = await Promise.all(
      comments.map(comment =>
        ctx.db
          .query('comments')
          .withIndex('byParentId', q => q.eq('parentId', comment._id))
          .collect()
      )
    )

    const totalReplies = replies.reduce((sum, replyArray) => sum + replyArray.length, 0)
    return comments.length + totalReplies
  }
})

export const createComment = mutation({
  args: {
    content: v.string(),
    postId: v.id('posts'),
    parentId: v.optional(v.id('comments'))
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx)

    const commentId = await ctx.db.insert('comments', {
      content: args.content,
      authorId: user._id,
      postId: args.postId,
      parentId: args.parentId,
      likes: 0,
      likedBy: []
    })

    return commentId
  }
})

export const likeComment = mutation({
  args: { commentId: v.id('comments') },
  handler: async (ctx, { commentId }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkUserId'), identity.subject))
      .first()
    
    if (!user) throw new Error('User not found')

    const comment = await ctx.db.get(commentId)
    if (!comment) throw new Error('Comment not found')

    const likedBy = comment.likedBy ?? []
    const likes = comment.likes ?? 0

    if (likedBy.includes(user._id)) {
      await ctx.db.patch(commentId, {
        likedBy: likedBy.filter(id => id !== user._id),
        likes: likes - 1
      })
    } else {
      await ctx.db.patch(commentId, {
        likedBy: [...likedBy, user._id],
        likes: likes + 1
      })
    }
  }
})

export const getReplies = query({
  args: { parentId: v.id('comments') },
  handler: async (ctx, { parentId }) => {
    const replies = await ctx.db
      .query('comments')
      .withIndex('byParentId', q => q.eq('parentId', parentId))
      .collect()

    const repliesWithAuthors = await Promise.all(
      replies.map(async reply => {
        const author = await ctx.db.get(reply.authorId)
        if (!author) return null;
        return { ...reply, author }
      })
    )

    return repliesWithAuthors.filter((reply): reply is NonNullable<typeof reply> => reply !== null);
  }
}) 