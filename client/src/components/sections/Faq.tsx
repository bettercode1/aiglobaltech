import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqs: FaqItem[] = [
    {
      question: "What are the prerequisites for joining the program?",
      answer: "Basic programming knowledge is recommended but not mandatory. Familiarity with Python would be beneficial. The program is designed to accommodate both beginners and those with some technical background. A strong interest in AI and willingness to learn is the most important prerequisite."
    },
    {
      question: "Is job placement guaranteed after the internship?",
      answer: "While we do offer placement opportunities to top performers, job placement is not guaranteed and depends on several factors including individual performance during the internship, available positions within our company or partner organizations, and current market conditions. However, the skills and experience gained during the program significantly enhance your employability in the AI industry."
    },
    {
      question: "What is the time commitment required for the program?",
      answer: "The workshop phase requires approximately 15-20 hours per week, including classes, assignments, and projects. The internship phase typically requires a full-time commitment (40 hours per week). We offer some flexibility for students who may have academic commitments during the workshop phase."
    },
    {
      question: "Can I join only the workshop without the internship?",
      answer: "Our program is designed as a comprehensive package where the internship builds on the skills developed during the workshop. However, in special circumstances, we may consider workshop-only participation at a reduced fee. Please contact our admissions team to discuss your specific situation."
    },
    {
      question: "What certificate will I receive upon completion?",
      answer: "Upon successful completion of the program, you will receive two certificates: a Workshop Completion Certificate detailing the AI & GenAI skills acquired, and an Internship Experience Certificate verifying your 2 months of practical work experience. Both certificates are industry-recognized and can be showcased in your resume and professional profiles."
    },
    {
      question: "What is the difference between online and offline modes?",
      answer: "The online mode allows you to participate remotely through live virtual classes, with recorded sessions available for review. The offline mode involves in-person sessions at our facility with direct interaction with instructors and peers. Both modes cover the same curriculum and provide equal opportunities for learning and internship. The internship phase can be conducted either remotely or in-person, depending on your preference and availability."
    }
  ];

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
    <section id="faq" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMykiIG9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDMwIEE2IDYgMCAwIDAgNjAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQzMzhmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-medium">FAQs</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Find answers to common questions about our AI & GenAI workshop and internship program.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-sans font-medium text-left">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">Still have questions? Feel free to reach out.</p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-blue-500 font-medium hover:underline inline-flex items-center mt-2"
            >
              Contact Us
              <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
