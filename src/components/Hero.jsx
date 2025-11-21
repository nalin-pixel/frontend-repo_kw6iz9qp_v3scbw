import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Power3 } from 'gsap'
import { Play, ArrowRight } from 'lucide-react'

// Register plugins
if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const Hero = ({ onCTAClick, theme }) => {
  const rootRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const btnRef = useRef(null)
  const magneticRefs = useRef([])
  const gradientRef = useRef(null)
  const cursorRef = useRef(null)
  const splineRef = useRef(null)

  // Magnetic cursor
  useEffect(() => {
    const container = rootRef.current
    const cursor = cursorRef.current
    if (!container || !cursor) return

    const moveCursor = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.to(cursor, { x, y, duration: 0.3, ease: Power3.easeOut })

      magneticRefs.current.forEach((el) => {
        if (!el) return
        const bounds = el.getBoundingClientRect()
        const elx = bounds.left + bounds.width / 2 - rect.left
        const ely = bounds.top + bounds.height / 2 - rect.top
        const dx = (x - elx) / bounds.width
        const dy = (y - ely) / bounds.height
        const dist = Math.sqrt(dx * dx + dy * dy)
        const strength = Math.max(0, 1 - dist)
        gsap.to(el, {
          x: dx * 20 * strength,
          y: dy * 20 * strength,
          duration: 0.4,
          ease: Power3.easeOut,
        })
      })
    }

    container.addEventListener('mousemove', moveCursor)
    return () => container.removeEventListener('mousemove', moveCursor)
  }, [])

  // Entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = headlineRef.current
      if (!text) return
      const chars = text.innerText.split('')
      text.innerHTML = chars.map((c) => `<span class="inline-block will-change-transform">${c === ' ' ? '&nbsp;' : c}</span>`).join('')
      const spans = text.querySelectorAll('span')
      gsap.fromTo(
        spans,
        { y: 60, opacity: 0, rotateX: -50 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: Power3.easeOut, stagger: 0.03 }
      )
      gsap.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: Power3.easeOut }
      )
      gsap.fromTo(
        btnRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: Power3.easeOut }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Morphing gradient background
  useEffect(() => {
    const el = gradientRef.current
    if (!el) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(el, { '--c1': '#93c5fd', '--c2': '#d8b4fe', duration: 6, ease: 'none' })
      .to(el, { '--c1': '#fbcfe8', '--c2': '#a7f3d0', duration: 6, ease: 'none' })
      .to(el, { '--c1': '#bfdbfe', '--c2': '#fecaca', duration: 6, ease: 'none' })
    return () => tl.kill()
  }, [])

  // Button pulsing
  useEffect(() => {
    if (!btnRef.current) return
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(btnRef.current, { scale: 1.03, duration: 1.2, ease: 'power1.inOut' })
      .to(btnRef.current, { scale: 1, duration: 1.2, ease: 'power1.inOut' })
    return () => tl.kill()
  }, [])

  // Parallax for floating items
  useEffect(() => {
    const container = rootRef.current
    if (!container) return
    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      const mx = (e.clientX - rect.left - rect.width / 2) / rect.width
      const my = (e.clientY - rect.top - rect.height / 2) / rect.height
      magneticRefs.current.forEach((el, idx) => {
        if (!el) return
        gsap.to(el, { x: mx * (10 + idx * 5), y: my * (10 + idx * 5), duration: 0.8, ease: Power3.easeOut })
      })
    }
    container.addEventListener('mousemove', onMove)
    return () => container.removeEventListener('mousemove', onMove)
  }, [])

  const setMagRef = (el, i) => {
    magneticRefs.current[i] = el
  }

  return (
    <section ref={rootRef} className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Morphing gradient background */}
      <div ref={gradientRef} className="absolute inset-0" style={{
        background: `radial-gradient(1200px 800px at 20% 20%, var(--c1, #dbeafe), transparent 60%), radial-gradient(1200px 800px at 80% 80%, var(--c2, #f5d0fe), transparent 60%)`,
        filter: 'blur(40px) saturate(120%)',
        opacity: theme === 'dark' ? 0.4 : 0.6,
      }} />

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=)'}} />

      {/* Spline 3D */}
      <div className="absolute inset-0 md:left-1/2 md:w-1/2 h-full">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} onLoad={(app) => { splineRef.current = app }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 ref={headlineRef} className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
            The premium fintech platform you’ll love to use
          </h1>
          <p ref={subRef} className="text-lg md:text-xl text-slate-600 dark:text-slate-300/90 max-w-xl">
            Design, automate, and scale payments with a delightful developer experience and enterprise-grade reliability.
          </p>
          <div className="flex items-center gap-4">
            <button ref={btnRef} onClick={onCTAClick} className="relative group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/40 dark:border-slate-700 text-slate-900 dark:text-white font-semibold">
              <span className="relative z-10">Start free trial</span>
              <ArrowRight className="w-5 h-5" />
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button ref={(el) => setMagRef(el, 0)} className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-900/5 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-800 dark:text-white">
              <Play className="w-5 h-5" /> Watch demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div ref={(el) => setMagRef(el, 1)} className="absolute -top-6 -left-6 w-28 h-28 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl rotate-6" />
          <div ref={(el) => setMagRef(el, 2)} className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400/50 to-fuchsia-400/50 dark:from-blue-500/20 dark:to-fuchsia-500/20 blur-2xl" />
          <div className="relative p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-2xl">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-50/60 to-white/20 dark:from-white/5 dark:to-white/10 border border-white/60 dark:border-white/10" />
          </div>
        </div>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="pointer-events-none fixed z-[60] w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/70 to-fuchsia-500/70 mix-blend-screen -translate-x-1/2 -translate-y-1/2" />
    </section>
  )
}

export default Hero
