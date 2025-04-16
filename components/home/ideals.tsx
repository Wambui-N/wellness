"use client"

import { motion } from "framer-motion"
import DetailCard from "./detailCard"

const ourIdeals = [
  {
    ideal: "The Patient's Perspective",
    content:
      "The platform chronicles the healthcare experience through the eyes of the patient – who is the focal point of healthcare services.",
    color: "border-[#81c4ee]/20",
  },
  {
    ideal: "Advancing Awareness",
    content:
      "Patients have a forum to share likes and dislikes, advising fellow patients on which practitioners and hospitals to avoid.",
    color: "border-[#FF7F11]/20",
  },
  {
    ideal: "Empowered Community",
    content:
      "Our ultimate aim is to create an empowered healing community that collectively lobbies for better healthcare by condemning poor services and celebrating good ones.",
    color: "border-[#81c4ee]/20",
  },
  {
    ideal: "Welcomes Humor",
    content:
      "Laughter remains the best medicine. We aim to create a platform for sharing humor from our diverse experiences in the wellness journey.",
    color: "border-[#FF7F11]/20",
  },
  {
    ideal: "Respect and Ethics",
    content:
      "We shall mention, celebrate, and fault healthcare providers with honor and respect. Our forum upholds ethics and legality and will never support malicious slander or ridicule of medical professionals and institutions.",
    color: "border-[#81c4ee]/20",
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

export function Ideals() {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-[#020C12]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 -right-24 w-96 h-96 rounded-full bg-[#81c4ee]/10 blur-3xl" />
        <div className="absolute -bottom-24 left-24 w-96 h-96 rounded-full bg-[#FF7F11]/10 blur-3xl" />
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
            <span className="bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent">Ideals</span>{" "}
            that drive us
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {ourIdeals.map((ideal, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`rounded-2xl shadow-sm ${index % 4 === 0 || index % 4 === 3 ? "md:translate-y-8" : ""}`}
            >
              <DetailCard title={ideal.ideal} text={ideal.content} color={ideal.color} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
