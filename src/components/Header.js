import React from 'react'
import '../styles/globals.css'
import Image from 'next/image'


const Header = () => {
  return (
    <header>
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={200} height={300} />
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header
