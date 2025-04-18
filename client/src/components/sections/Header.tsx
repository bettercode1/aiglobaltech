import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import BettercodeLogotype from "../BettercodeLogotype";
import { Link } from "wouter";

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
          ? "bg-gray-900/90 backdrop-blur-md text-white shadow-lg border-b border-red-500/20" 
          : "bg-transparent text-white"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <BettercodeLogotype showText={false} />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a 
            href="#about" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            About
          </a>
          <a 
            href="#curriculum" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
          >
            Curriculum
          </a>
          <a 
            href="#benefits" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
          >
            Benefits
          </a>
          <a 
            href="#pricing" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
          >
            Pricing
          </a>
          <a 
            href="/courses" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
          >
            All Courses
          </a>
          <a 
            href="#faq" 
            className={`font-medium ${scrolled ? 'text-gray-200 hover:text-red-400' : 'text-white/90 hover:text-white'} transition-colors duration-200`}
            onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
          >
            FAQ
          </a>
        </div>
        
        <div className="hidden md:block">
          <a 
            href="#apply" 
            className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 font-medium py-2.5 px-6 rounded shadow-lg hover:shadow-red-900/20 text-center transition-all duration-300 flex items-center justify-center group"
            onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}
          >
            APPLY NOW
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
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-red-500/20 shadow-lg animate-fadeIn">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a 
              href="#about" 
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <a 
              href="#curriculum" 
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('curriculum'); }}
            >
              Curriculum
            </a>
            <a 
              href="#benefits" 
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
            >
              Benefits
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
            >
              Pricing
            </a>
            <a
              href="/courses"
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              All Courses
            </a>
            <a 
              href="#faq" 
              className="block px-3 py-2.5 text-base font-medium text-gray-200 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
            >
              FAQ
            </a>
            <a 
              href="#apply" 
              className="block px-3 py-2.5 text-base font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg mt-4 shadow-md"
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
