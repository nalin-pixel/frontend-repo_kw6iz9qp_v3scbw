import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Shield, CreditCard, LineChart } from 'lucide-react'

if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  { icon: Zap, title: 'Instant setup', desc: 'Start accepting payments in minutes with concise APIs.' },
  { icon: Shield, title: 'Bank-grade security', desc: 'End-to-end encryption and continuous monitoring.' },
  { icon: CreditCard, title: 'Global methods', desc: 'Cards, wallets, bank debits, and local rails.' },
  { icon: LineChart, title: 'Real-time analytics', desc: 'Actionable dashboards with anomaly detection.' },
]

const Features = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        rotateX: -10,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center mb-14">Everything you need to scale</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="feature-card group p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl will-change-transform transform-gpu">
              <f.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{f.desc}</p>
              <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-slate-50/60 to-white/20 dark:from-white/5 dark:to-white/10 border border-white/60 dark:border-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
