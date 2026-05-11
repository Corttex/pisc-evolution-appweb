import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Differentials } from "@/components/Differentials";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";

import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Sustainability } from "@/components/Sustainability";
import { SmartMaintenance } from "@/components/SmartMaintenance";
import { getConfig } from "./actions/config";

export default async function Home() {
  const config = await getConfig();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar config={config} />
      <Hero config={config} />
      <Services />
      <Sustainability />
      <BeforeAfter />
      <Differentials />
      <SmartMaintenance />
      <Process />
      <Testimonials />
      <FAQ />

      <Footer config={config} />
      <WhatsAppButton config={config} />
    </main>
  );
}
