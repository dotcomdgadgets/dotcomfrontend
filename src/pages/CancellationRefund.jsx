import React from "react";

export default function CancellationRefund() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 text-gray-800">

      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Cancellation & Refund Policy
      </h1>
      <p className="text-gray-600 mb-8">Last updated: January 2025</p>

      <div className="space-y-8">

        {/* POLICY INTRO */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            Thank you for shopping with us. This Cancellation & Refund Policy explains 
            the terms under which you can cancel an order or request a refund for products 
            purchased through our website.
          </p>
        </section>

        {/* ORDER CANCELLATION */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Order Cancellation
          </h2>
          <p className="text-gray-700">
            You may cancel your order under the following conditions:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>You can cancel before the product is shipped.</li>
            <li>
              Once the product is shipped or out for delivery, cancellation is not possible.
            </li>
            <li>
              For prepaid orders, cancellation before shipping is eligible for a full refund.
            </li>
          </ul>
        </section>

        {/* REFUND PROCESS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Refund Eligibility
          </h2>

          <p className="text-gray-700">You may request a refund in the following cases:</p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Wrong or defective product delivered</li>
            <li>Product damaged during transit</li>
            <li>Order canceled before shipping</li>
            <li>Product not delivered due to courier issues</li>
          </ul>

          <p className="mt-3 text-gray-700">
            Refunds will be issued only after our team verifies the issue.
          </p>
        </section>

        {/* NON-REFUNDABLE ITEMS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Non-Refundable Items
          </h2>

          <p className="text-gray-700">Refunds are not applicable for:</p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Products damaged by customer misuse</li>
            <li>Products without original packaging or accessories</li>
            <li>Items intentionally modified or tampered with</li>
            <li>Digital or downloadable items (if applicable)</li>
          </ul>
        </section>

        {/* REFUND TIME */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Refund Timeline
          </h2>
          <p className="text-gray-700">
            Once a refund is approved, the amount will be processed within:
          </p>

          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li><strong>3–7 business days</strong> for UPI / Wallets</li>
            <li><strong>5–9 business days</strong> for Bank Transfers</li>
            <li><strong>7–14 business days</strong> for Credit/Debit Cards</li>
          </ul>

          <p className="mt-3 text-gray-700">
            Processing time depends on your bank/payment provider.
          </p>
        </section>

        {/* RETURN PROCESS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Return Process
          </h2>
          <p className="text-gray-700">
            If a return is required, you must:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Share pictures/videos of the damaged/wrong item</li>
            <li>Return the product in its original packaging</li>
            <li>Ensure all accessories are included</li>
          </ul>

          <p className="mt-3 text-gray-700">
            Once the returned item is received and inspected, your refund will be processed.
          </p>
        </section>

        {/* SHIPPING COSTS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Shipping Charges
          </h2>

          <p className="text-gray-700">
            Shipping fees are refundable only if:
          </p>

          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>The wrong product was delivered</li>
            <li>The item was damaged during transit</li>
            <li>The order was canceled before shipping</li>
          </ul>
        </section>

        {/* CANCELLATION BY COMPANY */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Cancellation by Company
          </h2>
          <p className="text-gray-700">
            We reserve the right to cancel any order due to:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
            <li>Payment failure</li>
            <li>Stock unavailability</li>
            <li>Incorrect delivery address</li>
            <li>Suspected fraudulent activity</li>
          </ul>
        </section>

        {/* CONTACT INFO */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-700">
            For cancellation or refund requests, contact our support team:
          </p>

          <p className="mt-3 text-gray-700">
            📩 <strong>Email:</strong> dotcomdgadget@gmail.com <br />
            📞 <strong>Phone:</strong> +91 9319058138
          </p>
        </section>

      </div>
    </div>
  );
}
