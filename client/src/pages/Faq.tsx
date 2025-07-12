import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Faq from "@/components/sections/Faq";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 font-sans text-gray-900">
      <Header isFaqPage={true} />
      <Faq />
      <Footer />
    </div>
  );
} 