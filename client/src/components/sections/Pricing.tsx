import { Check } from "lucide-react";

export default function Pricing() {
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
    <section id="pricing" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-medium">PRICING</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">Investment in Your Future</h2>
          <p className="max-w-3xl mx-auto text-gray-300">
            Our program offers exceptional value with a comprehensive package of training, internship, and career support.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-purple-100 p-6 text-center">
            <h3 className="font-sans font-bold text-2xl text-purple-500">Complete Workshop + Internship Package</h3>
            <p className="text-gray-600 mt-2">Comprehensive 6-month program</p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="text-center">
                <span className="text-gray-500 text-lg line-through">₹49,999</span>
                <div className="flex items-center justify-center">
                  <span className="text-purple-500 text-5xl font-bold">₹39,999</span>
                  <span className="text-gray-500 ml-2">/ program</span>
                </div>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mt-2">20% Early Bird Discount</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-sans font-semibold text-lg mb-4 flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  Workshop Includes:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">3 months of instructor-led training</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Comprehensive learning materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Hands-on projects with GenAI tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Industry expert guest lectures</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Soft skills training sessions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-sans font-semibold text-lg mb-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Internship Includes:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">3 months of supervised internship</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Real-world project experience</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Mentorship from industry professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Performance evaluation & feedback</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">Official internship certificate</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-md inline-block transition"
              >
                Apply for Program
              </button>
              <p className="text-sm text-gray-500 mt-4">Limited seats available. Early bird discount valid until June 30, 2023.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h4 className="font-sans font-semibold text-lg mb-4">Payment Options:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-medium mb-2">Full Payment</h5>
                <p className="text-gray-600 text-sm">Pay the entire amount upfront and receive additional resources worth ₹5,000.</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-medium mb-2">Installment Plan</h5>
                <p className="text-gray-600 text-sm">Pay in 3 easy installments of ₹13,999 each (first payment at registration).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
