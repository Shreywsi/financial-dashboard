"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-teal-600 to-blue-800 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-blue-800 font-medium">
              Effective Date: [Insert Date]
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Introduction
            </h2>
            <p className="text-lg leading-relaxed text-black">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <span className="font-semibold text-blue-700">FinancialTools</span>, and use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Information We Collect
            </h2>
            <p className="text-lg leading-relaxed text-black mb-6">
              We may collect information about you in a variety of ways, including:
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-blue-700 mb-3">Personal Data</h3>
                <p className="text-black leading-relaxed">
                  Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Derivative Data</h3>
                <p className="text-black leading-relaxed">
                  Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="text-xl font-bold text-blue-700 mb-3">Financial Data</h3>
                <p className="text-black leading-relaxed">
                  Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site.
                </p>
              </div>
            </div>
          </section>

          {/* Use of Your Information */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Use of Your Information
            </h2>
            <p className="text-lg leading-relaxed text-black mb-6">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-blue-800 font-semibold">Create and manage your account</span>
                </div>
              </div>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-teal-800 font-semibold">Process transactions and send related information</span>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-blue-800 font-semibold">Send marketing and promotional communications</span>
                </div>
              </div>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-teal-800 font-semibold">Respond to customer service requests</span>
                </div>
              </div>
            </div>
          </section>

          {/* Disclosure of Information */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Disclosure of Your Information
            </h2>
            <p className="text-lg leading-relaxed text-black mb-6">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-700 mb-3">By Law or to Protect Rights</h3>
                <p className="text-black leading-relaxed">
                  If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </p>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Third-Party Service Providers</h3>
                <p className="text-black leading-relaxed">
                  We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Security of Your Information
            </h2>
            <div className="bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 rounded-xl p-6 border border-blue-200">
              <p className="text-lg leading-relaxed text-black">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that <span className="font-semibold text-blue-700">no method of transmission over the Internet or method of electronic storage is 100% secure</span>, and we cannot guarantee its absolute security.
              </p>
            </div>
          </section>

          {/* Policy for Children */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full mr-4"></div>
              Policy for Children
            </h2>
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
              <p className="text-lg leading-relaxed text-black">
                We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}