import { useState } from "react";
import { BrainCircuit, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <div className="text-purple-500 mr-2">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <span className="font-sans font-semibold text-xl">AI<span className="text-purple-500">Future</span></span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a 
            href="#about" 
            className="font-medium hover:text-purple-500 transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            About
          </a>
          <a 
            href="#curriculum" 
            className="font-medium hover:text-purple-500 transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
          >
            Curriculum
          </a>
          <a 
            href="#benefits" 
            className="font-medium hover:text-purple-500 transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
          >
            Benefits
          </a>
          <a 
            href="#pricing" 
            className="font-medium hover:text-purple-500 transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            className="font-medium hover:text-purple-500 transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
          >
            FAQ
          </a>
        </div>
        
        <div className="hidden md:block">
          <a 
            href="#apply" 
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition"
            onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}
          >
            Apply Now
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="#about" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <a 
              href="#curriculum" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
            >
              Curriculum
            </a>
            <a 
              href="#benefits" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
            >
              Benefits
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
            >
              FAQ
            </a>
            <a 
              href="#apply" 
              className="block px-3 py-2 text-base font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-md mt-4"
              onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
