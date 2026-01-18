import React, { useState } from "react";
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  

  return (
    <section className="pt-24 pb-16 px-4 md:px-10 bg-gradient-to-b from-gray-50 to-white">
      {/* ================= HERO ================= */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Get in <span className="text-amber-500">Touch</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Have a question about our products or services?  
          Our team usually responds within <b>24 hours</b>.
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ================= CONTACT INFO ================= */}
        <div className="space-y-5">
          {[
            {
              icon: MdLocationOn,
              title: "Store Address",
              value:
                "Ground Floor, DotCom Gadgets, Rohtash Nagar, Delhi – 110032",
            },
            {
              icon: MdPhone,
              title: "Phone",
              value: "+91 93190 58138",
              link: "tel:+919319058138",
            },
            {
              icon: MdEmail,
              title: "Email",
              value: "dotcomdgadget@gmail.com",
              link: "mailto:dotcomdgadget@gmail.com",
            },
            {
              icon: MdAccessTime,
              title: "Working Hours",
              value: "Mon – Sun : 10:00 AM – 9:00 PM",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white
                border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-100 text-amber-600">
                  <Icon size={22} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {item.title}
                  </p>

                  {item.link ? (
                    <a
                      href={item.link}
                      className="mt-1 block text-gray-800 font-medium hover:text-amber-500 transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-gray-800 font-medium">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* ================= WHATSAPP CTA ================= */}
          <a
            href="https://wa.me/919102548287"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-flex items-center justify-center gap-3
              px-6 py-3 rounded-full
              bg-green-600 text-white font-semibold
              hover:bg-green-700 transition
              shadow-lg
            "
          >
            <FaWhatsapp size={22} />
            Chat on WhatsApp
          </a>
        </div>

        {/* ================= INFO PANEL ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Why contact DotCom Gadgets?
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>✔ Product availability & pricing</li>
            <li>✔ Order & delivery support</li>
            <li>✔ Warranty & returns</li>
            <li>✔ Bulk & business enquiries</li>
          </ul>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            💡 Tip: For fastest response, reach us via WhatsApp.
          </div>
        </div>
      </div>

      {/* ================= FOOT CTA ================= */}
      <div className="mt-20 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          We value your trust
        </h3>
        <p className="text-gray-500 mt-2 text-sm">
          DotCom Gadgets — Quality electronics, honest pricing, real support.
        </p>
      </div>
    </section>
  );
}
