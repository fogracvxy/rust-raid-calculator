import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Rust Tools Suite",
  description: "The Terms of Service for Rust Tools Suite. Read our terms and conditions for using our tools and calculators.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-red-500">Terms of Service</h1>
        
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 mb-8">
          <p className="text-gray-400 mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Rust Tools Suite (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, you agree to be bound by these Terms of Service.
              If you disagree with any part of the terms, you may not access the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise stated, we own the intellectual property rights for all material on Rust Tools Suite. All intellectual property rights are reserved.
            </p>
            <p className="mb-4">
              <strong className="text-red-400">Rust Game Disclaimer:</strong> Rust® is a registered trademark of Facepunch Studios. This website is not affiliated with, endorsed by, or in any way officially connected with Facepunch Studios or any of its subsidiaries or affiliates.
              The official Rust website can be found at <a href="https://rust.facepunch.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">https://rust.facepunch.com/</a>.
            </p>
            <p className="mb-4">
              All game content and materials are trademarks and copyrights of their respective owners and licensors. We do not claim ownership of any images, names, formulas or calculations directly taken from the Rust game. This website is intended for informational and educational purposes only as a fan resource.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">3. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
            <p className="mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">4. Disclaimer</h2>
            <p className="mb-4">
              The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mb-4">
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
            </p>
            <p className="mb-4">
              The calculators, tools, and information provided are approximations based on our understanding of the game mechanics as they are known to the community. Game mechanics may change with updates and patches, and our tools may not always reflect the most current state of the game.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">5. Limitations</h2>
            <p className="mb-4">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or a authorized representative has been notified orally or in writing of the possibility of such damage.
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">6. Links To Other Web Sites</h2>
            <p className="mb-4">
              Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">7. User-Generated Content</h2>
            <p className="mb-4">
              Users of our website may post content as long as it is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.
            </p>
            <p className="mb-4">
              We reserve the right (but not the obligation) to remove or edit any user-generated content at our sole discretion.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">8. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Croatia and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">9. Age Restrictions</h2>
            <p className="mb-4">
              The Rust video game is rated M (Mature) by the ESRB and is intended for audiences 17 and older. By using this website, you acknowledge that you are at least 17 years of age or are accessing the website under the supervision of a parent or legal guardian.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">10. Changes to Terms</h2>
            <p className="mb-4">
              We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-red-400">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            {/* <p className="text-gray-300">
              Email: legal@yourdomain.com<br />
              Address: Your Business Address
            </p> */}
          </section>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/legal/privacy-policy"
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors mr-4"
          >
            Privacy Policy
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