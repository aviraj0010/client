import React from 'react'
import '../styles/globals.css'
import Image from 'next/image'
import Link from 'next/link'


const Header = () => {
  return (
    <header>
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={200} height={300} />
      </div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Header
