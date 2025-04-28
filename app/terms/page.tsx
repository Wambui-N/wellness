'use client'

import { motion } from "motion/react"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-gloria text-gray-900 mb-8">Terms and Conditions of Use and Participation</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600">
              Welcome to Wellness Notebook. This website is designed to be a platform for sharing experiences and knowledge about healthcare and wellness. By accessing and using this website, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Good Faith and Ethics</h2>
            <p className="text-gray-600">
              All users are expected to participate in good faith and maintain high ethical standards. This includes:
            </p>
            <ul className="text-gray-600 list-disc pl-6 space-y-2">
              <li>Providing accurate and truthful information</li>
              <li>Respecting the privacy and confidentiality of others</li>
              <li>Not engaging in any form of harassment or discrimination</li>
              <li>Not sharing misleading or harmful medical advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Embrace Diversity</h2>
            <p className="text-gray-600">
              We welcome and encourage diverse perspectives and experiences. Discrimination of any kind, including based on race, gender, religion, or health status, will not be tolerated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Content Guidelines</h2>
            <p className="text-gray-600">
              When contributing content to the website:
            </p>
            <ul className="text-gray-600 list-disc pl-6 space-y-2">
              <li>Share personal experiences and insights</li>
              <li>Cite sources when sharing medical information</li>
              <li>Do not post copyrighted material without permission</li>
              <li>Do not share personal information of others without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Advertising and Sponsorship</h2>
            <p className="text-gray-600">
              Any advertising or sponsorship content will be clearly marked as such. We maintain editorial independence and do not allow advertisers to influence our content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-600">
              We are committed to protecting your privacy. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website, including text, graphics, logos, and software, is the property of Wellness Notebook or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              Wellness Notebook is not responsible for any medical decisions made based on information shared on this platform. Users should always consult with qualified healthcare professionals for medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Modifications to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes indicates your acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-gloria text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us through the provided contact information on our website.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
} 