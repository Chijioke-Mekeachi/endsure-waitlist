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
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

export default function App() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") : "";
  const isAdminRoute = currentPath === "/admin";

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-navy selection:bg-emerald/20 selection:text-emerald">
        <main>
          <AdminDashboard />
        </main>
      </div>
    );
  }

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
