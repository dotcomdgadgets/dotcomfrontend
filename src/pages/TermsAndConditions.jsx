import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 text-gray-800">

      <h1 className="text-3xl font-bold mb-4 text-gray-900">Terms & Conditions</h1>
      <p className="text-gray-600 mb-8">Last updated: January 2025</p>

      <div className="space-y-8">

        {/* INTRO */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our website, services, or products, you agree to the following 
            Terms & Conditions. Please read this document carefully before using our services.
          </p>
        </section>

        {/* USE OF SERVICE */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Use of Our Services
          </h2>
          <p className="text-gray-700">
            You agree to use our website and services only for lawful purposes. You must not:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Use the site for fraudulent or harmful activities</li>
            <li>Interfere with website functionality or security</li>
            <li>Attempt unauthorized access to our systems</li>
            <li>Use automated tools (bots, scrapers) without permission</li>
          </ul>
        </section>

        {/* ACCOUNT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Account Registration
          </h2>
          <p className="text-gray-700">
            When you create an account, you agree to:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your login credentials</li>
            <li>Notify us immediately of unauthorized account usage</li>
          </ul>
        </section>

        {/* ORDERS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Orders & Payments
          </h2>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>All orders are subject to product availability.</li>
            <li>Prices are shown in INR and may change without notice.</li>
            <li>Your order is confirmed only after successful payment or verification.</li>
            <li>We reserve the right to cancel orders if fraud is suspected.</li>
          </ul>
        </section>

        {/* SHIPPING */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Shipping & Delivery
          </h2>
          <p className="text-gray-700">
            Delivery times are estimates and may vary depending on location and logistics.  
            We are not responsible for delays caused by third-party courier partners.
          </p>
        </section>

        {/* RETURNS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Returns & Refunds
          </h2>
          <p className="text-gray-700">
            Our Return/Refund Policy outlines the conditions under which you may return products.
            Please review the policy carefully before initiating a return.
          </p>
        </section>

        {/* USER CONDUCT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. User Responsibilities
          </h2>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>You must not misuse our services or violate applicable laws.</li>
            <li>You are responsible for the accuracy of information you provide.</li>
            <li>Any abusive, threatening, or fraudulent behaviour will lead to account suspension.</li>
          </ul>
        </section>

        {/* INTELLECTUAL PROPERTY */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Intellectual Property
          </h2>
          <p className="text-gray-700">
            All logos, text, images, and content on the website are the intellectual property 
            of DotCom Gadgets (or respective owners). You may not copy, distribute, or modify 
            any content without written permission.
          </p>
        </section>

        {/* LIMITATION OF LIABILITY */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            We are not responsible for:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Any direct or indirect losses caused by using our website</li>
            <li>Delays or failures outside our control</li>
            <li>Issues arising from third-party products, couriers, or payment gateways</li>
          </ul>
        </section>

        {/* POLICY CHANGES */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Changes to Terms
          </h2>
          <p className="text-gray-700">
            We may update these Terms & Conditions from time to time. Continued use of our 
            website constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            10. Contact Us
          </h2>
          <p className="text-gray-700">
            For any questions regarding these Terms, please contact us:
          </p>
          <p className="mt-2 text-gray-700">
            📩 <strong>Email:</strong> dotcomdgadget@gmail.com <br />
            📞 <strong>Phone:</strong> +91 9319058138
          </p>
        </section>

      </div>
    </div>
  );
}
