import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 text-gray-800">
      
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">
        Last updated: January 2025
      </p>

      <div className="space-y-8">

        {/* INTRO */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            We value your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, store, and safeguard
            your information when you use our website, services, and products.
          </p>
        </section>

        {/* INFORMATION WE COLLECT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect the following types of information:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-700">
            <li><strong>Personal Information:</strong> Name, email address, phone number, billing and delivery address.</li>
            <li><strong>Account Information:</strong> Login details and user profile data.</li>
            <li><strong>Order Details:</strong> Products you purchase, payment status, transaction IDs.</li>
            <li><strong>Device & Usage Data:</strong> IP address, browser type, device type, pages visited.</li>
            <li><strong>Cookies:</strong> To enhance website experience and improve performance.</li>
          </ul>
        </section>

        {/* HOW WE USE DATA */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>To process orders and deliver products/services.</li>
            <li>To send order updates, notifications, and support messages.</li>
            <li>To improve user experience and website performance.</li>
            <li>To verify identity and prevent fraud.</li>
            <li>To respond to inquiries and provide customer support.</li>
            <li>To send promotional offers (only with your consent).</li>
          </ul>
        </section>

        {/* SHARING DATA */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Sharing Your Information
          </h2>

          <p className="text-gray-700">
            We do <strong>not</strong> sell your personal information.  
            We may share your data only with:
          </p>

          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Trusted delivery partners</li>
            <li>Payment gateway providers</li>
            <li>Service providers for analytics and hosting</li>
            <li>Law enforcement, only if required by law</li>
          </ul>
        </section>

        {/* DATA SECURITY */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Data Security
          </h2>
          <p className="text-gray-700">
            We use industry-standard security measures to safeguard your personal data.
            While we strive to protect your information, no system is 100% secure.
          </p>
        </section>

        {/* COOKIES */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Cookies & Tracking
          </h2>
          <p className="text-gray-700">
            We use cookies to store user preferences, track website performance,
            and improve overall experience. You can disable cookies in your browser settings.
          </p>
        </section>

        {/* YOUR RIGHTS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Your Rights
          </h2>
          <p className="text-gray-700">
            As a user, you have the right to:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and personal data</li>
            <li>Opt-out of marketing communications anytime</li>
          </ul>
        </section>

        {/* THIRD PARTY LINKS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Third-Party Links
          </h2>
          <p className="text-gray-700">
            Our website may contain links to third-party sites.  
            We are not responsible for their privacy practices.
          </p>
        </section>

        {/* CHANGES TO POLICY */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Updates to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this policy from time to time.  
            Any changes will be posted on this page with the updated date.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy,  
            you can contact us at:
          </p>

          <p className="mt-2 text-gray-700">
            📩 <strong>Email:</strong> dotcomdgadget@gmail.com<br />
            📞 <strong>Phone:</strong> +91 9319058138
          </p>
        </section>

      </div>

    </div>
  );
}
