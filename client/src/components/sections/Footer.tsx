import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ExternalLink, ChevronUp, ArrowRight } from "lucide-react";
import BettercodeLogotype from "../BettercodeLogotype";

export default function Footer() {
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
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Digital grid background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
        
        {/* Circuit-like digital lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 Q50,50 100,100 T200,100 T300,100 T400,100" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <path d="M0,200 Q50,150 100,200 T200,200 T300,200 T400,200" stroke="#0ea5e9" strokeWidth="1" fill="none" />
            <path d="M100,0 Q150,50 100,100 T100,200 T100,300 T100,400" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <path d="M200,0 Q250,50 200,100 T200,200 T200,300 T200,400" stroke="#0ea5e9" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-cyan-400/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back to top button */}
        <div className="absolute right-8 -top-10">
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 shadow-lg group"
            aria-label="Back to top"
          >
            <ChevronUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Grid sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="mb-6">
              <BettercodeLogotype showText={true} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering the next generation of AI professionals through comprehensive training and real-world experience. Join us on the journey to shape the future of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-sans font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span>About</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('curriculum')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span>Curriculum</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span>Benefits</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span>Pricing</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span>FAQ</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-sans font-bold text-lg mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => alert('Terms & Conditions: This AI training program is provided by AI Learning Hub (AILH). By enrolling in the program, you agree to our terms of service including attendance, code of conduct, and intellectual property policies.')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span>Terms & Conditions</span>
                  <ExternalLink className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button onClick={() => alert('Privacy Policy: We collect personal information solely for program administration. Your data is securely stored and never shared with unauthorized third parties. You have the right to access and request deletion of your information.')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span>Privacy Policy</span>
                  <ExternalLink className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <button onClick={() => alert('Refund Policy: Full refunds available if requested within 7 days of payment. Partial refunds of 50% if requested before the program begins. No refunds available once the program has started.')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span>Refund Policy</span>
                  <ExternalLink className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
              <li>
                <a href="mailto:info@ailearninghub.com?subject=Career%20Inquiry" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span>Careers</span>
                  <ExternalLink className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>
          
          <div id="contact" className="md:col-span-4">
            <h4 className="font-sans font-bold text-lg mb-6 text-white">Contact Us</h4>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4 mt-0.5 text-cyan-400 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <a href="https://g.co/kgs/h98RWH7" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">AI Learning Hub, Pimpri Chinchwad, Pune 411033</a>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4 mt-0.5 text-cyan-400 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <a href="mailto:info@ailearninghub.com" className="text-gray-300 hover:text-white transition-colors duration-300">info@ailearninghub.com</a>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4 mt-0.5 text-cyan-400 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <a href="tel:+919028757042" className="text-gray-300 hover:text-white transition-colors duration-300">+91 90287 57042</a>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4 mt-0.5 text-cyan-400 flex-shrink-0">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">www.ailearninghub.com</a>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <button 
                  onClick={() => scrollToSection('apply')}
                  className="w-full bg-black border border-cyan-500/50 text-cyan-400 hover:bg-gray-900 font-medium py-3 px-6 rounded shadow-lg hover:shadow-cyan-900/20 text-center transition-all duration-300 flex items-center justify-center group"
                >
                  <span className="mr-2 font-mono text-sm tracking-wider">{">"}</span>
                  APPLY.exe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-6 md:mb-0">© {currentYear} AI Learning Hub (AILH). All rights reserved.</p>
            <div className="text-gray-400 text-sm max-w-2xl text-center md:text-right">
              <p className="mb-1">*Disclaimer: Job placement after the internship is subject to performance evaluation, available positions, and market conditions.</p>
              <p>All program details are subject to change. Please refer to the most recent communications for up-to-date information.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
