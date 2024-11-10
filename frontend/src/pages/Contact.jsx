import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("messageSubmitted");
    if (isSubmitted) {
      setIsButtonDisabled(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:4000/api/messages", formData);
      setSuccessMessage("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      localStorage.setItem("messageSubmitted", "true");
      setIsButtonDisabled(true);
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleRefresh = () => {
    localStorage.removeItem("messageSubmitted");
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  return (
    <div className="px-5 md:px-10 bg-gray-100 min-h-screen">
      <div className="text-center text-4xl pt-10 text-gray-800 font-bold">
        <p>
          CONTACT <span className="text-red-700">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          src={assets.contact_image}
          alt="Contact Us"
        />

        <div className="flex flex-col justify-center items-start gap-6 p-5 bg-white rounded-lg shadow-md">
          <p className="font-semibold text-lg text-gray-700">OUR OFFICE</p>
          <p className="text-gray-600">Kikoni 545, Kampala</p>
          <p className="text-gray-600">
            <span className="font-semibold">Tel:</span> 256 785550132 <br />
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:info@myjoyclinic.com"
              className="text-blue-600 hover:underline"
            >
              info@myjoyclinic.com
            </a>
          </p>

          <p className="font-semibold text-lg text-gray-700">CAREERS AT MYJOY CLINIC</p>
          <p className="text-gray-600">Learn more about our teams and job openings.</p>
          <a
            href="#message-form"
            className="bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-all duration-300 rounded"
          >
            Message us
          </a>
        </div>
      </div>

      <div className="text-center mb-10">
        <p className="text-gray-600">We are here to assist you with any questions or concerns. Don’t hesitate to reach out!</p>
        <p className="text-gray-500">Send us a message please!</p>
      </div>

      <div id="message-form" className="flex flex-col items-center mb-10">
        <div className="w-full md:max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Send Us a Message Now</h3>

          {successMessage && (
            <div className="text-green-600 mb-4 text-center">{successMessage}</div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 pl-10 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 w-full"
                required
              />
            </div>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 pl-10 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 w-full"
                required
              />
            </div>
            <div className="relative">
              <i className="fas fa-comment-dots absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 pl-10 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 w-full"
                required
              />
            </div>
            <div className="relative">
              <i className="fas fa-pencil-alt absolute left-3 top-3 text-gray-400"></i>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 pl-10 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 w-full"
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`px-8 py-3 text-sm rounded transition-all duration-300 ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isButtonDisabled ? "Message Sent" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
