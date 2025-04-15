import { ChevronDown, ArrowRight, Sparkles, Zap, Star, Users } from "lucide-react";

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
    <section id="hero" className="pt-24 pb-8 md:pt-32 md:pb-16 bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-12">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/20 shadow-lg">
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                New Batch Starting Soon
              </span>
            </div>
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 tracking-tight">
              Your Future in <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI & GenAI</span> Starts Here
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              A comprehensive 6-month workshop and internship program designed for final year students and fresh graduates to master AI and Generative AI technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl text-center transition-all duration-300 flex items-center justify-center group"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full shadow-lg text-center transition-all duration-300"
              >
                View Curriculum
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            {/* Image frame with decorative elements */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-md opacity-70"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="AI Workshop" 
                  className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-xl">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-bold">4.9/5</span>
                  <span className="ml-2 text-sm text-gray-200">(190+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 py-5 px-8 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">6</p>
              <p className="text-gray-200 font-medium">Months Program</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">3+</p>
              <p className="text-gray-200 font-medium">Months Internship</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-indigo-500/20 rounded-full">
                  <Star className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">15+</p>
              <p className="text-gray-200 font-medium">GenAI Tools</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-violet-500/20 rounded-full">
                  <Users className="h-6 w-6 text-violet-400" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">10+</p>
              <p className="text-gray-200 font-medium">Industry Experts</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => scrollToSection('about')}
            className="group text-white hover:text-purple-200 transition flex flex-col items-center"
          >
            <span className="mb-2 font-medium">Learn More</span>
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md group-hover:bg-white/20 transition-all duration-300">
              <ChevronDown className="animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
