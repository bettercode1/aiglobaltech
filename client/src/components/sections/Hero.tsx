import { ChevronDown } from "lucide-react";

export default function Hero() {
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

  return (
    <section id="hero" className="pt-24 pb-8 md:pt-32 md:pb-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8">
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              Your Future in <span className="text-purple-500">AI & GenAI</span> Starts Here
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              A comprehensive 6-month workshop and internship program designed for final year students and fresh graduates to master AI and Generative AI technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md text-center transition"
              >
                Apply Now
              </button>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md text-center transition"
              >
                View Curriculum
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="AI Workshop" 
              className="rounded-lg shadow-xl w-full h-auto" 
            />
          </div>
        </div>
        
        <div className="mt-16 py-4 px-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-purple-500 font-bold text-3xl">6</p>
              <p className="text-gray-300">Months Program</p>
            </div>
            <div>
              <p className="text-purple-500 font-bold text-3xl">3+</p>
              <p className="text-gray-300">Months Internship</p>
            </div>
            <div>
              <p className="text-purple-500 font-bold text-3xl">15+</p>
              <p className="text-gray-300">GenAI Tools</p>
            </div>
            <div>
              <p className="text-purple-500 font-bold text-3xl">10+</p>
              <p className="text-gray-300">Industry Experts</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition flex flex-col items-center"
          >
            <span className="mb-2">Learn More</span>
            <ChevronDown className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
