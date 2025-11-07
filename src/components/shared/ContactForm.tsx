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
    how: "",
    other: "",
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
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-green-600">
        Thank you for your submission!
      </div>
    );
  }

  const isOtherSelected = formData.how === "Other";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* --- Basic Fields --- */}
      <input
        type="text"
        name="name"
        placeholder="Name*"
        required
        value={formData.name}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="surname"
        placeholder="Surname*"
        required
        value={formData.surname}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address*"
        required
        value={formData.email}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number*"
        required
        value={formData.contactNumber}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="companyName"
        placeholder="Company Name*"
        required
        value={formData.companyName}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* --- Service Dropdown --- */}
      <div className="relative">
        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="appearance-none bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <img
            src="/images/select-down.png"
            alt="Dropdown arrow"
            width={20}
            height={11}
          />
        </span>
      </div>

      {/* --- "How did you hear about us" Section --- */}
      <div
        className={`md:col-span-2 flex flex-col md:flex-row gap-6 transition-all duration-300 ${
          isOtherSelected ? "items-stretch" : "items-center"
        }`}
      >
        {/* Select */}
        <div
          className="relative flex-1 h-full"
          style={{ minWidth: "calc(50% - 15px)" }}
        >
          <select
            name="how"
            required
            value={formData.how}
            onChange={handleChange}
            className="appearance-none h-full bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">How did you hear about us*</option>
            <option>Google</option>
            <option>Word of Mouth</option>
            <option>Billboard</option>
            <option>Social Media</option>
            <option>Email newsletter</option>
            <option>SMS Campaign</option>
            <option>Returning Client</option>
            <option>Other</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <img
              src="/images/select-down.png"
              alt="Dropdown arrow"
              width={20}
              height={11}
            />
          </span>
        </div>

        {/* “Other” Field */}
        {isOtherSelected && (
          <input
            type="text"
            name="other"
            placeholder="Please specify other*"
            required
            value={formData.other}
            onChange={handleChange}
            className="flex-1 h-full bg-[#1F1F1F] placeholder-white text-white border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* --- Message Field --- */}
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="bg-[#1F1F1F] placeholder-white text-white md:col-span-2 border border-[#353536] p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* --- Submit Button --- */}
      <button
        type="submit"
        className="cursor-pointer inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border md:col-span-2 w-auto justify-self-start"
      >
        Submit
      </button>
    </form>
  );
}