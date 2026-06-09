import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-indigo-700">
          <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-5 h-5" /></div>
          AT Tool
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 9, 2026 · Compliant with DPDP Act 2023</p>
        {[
          { title: "1. Information We Collect", body: "We collect information you provide directly: name, email, school name, and role during signup. We collect usage data such as papers created, questions added, and features used. We collect device and browser information for security and performance purposes." },
          { title: "2. How We Use Your Information", body: "We use your information to provide and improve the AT Tool service, personalize your experience with board and subject preferences, send service communications (including billing and syllabus updates), and respond to support requests." },
          { title: "3. Data Storage and Security", body: "All data is stored on servers hosted in India, complying with data residency requirements. We use AES-256 encryption at rest and TLS 1.3 in transit. We conduct regular security audits and follow OWASP security guidelines." },
          { title: "4. Data Sharing", body: "We do not sell your personal data. We share data only with: (a) service providers necessary to operate the platform (e.g., cloud hosting, payment processing via Razorpay), (b) when required by law or court order, and (c) with your explicit consent." },
          { title: "5. Your Rights (DPDP Act 2023)", body: "Under India's Digital Personal Data Protection Act, 2023, you have the right to access your personal data, correct inaccurate data, erase your data (with certain exceptions), and withdraw consent for data processing. Contact privacy@attool.in to exercise these rights." },
          { title: "6. Cookies", body: "We use essential cookies for authentication and security. We use analytics cookies to understand product usage. You can disable non-essential cookies in your browser, though this may affect some features." },
          { title: "7. Children's Privacy", body: "AT Tool is designed for use by teachers and school administrators (18+). We do not knowingly collect personal data from students. If student data is inadvertently submitted, contact us immediately for deletion." },
          { title: "8. Data Retention", body: "We retain your account data for the duration of your subscription plus 90 days after termination. Question banks and papers may be retained in anonymised form for service improvement. Payment records are retained as required by Indian tax law." },
          { title: "9. Contact", body: "For privacy-related inquiries, contact our Data Protection Officer at privacy@attool.in or write to: AT Tool Technologies Pvt. Ltd., 3rd Floor, Brigade Gateway, Malleshwaram, Bengaluru, Karnataka 560055." },
        ].map(({ title, body }) => (
          <div key={title} className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
