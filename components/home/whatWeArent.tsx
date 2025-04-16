"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

const whatWeArent = [
  {
    title: "Not a Medical Advice Platform",
    content:
      "We do not provide medical advice or diagnoses. Our platform is for sharing experiences and stories about healthcare journeys.",
  },
  {
    title: "Not a Review Site",
    content:
      "While we encourage sharing experiences, we are not a traditional review site. We focus on storytelling and community building rather than ratings.",
  },
  {
    title: "Not a Healthcare Provider",
    content:
      "We are not healthcare providers or medical professionals. We are a platform for patients to share their experiences and support each other.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1,
    },
  },
}

export function WhatWeArent() {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-[#020C12]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-24 w-96 h-96 rounded-full bg-[#FF7F11]/5 blur-3xl" />
        <div className="absolute -bottom-24 right-24 w-96 h-96 rounded-full bg-[#81c4ee]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            What We{" "}
            <span className="bg-gradient-to-r from-[#FF7F11] to-[#81c4ee] bg-clip-text text-transparent">Are Not</span>
          </h2>
          <p className="mt-4 text-[#020C12]/70 max-w-2xl mx-auto">
            It's important to understand what our platform is not, to set the right expectations.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {whatWeArent.map((card, index) => (
            <motion.div key={index} variants={item} className="mb-12 last:mb-0">
              <div className="flex items-start gap-6">
                {/* Enhanced X icon in circle */}
                <motion.div
                  variants={iconVariants}
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7F11] to-[#FF7F11]/80 flex items-center justify-center shadow-lg"
                >
                  <X className="w-8 h-8 text-white" />
                </motion.div>

                {/* Enhanced content box */}
                <div className="flex-1 bg-white p-8 rounded-2xl border border-[#020C12]/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  <h3 className="text-2xl font-semibold mb-3 text-[#020C12]">{card.title}</h3>
                  <p className="text-[#020C12]/70 leading-relaxed">{card.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
