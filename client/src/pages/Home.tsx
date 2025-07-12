import { useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import OtherCourses from "@/components/sections/OtherCourses";
import Curriculum from "@/components/sections/Curriculum";
import Pricing from "@/components/sections/Pricing";
import ApplicationForm from "@/components/sections/ApplicationForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [location] = useLocation();
  useEffect(() => {
    // Remove hash-based scroll logic
    // Only scroll to application form if scrollTo=apply is present in query
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('scrollTo') === 'apply') {
        const el = document.getElementById('apply');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        // Remove the query param from the URL
        params.delete('scrollTo');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <Hero />
      <About />
      <Curriculum />
      {/* <Pricing /> */}
      <OtherCourses />
      <ApplicationForm />
      <Footer />
    </div>
  );
}
