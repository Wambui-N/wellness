'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import PostItem from '@/components/post-item'
import { useParams } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { Id } from '@/convex/_generated/dataModel'
import { Doc } from '@/convex/_generated/dataModel'

export default function ProfilePage() {
  const { username } = useParams()
  const { user } = useUser()
  const userData = useQuery(api.users.current)
  const profileUser = useQuery(api.users.getUserByUsername, { username: username as string })
  
  const userPosts = useQuery(api.posts.getUserPosts, { 
    userId: profileUser?._id 
  })
  const savedPosts = useQuery(api.posts.getSavedPosts, { 
    userId: userData?._id 
  })
  const likedPosts = useQuery(api.posts.getLikedPosts, { 
    userId: userData?._id 
  })

  // Check if the current user is viewing their own profile
  const isOwnProfile = userData?.firstName && userData?.lastName && 
    `${userData.firstName.toLowerCase()}-${userData.lastName.toLowerCase()}` === username

  if (!profileUser) {
    return (
      <div className="container mx-auto py-24 flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-24">
      <div className="flex items-center gap-4 mb-8">
        {profileUser.imageUrl && (
          <img 
            src={profileUser.imageUrl} 
            alt={profileUser.firstName ?? ''} 
            className="w-20 h-20 rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">
            {profileUser.firstName} {profileUser.lastName}
          </h1>
          <p className="text-gray-600">{profileUser.email}</p>
        </div>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="published">Published</TabsTrigger>
          {isOwnProfile && (
            <>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="published">
          <ul className="divide-y">
            {userPosts?.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </TabsContent>

        {isOwnProfile && (
          <>
            <TabsContent value="saved">
              <ul className="divide-y">
                {savedPosts?.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="liked">
              <ul className="divide-y">
                {likedPosts?.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </ul>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
} 