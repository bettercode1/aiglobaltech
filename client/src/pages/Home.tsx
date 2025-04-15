import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Curriculum from "@/components/sections/Curriculum";
import SkillsTracker from "@/components/sections/SkillsTracker";
import SkillTree from "@/components/sections/SkillTree";
import Benefits from "@/components/sections/Benefits";
import LearningPath from "@/components/sections/LearningPath";
import Pricing from "@/components/sections/Pricing";
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
      <LearningPath />
      <SkillTree />
      <SkillsTracker />
      <Benefits />
      <Pricing />
      <Faq />
      <ApplicationForm />
      <Footer />
    </div>
  );
}
