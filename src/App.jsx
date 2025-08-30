import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <div className="bg-darkBg text-lightText min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/testimonials" element={<Testimonials />} /> 
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main> 
      {/* <Footer /> */}
    </div>
  );
}
