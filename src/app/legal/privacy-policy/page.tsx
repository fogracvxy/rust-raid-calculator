import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Rust Tools Suite",
  description: "Our privacy policy explains how we collect, use, and protect your data when you use our Rust Tools Suite.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-red-500">Privacy Policy</h1>
        
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 mb-8">
          <p className="text-gray-400 mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Rust Tools Suite (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">2. Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>
                <strong>Usage Data:</strong> Information about how you use our website and services, including page views, time spent on pages, navigation paths, and similar data.
              </li>
              <li>
                <strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
              </li>
              <li>
                <strong>Cookie Data:</strong> Cookies and similar tracking technologies to track activity on our website and hold certain information.
              </li>
            </ul>
            <p>
              We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>To analyze website usage to improve our services</li>
              <li>To administer and protect our website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)</li>
              <li>To deliver relevant website content to you</li>
              <li>To measure or understand the effectiveness of content we serve to you</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">4. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p className="mb-4">
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>
                <strong>Essential Cookies:</strong> Necessary for the website to function properly.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Enable the website to provide enhanced functionality and personalization.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited and the links you have followed.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">5. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">6. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="mb-4">
              If you wish to exercise any of these rights, please contact us.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">7. Third-Party Services</h2>
            <p className="mb-4">
              Our website may include links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you.
              We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">8. GDPR Compliance</h2>
            <p className="mb-4">
              For users in the European Union, we comply with the General Data Protection Regulation (GDPR). This means you have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Restrict the processing of your personal data</li>
              <li>Data portability</li>
              <li>Object to the processing of your personal data</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">9. CCPA Compliance</h2>
            <p className="mb-4">
              For California residents, the California Consumer Privacy Act (CCPA) provides additional rights:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to equal service and price</li>
            </ul>
            <p className="mb-4">
              We do not sell your personal information as defined by the CCPA.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-red-400">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            {/* <p className="text-gray-300">
              Email: privacy@yourdomain.com<br />
              Address: Your Business Address
            </p> */}
          </section>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/legal/terms-of-service"
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors mr-4"
          >
            Terms of Service
          </Link>
          <Link 
            href="/"
            className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 