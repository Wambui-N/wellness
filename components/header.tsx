'use client'

import Link from 'next/link'
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
    <header className='fixed inset-x-0 top-0 z-50  bg-background/0 py-4 backdrop-blur-sm'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Link href='/' className='font-serif text-xl font-semibold'>
          Wellness Dialogues
        </Link>

        <div className='flex items-center gap-6'>
          <SignedIn>
            <Button size='sm' variant='secondary' asChild className="flex items-center gap-2">
              <Link href='/write'>
                <Pencil className="h-4 w-4" />
                Write
              </Link>
            </Button>
          </SignedIn>

          <Link href='/about' className="text-sm hover:text-gray-600">
            About
          </Link>

          <SignedIn>
            <Link href={profileUrl} className="flex items-center">
              {userData?.imageUrl ? (
                <img 
                  src={userData.imageUrl} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className='h-6 w-6' />
              )}
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}