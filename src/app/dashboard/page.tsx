import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
        <main className="flex flex-col items-center justify-between p-24 bg-green-300">
        <div className="z-10 w-full max-w-5xl items-center justify-evenly font-mono text-sm lg:flex">
          <Link href="/">
            <Button>Home</Button>
            <Button>Class</Button>
          </Link>
        </div>
        <div className="relative z-[-1] flex place-items-center">
          
        </div>
      </main>
  )
}
