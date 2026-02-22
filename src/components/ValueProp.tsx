import { motion } from "motion/react";
import { Target, BarChart3, ShieldCheck, Zap, BrainCircuit } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Stay Disciplined",
    description: "Intelligent guardrails that help you stick to your budget until the very last day of the month."
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description: "Deep analytics into your spending patterns with actionable advice to improve financial health."
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Guidance",
    description: "Personalized financial coaching that adapts to your lifestyle and goals in real-time."
  },
  {
    icon: ShieldCheck,
    title: "Secure Planning",
    description: "Professional-grade tools to map out your financial future with absolute precision."
  },
  {
    icon: Zap,
    title: "Effortless Tracking",
    description: "Seamless integration with your accounts for a zero-friction monitoring experience."
  }
];

export default function ValueProp() {
  return (
    <section id="benefits" className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Built for Financial Authority</h2>
          <p className="text-navy/60 max-w-2xl mx-auto">
            EndSure provides the tools you need to maintain control and confidence in your financial life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-navy/5 hover:shadow-xl hover:shadow-navy/5 transition-all group"
            >
              <div className="w-12 h-12 bg-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald/10 transition-colors">
                <benefit.icon className="w-6 h-6 text-navy group-hover:text-emerald transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{benefit.title}</h3>
              <p className="text-navy/60 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
