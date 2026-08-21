import { LazyMotion, domAnimation } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Method } from "@/sections/Method";
import { Metrics } from "@/sections/Metrics";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";

export default function App() {
  // domAnimation ships the animation, exit and viewport features only: roughly
  // half of the full motion bundle, and everything this page actually uses.
  return (
    <LazyMotion features={domAnimation} strict>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-chalk focus:px-5 focus:py-3 focus:text-sm focus:text-void"
      >
        Aller au contenu
      </a>

      <Header />

      <main id="contenu">
        <Hero />
        <Metrics />
        <Services />
        <About />
        <Method />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <div className="grain" aria-hidden="true" />
    </LazyMotion>
  );
}
