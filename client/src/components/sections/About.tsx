import { Laptop, Briefcase, Building, Check } from "lucide-react";

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
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-medium">ABOUT THE PROGRAM</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">Transform Your Career with AI Skills</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Our workshop cum internship program is designed to equip you with the skills needed to thrive in the rapidly evolving AI landscape, from fundamentals to advanced applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-500 mb-4">
              <Laptop className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Comprehensive Learning</h3>
            <p className="text-gray-600">
              From AI fundamentals to advanced GenAI techniques, our curriculum covers everything you need to build practical applications.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-green-500 mb-4">
              <Briefcase className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Real-World Experience</h3>
            <p className="text-gray-600">
              Gain 3 months of hands-on internship experience working on actual projects with industry mentors.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-purple-500 mb-4">
              <Building className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Industry Connections</h3>
            <p className="text-gray-600">
              Attend seminars by AI leaders and build your professional network through our industry partnerships.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="AI learning environment" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="font-sans font-semibold text-2xl mb-4">Who is this program for?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mt-0.5 mr-2" />
                  <span>Final year students looking to enter the AI field</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mt-0.5 mr-2" />
                  <span>Fresh graduates seeking to enhance their job prospects</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mt-0.5 mr-2" />
                  <span>Professionals looking to transition into AI & GenAI roles</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mt-0.5 mr-2" />
                  <span>Anyone passionate about learning cutting-edge AI technologies</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <button 
                  onClick={() => scrollToSection('apply')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md inline-block transition"
                >
                  Join Our Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
