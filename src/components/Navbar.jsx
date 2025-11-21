import React, { useEffect, useState } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-fuchsia-500" />
            <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">NovaPay</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-slate-700 dark:text-slate-200">
            <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#pricing">Pricing</a>
            <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#testimonials">Customers</a>
            <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#faq">FAQ</a>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10 text-slate-900 dark:text-white">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10">
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', bounce: 0.25 }} className="md:hidden mx-6 mt-2 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg overflow-hidden">
            <div className="p-4 flex flex-col gap-3 text-slate-800 dark:text-slate-100">
              <a href="#features" className="py-2">Features</a>
              <a href="#pricing" className="py-2">Pricing</a>
              <a href="#testimonials" className="py-2">Customers</a>
              <a href="#faq" className="py-2">FAQ</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
