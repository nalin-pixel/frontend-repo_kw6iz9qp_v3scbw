import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'How secure is the platform?', a: 'We use bank-grade encryption, regular audits, and continuous monitoring to keep your data safe.' },
  { q: 'Can I use my existing bank accounts?', a: 'Yes, connect accounts and methods from dozens of providers in minutes.' },
  { q: 'Do you offer discounts?', a: 'Annual plans come with 2 months free and volume discounts are available for enterprises.' },
]

const FAQ = () => {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center mb-10">Frequently asked questions</h2>
        <div className="mx-auto max-w-3xl">
          {faqs.map((f, i) => (
            <div key={i} className="mb-3 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg">
              <button onClick={() => setOpen(open===i?null:i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="text-slate-800 dark:text-slate-100 font-semibold">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${open===i?'rotate-180':''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', bounce: 0.3 }}>
                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
