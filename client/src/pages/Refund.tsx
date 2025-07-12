import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 font-sans text-gray-900">
      <Header isFaqPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-6 text-[#1db954]">Refund Policy</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-lg">
          <section>
            <h2 className="font-semibold text-2xl mb-2">No Refund Policy</h2>
            <p>
              At AiGlobalTech, we are committed to providing high-quality technical education and training. Please note that all course purchases, registrations, and payments are final. We do not offer refunds for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind or personal circumstances</li>
              <li>Failure to attend or complete the course</li>
              <li>Dissatisfaction with course content or delivery</li>
              <li>Technical issues not attributable to our platform</li>
            </ul>
            <p>
              We encourage all prospective students to carefully review course details, schedules, and requirements before enrolling. If you have questions, please contact our support team prior to making a payment.
            </p>
            <p>
              By enrolling in our courses, you acknowledge and accept this no refund policy. Thank you for your understanding and cooperation.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
} 