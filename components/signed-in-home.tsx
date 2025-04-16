'use client'

import { useState } from 'react'
import Posts from "@/components/posts";
import RecentPosts from "@/components/recent-posts";
import WhoToFollow from "@/components/who-to-follow";
import TagFilter from "@/components/tag-filter";

export function SignedInHome() {
  const [selectedTag, setSelectedTag] = useState("All")

  return (
    <section className='mt-[65px]'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start'>
          <main className='flex-1 min-w-0 pt-20 xl:py-20'>
            <TagFilter selectedTag={selectedTag} onTagSelect={setSelectedTag} />
            <Posts selectedTag={selectedTag} />
          </main>

          <aside className='flex w-full flex-col justify-between gap-6 pb-10 md:flex-row xl:sticky xl:top-[65px] xl:w-[350px] xl:flex-col xl:py-20'>
            <RecentPosts />
            <WhoToFollow />
          </aside>
        </div>
      </div>
    </section>
  )
} 