import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
    setName("");
  };

  return (
    <section id="waitlist" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-offwhite rounded-[2.5rem] p-8 md:p-16 border border-navy/5 text-center relative overflow-hidden">
          {/* Decorative Gold Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center py-10"
              >
                <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald" />
                </div>
                <h2 className="text-3xl font-bold text-navy mb-4">You're on the list!</h2>
                <p className="text-navy/60 max-w-sm mx-auto">
                  Thank you for joining EndSure. We'll notify you as soon as early access becomes available.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-emerald font-bold hover:underline"
                >
                  Join with another email
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Secure Your Early Access</h2>
                <p className="text-navy/60 mb-10">
                  Join the exclusive waitlist for EndSure and be among the first to master your month-end.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-navy/10 focus:border-emerald focus:ring-4 focus:ring-emerald/5 outline-none transition-all text-navy"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-navy/10 focus:border-emerald focus:ring-4 focus:ring-emerald/5 outline-none transition-all text-navy"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={status === "loading"}
                    className="w-full bg-emerald text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-emerald/20 hover:bg-emerald/90 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Join the Waitlist"
                    )}
                  </motion.button>
                </form>
                
                <p className="mt-6 text-sm text-navy/40">
                  No spam. Early access updates only. Your data is secure.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
