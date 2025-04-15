import { BookOpen, Briefcase, Check } from "lucide-react";

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
    <section id="curriculum" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-medium">CURRICULUM</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">What You'll Learn</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Our comprehensive curriculum takes you from AI fundamentals to building advanced GenAI applications over a 6-month journey.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-sans font-semibold text-xl">Program Structure</h3>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-500 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-semibold text-lg">Phase 1: Workshop (3 Months)</h4>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Instructor-led training sessions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Hands-on practice with AI tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Weekly assignments & projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Expert seminars & guest lectures</span>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/2 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full text-green-500 mr-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-semibold text-lg">Phase 2: Internship (3 Months)</h4>
              </div>
              <ul className="space-y-2 pl-12">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Hands-on industry projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Mentorship from industry experts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Portfolio development</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Opportunity for job placement*</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h3 className="font-sans font-semibold text-xl text-center">Workshop Content</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2">Module 1: AI Fundamentals</h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Introduction to AI & Machine Learning</li>
                    <li className="text-sm text-gray-600">• Python for AI Development</li>
                    <li className="text-sm text-gray-600">• Data Processing & Analysis</li>
                    <li className="text-sm text-gray-600">• Intro to Neural Networks</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2">Module 2: Deep Learning</h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Deep Neural Networks</li>
                    <li className="text-sm text-gray-600">• Convolutional & Recurrent Networks</li>
                    <li className="text-sm text-gray-600">• Transfer Learning</li>
                    <li className="text-sm text-gray-600">• Model Deployment</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2">Module 3: Generative AI</h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Intro to Generative Models</li>
                    <li className="text-sm text-gray-600">• Large Language Models</li>
                    <li className="text-sm text-gray-600">• Image & Audio Generation</li>
                    <li className="text-sm text-gray-600">• Prompt Engineering</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans font-semibold text-lg mb-2">Module 4: AI Application Development</h4>
                  <ul className="space-y-1 pl-6">
                    <li className="text-sm text-gray-600">• Building GenAI Applications</li>
                    <li className="text-sm text-gray-600">• API Integration</li>
                    <li className="text-sm text-gray-600">• UI/UX for AI Products</li>
                    <li className="text-sm text-gray-600">• Capstone Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-50 p-4 border-b border-gray-200">
              <h3 className="font-sans font-semibold text-xl text-center">GenAI Tools Covered</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-sans font-semibold mb-2">Text & Chat</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• OpenAI GPT Models</li>
                    <li>• Anthropic Claude</li>
                    <li>• LangChain</li>
                    <li>• Hugging Face Transformers</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-sans font-semibold mb-2">Image Generation</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• DALL-E</li>
                    <li>• Midjourney</li>
                    <li>• Stable Diffusion</li>
                    <li>• ControlNet</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-sans font-semibold mb-2">Audio & Voice</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Whisper</li>
                    <li>• ElevenLabs</li>
                    <li>• Bark</li>
                    <li>• MusicGen</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-sans font-semibold mb-2">Development Tools</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Weights & Biases</li>
                    <li>• GitHub Copilot</li>
                    <li>• TensorFlow & PyTorch</li>
                    <li>• Vector Databases</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 italic">*Tools are regularly updated to reflect industry standards</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/4 mb-4 md:mb-0 md:pr-6">
              <h3 className="font-sans font-semibold text-xl mb-2">Ready to master AI & GenAI?</h3>
              <p className="text-gray-600">Enroll in our comprehensive program and transform your career with cutting-edge AI skills.</p>
            </div>
            <div className="md:w-1/4 text-center">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md inline-block transition"
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
