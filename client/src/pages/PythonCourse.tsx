import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ArrowRight, ArrowLeft, CheckCircle2, Calendar, Clock, BookOpen, Code, Server, BrainCircuit } from "lucide-react";
import { useLocation } from "@/hooks/use-location";
import { formatPrice, getPriceDetails } from "@/lib/currency";

export default function PythonCourse() {
  const [country] = useLocation();
  
  // Base price in USD
  const pythonBasePriceUSD = 300; // Equivalent to ₹24,999
  const pythonOriginalPriceUSD = 360; // Equivalent to ₹29,999
  const installmentPriceUSD = pythonBasePriceUSD / 3;
  
  // Format prices based on user's location
  const regularPrice = formatPrice(pythonBasePriceUSD, country?.toString());
  const originalPrice = formatPrice(pythonOriginalPriceUSD, country?.toString());
  const installmentPrice = formatPrice(installmentPriceUSD, country?.toString());
  
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

  const modules = [
    {
      title: "Python Fundamentals",
      duration: "2 weeks",
      topics: [
        "Introduction to Python and setup",
        "Variables, data types, and operators",
        "Control flow (if/else, loops)",
        "Functions and modules",
        "Error handling and debugging"
      ]
    },
    {
      title: "Data Structures and Algorithms",
      duration: "3 weeks",
      topics: [
        "Lists, tuples, dictionaries, and sets",
        "Working with strings and files",
        "Basic algorithms and problem solving",
        "List comprehensions",
        "Object-oriented programming in Python"
      ]
    },
    {
      title: "Python for Data Science",
      duration: "4 weeks",
      topics: [
        "Introduction to NumPy and Pandas",
        "Data cleaning and preprocessing",
        "Data visualization with Matplotlib and Seaborn",
        "Statistical analysis with Python",
        "Working with real-world datasets"
      ]
    },
    {
      title: "Web Development with Python",
      duration: "3 weeks",
      topics: [
        "Introduction to Flask framework",
        "Building RESTful APIs",
        "Database integration with SQLAlchemy",
        "Authentication and authorization",
        "Deployment of Python web applications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNSBMNSAwIEwwIDAiIHN0cm9rZT0iIzAwZjVmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-[#1db954]/20 to-[#17a74a]/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-full h-1 bg-gradient-to-r from-transparent via-[#1db954] to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-[#1db954] via-transparent to-[#1db954]"></div>
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#1db954]/30"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 border border-[#1db954]/30 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="mb-6 flex items-center">
                <a href="/" className="text-[#1db954] hover:text-[#17a74a] flex items-center mr-2 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Home
                </a>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-300">Python Course</span>
              </div>
              <h1 className="font-sans font-bold text-4xl md:text-5xl tracking-tight mb-6">
                Python Programming <span className="bg-gradient-to-r from-[#1db954] to-[#17a74a] bg-clip-text text-transparent">Masterclass</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Master Python programming from fundamentals to advanced concepts with real-world projects and hands-on practice.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-gray-900/50 backdrop-blur px-4 py-2 rounded-full border border-[#1db954]/30 flex items-center">
                  <Calendar className="h-4 w-4 text-[#1db954] mr-2" />
                  <span className="text-gray-300 text-sm">3 months</span>
                </div>
                <div className="bg-gray-900/50 backdrop-blur px-4 py-2 rounded-full border border-[#1db954]/30 flex items-center">
                  <Clock className="h-4 w-4 text-[#1db954] mr-2" />
                  <span className="text-gray-300 text-sm">Flexible schedule</span>
                </div>
                <div className="bg-gray-900/50 backdrop-blur px-4 py-2 rounded-full border border-[#1db954]/30 flex items-center">
                  <BookOpen className="h-4 w-4 text-[#1db954] mr-2" />
                  <span className="text-gray-300 text-sm">Self-paced materials</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/?course=python#apply" 
                  className="bg-black border border-[#1db954]/50 text-[#1db954] hover:bg-gray-900 font-medium py-3 px-6 rounded shadow-lg hover:shadow-[#1db954]/20 text-center transition-all duration-300 inline-flex items-center justify-center"
                >
                  APPLY NOW
                </a>
                <button 
                  onClick={() => scrollToSection('curriculum')}
                  className="bg-gray-900/80 border border-white/10 hover:border-[#1db954]/30 text-gray-300 hover:text-[#1db954] font-medium py-3 px-6 rounded shadow-lg text-center transition-all duration-300"
                >
                  VIEW CURRICULUM
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden border border-[#1db954]/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1db954]/20 to-[#17a74a]/20 backdrop-blur-sm"></div>
                <div className="relative p-6">
                  <div className="bg-gray-900/80 backdrop-blur rounded-lg border border-[#1db954]/30 p-6">
                    <h3 className="font-bold text-xl mb-4 text-white">Course Highlights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-3 mt-0.5" />
                        <span className="text-gray-300">Learn Python from scratch to advanced concepts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-3 mt-0.5" />
                        <span className="text-gray-300">Build real-world applications and projects</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-3 mt-0.5" />
                        <span className="text-gray-300">Data science and web development with Python</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-3 mt-0.5" />
                        <span className="text-gray-300">Individual mentoring and code reviews</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-3 mt-0.5" />
                        <span className="text-gray-300">Certification upon successful completion</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-[#1db954]/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Course Price:</span>
                        <div className="text-right">
                          <span className="text-gray-400 text-sm line-through">{originalPrice}</span>
                          <span className="text-white font-bold text-2xl ml-2">{regularPrice}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-[#1db954]/20 to-[#17a74a]/20 rounded p-2 text-center text-sm">
                        <span className="text-[#1db954] font-medium">Early bird discount available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills You'll Learn */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl mb-4 text-white">Skills You'll Learn</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Master these essential Python skills that are highly sought after in today's job market</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-[#1db954]/20 shadow-sm hover:shadow-md transition-shadow hover:border-[#1db954]/40">
              <div className="bg-[#1db954] text-white p-3 rounded-lg inline-block mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Core Python Programming</h3>
              <p className="text-gray-400">Master Python syntax, data structures, object-oriented programming, and best practices for clean, efficient code.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-[#1db954]/20 shadow-sm hover:shadow-md transition-shadow hover:border-[#1db954]/40">
              <div className="bg-[#1db954] text-white p-3 rounded-lg inline-block mb-4">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Data Science & Analysis</h3>
              <p className="text-gray-400">Learn to analyze data with NumPy, Pandas, and visualize insights using Matplotlib and Seaborn libraries.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-[#1db954]/20 shadow-sm hover:shadow-md transition-shadow hover:border-[#1db954]/40">
              <div className="bg-[#1db954] text-white p-3 rounded-lg inline-block mb-4">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Web Development</h3>
              <p className="text-gray-400">Build web applications and APIs using Flask framework with database integration and authentication.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl mb-4 text-white">Course Curriculum</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Our comprehensive curriculum takes you from Python basics to advanced applications</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {modules.map((module, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-[#1db954]/20">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-xl text-white">{module.title}</h3>
                        <p className="text-[#1db954] text-sm font-medium mt-1 flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> {module.duration}
                        </p>
                      </div>
                      <div className="bg-[#1db954]/20 text-[#1db954] text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#1db954]/30">
                        Module {index + 1}
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing and Enrollment */}
      <section id="apply" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans font-bold text-3xl mb-4">Ready to Master Python?</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">Invest in your future with our comprehensive Python programming course</p>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-[#1db954]/30 overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <div>
                    <h3 className="font-bold text-2xl">Python Programming Masterclass</h3>
                    <p className="text-gray-400 mt-1">3-month comprehensive course</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-lg line-through mr-2">{originalPrice}</span>
                      <span className="text-3xl font-bold text-white">{regularPrice}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">One-time payment</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-[#1db954] mr-2" />
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mt-0.5 mr-2" />
                        <span className="text-gray-300">Complete Python curriculum (12 weeks)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mt-0.5 mr-2" />
                        <span className="text-gray-300">24/7 access to course materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mt-0.5 mr-2" />
                        <span className="text-gray-300">Hands-on projects and assignments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mt-0.5 mr-2" />
                        <span className="text-gray-300">Personal code reviews and feedback</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-[#1db954] mt-0.5 mr-2" />
                        <span className="text-gray-300">Course completion certificate</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-[#1db954]/30">
                    <h4 className="font-semibold text-lg mb-4">Payment Options</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border-2 border-[#1db954] bg-[#1db954]/20 mt-0.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-medium text-white">Full Payment</h5>
                          <p className="text-gray-400 text-sm">Pay {regularPrice} upfront and get access to all course materials immediately.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full border-2 border-gray-400 mt-0.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-medium text-white">Installment Plan</h5>
                          <p className="text-gray-400 text-sm">Pay in 3 monthly installments of {installmentPrice} each.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-[#1db954]/30">
                      <p className="text-sm text-gray-400">Need more information? Contact us at:</p>
                      <p className="text-white font-medium">courses@bettercode.co.in</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/?course=python#apply" 
                    className="bg-black border border-[#1db954]/50 text-[#1db954] hover:bg-gray-900 font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-[#1db954]/20 text-center transition-all duration-300 inline-block"
                  >
                    APPLY NOW
                  </a>
                  <p className="text-sm text-gray-400 mt-4">Limited seats available. Next batch starts soon!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}