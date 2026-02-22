import { motion } from "motion/react";
import { Shield, Lock, EyeOff, Server } from "lucide-react";

export default function TrustSecurity() {
  return (
    <section id="security" className="py-24 bg-navy text-white overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-emerald text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-3 h-3" /> Professional Grade
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Your Financial Data, <br />
              Protected by Iron-Clad Security.
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              We prioritize your privacy above all else. EndSure uses industry-leading encryption 
              and secure infrastructure to ensure your data remains yours alone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">AES-256 Encryption</h4>
                  <p className="text-sm text-white/40">Bank-level security for all data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <EyeOff className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Privacy First</h4>
                  <p className="text-sm text-white/40">We never sell your personal data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Secure Infrastructure</h4>
                  <p className="text-sm text-white/40">Multi-layered cloud protection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">SOC 2 Compliant</h4>
                  <p className="text-sm text-white/40">Rigorous security standards.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                         <Shield className="text-navy w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-sm font-bold">Security Status</div>
                         <div className="text-xs text-emerald font-medium">Active & Protected</div>
                      </div>
                   </div>
                   <div className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Verified
                   </div>
                </div>
                
                <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 gap-4">
                         <div className="w-2 h-2 rounded-full bg-emerald" />
                         <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: `${40 + i * 15}%` }}
                               transition={{ duration: 1, delay: i * 0.2 }}
                               className="h-full bg-emerald/50" 
                            />
                         </div>
                      </div>
                   ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                   <p className="text-xs text-white/30 italic">
                      "EndSure provides the most secure environment for financial planning I've ever used."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
