"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users, BookOpen, Shield } from "lucide-react"
import DetailCard from "./detailCard"

// Using the client's color palette
const colors = {
  black: "#020C12",
  white: "#F5F5F5",
  primary: "#81c4ee",
  orange: "#FF7F11",
}

const values = [
  {
    title: "Authentic Patient Stories",
    text: "Gain valuable insights from real people who've walked your path. No filters, just honest experiences.",
    icon: Lightbulb,
    color: "border-[#FF7F11]/20",
    bgColor: "bg-white",
    iconColor: "text-[#FF7F11]",
  },
  {
    title: "Community Support",
    text: "Join a network of individuals who understand and share your journey, fostering connection and solidarity.",
    icon: Users,
    color: "border-[#81c4ee]/20",
    bgColor: "bg-white",
    iconColor: "text-[#81c4ee]",
  },
  {
    title: "Accessible Healthcare Insights",
    text: "Explore curated resources and practical advice to navigate your healthcare challenges with confidence.",
    icon: BookOpen,
    color: "border-[#FF7F11]/20",
    bgColor: "bg-white",
    iconColor: "text-[#FF7F11]",
  },
  {
    title: "Ethical Information Sharing",
    text: "Your privacy is our priority. Share and engage in a space built on trust and respect.",
    icon: Shield,
    color: "border-[#81c4ee]/20",
    bgColor: "bg-white",
    iconColor: "text-[#81c4ee]",
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

export function ValueProp() {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-[#020C12]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#81c4ee]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF7F11]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#81c4ee] to-[#FF7F11] bg-clip-text text-transparent">
              Wellness Dialogues
            </span>{" "}
            connects you to authentic patient experiences
          </h2>
          <p className="text-xl text-[#020C12]/70">
            Empowering you to make informed healthcare decisions in a supportive and ethical community.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`rounded-2xl shadow-sm ${index % 2 === 0 ? "md:translate-y-8" : ""}`}
            >
              <DetailCard
                title={value.title}
                text={value.text}
                icon={value.icon}
                color={value.color}
                bgColor={value.bgColor}
                iconColor={value.iconColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
