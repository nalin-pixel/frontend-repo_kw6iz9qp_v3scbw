import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const testimonials = [
  { quote: 'Moved our entire payments stack in 2 weeks. 10/10 experience.', author: 'Maya, CTO @ Lumen' },
  { quote: 'Revenue up 18% after switching. The analytics are unmatched.', author: 'Jacob, CEO @ Halo' },
  { quote: 'From sandbox to production over a weekend. Support is stellar.', author: 'Alina, PM @ Flow' },
]

const Testimonials = () => {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t-card', { x: 80, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={ref} className="py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center mb-12">Loved by modern teams</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="t-card p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl">
              <p className="text-lg text-slate-800 dark:text-slate-100">“{t.quote}”</p>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
