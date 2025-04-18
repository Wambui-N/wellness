'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Hero() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, router])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-400 via-white to-green-300 flex flex-col items-start justify-center px-4 md:px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="max-w-[600px]">
          <h1 className="font-gloria text-5xl md:text-6xl font-bold tracking-tight text-black mb-6">
            Your Healthcare, Your Voice
          </h1>
          <p className="font-satoshi text-lg md:text-xl text-black/90 mb-8 max-w-[500px]">
            Welcome to the Wellness Dialogue Community, a community-driven
            platform that aims to democratize healthcare information. Join a
            supportive community sharing real healthcare experiences. Your story
            matters.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <Button className='font-satoshi bg-black text-white hover:bg-black/90' size="lg">Join the Community</Button>
            </Link>
            <Link href="/about">
              <Button className='font-satoshi bg-[#FF7F11] text-white hover:bg-[#FF7F11]/90' size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}