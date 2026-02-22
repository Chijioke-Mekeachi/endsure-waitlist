import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";

const SUPABASE_URL =
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

type WaitlistError = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

function generateReferralCode(length = 8) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  let result = "";

  for (let i = 0; i < length; i++) {
    result += alphabet[randomValues[i] % alphabet.length];
  }

  return result;
}

async function joinWaitlist(email: string, referredBy: string | null) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Waitlist is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        email,
        referral_code: generateReferralCode(),
        referred_by: referredBy,
      }),
    });

    if (response.ok) {
      return;
    }

    const errors = (await response.json()) as WaitlistError[] | WaitlistError;
    const error = Array.isArray(errors) ? errors[0] : errors;
    const reason = `${error?.message || ""} ${error?.details || ""}`.toLowerCase();

    if (
      response.status === 409 &&
      reason.includes("referral_code") &&
      attempt < 3
    ) {
      continue;
    }

    if (response.status === 409 && reason.includes("email")) {
      throw new Error("This email is already on the waitlist.");
    }

    throw new Error(error?.message || "Failed to join waitlist. Please try again.");
  }

  throw new Error("Failed to generate a unique referral code. Please try again.");
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const referredBy = params.get("ref");

      await joinWaitlist(normalizedEmail, referredBy);

      setStatus("success");
      setEmail("");
      setName("");
    } catch (error) {
      setStatus("idle");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
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
                {errorMessage ? (
                  <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                ) : null}
                
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
