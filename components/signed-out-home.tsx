'use client'

import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Hero } from './home/hero'
import {ValueProp} from './home/valueProp'
import {Ideals} from './home/ideals'
import {WhatWeArent} from './home/whatWeArent'
import {CTA} from './home/cta'

export function SignedOutHome() {
  return (
    <main>
    <Hero />
    <ValueProp />
    {/* TODO: Add favourite entries */}
    <Ideals />
    <WhatWeArent />
    <CTA />
    </main>

  )
} 