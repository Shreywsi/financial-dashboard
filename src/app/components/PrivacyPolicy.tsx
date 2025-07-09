import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <section className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow mt-12">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">Privacy Policy</h1>
    <p className="mb-4 text-gray-700">
      Your privacy is important to us. This privacy policy explains what information we collect, how we use it, and your rights regarding your information.
    </p>
    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Information We Collect</h2>
    <ul className="list-disc list-inside mb-4 text-gray-700">
      <li>We do not collect any personal information unless you voluntarily provide it.</li>
      <li>Non-personal data such as browser type, device, and usage statistics may be collected for analytics.</li>
    </ul>
    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">How We Use Information</h2>
    <ul className="list-disc list-inside mb-4 text-gray-700">
      <li>To improve our website and user experience.</li>
      <li>To analyze usage trends and optimize our services.</li>
    </ul>
    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Your Rights</h2>
    <ul className="list-disc list-inside mb-4 text-gray-700">
      <li>You may request to know what data we have about you or request deletion of your data.</li>
      <li>Contact us at privacy@example.com for any privacy-related requests.</li>
    </ul>
    <p className="text-gray-600 mt-8">This policy may be updated from time to time. Please review it periodically.</p>
  </section>
);

export default PrivacyPolicy;