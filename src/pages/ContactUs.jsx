import React, { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
  };

  return (
    <section className="mt-24 px-6 md:px-10">

      {/* 🌟 HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Get in <span className="text-amber-500">Touch</span>
        </h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          We’re here to help. Reach out anytime — we reply within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* 🌟 CONTACT INFO CARDS */}

<div className="space-y-4">

  {[
    {
      icon: <MdLocationOn />,
      label: "Store Address",
      text: "Ground floor, DotCom Gadgets, Rohtash Nagar, Delhi - 110032",
    },
    {
      icon: <MdPhone />,
      label: "Call Us",
      text: "+91 9319058138",
    },
    {
      icon: <MdEmail />,
      label: "Email",
      text: "dotcominfo@gmail.com",
    },
    {
      icon: <MdAccessTime />,
      label: "Working Hours",
      text: "Mon – Sun: 10:00 AM – 9:00 PM",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="rounded-2xl bg-white p-5 shadow-md hover:shadow-xl 
                 border border-amber-400/20 transition cursor-pointer 
                 flex items-start gap-4"
    >
      <div className="text-amber-500 text-xl">{item.icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-amber-600">
          {item.label}
        </p>
        <p className="mt-1 text-gray-700">{item.text}</p>
      </div>
    </div>
  ))}

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/919102548287"
    target="_blank"
    className="flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-full 
               hover:bg-green-700 transition font-medium shadow-lg"
  >
    <FaWhatsapp className="text-xl" /> Chat on WhatsApp
  </a>
</div>


        {/* 🌟 CONTACT FORM — PREMIUM PROFESSIONAL UI */}
<div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-8">
  <h3 className="text-2xl font-semibold text-gray-900">
    Send a Message
  </h3>
  <p className="text-gray-500 text-sm mt-1">
    Our team will get back to you shortly.
  </p>

  <form
    onSubmit={handleSubmit}
    className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
  >
    {[ 
      { name: "firstName", label: "First Name *" },
      { name: "lastName", label: "Last Name *" },
      { name: "email", label: "Email *", full: true },
      { name: "phone", label: "Phone" },
      { name: "subject", label: "Subject" },
    ].map((f) => (
      <div
        key={f.name}
        className={f.full ? "sm:col-span-2" : ""}
      >
        <label className="text-sm font-medium text-gray-700">
          {f.label}
        </label>

        <input
          type="text"
          name={f.name}
          onChange={handleChange}
          required={f.label.includes("*")}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 
                     text-gray-800 shadow-sm placeholder-gray-400
                     focus:border-amber-400 focus:ring-2 focus:ring-amber-300 transition"
        />
      </div>
    ))}

    {/* Message box */}
    <div className="sm:col-span-2">
      <label className="text-sm font-medium text-gray-700">Message</label>
      <textarea
        name="message"
        rows={4}
        onChange={handleChange}
        className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 
                   text-gray-800 shadow-sm placeholder-gray-400
                   focus:border-amber-400 focus:ring-2 focus:ring-amber-300 transition"
      ></textarea>
    </div>

    {/* Buttons */}
    <div className="sm:col-span-2 flex gap-4 mt-3">
      <button
        type="submit"
        className="flex-1 py-3 rounded-full bg-amber-500 text-white font-semibold 
                   shadow-md hover:bg-amber-600 hover:shadow-lg transition"
      >
        Submit
      </button>

      <a
        href="tel:+919102548287"
        className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 
                   hover:bg-gray-900 hover:text-white transition font-medium"
      >
        Call Now
      </a>
    </div>
  </form>
</div>

      </div>

      {/* ⭐ EXTRA CTA SECTION (Optional) */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Still have questions?
        </h3>
        <p className="text-gray-500 mt-1">
          Our support team is always here to help you.
        </p>
      </div>
    </section>
  );
}
