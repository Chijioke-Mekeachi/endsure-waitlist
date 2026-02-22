import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 border-t border-navy/5 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-navy rounded flex items-center justify-center">
            <ShieldCheck className="text-emerald w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-navy">EndSure</span>
        </div>
        
        <div className="text-navy/40 text-sm">
          &copy; {currentYear} EndSure Financial Technology. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-navy/60">
          <a href="#" className="hover:text-navy transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-navy transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-navy transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
