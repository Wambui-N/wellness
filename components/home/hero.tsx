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
    <section className="relative bg-hero-bg flex h-screen flex-col items-center justify-center bg-cover bg-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-black">
            Your Healthcare, Your Voice
          </h1>
          <p className="mx-auto max-w-[700px] text-black/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to the Wellness Dialogue Community, a community-driven
            platform that aims to democratize healthcare information. Join a
            supportive community sharing real healthcare experiences. Your story
            matters.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <Button className='bg-black text-white' size="lg">Join the Community</Button>
            </Link>
            <Link href="/about">
              <Button className='bg-orange' size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}