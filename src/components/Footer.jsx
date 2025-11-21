import React from 'react'
import { Twitter, Github, Linkedin } from 'lucide-react'

const Footer = () => {
  const socials = [
    { Icon: Twitter, href: '#' },
    { Icon: Github, href: '#' },
    { Icon: Linkedin, href: '#' },
  ]

  return (
    <footer className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-fuchsia-500" />
            <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">NovaPay</span>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({Icon, href}, i) => (
              <a key={i} href={href} className="group inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 dark:bg-white/5 border border-white/60 dark:border-white/10">
                <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform" />
              </a>) )}
          </div>
        </div>
        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} NovaPay Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
