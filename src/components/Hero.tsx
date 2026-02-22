import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald/10 text-emerald text-xs font-bold uppercase tracking-wider mb-6">
            Coming Soon
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-navy mb-6 leading-[1.1]">
            Master Your Month-End <br className="hidden md:block" />
            With Absolute <span className="text-emerald">Confidence.</span>
          </h1>
          <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            EndSure is the premium financial discipline platform designed for those who demand stability. 
            Take control of your spending and secure your financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-emerald text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-emerald/20 hover:bg-emerald/90 transition-all flex items-center justify-center gap-2"
            >
              Join the Waitlist <ArrowRight className="w-5 h-5" />
            </motion.button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-navy hover:bg-navy/5 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0  z-10" />
          <div className="bg-offwhite rounded-3xl border border-navy/5 p-4 md:p-8 shadow-2xl shadow-navy/5 overflow-hidden">
             <div className="aspect-[16/9] bg-white rounded-2xl border border-navy/5 flex items-center justify-center overflow-hidden">
                <img 
                  src="/public/mainpage.png" 
                  alt="EndSure Dashboard Preview" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
