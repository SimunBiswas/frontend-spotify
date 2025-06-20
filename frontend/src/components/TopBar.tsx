'use client'

import React from 'react'

import Link from 'next/link'
import { LayoutDashboardIcon } from 'lucide-react'
import { SignedOut,  UserButton } from '@clerk/nextjs'
import SignInAuthButtons from './SignInAuthButtons';
import { useAuthStore } from '@/stores/useAuthStore'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const TopBar = () => {

  const {isAdmin} = useAuthStore()

  return (
    <div className=' flex items-center justify-between p-4 sticky top-0 bg-zinc-900 backdrop-blur-md z-10'>
      <div className="flex gap-2 items-center text-white">
        <Image className='size-8' src="/spotify.png" alt="SpotifyImage" width={20} height={20} />
        Spotify
      </div>
      <div className="flex items-cemter gap-4">
        {isAdmin && (
            <Link href='/admin'
            className={cn(buttonVariants({ variant : "outline"}))}>
                <LayoutDashboardIcon className='size-4 m-2' />
                Admin Dashboard
            </Link>
        )}

       

        <SignedOut>
          <SignInAuthButtons/>
        </SignedOut>

        <UserButton />
      </div>
    </div>
  )
}

export default TopBar
