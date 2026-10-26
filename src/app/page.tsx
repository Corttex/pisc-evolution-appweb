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
import { getSections } from "./actions/sections";

export default async function Home() {
  const config = await getConfig();
  const sections = await getSections();

  return (
    <main className="min-h-screen bg-background">
      <Navbar config={config} />
      <div className="overflow-x-hidden">
        <Hero config={config} content={sections.hero} />
        <Services content={sections.services} />
        <Sustainability content={sections.sustainability} />
        <BeforeAfter />
        <Differentials content={sections.differentials} />
        <SmartMaintenance />
        <Process />
        <Testimonials content={sections.testimonials} />
        <FAQ content={sections.faq} />

        <Footer config={config} />
        <WhatsAppButton config={config} />
      </div>
    </main>
  );
}

