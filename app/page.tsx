'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ValueProp } from '@/components/home/valueProp'
import { Ideals } from '@/components/home/ideals'
import { WhatWeArent } from '@/components/home/whatWeArent'
import { CTA } from '@/components/home/cta'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, MessageSquare, Bookmark } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const features = [
  {
    title: 'Share Experiences',
    description:
      'Connect with others who understand your healthcare journey. Connect with others with similar experiences. Get encouragement',
    icon: '💬'
  },
  {
    title: 'Find Support',
    description:
      'Get advice and encouragement from a caring and friendly community. No judgement, just understanding',
    icon: '🤝'
  },
  {
    title: 'Save Resources and Precious Time',
    description:
      'Keep track of helpful information and stories that matter to you. Learn from others who have been where you are',
    icon: '⏱️'
  }
]

export default function Home() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    // Import and use the SignedInHome component instead of returning null
    const SignedInHome = dynamic(() => import('@/components/signed-in-home'), {
      loading: () => <div>Loading...</div>
    })
    return <SignedInHome />
  }

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-32'>
        {/* Background decorative elements */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#81c4ee]/10 blur-3xl' />
          <div className='absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#FF7F11]/10 blur-3xl' />
        </div>

        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl text-center'
          >
            <h1 className='mb-6 text-5xl font-bold leading-tight md:text-6xl'>
              <span className='bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent'>
                Share your wellness encounters
              </span>
            </h1>
            <p className='text-xl text-[#020C12]/70'>
              Welcome to our community!
            </p>
            <p className='mx-auto mb-8 max-w-2xl text-xl text-[#020C12]/70'>
              Connect with others in the wellness journey. Forge alliances with
              those who understand you. Share stories and laughter and seek
              mutual support.
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button
                asChild
                size='lg'
                className='bg-[#020C12] text-white hover:bg-[#020C12]/90'
              >
                <Link href='/sign-up'>
                  Get Started <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='border-[#020C12] text-[#020C12] hover:bg-[#020C12]/5'
              >
                <Link href='/about'>Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3'
          >
            <div className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'>
              <Heart className='mb-4 h-8 w-8 text-[#FF7F11]' />
              <h3 className='mb-2 text-xl font-semibold'>Share Experiences</h3>
              <p className='text-[#020C12]/70'>
              Connect with others with similar experiences. Get encouragement
              </p>
            </div>
            <div className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'>
              <MessageSquare className='mb-4 h-8 w-8 text-[#81c4ee]' />
              <h3 className='mb-2 text-xl font-semibold'>Find Support</h3>
              <p className='text-[#020C12]/70'>
              Get advice and encouragement from a caring and friendly community. No
              judgement, just understanding
              </p>
            </div>
            <div className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'>
              <Bookmark className='mb-4 h-8 w-8 text-[#FF7F11]' />
              <h3 className='mb-2 text-xl font-semibold'>
                Save Resources and Precious Time
              </h3>
              <p className='text-[#020C12]/70'>
              Keep track of helpful information and stories that matter to you. Learn from
              others who have been where you are
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className='bg-[#020C12]/5 py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl text-center'
          >
            <h2 className='mb-6 text-3xl font-bold'>
              Share your wellness encounters
            </h2>
            <p className='text-xl text-[#020C12]/70'>
              Welcome to our community! Connect with others in the wellness
              journey. Forge alliances with those who understand you. Share
              stories and laughter and seek mutual support.
            </p>
          </motion.div>
        </div>
      </section>

      <ValueProp />
      <Ideals />
      <WhatWeArent />
      <CTA />
    </main>
  )
}
