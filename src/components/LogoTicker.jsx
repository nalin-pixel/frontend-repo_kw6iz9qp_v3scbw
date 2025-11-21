import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const logos = ['Visa', 'Mastercard', 'Stripe', 'Plaid', 'Apple Pay', 'Google Pay']

const LogoTicker = () => {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(track, { x: '-50%', duration: 20, ease: 'none' })
    return () => tl.kill()
  }, [])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10">
          <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap p-6 will-change-transform">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="text-slate-600 dark:text-slate-300 text-lg font-semibold opacity-70">{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoTicker
