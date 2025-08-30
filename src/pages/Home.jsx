import Hero from "../components/Hero";
import ImageGrid from "../components/ImageGrid";
import Services from "../components/Services";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import ContactInline from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageGrid />
      <Services />
       <FAQ />
      <Team />
      <Testimonials />
      <ContactInline />
      <Footer/>
    </>
  );
}
