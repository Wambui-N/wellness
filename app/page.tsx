'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { ValueProp } from "@/components/home/valueProp"
import { Ideals } from "@/components/home/ideals"
import { WhatWeArent } from "@/components/home/whatWeArent"
import { CTA } from "@/components/home/cta"
import { motion } from "framer-motion"
import { ArrowRight, Heart, MessageSquare, Bookmark } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#81c4ee]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF7F11]/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent">
                Share Your Healthcare Journey
              </span>
            </h1>
            <p className="text-xl text-[#020C12]/70 mb-8 max-w-2xl mx-auto">
              Connect with others who understand your experiences. Share stories, find support, and make informed healthcare decisions together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#020C12] text-white hover:bg-[#020C12]/90"
              >
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#020C12] text-[#020C12] hover:bg-[#020C12]/5"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="p-6 rounded-2xl bg-white border border-[#020C12]/5 shadow-sm hover:shadow-md transition-shadow">
              <Heart className="w-8 h-8 text-[#FF7F11] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Share Experiences</h3>
              <p className="text-[#020C12]/70">Connect with others who understand your healthcare journey.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#020C12]/5 shadow-sm hover:shadow-md transition-shadow">
              <MessageSquare className="w-8 h-8 text-[#81c4ee] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Support</h3>
              <p className="text-[#020C12]/70">Get advice and encouragement from a community that cares.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#020C12]/5 shadow-sm hover:shadow-md transition-shadow">
              <Bookmark className="w-8 h-8 text-[#FF7F11] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Resources</h3>
              <p className="text-[#020C12]/70">Keep track of helpful information and stories that matter to you.</p>
            </div>
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