"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    contactNumber: "",
    companyName: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log form data (replace this later with your API endpoint)
    console.log("Form submitted:", formData);

    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-green-600">
        Thank you for your submission!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Name*"
        required
        value={formData.name}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="surname"
        placeholder="Surname*"
        required
        value={formData.surname}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address*"
        required
        value={formData.email}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number*"
        required
        value={formData.contactNumber}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="companyName"
        placeholder="Company Name*"
        required
        value={formData.companyName}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="service"
        required
        value={formData.service}
        onChange={handleChange}
        className="placeholder-white text-white border border-gray-300 p-3 rounded w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a Service*</option>
        <option>Studio Hire</option>
        <option>Studio Photography</option>
        <option>Google Review Booster</option>
        <option>SMS Marketing</option>
        <option>Email Marketing</option>
        <option>Google Ads</option>
        <option>Paid Social Media</option>
        <option>Search Engine Optimisation</option>
        <option>Audio & Video Copywriting</option>
        <option>Article Copywriting</option>
        <option>Conversion Copywriting</option>
        <option>Website Copywriting</option>
        <option>Custom Development</option>
        <option>Website Development</option>
        <option>Web Design</option>
        <option>UX/UI Design</option>
        <option>Hosting Services</option>
        <option>Organic Social Media</option>
        <option>Graphic Design</option>
      </select>

      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="placeholder-white text-white md:col-span-2 border border-gray-300 p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border"
      >
        Submit
      </button>
    </form>
  );
}