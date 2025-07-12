import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 font-sans text-gray-900">
      <Header isFaqPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-6 text-[#1db954]">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-lg">
          <section>
            <h2 className="font-semibold text-2xl mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information (name, email, contact details) provided during registration.</li>
              <li>Usage data such as pages visited, time spent, and interactions on our website.</li>
              <li>Payment information processed securely by third-party providers.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our courses and services.</li>
              <li>To communicate important updates, offers, and support information.</li>
              <li>To ensure the security and integrity of our platform.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">3. Data Protection</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We implement industry-standard security measures to protect your data.</li>
              <li>Access to your personal information is restricted to authorized personnel only.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">4. Third-Party Services</h2>
            <p>We may use third-party tools for analytics, payments, or communication. These providers have their own privacy policies and practices.</p>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">5. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may request access, correction, or deletion of your personal data at any time.</li>
              <li>Contact us at info@bettercode.co.in for privacy-related inquiries.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-2xl mb-2">6. Updates to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Please review this page for the latest information.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
} 