import { Laptop, Briefcase, Building, Check, ArrowRight, Brain, Code, Network } from "lucide-react";

export default function About() {
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
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJjaXJjdWl0IiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDUwIEwxMCA1MCBMMTAgNjAgTDIwIDYwIEwyMCA1MCBMNDAgNTAgTDQwIDYwIEw1MCA2MCBMNTAgNDAgTDYwIDQwIEw2MCAzMCBMNDAgMzAgTDQwIDIwIEw1MCAyMCBMNTAgMTAgTDQwIDEwIEw0MCAwIEwzMCAwIEwzMCAxMCBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmNWZmMjAiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNjaXJjdWl0KSIgLz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-cyan-500"></div>
        <div className="absolute left-0 top-20 w-1 h-40 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-32 bg-gradient-to-t from-cyan-500 to-transparent"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-cyan-500/20"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full blur-3xl opacity-70"></div>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-900/50 text-cyan-400 font-semibold text-sm mb-4 relative border border-cyan-500/30">ABOUT THE PROGRAM</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 relative text-white">
            Transform Your Career with <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Skills</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg relative">
            Our workshop cum internship program welcomes everyone who wants to master AI, regardless of technical background. We'll equip you with the skills needed to survive and thrive in the rapidly evolving AI landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-500/20 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded bg-cyan-900/50 text-cyan-400 mb-6 group-hover:bg-cyan-500/30 group-hover:text-white transition-all duration-300">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">Comprehensive Learning</h3>
            <p className="text-gray-400 leading-relaxed">
              From AI fundamentals to advanced GenAI techniques, our curriculum is designed for all backgrounds—no coding experience required. Learn practical AI skills with expert guidance.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/20 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded bg-blue-900/50 text-blue-400 mb-6 group-hover:bg-blue-500/30 group-hover:text-white transition-all duration-300">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Real-World Experience</h3>
            <p className="text-gray-400 leading-relaxed">
              Gain 2 months of hands-on internship experience working on actual projects with industry mentors. Build a portfolio that showcases your skills to potential employers.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded bg-purple-900/50 text-purple-400 mb-6 group-hover:bg-purple-500/30 group-hover:text-white transition-all duration-300">
              <Network className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">Industry Connections</h3>
            <p className="text-gray-400 leading-relaxed">
              Attend seminars by AI leaders and build your professional network through our industry partnerships. Connect with professionals who share your passion.
            </p>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-cyan-500/10 rounded-lg blur-xl -z-10"></div>
              <div className="relative overflow-hidden rounded-lg shadow-xl border border-cyan-500/30">
                <img 
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="AI learning environment" 
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-2 py-1 bg-cyan-900/70 text-cyan-400 text-xs font-mono mb-2 rounded border border-cyan-500/30">AI_TRAINING_ENVIRONMENT</div>
                  <p className="text-white font-medium">Hands-on training with cutting-edge AI technologies</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="font-sans font-bold text-3xl mb-6 text-white">Who is this program for?</h3>
              <ul className="space-y-4">
                <li className="flex items-start p-3 bg-gray-800 rounded shadow-md border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-cyan-900/50 rounded text-cyan-400">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Final year students</h4>
                    <p className="text-gray-400">Looking to enter the AI field with practical skills</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-800 rounded shadow-md border border-blue-500/20 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-blue-900/50 rounded text-blue-400">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Fresh graduates</h4>
                    <p className="text-gray-400">Seeking to enhance job prospects with in-demand AI skills</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-800 rounded shadow-md border border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-indigo-900/50 rounded text-indigo-400">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Professionals</h4>
                    <p className="text-gray-400">Looking to transition into AI & GenAI roles</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-800 rounded shadow-md border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-purple-900/50 rounded text-purple-400">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI enthusiasts</h4>
                    <p className="text-gray-400">Passionate about learning cutting-edge AI technologies</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-800 rounded shadow-md border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-cyan-900/50 rounded text-cyan-400">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Non-technical individuals</h4>
                    <p className="text-gray-400">Anyone who wants to survive and thrive in the AI-driven future</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-10">
                <button 
                  onClick={() => scrollToSection('apply')}
                  className="bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/50 font-medium py-3 px-6 rounded shadow-md hover:shadow-lg transition-all duration-300 flex items-center group"
                >
                  <span className="mr-2 font-mono text-sm tracking-wider">{">"}</span>
                  JOIN PROGRAM
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
