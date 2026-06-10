"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/i18n";
import { BookOpen, LayoutDashboard, FileText, Database, Settings, Users, LogOut, Plus, BarChart3, CreditCard, LayoutTemplate, Globe, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, key: "Dashboard" },
  { href: "/dashboard/create", icon: Plus, key: "Create Paper" },
  { href: "/dashboard/papers", icon: FileText, key: "My Papers" },
  { href: "/dashboard/questions", icon: Database, key: "Question Bank" },
  { href: "/dashboard/templates", icon: LayoutTemplate, key: "Templates" },
  { href: "/dashboard/admin", icon: Users, key: "Admin" },
  { href: "/dashboard/analytics", icon: BarChart3, key: "Analytics" },
  { href: "/dashboard/billing", icon: CreditCard, key: "Billing" },
  { href: "/dashboard/settings", icon: Settings, key: "Settings" },
];

const NAV_T: Record<string, Partial<Record<string, string>>> = {
  "Dashboard":    { hi: "डैशबोर्ड", te: "డాష్‌బోర్డ్", ta: "டாஷ்போர்டு", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", ml: "ഡാഷ്‌ബോർഡ്", bn: "ড্যাশবোর্ড", mr: "डॅशबोर्ड", gu: "ડૅશबोर्ड", pa: "ਡੈਸ਼ਬੋਰਡ", or: "ଡ୍ୟାସ୍‌ବୋର୍ଡ", as: "ডেশ্বোর্ড" },
  "Create Paper": { hi: "पेपर बनाएं", te: "పేపర్ తయారు చేయండి", ta: "கேள்வித்தாள் உருவாக்கு", kn: "ಪ್ರಶ್ನೆಪತ್ರ ರಚಿಸಿ", ml: "പേപ്പർ ഉണ്ടാക്കൂ", bn: "পেপার তৈরি করুন", mr: "पेपर तयार करा", gu: "પેepaper બनাvo", pa: "ਪੇਪਰ ਬਣਾਓ", or: "ପ୍ରଶ୍ନପତ୍ର ତିଆରି", as: "পেপাৰ বনাওক" },
  "My Papers":    { hi: "मेरे पेपर", te: "నా పేపర్లు", ta: "என் கேள்வித்தாள்கள்", kn: "ನನ್ನ ಪ್ರಶ್ನೆ ಪತ್ರಗಳು", ml: "എന്റെ പേപ്പറുകൾ", bn: "আমার পেপার", mr: "माझे पेपर", gu: "મારા પेepaper", pa: "ਮੇਰੇ ਪੇਪਰ", or: "ମୋ ପ୍ରଶ୍ନପତ୍ର", as: "মোৰ পেপাৰ" },
  "Question Bank":{ hi: "प्रश्न बैंक", te: "ప్రశ్న బ్యాంకు", ta: "கேள்வி வங்கி", kn: "ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್", ml: "ചോദ്യ ബാങ്ക്", bn: "প্রশ্ন ব্যাংক", mr: "प्रश्न बँक", gu: "પ્રশ્ن bank", pa: "ਸਵਾਲ ਬੈਂਕ", or: "ପ୍ରଶ୍ନ ବ୍ୟାଙ୍କ", as: "প্রশ্ন বেংক" },
  "Templates":    { hi: "टेम्पलेट", te: "టెంప్లేట్లు", ta: "வார்ப்புருக்கள்", kn: "ಟೆಂಪ್ಲೇಟ್‌ಗಳು", ml: "ടെംപ്ലേറ്റുകൾ", bn: "টেমপ্লেট", mr: "टेम्पलेट", gu: "ટેmplate", pa: "ਟੈਂਪਲੇਟ", or: "ଟେمplate", as: "টেমপ্লেট" },
  "Admin":        { hi: "एडमिन", te: "అడ్మిన్", ta: "நிர்வாகம்", kn: "ಅಡ್ಮಿನ್", ml: "അഡ്മിൻ", bn: "অ্যাডমিন", mr: "अॅडमिन", gu: "admin", pa: "ਐਡਮਿਨ", or: "admin", as: "এডমিন" },
  "Analytics":    { hi: "विश्लेषण", te: "విశ్లేషణలు", ta: "பகுப்பாய்வு", kn: "ವಿಶ್ಲೇಷಣೆ", ml: "അനലിറ്റിക്സ്", bn: "বিশ্লেষণ", mr: "विश्लेषण", gu: "analytics", pa: "ਵਿਸ਼ਲੇਸ਼ਣ", or: "analytics", as: "বিশ্লেষণ" },
  "Billing":      { hi: "बिलिंग", te: "బిల్లింగ్", ta: "பில்லிங்", kn: "ಬಿಲ್ಲಿಂಗ್", ml: "ബില്ലിംഗ്", bn: "বিলিং", mr: "बिलिंग", gu: "billing", pa: "ਬਿਲਿੰਗ", or: "billing", as: "বিলিং" },
  "Settings":     { hi: "सेटिंग्स", te: "సెట్టింగ్లు", ta: "அமைப்புகள்", kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", ml: "ക്രമീകരണങ്ങൾ", bn: "সেটিংস", mr: "सेटिंग्ज", gu: "settings", pa: "ਸੈਟਿੰਗਜ਼", or: "settings", as: "ছেটিংছ" },
  "Logout":       { hi: "लॉगआउट", te: "లాగ్అవుట్", ta: "வெளியேறு", kn: "ಲಾಗ್ ಔಟ್", ml: "ലോഗൗട്ട്", bn: "লগআউট", mr: "लॉगआउट", gu: "logout", pa: "ਲੌਗਆਉਟ", or: "logout", as: "লগ আউট" },
};

function tNav(key: string, lang: string) {
  if (lang === "en") return key;
  return NAV_T[key]?.[lang] || key;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout, language, setLanguage } = useAppStore();
  const [hydrated, setHydrated] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    if (hydrated && !isAuthenticated) router.push("/login");
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-indigo-600 font-semibold animate-pulse">Loading AT Tool...</div>
    </div>
  );
  if (!isAuthenticated) return null;

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-700">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-4 h-4" /></div>
            AT Tool
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, icon: Icon, key }) => (
            <Link key={href} href={href}
              className={`sidebar-link ${pathname === href ? "active" : ""}`}>
              <Icon className="w-4 h-4 shrink-0" />
              {tNav(key, language)}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100">
          {/* Language Switcher */}
          <div className="relative mb-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition text-sm font-medium text-indigo-700">
              <Globe className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{currentLang.native}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 max-h-56 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code as Parameters<typeof setLanguage>[0]); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-indigo-50 transition ${language === lang.code ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700"}`}>
                    <span className="flex-1 text-left">{lang.native}</span>
                    <span className="text-xs text-gray-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{user?.name}</div>
              <div className="text-xs text-gray-400 truncate">{user?.plan?.toUpperCase()} plan</div>
            </div>
          </div>
          <button onClick={() => { logout(); router.push("/"); }}
            className="sidebar-link w-full text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4" />
            {tNav("Logout", language)}
          </button>
        </div>
      </aside>
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
