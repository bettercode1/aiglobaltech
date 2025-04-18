import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Curriculum from "@/components/sections/Curriculum";
import Benefits from "@/components/sections/Benefits";
import Pricing from "@/components/sections/Pricing";
import OtherCourses from "@/components/sections/OtherCourses";
import Faq from "@/components/sections/Faq";
import ApplicationForm from "@/components/sections/ApplicationForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <Hero />
      <About />
      <Curriculum />
      <Benefits />
      <Pricing />
      <OtherCourses />
      <Faq />
      <ApplicationForm />
      <Footer />
    </div>
  );
}
