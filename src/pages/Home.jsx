import Hero from "../components/Hero";
import ImageGrid from "../components/ImageGrid";
import Services from "../components/Services";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import ContactInline from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageGrid />
      <Services />
      <Team />
      <Testimonials />
      <ContactInline />
    </>
  );
}
