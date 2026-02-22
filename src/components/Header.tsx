import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-navy/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center">
            <img src={'/public/logo.png'}  className="rounded-[20%]"/>
          </div>
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-navy to-green-500 bg-clip-text text-transparent">EndSure</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70">
          <a href="#benefits" className="hover:text-navy transition-colors">Benefits</a>
          <a href="#how-it-works" className="hover:text-navy transition-colors">How it Works</a>
          <a href="#security" className="hover:text-navy transition-colors">Security</a>
        </nav>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-navy text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-navy/90 transition-all"
        >
          Join Waitlist
        </motion.button>
      </div>
    </header>
  );
}
