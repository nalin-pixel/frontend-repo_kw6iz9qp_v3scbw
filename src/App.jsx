import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoTicker from './components/LogoTicker'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Lenis from '@studio-freight/lenis'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, smoothTouch: false })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <Navbar theme={theme} setTheme={setTheme} />

      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pt-24"
        >
          <Hero theme={theme} onCTAClick={() => window.alert('Start your free trial!')} />
          <LogoTicker />
          <Features />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}

export default App
