import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    posts: v.optional(v.array(v.id('posts'))),
    savedArticles: v.optional(v.array(v.id('posts'))),
    likedArticles: v.optional(v.array(v.id('posts')))
  }).index('byClerkUserId', ['clerkUserId']),

  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    authorId: v.id('users'),
    likes: v.number(),
    tags: v.array(v.id('tags')),
    status: v.optional(v.union(v.literal('draft'), v.literal('published'))),
    savedBy: v.optional(v.array(v.id('users'))),
    likedBy: v.optional(v.array(v.id('users')))
  }).index('bySlug', ['slug']),

  tags: defineTable({
    name: v.string(),
  }),

  comments: defineTable({
    content: v.string(),
    authorId: v.id('users'),
    postId: v.id('posts'),
    parentId: v.optional(v.id('comments')),
    likes: v.optional(v.number()),
    likedBy: v.optional(v.array(v.id('users')))
  }).index('byPostId', ['postId']).index('byParentId', ['parentId'])
})
