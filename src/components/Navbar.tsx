'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/site.config'

const navLinks = [
  { href: '/#cenik', label: 'Ceník', title: 'Ceník korektury diplomové práce' },
  { href: '/#sluzby', label: 'Další služby' },
  { href: '/#postup', label: 'Postup' },
  { href: '/#reference', label: 'Reference' },
  { href: '/#ukazky', label: 'Ukázky prací' },
  { href: '/#tym', label: 'Náš tým' },
  { href: '/#objednavka', label: 'Objednávka', isCta: true },
]

function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8l10 7 10-7" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = navLinks.map((l) => l.href.replace('/', '').slice(1))
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 80) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-gray-dark hidden md:block">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex justify-end gap-6 text-sm" style={{ color: '#aaa' }}>
          <a href={`tel:${site.phone}`} className="hover:underline" style={{ color: '#aaa' }}>
            <IconPhone />{site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="hover:underline" style={{ color: '#aaa' }}>
            <IconMail />{site.email}
          </a>
        </div>
      </div>

      {/* Sticky navbar */}
      <nav className={`sticky top-0 z-50 bg-bg-light border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0" aria-label="Znovu načíst úvodní stránku">
            <Image
              src="/images/logo-korektura-diplomove-color-positive.svg"
              alt="Korektura diplomové práce – logo"
              width={179}
              height={42}
              priority
            />
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('/', '').slice(1)

              if (link.isCta) {
                return (
                  <li key={link.href} className="ml-2">
                    <a
                      href={link.href}
                      className={`px-5 py-2 text-sm font-bold tracking-wide transition-colors duration-150 inline-block ${
                        isActive
                          ? 'bg-navy text-white'
                          : 'bg-brand text-white hover:bg-navy'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              }

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    title={link.title}
                    className={`px-3 py-2 text-sm font-semibold transition-colors duration-150 tracking-wide ${
                      isActive
                        ? 'text-brand border-b-2 border-brand'
                        : 'text-navy hover:text-brand'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Hamburger */}
          <button
            className="lg:hidden text-navy p-2 rounded focus:outline-none focus:ring-2 focus:ring-navy/30"
            onClick={() => setMenuOpen(true)}
            aria-label="Otevřít menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
          <div className="relative ml-auto w-72 h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 bg-navy">
              <Image
                src="/images/logo-korektura-diplomove-prace-small.png"
                alt="Logo"
                width={140}
                height={30}
              />
              <button onClick={closeMenu} className="text-white text-2xl leading-none p-1 focus:outline-none" aria-label="Zavřít menu">
                ×
              </button>
            </div>
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`block px-6 py-3 font-medium transition-colors border-b border-gray-100 ${
                      link.isCta
                        ? 'bg-brand text-white font-bold hover:bg-navy'
                        : 'text-navy hover:bg-bg-light'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
