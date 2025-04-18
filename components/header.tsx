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
    <header className='fixed inset-x-0 top-0 z-50 bg-background/0 py-4 backdrop-blur-md'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Link 
          href='/' 
          className='flex items-center gap-2 font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors'
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
              className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary border-border/40"
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
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </SignedOut>

          <SignedIn>
            <Link 
              href={profileUrl} 
              className="flex items-center rounded-full ring-1 ring-border/40 p-1 hover:ring-primary/50 transition-all"
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
                <User className='h-6 w-6 text-muted-foreground' />
              )}
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                size='sm' 
                variant='outline'
                className="hover:bg-primary/10 hover:text-primary border-border/40"
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