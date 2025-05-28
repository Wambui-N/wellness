'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ClipboardX, BookX } from 'lucide-react'

export function WhatWeArent() {
  return (
    <section className='bg-[#020C12]/5 py-24'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-4xl'
        >
          <h2 className='mb-6 text-center text-3xl font-bold'>
            What we are not
          </h2>
          <p className='mb-12 text-center text-xl text-[#020C12]/70'>
            The Wellness Notebook is strictly an informal platform for general
            information and subjective opinions about healthcare in our society
            by members of the public. Information or debates that we carry are
            not medical advice. It is meant to assist the users to become
            better, wiser and more enlightened in their search for qualified
            medical help. We therefore take no responsibility for use of any
            information on this site.
          </p>
          <p className='mb-12 text-center text-xl text-[#020C12]/70'>
            It&apos;s important to know what we are not to manage expectations
          </p>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
            >
              <AlertTriangle className='mb-4 h-8 w-8 text-[#FF7F11]' />
              <h3 className='mb-3 text-xl font-semibold'>
                We are not a medical practice
              </h3>
              <p className='text-[#020C12]/70'>
                We are just a platform for sharing experiences and encounters in
                the wellness journey
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
            >
              <ClipboardX className='mb-4 h-8 w-8 text-[#81c4ee]' />
              <h3 className='mb-3 text-xl font-semibold'>
                We don&apos;t diagnose or treat.
              </h3>
              <p className='text-[#020C12]/70'>
                Our information sharing is informal and does not substitute
                professional medical attention
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
            >
              <ClipboardX className='mb-4 h-8 w-8 text-[#81c4ee]' />
              <h3 className='mb-3 text-xl font-semibold'>
              We don&apos;t register or license
              </h3>
              <p className='text-[#020C12]/70'>
              We comment on our experiences with doctors, clinics and hospitals. Purely as patients
              but not licensing authority
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='rounded-2xl border border-[#020C12]/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
            >
              <BookX className='mb-4 h-8 w-8 text-[#FF7F11]' />
              <h3 className='mb-3 text-xl font-semibold'>
                Not a medical journal
              </h3>
              <p className='text-[#020C12]/70'>
                We are not a forum for technical medical information. We only
                share wellness experiences as members of the public
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
