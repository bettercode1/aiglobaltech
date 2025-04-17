import { BookOpen, Briefcase, Check, Brain, Lightbulb, Code, Rocket, Zap } from "lucide-react";

export default function Curriculum() {
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
    <section id="curriculum" className="py-16 bg-gradient-to-br from-red-50 to-orange-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMCkiIG9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0xMCAzMCBMNTAgMzAiIHN0cm9rZT0iI2VmNDQ0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-red-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-red-500 font-medium">CURRICULUM</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">What You'll Learn</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Our comprehensive curriculum takes you from AI fundamentals to building advanced GenAI applications over a 5-month journey (3-month workshop + 2-month internship).
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-sans font-semibold text-xl">Program Structure</h3>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full text-red-500 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-semibold text-lg">Phase 1: Workshop (3 Months)</h4>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Live instructor-led sessions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Hands-on practice with 15+ AI tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Weekly assignments & projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Industry expert seminars & networking</span>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/2 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-full text-orange-500 mr-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-semibold text-lg">Phase 2: Internship (2 Months)</h4>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">Real-world industry projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">1:1 Mentorship from industry experts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">Professional portfolio development</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">Opportunity for job placement*</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-red-50 p-4 border-b border-gray-200">
              <h3 className="font-sans font-semibold text-xl text-center">Workshop Content (BuildSchool Curriculum)</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2 flex items-center">
                    <Brain className="h-5 w-5 text-red-500 mr-2" />
                    Module 1: AI Foundations (2 weeks)
                  </h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Introduction to AI concepts and terminology</li>
                    <li className="text-sm text-gray-600">• Understanding Large Language Models (LLMs)</li>
                    <li className="text-sm text-gray-600">• AI ethics and responsible implementation</li>
                    <li className="text-sm text-gray-600">• Prompt engineering fundamentals</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 text-orange-500 mr-2" />
                    Module 2: AI Tool Mastery (3 weeks)
                  </h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Mastering ChatGPT, Claude, and Gemini</li>
                    <li className="text-sm text-gray-600">• Image generation (DALL-E, Midjourney, Stable Diffusion)</li>
                    <li className="text-sm text-gray-600">• Audio & video AI tools (ElevenLabs, Descript, Runway)</li>
                    <li className="text-sm text-gray-600">• Advanced prompt engineering techniques</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2 flex items-center">
                    <Code className="h-5 w-5 text-amber-500 mr-2" />
                    Module 3: AI Application Development (4 weeks)
                  </h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Building custom AI agents and assistants</li>
                    <li className="text-sm text-gray-600">• Retrieval Augmented Generation (RAG) systems</li>
                    <li className="text-sm text-gray-600">• APIs & integration (OpenAI, Hugging Face, etc.)</li>
                    <li className="text-sm text-gray-600">• Developing AI-powered applications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2 flex items-center">
                    <Rocket className="h-5 w-5 text-rose-500 mr-2" />
                    Module 4: Industry AI Projects (3 weeks)
                  </h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• AI-powered business automation</li>
                    <li className="text-sm text-gray-600">• Customer service AI solutions</li>
                    <li className="text-sm text-gray-600">• Content generation at scale</li>
                    <li className="text-sm text-gray-600">• Capstone project with industry partners</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-orange-50 p-4 border-b border-gray-200">
              <h3 className="font-sans font-semibold text-xl text-center">AI Tools & Skills You'll Master</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-red-100">
                  <h4 className="font-sans font-semibold mb-2 text-red-600">Text & Conversational AI</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• GPT-4, GPT-4o by OpenAI</li>
                    <li>• Claude 3 by Anthropic</li>
                    <li>• Gemini by Google</li>
                    <li>• LangChain & LlamaIndex</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="font-sans font-semibold mb-2 text-orange-600">Visual AI</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• DALL-E 3 & Midjourney</li>
                    <li>• Stable Diffusion & ControlNet</li>
                    <li>• Firefly (Adobe)</li>
                    <li>• Video AI (Runway, Pika)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="font-sans font-semibold mb-2 text-amber-600">Business & Productivity</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Custom GPTs & AI Agents</li>
                    <li>• AI research & analysis tools</li>
                    <li>• Data analysis with AI</li>
                    <li>• Workflow automation</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-rose-100">
                  <h4 className="font-sans font-semibold mb-2 text-rose-600">Development & Integration</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• API development & integration</li>
                    <li>• GitHub Copilot & AI coding</li>
                    <li>• Vector databases (Pinecone)</li>
                    <li>• Building RAG systems</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-sans font-semibold mb-3 text-center">Career Skills Development</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Prompt Engineering</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">AI Project Management</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">AI Ethics</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs">Technical Communication</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Problem Solving</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Innovation Mindset</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/4 mb-4 md:mb-0 md:pr-6">
              <h3 className="font-sans font-semibold text-xl mb-2 flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                Ready to master AI & transform your career?
              </h3>
              <p className="text-white/90">
                Join our comprehensive program and learn cutting-edge AI skills with Bettercode Technologies.
              </p>
            </div>
            <div className="md:w-1/4 text-center">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-white text-red-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md inline-block transition shadow-md"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
