'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "motion/react"
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const socialLinks = [
    { icon: <FaTwitter />, href: 'https://twitter.com/wellnessnotebook' },
    { icon: <FaFacebook />, href: 'https://facebook.com/wellnessnotebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com/wellnessnotebook' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/company/wellnessnotebook' },
  ]

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Support Us', href: '/support' },
  ]

  return (
    <footer className='bg-[#020c12] py-16 mt-16'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto'>
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center md:items-start space-y-6'
          >
            <div className="flex items-center gap-3">
              <Image 
                src="/WD White Logo.png" 
                alt="The Wellness Notebook Logo" 
                width={48} 
                height={48}
                className="h-12 w-12"
              />
              <h1 className='text-white text-2xl font-serif'>The Wellness Notebook</h1>
            </div>
            <p className='text-white/70 text-sm text-center md:text-left max-w-xs leading-relaxed'>
              Bridging the information gap in healthcare through patient experiences and knowledge sharing.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='flex flex-col items-center md:items-start space-y-6'
          >
            <h3 className='text-white text-lg font-semibold tracking-wide'>Quick Links</h3>
            <div className='flex flex-col items-center md:items-start space-y-3'>
              {footerLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col items-center md:items-start space-y-6'
          >
            <h3 className='text-white text-lg font-semibold tracking-wide'>Connect With Us</h3>
            <div className='flex space-x-6'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/70 hover:text-white text-2xl transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-16 pt-8 border-t border-white/10 text-center max-w-6xl mx-auto'
        >
          <p className='text-white/50 text-sm'>
            © {new Date().getFullYear()} The Wellness Notebook. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer