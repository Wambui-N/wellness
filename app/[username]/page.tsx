'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import PostItem from '@/components/post-item'
import { useParams } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { Id } from '@/convex/_generated/dataModel'
import { Doc } from '@/convex/_generated/dataModel'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Camera, LogOut } from 'lucide-react'
import { useState } from 'react'
import { SignOutButton } from '@clerk/nextjs'

export default function ProfilePage() {
  const { username } = useParams()
  const { user } = useUser()
  const userData = useQuery(api.users.current)
  const profileUser = useQuery(api.users.getUserByUsername, { username: username as string })
  const [isUploading, setIsUploading] = useState(false)
  const updateAvatar = useMutation(api.users.updateAvatar)
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl)
  
  // Only fetch user posts if we have a profile user
  const userPosts = useQuery(
    api.posts.getUserPosts, 
    profileUser?._id ? { userId: profileUser._id } : "skip"
  )

  // Only fetch saved/liked posts if we're viewing our own profile
  const isOwnProfile = userData?.firstName && userData?.lastName && 
    `${String(userData.firstName).toLowerCase()}-${String(userData.lastName).toLowerCase()}` === String(username).toLowerCase()

  const savedPosts = useQuery(
    api.posts.getSavedPosts, 
    isOwnProfile && userData?._id ? { userId: userData._id } : "skip"
  )

  const likedPosts = useQuery(
    api.posts.getLikedPosts, 
    isOwnProfile && userData?._id ? { userId: userData._id } : "skip"
  )

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const uploadUrl = await generateUploadUrl()
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      const { storageId } = await response.json()
      await updateAvatar({ storageId })
    } catch (error) {
      console.error('Error uploading avatar:', error)
    } finally {
      setIsUploading(false)
    }
  }

  // Only show loading for profile user
  if (!profileUser) {
    return (
      <div className="container mx-auto py-24 flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            {profileUser.imageUrl && (
              <img 
                src={profileUser.imageUrl} 
                alt={profileUser.firstName ?? ''} 
                className="w-20 h-20 rounded-full"
              />
            )}
            {isOwnProfile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      {isUploading ? 'Uploading...' : 'Choose a new photo'}
                    </label>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {profileUser.firstName} {profileUser.lastName}
            </h1>
            <p className="text-gray-600">{profileUser.email}</p>
          </div>
        </div>
        {isOwnProfile && (
          <SignOutButton>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </SignOutButton>
        )}
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