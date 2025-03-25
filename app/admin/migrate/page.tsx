'use client'

import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function MigratePage() {
  const migratePosts = useMutation(api.posts.migratePostsStatus)
  const [isMigrating, setIsMigrating] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const handleMigrate = async () => {
    setIsMigrating(true)
    try {
      const count = await migratePosts()
      setResult(count)
    } catch (error) {
      console.error('Migration failed:', error)
    } finally {
      setIsMigrating(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Database Migration</h1>
      <div className="space-y-4">
        <Button 
          onClick={handleMigrate} 
          disabled={isMigrating}
        >
          {isMigrating ? 'Migrating...' : 'Migrate Posts Status'}
        </Button>
        {result !== null && (
          <p>Successfully migrated {result} posts</p>
        )}
      </div>
    </div>
  )
} 