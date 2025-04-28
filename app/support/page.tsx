'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from "motion/react"

export default function SupportPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-gloria text-gray-900 mb-8">Support Our Work</h1>
        
        <div className="space-y-8">
          <section className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Support us in levelling the awareness terrain</h2>
            <p className="text-gray-600">
              The healthcare system is extremely insular – believing, perhaps rightly, that
              those who need them will make efforts to reach them.
            </p>
            <p className="text-gray-600">
              Wellness Notebook is a network of patients trying to bridge the information
              and knowledge gap through informal interactions and sharing individual
              experiences.
            </p>
            <p className="text-gray-600">
              We also research useful knowledge and ideas on wellness to make it easily
              available to the lay public through regular blog posts.
            </p>
            <p className="text-gray-600 font-semibold">
              In this noble mission, WE NEED YOUR HELP.
            </p>
          </section>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-gloria text-gray-900">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-600">
                  Your contribution helps us continue our mission of making healthcare information accessible to everyone.
                </p>
                <Button 
                  size="lg" 
                  className="bg-[#020c12] text-white hover:bg-[#020c12]/90"
                  onClick={() => {
                    window.open('https://your-donation-link.com', '_blank')
                  }}
                >
                  Donate Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
} 