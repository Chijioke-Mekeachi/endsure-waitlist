import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Join our exclusive waitlist to secure your spot in the next wave of early access."
  },
  {
    number: "02",
    title: "Get Early Access",
    description: "Be the first to experience the platform and shape the future of financial discipline."
  },
  {
    number: "03",
    title: "Take Control",
    description: "Start your journey towards month-end security and ultimate financial confidence."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Simple Path to Security</h2>
            <p className="text-navy/60">
              We've streamlined the process so you can focus on what matters: your financial stability.
            </p>
          </div>
          <div className="text-navy/20 font-display font-black text-6xl md:text-8xl hidden md:block select-none">
            PROCESS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-navy/10 -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-white border-4 border-offwhite rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span className="text-2xl font-black text-emerald">{step.number}</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{step.title}</h3>
              <p className="text-navy/60 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
