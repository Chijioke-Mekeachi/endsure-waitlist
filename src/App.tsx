/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import ValueProp from "./components/ValueProp";
import HowItWorks from "./components/HowItWorks";
import TrustSecurity from "./components/TrustSecurity";
import WaitlistForm from "./components/WaitlistForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald/20 selection:text-emerald">
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <HowItWorks />
        <TrustSecurity />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}

