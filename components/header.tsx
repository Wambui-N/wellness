'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { ThemeToggle } from '@/components/theme-toggle'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'

import { Menu, User, Pencil } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { user } = useUser()
  const userData = useQuery(api.users.current)
  
  const profileUrl = userData?.firstName && userData?.lastName 
    ? `/${userData.firstName.toLowerCase()}-${userData.lastName.toLowerCase()}`
    : '/profile'

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-[hsl(var(--glass-bg))] py-4 backdrop-blur-md border-b border-[hsl(var(--glass-border))]'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Link 
          href='/' 
          className='flex items-center gap-2 font-serif text-xl font-semibold glass-text hover:opacity-90 transition-all'
        >
          <Image 
            src="/WD Dark Logo.png" 
            alt="The Wellness Notebook Logo" 
            width={32} 
            height={32}
            className="h-8 w-8"
          />
          <span>The Wellness Notebook</span>
        </Link>

        <div className='flex items-center gap-6'>
          <SignedIn>
            <Button 
              size='sm' 
              variant='outline' 
              asChild 
              className="flex items-center gap-2 bg-white/5 border-[hsl(var(--glass-border))] glass-text hover:bg-white/10"
            >
              <Link href='/write'>
                <Pencil className="h-4 w-4" />
                Write
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <Link 
              href='/about' 
              className="text-sm glass-text-muted hover:glass-text transition-colors"
            >
              About
            </Link>
          </SignedOut>

          <SignedIn>
            <Link 
              href={profileUrl} 
              className="flex items-center rounded-full glass-ring p-1 hover:ring-white/30 transition-all"
            >
              {userData?.imageUrl ? (
                <Image 
                  src={userData.imageUrl} 
                  alt="Profile" 
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className='h-6 w-6 glass-text-muted' />
              )}
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                size='sm' 
                variant='outline'
                className="bg-white/5 border-[hsl(var(--glass-border))] glass-text hover:bg-white/10"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}