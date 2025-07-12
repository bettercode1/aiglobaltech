import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 font-sans text-gray-900">
      <Header isFaqPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-6 text-[#1db954]">Terms & Conditions</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-lg">
          <section>
            <h2 className="font-semibold text-2xl mb-2">1. Acceptance of Terms</h2>
            <p>By enrolling in any course or using our website, you agree to abide by these Terms & Conditions. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">2. Course Content & Access</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All course materials, videos, and resources are for personal, non-commercial use only.</li>
              <li>Sharing, distributing, or reselling course content is strictly prohibited.</li>
              <li>Access to course content is granted for the duration specified at the time of enrollment.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">3. Code of Conduct</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respect instructors, staff, and fellow students at all times.</li>
              <li>No harassment, discrimination, or inappropriate behavior will be tolerated.</li>
              <li>Plagiarism or cheating in assignments or projects will result in removal from the course.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">4. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All website and course content is the intellectual property of AiGlobalTech or its partners.</li>
              <li>You may not copy, reproduce, or use content for commercial purposes without written permission.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">5. Limitation of Liability</h2>
            <p>AiGlobalTech is not liable for any direct, indirect, or incidental damages arising from the use of our courses or website. All learning outcomes depend on individual effort and engagement.</p>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">6. Changes to Terms</h2>
            <p>We reserve the right to update these Terms & Conditions at any time. Continued use of the website or courses constitutes acceptance of the revised terms.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
} 