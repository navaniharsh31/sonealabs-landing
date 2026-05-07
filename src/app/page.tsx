import Hero from "@/components/sections/Hero";
import Receipts from "@/components/sections/Receipts";
import Showcases from "@/components/sections/Showcases";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Book from "@/components/sections/Book";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Receipts />
      <Showcases />
      <Process />
      <Services />
      <About />
      <Book />
      <FAQ />
      <Footer />
    </>
  );
}
