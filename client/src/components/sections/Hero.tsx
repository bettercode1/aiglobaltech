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
    <section id="hero" className="pt-24 pb-8 md:pt-32 md:pb-16 bg-black text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNSBMNSAwIEwwIDAiIHN0cm9rZT0iIzAwZjVmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500"></div>
        <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwYWY1ZmYyMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute top-20 left-10 w-20 h-20 border border-cyan-500/30"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 border border-cyan-500/30 rounded-full"></div>
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
              A comprehensive 6-month workshop and internship program designed for anyone who wants to learn AI and survive in the AI-driven future—no engineering background required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-black border border-cyan-500/50 text-cyan-400 hover:bg-gray-900 font-medium py-3 px-6 rounded shadow-lg hover:shadow-cyan-900/20 text-center transition-all duration-300 flex items-center justify-center group"
              >
                <span className="mr-2 font-mono text-sm tracking-wider">{">"}</span>
                APPLY.exe
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="bg-gray-900/80 border border-white/10 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-400 font-medium py-3 px-6 rounded shadow-lg text-center transition-all duration-300 font-mono tracking-wide"
              >
                &lt;view_curriculum/&gt;
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            {/* Image frame with decorative elements */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/40 to-cyan-500/40 rounded blur-sm"></div>
              <div className="absolute -inset-1 border border-purple-500/50 rounded"></div>
              <div className="relative overflow-hidden rounded shadow-2xl border border-cyan-500/30">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-transparent p-2 z-20 flex justify-between items-center border-b border-purple-500/30 text-xs font-mono text-purple-400">
                  <span>AILH_PROGRAM_v3.0.exe</span>
                  <span className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-1"></span>
                    <span>ENROLLING</span>
                  </span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="AI Learning Hub Workshop" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700 brightness-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>
              </div>
              <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-md p-3 rounded border border-cyan-500/30 shadow-xl">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-cyan-400 mr-1" />
                  <span className="font-bold text-white">4.9/5</span>
                  <span className="ml-2 text-xs text-gray-300 font-mono">[190+ reviews]</span>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-purple-500/50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-cyan-500/50"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 py-5 px-8 bg-gray-900/50 rounded border border-cyan-500/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500"></div>
          <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-transparent to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-transparent to-cyan-500"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center relative z-10">
            <div className="transform hover:scale-105 transition-transform duration-300 bg-black/30 p-4 rounded border border-cyan-500/10 hover:border-cyan-500/30">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-black border border-cyan-500/30 rounded">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white"><span className="text-cyan-400 font-mono">06</span></p>
              <p className="text-gray-400 font-mono text-xs">PROGRAM_MONTHS</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-black/30 p-4 rounded border border-blue-500/10 hover:border-blue-500/30">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-black border border-blue-500/30 rounded">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white"><span className="text-blue-400 font-mono">03+</span></p>
              <p className="text-gray-400 font-mono text-xs">INTERNSHIP_MONTHS</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-black/30 p-4 rounded border border-indigo-500/10 hover:border-indigo-500/30">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-black border border-indigo-500/30 rounded">
                  <Star className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white"><span className="text-indigo-400 font-mono">15+</span></p>
              <p className="text-gray-400 font-mono text-xs">GENAI_TOOLS</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-black/30 p-4 rounded border border-purple-500/10 hover:border-purple-500/30">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-black border border-purple-500/30 rounded">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white"><span className="text-purple-400 font-mono">10+</span></p>
              <p className="text-gray-400 font-mono text-xs">INDUSTRY_EXPERTS</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => scrollToSection('about')}
            className="group text-cyan-400 hover:text-cyan-300 transition flex flex-col items-center"
          >
            <span className="mb-2 font-mono text-xs tracking-wider">SCROLL_DOWN.exe</span>
            <div className="p-2 bg-black/50 rounded border border-cyan-500/30 shadow-md group-hover:border-cyan-500/50 transition-all duration-300">
              <ChevronDown className="animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
