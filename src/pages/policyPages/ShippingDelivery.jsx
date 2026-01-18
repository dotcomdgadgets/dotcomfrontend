import React from "react";

export default function ShippingDelivery() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-10 text-gray-800">

      <h1 className="text-sm font-bold mb-4 text-gray-900">
        Shipping & Delivery Policy
      </h1>
      <p className="text-gray-600 mb-8">Last updated: January 2025</p>

      <div className="space-y-8">

        {/* INTRO */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            Thank you for choosing our store. This Shipping & Delivery Policy
            explains how we process orders, shipment timelines, and delivery
            procedures for customers across India.
          </p>
        </section>

        {/* SHIPPING PROCESS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Order Processing Time
          </h2>
          <p className="text-gray-700">
            All orders are processed within:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li><strong>24–48 hours</strong> on business days (Mon–Sat)</li>
            <li>Orders placed on Sundays or holidays may be processed the next working day</li>
          </ul>
        </section>

        {/* SHIPPING TIME */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Estimated Delivery Time
          </h2>
          <p className="text-gray-700">Delivery times depend on your location:</p>

          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li><strong>Metro Cities:</strong> 2–5 business days</li>
            <li><strong>Tier 1 & Tier 2 Cities:</strong> 3–7 business days</li>
            <li><strong>Remote / Rural Areas:</strong> 5–10 business days</li>
          </ul>

          <p className="mt-3 text-gray-700">
            Please note: Delivery delays may occur during festivals, high-demand periods,
            holidays, or due to courier service issues.
          </p>
        </section>

        {/* SHIPPING CHARGES */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Shipping Charges
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li><strong>Standard delivery charges</strong> apply unless specified otherwise.</li>
            <li>Free shipping may be available on special offers or selected products.</li>
            <li>Shipping fee is visible during checkout.</li>
          </ul>
        </section>

        {/* ORDER TRACKING */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Order Tracking
          </h2>
          <p className="text-gray-700">
            Once your order is shipped, you will receive:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>A tracking ID via email/SMS</li>
            <li>A link to track the order in real-time</li>
            <li>Delivery updates from our courier partners</li>
          </ul>
        </section>

        {/* DELIVERY RULES */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Delivery Attempts
          </h2>
          <p className="text-gray-700">
            Our courier partners make <strong>two delivery attempts</strong>:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>If the customer is unavailable, courier will retry the next day.</li>
            <li>If still unsuccessful, the order may be returned to origin (RTO).</li>
          </ul>
        </section>

        {/* DAMAGED PACKAGE */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Damaged or Tampered Package
          </h2>
          <p className="text-gray-700">
            If you receive a damaged or tampered package:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>Do not accept the delivery</li>
            <li>Take photos/videos as proof</li>
            <li>Contact our support team immediately</li>
          </ul>
        </section>

        {/* WRONG ADDRESS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Incorrect Delivery Address
          </h2>
          <p className="text-gray-700">
            We are not responsible for delays or failed deliveries caused by:
          </p>

          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            <li>Incorrect or incomplete address entered by customer</li>
            <li>Unreachable phone number</li>
            <li>Customer not available to receive package</li>
          </ul>
        </section>

        {/* INTERNATIONAL SHIPPING */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. International Shipping
          </h2>
          <p className="text-gray-700">
            Currently, we <strong>do not offer international shipping</strong>.
            We only deliver within India.
          </p>
        </section>

        {/* CONTACT INFO */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-700">
            For questions about shipping or delivery, contact us:
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
