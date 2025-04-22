import { Link } from "wouter";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BadgeCheck, Bookmark, BookOpen, Brain, Code, Database, LineChart, Server, Sparkles, Timer } from "lucide-react";

export default function Courses() {
  // Function to handle the Apply Now button click
  const handleApplyNowClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
    // Add a small delay to ensure the home page loads before scrolling
    setTimeout(() => {
      const applySection = document.getElementById('apply');
      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Header isCoursePage={true} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-700/10 rounded-full mix-blend-overlay blur-3xl opacity-70"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mix-blend-overlay blur-3xl opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <div className="bg-white/20 text-white rounded-full px-4 py-1.5 font-medium text-sm">
                  BETTERCODE TECHNOLOGIES
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Our Tech <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Courses</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                Master in-demand skills with our expertly crafted courses
              </p>
              {/* No apply button as requested */}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>
        
        {/* Course Cards */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-white shadow-md mb-4">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full px-4 py-1.5 font-medium text-sm flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  OUR PROGRAMS
                </div>
              </div>
              <h2 className="font-sans font-bold text-3xl lg:text-4xl mt-2 mb-4">Our Course Catalog</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our selection of specialized courses designed to accelerate your tech career
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI & GenAI Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
                      Flagship Program
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                      <Timer className="h-3 w-3 mr-1" /> 5 Months
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI & GenAI Workshop + Internship</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive 3-month workshop followed by 2-month internship covering AI fundamentals to advanced GenAI applications.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">GenAI tools mastery (ChatGPT, Claude, Midjourney)</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Practical AI implementation projects</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">2-month paid internship opportunity</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹49,999</div>
                    <div className="text-gray-500 text-sm">Early bird: 15% off</div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-medium text-gray-700 mb-1">Course Highlights:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Build no-code AI workflows</li>
                      <li>Create chatbots &amp; agents</li>
                      <li>Develop image generation skills</li>
                      <li>24/7 mentor support</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="/" 
                      onClick={handleApplyNowClick}
                      className="block w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 font-medium py-2.5 px-6 rounded text-center transition-all duration-300"
                    >
                      APPLY NOW
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Python Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Code className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
                      Programming
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                      <Timer className="h-3 w-3 mr-1" /> 3 Months
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Python Programming Masterclass</h3>
                  <p className="text-gray-600 mb-4">
                    From python basics to advanced concepts, including data science applications and web development fundamentals.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Core Python programming concepts</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Data analysis with Pandas & NumPy</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Web development with Flask</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹24,999</div>
                    <div className="text-gray-500 text-sm">Early bird available</div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-medium text-gray-700 mb-1">Course Highlights:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Python fundamentals &amp; advanced OOP</li>
                      <li>Data analysis with pandas &amp; matplotlib</li>
                      <li>Web development with Flask/Django</li>
                      <li>Project-based learning approach</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="/" 
                      onClick={handleApplyNowClick}
                      className="block w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 font-medium py-2.5 px-6 rounded text-center transition-all duration-300"
                    >
                      APPLY NOW
                    </a>
                  </div>
                </div>
              </div>
              
              {/* SQL Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Database className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
                      Data
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                      <Timer className="h-3 w-3 mr-1" /> 2 Months
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">SQL Masterclass</h3>
                  <p className="text-gray-600 mb-4">
                    Master database management and data analysis with comprehensive SQL training covering basics to advanced topics.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Database design and normalization</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Advanced querying techniques</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Data analysis and visualization</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹19,999</div>
                    <div className="text-gray-500 text-sm">Early bird available</div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-medium text-gray-700 mb-1">Course Highlights:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>SQL query fundamentals to advanced</li>
                      <li>Database design principles</li>
                      <li>Data manipulation &amp; analysis</li>
                      <li>Real-world database projects</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="/" 
                      onClick={handleApplyNowClick}
                      className="block w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 font-medium py-2.5 px-6 rounded text-center transition-all duration-300"
                    >
                      APPLY NOW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-white shadow-md mb-4">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full px-4 py-1.5 font-medium text-sm flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  WHY CHOOSE US
                </div>
              </div>
              <h2 className="font-sans font-bold text-3xl lg:text-4xl mt-2 mb-4">Why Choose Our Courses</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bettercode's courses offer a unique learning experience designed to maximize your tech career potential
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-5">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Industry Relevant</h3>
                <p className="text-gray-600">
                  Curriculum designed with input from industry professionals to focus on skills employers actually need.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-5">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Hands-on Projects</h3>
                <p className="text-gray-600">
                  Build a portfolio of real-world projects that demonstrate your skills to potential employers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-5">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Career Support</h3>
                <p className="text-gray-600">
                  Dedicated career counseling, interview preparation, and networking opportunities with industry partners.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-5">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Expert Instruction</h3>
                <p className="text-gray-600">
                  Learn from experienced professionals with years of practical experience in their respective fields.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-overlay blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-700 rounded-full mix-blend-overlay blur-3xl opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-gray-700/20 backdrop-blur-sm mb-6">
                <div className="bg-white/20 text-white rounded-full px-4 py-1.5 font-medium text-sm">
                  LIMITED SPOTS AVAILABLE
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Tech Career?</h2>
              <p className="text-xl text-white/80 mb-8">
                Don't miss the opportunity to learn in-demand skills for the future job market
              </p>
              <p className="text-white/70 font-medium">Limited seats available for upcoming batches</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}