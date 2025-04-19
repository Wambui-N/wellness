'use client'

import { motion } from 'motion/react'
import { Button } from "../ui/button"
import Link from 'next/link'

export function CTA() {
  return (
    <section className="container mx-auto py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          Want to share your story?
        </h2>
        <p className="text-black/70 mb-8">
          Join our community and inspire others with your healthcare journey.
        </p>
        <Link href="/sign-up">
        <Button
          variant="default"
          className="bg-[#020c12] text-white hover:bg-[#020c12]/90"
          size="lg"
        >
          Submit Your Story
        </Button>
        </Link>
      </motion.div>
    </section>
  )
}