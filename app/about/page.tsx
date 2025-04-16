'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const points = [
  {
    point: "Awareness",
    text: "Share your experiences with excellent doctors and clinics.",
  },
  {
    point: "Experiences",
    text: "The good, the bad, and the ugly—every story matters.",
  },
  {
    point: "Appreciation",
    text: "Celebrate healthcare workers who embody empathy and excellence.",
  },
  {
    point: "Service Gaps",
    text: "Highlight unmet needs to inspire improvement.",
  },
  {
    point: "Humor",
    text: "Because laughter truly is the best medicine.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#81c4ee]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF7F11]/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Button
              asChild
              variant="ghost"
              className="mb-8"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent">
                About Wellness Dialogues
              </span>
            </h1>
            <p className="text-xl text-[#020C12]/70 mb-12">
              Everyone is a patient—whether you were one yesterday, are one today, or will be one tomorrow. Wellness Dialogues is your notebook, a collective diary that records and enriches our shared healthcare experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-[#020C12]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-xl text-[#020C12]/70">
              Wellness Dialogues is a digital platform for informal reviews of healthcare services. By sharing our diverse encounters with the medical fraternity, we aim to enlighten and empower patients to make informed choices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Talking Points Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              We invite contributions from all walks of life to share your stories, insights, and reflections on the wellness journey:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-[#020C12]/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3 text-[#FF7F11]">{point.point}</h3>
                  <p className="text-[#020C12]/70">{point.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Inspiration Section */}
      <section className="py-24 bg-[#020C12]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Founder's Inspiration</h2>
            <div className="space-y-6 text-[#020C12]/70">
              <p className="text-xl">
                As a writer with a passion for medicine, I have firsthand experience as a patient. After being hospitalized following an accident, I spent a month under the care of dedicated healthcare professionals. The experience opened my eyes to the intricacies of the healthcare ecosystem and its vital role in society.
              </p>
              <p className="text-xl">
                Yet, I noticed a significant gap: valuable information about healthcare services and their quality remains fragmented. Wellness Dialogues was born to fill this gap—a network where patients share experiences to benefit others, creating a collaborative notebook for the wellness journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 