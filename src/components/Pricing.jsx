import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const plans = [
  { name: 'Starter', price: 0, features: ['Up to 1k payments/mo', 'Basic analytics', 'Email support'] },
  { name: 'Growth', price: 49, features: ['Up to 50k payments/mo', 'Advanced analytics', 'Priority support'] },
  { name: 'Scale', price: 199, features: ['Unlimited payments', 'Custom SLAs', 'Dedicated manager'] },
]

const Pricing = () => {
  const [billing, setBilling] = useState('monthly')
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={ref} className="py-28">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Simple, transparent pricing</h2>
          <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-1">
            <button onClick={() => setBilling('monthly')} className={`px-4 py-2 rounded-xl ${billing==='monthly'?'bg-white dark:bg-slate-800 shadow':'opacity-70'}`}>Monthly</button>
            <button onClick={() => setBilling('yearly')} className={`px-4 py-2 rounded-xl ${billing==='yearly'?'bg-white dark:bg-slate-800 shadow':'opacity-70'}`}>Yearly</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="pricing-card p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{billing==='yearly'?Math.round(p.price*10):p.price}</span>
                <span className="text-slate-600 dark:text-slate-300">/{billing==='yearly'?'yr':'mo'}</span>
              </div>
              <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-200">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> {f}</li>
                ))}
              </ul>
              <button className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">Choose {p.name}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
