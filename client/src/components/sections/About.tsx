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
    <section id="about" className="py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiIG9wYWNpdHk9IjAuMDQiPjxyZWN0IHg9IjE5IiB5PSIxOSIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzYzNjZmMSIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PC9zdmc+')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-purple-200 rounded-full blur-2xl opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full blur-3xl opacity-70"></div>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4 relative">ABOUT THE PROGRAM</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 relative">
            Transform Your Career with <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AI Skills</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg relative">
            Our workshop cum internship program is designed to equip you with the skills needed to thrive in the rapidly evolving AI landscape, from fundamentals to advanced applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 group-hover:text-blue-600 transition-colors duration-300">Comprehensive Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              From AI fundamentals to advanced GenAI techniques, our curriculum covers everything you need to build practical applications. Learn by doing with expert guidance.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 group-hover:text-indigo-600 transition-colors duration-300">Real-World Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              Gain 3 months of hands-on internship experience working on actual projects with industry mentors. Build a portfolio that showcases your skills to potential employers.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Network className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl mb-3 group-hover:text-purple-600 transition-colors duration-300">Industry Connections</h3>
            <p className="text-gray-600 leading-relaxed">
              Attend seminars by AI leaders and build your professional network through our industry partnerships. Connect with professionals who share your passion.
            </p>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-3xl blur-xl opacity-70 -z-10"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="AI learning environment" 
                  className="w-full h-auto rounded-2xl hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-medium">Hands-on training with cutting-edge AI technologies</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="font-sans font-bold text-3xl mb-6 text-gray-800">Who is this program for?</h3>
              <ul className="space-y-4">
                <li className="flex items-start p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Final year students</h4>
                    <p className="text-gray-600">Looking to enter the AI field with practical skills</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Fresh graduates</h4>
                    <p className="text-gray-600">Seeking to enhance job prospects with in-demand AI skills</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Professionals</h4>
                    <p className="text-gray-600">Looking to transition into AI & GenAI roles</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-violet-200 hover:shadow transition-all duration-300">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI enthusiasts</h4>
                    <p className="text-gray-600">Passionate about learning cutting-edge AI technologies</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-10">
                <button 
                  onClick={() => scrollToSection('apply')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center group"
                >
                  Join Our Program
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
