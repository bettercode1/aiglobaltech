import { Megaphone, Users, Briefcase, Check } from "lucide-react";

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-medium">PROGRAM BENEFITS</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">Why Choose Our Program</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Beyond just technical skills, our program offers a comprehensive package to boost your career prospects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple-500 mb-4">
              <Megaphone className="h-10 w-10" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Expert Seminars</h3>
            <p className="text-gray-600">
              Regular seminars and workshops from industry leaders and AI pioneers, giving you insights into the latest trends and technologies.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple-500 mb-4">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Soft Skills Training</h3>
            <p className="text-gray-600">
              Enhance your communication, problem-solving, and teamwork abilities with dedicated soft skills sessions to complement your technical knowledge.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple-500 mb-4">
              <Briefcase className="h-10 w-10" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Job Opportunities*</h3>
            <p className="text-gray-600">
              Potential for placement in our company or partner organizations based on performance during the internship phase.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-sans font-semibold text-xl mb-4 text-blue-500">Online & Offline Learning Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-sans font-semibold text-lg mb-2">Online Mode</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Live virtual classes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Recorded sessions for review</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">24/7 access to learning materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Virtual team projects</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-sans font-semibold text-lg mb-2">Offline Mode</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">In-person classroom sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Direct interaction with instructors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Hands-on lab sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Networking opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-sans font-semibold text-xl mb-4 text-green-500">What You'll Get</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Comprehensive AI & GenAI training</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Industry-recognized certification</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">6 months of professional experience</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Project portfolio for job applications</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Access to AI community and networking</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full text-green-500 mt-0.5 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Potential job placement opportunities*</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-2">*Disclaimer: Job placement is not guaranteed and depends on availability of positions, individual performance, and market conditions.</p>
          <p className="text-sm text-gray-600">Our company offers placement opportunities to top performers based on evaluation during the internship phase, subject to available positions.</p>
        </div>
      </div>
    </section>
  );
}
