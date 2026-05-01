import Hero from "@/components/sections/Hero";
import Receipts from "@/components/sections/Receipts";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Book from "@/components/sections/Book";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Receipts />
      <Process />
      <Services />
      <About />
      <Book />
      <Footer />
    </>
  );
}
