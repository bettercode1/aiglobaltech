import { Link } from "wouter";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BadgeCheck, Bookmark, BookOpen, Brain, Code, Database, LineChart, Server, Sparkles, Timer } from "lucide-react";

export default function Courses() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Our Tech Courses
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8">
                Master in-demand skills with our expertly crafted courses
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/?course=ai-genai#apply" 
                  className="bg-white text-red-600 hover:bg-red-50 font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-red-900/30 transition-all duration-300"
                >
                  Apply For a Course
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Course Catalog</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our selection of specialized courses designed to accelerate your tech career
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI & GenAI Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-600">
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
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">GenAI tools mastery (ChatGPT, Claude, Midjourney)</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Practical AI implementation projects</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">2-month paid internship opportunity</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹49,999</div>
                    <div className="text-gray-500 text-sm">Early bird: 15% off</div>
                  </div>
                  <Link 
                    to="/?course=ai-genai#apply" 
                    className="block w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    APPLY NOW
                  </Link>
                </div>
              </div>
              
              {/* Python Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Code className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
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
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Core Python programming concepts</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Data analysis with Pandas & NumPy</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Web development with Flask</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹24,999</div>
                    <div className="text-gray-500 text-sm">Early bird available</div>
                  </div>
                  <Link 
                    to="/?course=python#apply" 
                    className="block w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    APPLY NOW
                  </Link>
                </div>
              </div>
              
              {/* SQL Course */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100 flex flex-col">
                <div className="h-48 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center p-8">
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Database className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-600">
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
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Database design and normalization</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Advanced querying techniques</span>
                    </li>
                    <li className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Data analysis and visualization</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-800 font-bold text-2xl">₹19,999</div>
                    <div className="text-gray-500 text-sm">Early bird available</div>
                  </div>
                  <Link 
                    to="/?course=sql#apply" 
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
                  >
                    APPLY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Courses</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bettercode's courses offer a unique learning experience designed to maximize your tech career potential
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center text-red-600 mb-5">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Industry Relevant</h3>
                <p className="text-gray-600">
                  Curriculum designed with input from industry professionals to focus on skills employers actually need.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center text-orange-600 mb-5">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Hands-on Projects</h3>
                <p className="text-gray-600">
                  Build a portfolio of real-world projects that demonstrate your skills to potential employers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center text-amber-600 mb-5">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Career Support</h3>
                <p className="text-gray-600">
                  Dedicated career counseling, interview preparation, and networking opportunities with industry partners.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-5">
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
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Tech Career?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Don't miss the opportunity to learn in-demand skills for the future job market
              </p>
              <Link 
                to="/#apply" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-medium py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
              >
                <Bookmark className="mr-2 h-5 w-5" />
                RESERVE YOUR SPOT NOW
              </Link>
              <p className="text-gray-400 mt-4">Limited seats available for upcoming batches</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}