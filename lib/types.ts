import { Id } from '@/convex/_generated/dataModel'

export type Post = {
  savedBy?: any
  _id: Id<'posts'>
  _creationTime: number
  coverImageId?: string
  coverImageUrl?: string | null
  title: string
  slug: string
  excerpt: string
  content: string
  authorId: Id<'users'>
  likes: number
  commentCount?: number
  tags: string[]
  author: {
    _id: Id<'users'>
    _creationTime: number
    firstName?: string | undefined
    lastName?: string | undefined
    imageUrl?: string | undefined
    posts?: Id<'posts'>[] | undefined
    email: string
    clerkUserId: string
  }
  tagNames?: string[]
  likedBy?: Id<'users'>[]
}

export type Comment = {
  _id: Id<'comments'>
  content: string
  _creationTime: number
  authorId: Id<'users'>
  author: {
    _id: Id<'users'>
    _creationTime: number
    firstName?: string
    lastName?: string
    imageUrl?: string
    posts?: Id<'posts'>[]
    savedArticles?: Id<'posts'>[]
    likedArticles?: Id<'posts'>[]
    email: string
    clerkUserId: string
  }
  likes?: number
  likedBy?: Id<'users'>[]
  parentId?: Id<'comments'>
  postId: Id<'posts'>
}