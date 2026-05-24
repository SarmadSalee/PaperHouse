import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy — PaperHouse Pakistan';
    return () => { document.title = 'PaperHouse — Free Matric & FSc Past Papers Pakistan'; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: May 2025</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to PaperHouse (پیپر ہاؤس). This Privacy Policy explains how we collect, use, and protect information when you visit our website. PaperHouse is a free educational resource for Pakistani students and is committed to protecting your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">PaperHouse is designed to work without requiring any personal information. Specifically:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong>No account required:</strong> We do not ask you to create an account or provide an email address to use our service.</li>
              <li><strong>Request form data:</strong> If you submit a paper request, your name, WhatsApp number, and requested paper details are stored locally in your browser (localStorage) only. This data is never transmitted to our servers.</li>
              <li><strong>Dark mode preference:</strong> Your theme preference is stored locally in your browser to remember your setting between visits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">3. Cookies Policy</h2>
            <p className="mb-3">PaperHouse itself does not set any cookies. However, third-party services used on our site may set cookies:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong>Google AdSense:</strong> Google may set cookies to serve personalized advertisements based on your browsing history. These cookies are governed by Google's own privacy policy.</li>
              <li><strong>localStorage:</strong> We use browser localStorage (not cookies) to store your dark mode preference and any paper request data you submit. This data never leaves your device.</li>
            </ul>
            <p className="mt-3">
              You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of some third-party services on our site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">4. Third-Party Advertising (Google AdSense)</h2>
            <p className="mb-3">
              PaperHouse uses Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our site or other websites.
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">Google Ads Settings</a>.</li>
              <li>You may also opt out of third-party vendor cookies by visiting <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">www.networkadvertising.org/choices</a>.</li>
            </ul>
            <p className="mt-3">
              PaperHouse does not have access to or control over the cookies that Google AdSense uses. The use of Google AdSense cookies is subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">Google's Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">5. Third-Party Links</h2>
            <p>
              Our website contains links to external websites (such as ustad360.com for past papers). We are not responsible for the content or privacy practices of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">6. Data Security</h2>
            <p>
              Since PaperHouse does not collect or store personal data on any server, the risk of data breach is minimal. All user preferences (dark mode, paper requests) are stored locally on your device and are never transmitted elsewhere. We recommend keeping your browser updated for optimal security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">7. Children's Privacy</h2>
            <p>
              PaperHouse is an educational resource primarily used by students, including those under 18. We do not knowingly collect personal information from children. Our service requires no registration and collects no personal data on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:privacy@paperhouse.pk" className="text-green-600 hover:text-green-700 font-medium">privacy@paperhouse.pk</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
