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

import { Menu, User } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { user } = useUser()
  const userData = useQuery(api.users.current)
  
  const profileUrl = userData?.firstName && userData?.lastName 
    ? `/${userData.firstName.toLowerCase()}-${userData.lastName.toLowerCase()}`
    : '/profile'

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm'>
      <nav className='container flex max-w-none items-center justify-between'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='font-serif text-2xl font-semibold'>
                <SheetClose asChild>
                  <Link href='/'>Wellness Dialogues</Link>
                </SheetClose>
              </li>
              <SignedIn>
                <li>
                  <SheetClose asChild>
                    <Link href={profileUrl} className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      Profile
                    </Link>
                  </SheetClose>
                </li>
              </SignedIn>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
          <li className='font-serif text-xl font-semibold'>
            <Link href='/'>Wellness Dialogues</Link>
          </li>
          <SignedIn>
            <li>
              <Link href={profileUrl} className='flex items-center gap-2'>
                <User className='h-4 w-4' />
                Profile
              </Link>
            </li>
          </SignedIn>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />

          <Button size='sm' variant='secondary' asChild>
            <Link href='/write'>Write</Link>
          </Button>

          <SignedOut>
            <SignInButton>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}