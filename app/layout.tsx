import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"

import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

import './globals.css'

const gloria = localFont({
  src: './fonts/ZTGloraPro-Regular.woff',
  variable: '--font-gloria'
})

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-satoshi'
})

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'The Wellness Notebook',
  description: 'Share your healthcare journey'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='scroll-smooth' suppressHydrationWarning>
        <body
          className={cn(
            'flex min-h-screen flex-col',
            gloria.variable,
            satoshi.variable
          )}
        >
          <Providers>
            <Header />
            <main className='grow'>{children}</main>
            <Footer />
          </Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
