'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import PostItem from '@/components/post-item'
import { Spinner } from '@/components/ui/spinner'

interface PostsProps {
  selectedTag: string
}

export default function Posts({ selectedTag }: PostsProps) {
  const posts = useQuery(api.posts.getPosts)

  if (!posts) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  const filteredPosts = selectedTag === "All" 
    ? posts 
    : posts.filter(post => {
        if (!post.tagNames) return false
        return post.tagNames.some(tag => 
          tag.toLowerCase() === selectedTag.toLowerCase()
        )
      })

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No posts found for this topic
      </div>
    )
  }

  return (
    <ul className="divide-y">
      {filteredPosts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  )
}