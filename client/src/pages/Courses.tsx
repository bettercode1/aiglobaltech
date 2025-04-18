import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Link } from "wouter";
import { Code, Database, BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "AI & GenAI Workshop + Internship",
      description: "Master cutting-edge AI and Generative AI tools and techniques with hands-on projects and real-world applications.",
      icon: <Sparkles className="h-6 w-6" />,
      href: "/#apply",
      duration: "5 months (3+2)",
      price: "₹34,999",
      color: "from-red-600 to-red-500 hover:from-red-700 hover:to-red-600",
      bgColor: "from-red-500/10 to-orange-500/10",
      dotColor: "bg-red-500",
      content: [
        "Foundations of AI & Machine Learning",
        "Deep Learning & Neural Networks",
        "Generative AI frameworks",
        "LLM Prompt Engineering",
        "Building AI-powered applications",
        "2-month supervised internship"
      ]
    },
    {
      title: "Python Programming Masterclass",
      description: "Learn Python from basics to advanced concepts with practical hands-on projects and real-world applications.",
      icon: <Code className="h-6 w-6" />,
      href: "/#apply",
      duration: "3 months",
      price: "₹24,999",
      color: "from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
      bgColor: "from-blue-500/10 to-indigo-500/10",
      dotColor: "bg-blue-500",
      content: [
        "Python fundamentals and syntax",
        "Data structures and algorithms",
        "Object-oriented programming",
        "Data science with Python",
        "Web development with Flask",
        "Real-world Python projects"
      ]
    },
    {
      title: "SQL Masterclass",
      description: "Master database management with our comprehensive SQL course covering data modeling, queries, and analytics.",
      icon: <Database className="h-6 w-6" />,
      href: "/#apply",
      duration: "2 months",
      price: "₹19,999",
      color: "from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600",
      bgColor: "from-orange-500/10 to-yellow-500/10",
      dotColor: "bg-orange-500",
      content: [
        "SQL fundamentals and queries",
        "Database design and modeling",
        "Data manipulation and analysis",
        "Stored procedures and functions",
        "Performance optimization",
        "Business intelligence applications"
      ]
    },
    {
      title: "Full-Stack Web Development",
      description: "Build modern web applications with the latest technologies including React, Node.js, and cloud deployment.",
      icon: <BrainCircuit className="h-6 w-6" />,
      href: "/#apply",
      duration: "4 months",
      price: "₹29,999",
      color: "from-green-600 to-green-500 hover:from-green-700 hover:to-green-600",
      bgColor: "from-green-500/10 to-teal-500/10",
      dotColor: "bg-green-500",
      content: [
        "HTML, CSS, and JavaScript",
        "React and state management",
        "Node.js and Express backend",
        "Database integration",
        "Authentication and security",
        "Deployment and DevOps basics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans font-bold text-4xl sm:text-5xl mb-6">
              Technology Courses by <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Bettercode</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our range of cutting-edge technology courses designed to equip you with in-demand skills for the modern workforce.
            </p>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`bg-gradient-to-r ${course.bgColor} p-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-2 bg-gradient-to-br ${course.color} rounded-lg text-white mr-4`}>
                      {course.icon}
                    </div>
                    <h3 className="font-sans font-bold text-xl text-gray-800">{course.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <span className={`inline-block w-2 h-2 ${course.dotColor} rounded-full mr-2`}></span>
                      Duration: {course.duration}
                    </span>
                    <span className="font-semibold text-gray-700">{course.price}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">What you'll learn:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.content.map((item, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className={`${course.dotColor} rounded-full w-1.5 h-1.5 mt-1.5 mr-2 flex-shrink-0`}></span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={course.href} 
                    className={`inline-flex items-center justify-center bg-gradient-to-r ${course.color} text-white py-2 px-6 rounded-lg transition-colors font-medium w-full`}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-red-500/5 to-orange-500/5 p-6 rounded-xl border border-red-100">
              <h3 className="font-sans font-bold text-2xl mb-3">Need a custom training program?</h3>
              <p className="text-gray-600 mb-4">We offer corporate training programs tailored to your organization's needs.</p>
              <Link 
                to="/#apply" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-2 px-6 rounded-lg transition-colors font-medium"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}