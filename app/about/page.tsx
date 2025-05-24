'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const points = [
  {
    point: 'Awareness',
    text: 'Share your experiences with excellent doctors and clinics.'
  },
  {
    point: 'Experiences',
    text: 'The good, the bad, and the ugly—every story matters.'
  },
  {
    point: 'Appreciation',
    text: 'Celebrate healthcare workers who embody empathy and excellence.'
  },
  {
    point: 'Service Gaps',
    text: 'Highlight unmet needs to inspire improvement.'
  },
  {
    point: 'Humor',
    text: 'Because laughter truly is the best medicine.'
  }
]

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-24'>
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#81c4ee]/10 blur-3xl' />
          <div className='absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#FF7F11]/10 blur-3xl' />
        </div>

        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl'
          >
            <Button asChild variant='ghost' className='mb-8'>
              <Link href='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>

            <h1 className='mb-6 text-4xl font-bold md:text-5xl'>
              <span className='bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent'>
                About The Wellness Notebook
              </span>
            </h1>
            <p className='mb-12 text-xl text-[#020C12]/70'>
              Everyone is a patient—whether you were one yesterday, are one
              today, or will be one tomorrow. The Wellness Notebook is your
              notebook, a collective diary that records and enriches our shared
              healthcare experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why the Wellness Notebook Section */}
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
              Why the Wellness Notebook
            </h2>
            <p className='mb-6 text-xl text-[#020C12]/70'>
              The Wellness Notebook is a digital platform for informal reviews
              of healthcare services. By sharing our diverse encounters with the
              medical fraternity, we aim to enlighten and empower patients to
              make informed choices.
            </p>
            <p className='text-xl text-[#020C12]/70'>
              Welcome to The Wellness Notebook! It is a collective diary that
              records and enriches our shared healthcare experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl text-center'
          >
            <h2 className='mb-6 text-3xl font-bold'>Mission</h2>
            <p className='text-xl text-[#020C12]/70'>
            We aspire to create a network of information about healthcare services and our
            interactions with them
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className='bg-[#020C12]/5 py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl text-center'
          >
            <h2 className='mb-6 text-3xl font-bold'>Vision</h2>
            <p className='text-xl text-[#020C12]/70'>
            To be the central reference point for informal awareness, insights and chitchats on
            healthcare in Kenya and beyond
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl text-center'
          >
            <h2 className='mb-6 text-3xl font-bold'>Who We Are</h2>
            <p className='text-xl text-[#020C12]/70'>
              The Wellness Notebook is a digital platform for informal reviews
              of healthcare services. By sharing our diverse encounters with the
              medical fraternity, we aim to enlighten and empower patients to
              make informed choices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Talking Points Section */}
      <section className='bg-[#020C12]/5 py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-4xl'
          >
            <h2 className='mb-12 text-center text-3xl font-bold'>
              We invite contributions from all walks of life to share your
              stories, insights, and reflections on the wellness journey:
            </h2>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
                >
                  <h3 className='mb-3 text-xl font-semibold text-[#FF7F11]'>
                    {point.point}
                  </h3>
                  <p className='text-[#020C12]/70'>{point.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Inspiration Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-3xl'
          >
            <h2 className='mb-6 text-center text-3xl font-bold'>
              Founder&apos;s Inspiration
            </h2>
            <div className='space-y-6 text-[#020C12]/70'>
              <p className='text-xl'>
                As a writer with a passion for medicine, I have firsthand
                experience as a patient. After being hospitalized following an
                accident, I spent a month under the care of dedicated healthcare
                professionals. The experience opened my eyes to the intricacies
                of the healthcare ecosystem and its vital role in society.
              </p>
              <p className='text-xl'>
                Yet, I noticed a significant gap: valuable information about
                healthcare services and their quality remains fragmented. The
                Wellness Notebook was born to fill this gap—a network where
                patients share experiences to benefit others, creating a
                collaborative notebook for the wellness journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
