import { ArrowRight, Code, Database } from "lucide-react";
import { Link, useLocation } from "wouter";

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  duration: string;
  price: string;
}

function CourseCard({ title, description, icon, href, duration, price }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg text-white mr-4">
            {icon}
          </div>
          <h3 className="font-sans font-bold text-xl text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Duration: {duration}
          </span>
          <span className="font-semibold text-gray-700">{price}</span>
        </div>
        <a 
          href={`/?course=${href.includes('python') ? 'python' : href.includes('sql') ? 'sql' : 'ai-genai'}#apply`}
          className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Apply Now
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function OtherCourses() {
  const courses = [
    {
      title: "Python Programming",
      description: "Learn Python from basics to advanced concepts with practical hands-on projects and real-world applications.",
      icon: <Code className="h-5 w-5" />,
      href: "/courses/python",
      duration: "3 months",
      price: "₹24,999"
    },
    {
      title: "SQL Masterclass",
      description: "Master database management with our comprehensive SQL course covering data modeling, queries, and analytics.",
      icon: <Database className="h-5 w-5" />,
      href: "/courses/sql",
      duration: "2 months",
      price: "₹19,999"
    }
  ];

  return (
    <section id="other-courses" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-500 font-medium">EXPLORE MORE</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">Other Technology Courses</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-3">
            Expand your tech skills with our specialized courses designed to keep you at the cutting edge of the industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-block bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <p className="text-gray-700 font-medium mb-2">Looking for a different technology course?</p>
            <a 
              href="/courses" 
              className="text-red-500 font-semibold flex items-center justify-center hover:text-red-600"
            >
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}