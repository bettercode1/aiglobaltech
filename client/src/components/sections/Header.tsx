import { useState, useEffect } from "react";
import { BrainCircuit, Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md text-gray-800 shadow-lg" 
          : "bg-transparent text-white"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <div className="text-purple-600 mr-2">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <span className="font-sans font-bold text-2xl">AI<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Future</span></span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a 
            href="#about" 
            className={`font-medium ${scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            About
          </a>
          <a 
            href="#curriculum" 
            className={`font-medium ${scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
          >
            Curriculum
          </a>
          <a 
            href="#benefits" 
            className={`font-medium ${scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
          >
            Benefits
          </a>
          <a 
            href="#pricing" 
            className={`font-medium ${scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            className={`font-medium ${scrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
          >
            FAQ
          </a>
        </div>
        
        <div className="hidden md:block">
          <a 
            href="#apply" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center group"
            onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}
          >
            Apply Now
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className={scrolled ? "text-gray-800" : "text-white"}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg animate-fadeIn">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a 
              href="#about" 
              className="block px-3 py-2.5 text-base font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <a 
              href="#curriculum" 
              className="block px-3 py-2.5 text-base font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
            >
              Curriculum
            </a>
            <a 
              href="#benefits" 
              className="block px-3 py-2.5 text-base font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
            >
              Benefits
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-2.5 text-base font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="block px-3 py-2.5 text-base font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
            >
              FAQ
            </a>
            <a 
              href="#apply" 
              className="block px-3 py-2.5 text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg mt-4 shadow-md"
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
