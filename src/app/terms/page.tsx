import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-indigo-700">
          <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-5 h-5" /></div>
          AT Tool
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 9, 2026</p>
        {[
          { title: "1. Acceptance of Terms", body: "By accessing or using AT Tool, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you may not use the service." },
          { title: "2. Description of Service", body: "AT Tool is a Software-as-a-Service (SaaS) platform that enables teachers and educational institutions in India to automatically generate question papers aligned to various Indian educational boards including CBSE, ICSE, and all 28 state boards." },
          { title: "3. User Accounts", body: "You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms." },
          { title: "4. Subscription and Payments", body: "Subscriptions are billed monthly or annually in Indian Rupees (INR). All prices are exclusive of GST (18%), which will be charged additionally. The 14-day free trial requires no payment. Subscriptions auto-renew unless cancelled before the renewal date." },
          { title: "5. Refund Policy", body: "We offer a 7-day refund policy for first-time subscribers who are unsatisfied with the service. Refunds are processed within 5–7 business days to the original payment method. Trial periods are not eligible for refunds." },
          { title: "6. Intellectual Property", body: "AT Tool and its content, features, and functionality are owned by AT Tool Technologies Pvt. Ltd. Questions from the pre-populated question bank are licensed for use within the platform. User-created content remains the intellectual property of the respective users." },
          { title: "7. Privacy and Data", body: "We collect and process personal data in accordance with our Privacy Policy and the Digital Personal Data Protection Act, 2023 (India). We do not sell user data to third parties." },
          { title: "8. Limitation of Liability", body: "AT Tool is provided 'as is'. We do not guarantee 100% accuracy of board alignment at all times, especially during transitional periods following board syllabus changes. Our liability is limited to the amount paid for the service in the preceding 3 months." },
          { title: "9. Termination", body: "We may terminate or suspend your account for violations of these terms without prior notice. Upon termination, your right to use the service ceases. You may export your data within 30 days of termination." },
          { title: "10. Governing Law", body: "These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka." },
        ].map(({ title, body }) => (
          <div key={title} className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{body}</p>
          </div>
        ))}
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
          <p className="text-sm text-indigo-700">Questions about our Terms? Contact us at <strong>legal@attool.in</strong></p>
        </div>
      </div>
    </div>
  );
}
