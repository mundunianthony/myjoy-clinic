import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-blue-100 py-10'>
      <div className='text-center text-3xl font-bold text-gray-800 mb-8'>
        <p>ABOUT <span className='text-blue-600'>MyJoy Clinic</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center items-center px-4'>
        <img className='w-full md:max-w-[360px] rounded-lg shadow-md border-2 border-gray-200' src={assets.about_image} alt="MyJoy Clinic" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-700'>
          <p>At MyJoy Clinic, we are dedicated to being your trusted partner in managing your healthcare needs conveniently and efficiently. 
            We understand the challenges individuals face when scheduling doctor appointments and managing health records, 
            which is why we have developed an intuitive platform that simplifies the entire process.</p>

          <p>We offer a wide range of services to ensure that all your healthcare needs are met under one roof.</p>
          <b className='text-gray-800 text-lg'>Our Mission</b>
          <p>Our mission is to provide accessible, high-quality healthcare that empowers you to take control of your health. 
            We believe that healthcare should be easy to access and navigate, 
            which is why we have tailored our services to meet the unique needs of each patient.</p>
        </div>
      </div>

      <div className='text-2xl my-6 text-center text-gray-800'>
        <p>WHY <span className='text-blue-600 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 px-4 gap-8'>
        {[
          {
            title: "COMPREHENSIVE CARE",
            description: "At MyJoy Clinic, we believe in holistic health. Our wide range of medical services ensures that all your healthcare needs are met under one roof. From routine check-ups and preventive care to specialized treatments, our team of experienced professionals is dedicated to providing you with the best possible care.",
            details: "We offer various specialties, including pediatrics, geriatrics, internal medicine, and more, ensuring that every member of your family receives tailored medical attention. Our state-of-the-art facilities are equipped with the latest technology to provide accurate diagnoses and effective treatments."
          },
          {
            title: "ACCESSIBLE APPOINTMENTS",
            description: "Booking appointments at MyJoy Clinic is simple and convenient. Our user-friendly online platform allows you to schedule, reschedule, or cancel appointments with just a few clicks, saving you time and effort. We understand that life can be hectic, so we offer flexible scheduling options to accommodate your busy lifestyle.",
            details: "Our clinic also provides telehealth services, allowing you to consult with our healthcare providers from the comfort of your home. Whether you need a follow-up appointment or have a health concern, our virtual visits ensure that you receive timely care without the hassle of travel."
          },
          {
            title: "PERSONALIZED HEALTH MANAGEMENT",
            description: "At MyJoy Clinic, we recognize that each patient is unique. Our personalized health management approach includes tailored care plans designed to meet your specific health goals and needs. Our healthcare professionals work closely with you to create a comprehensive health strategy that addresses both short-term concerns and long-term wellness.",
            details: "We also provide regular health reminders and follow-ups, ensuring that you stay on track with your appointments, medications, and lifestyle changes. Our commitment to personalized care empowers you to take control of your health journey, making it easier to achieve and maintain optimal health."
          }
        ].map((item, index) => (
          <div key={index} className='border border-gray-300 rounded-lg p-6 flex flex-col gap-4 bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl'>
            <h3 className='text-lg font-semibold text-gray-800'>{item.title}</h3>
            <p>{item.description}</p>
            <p className='text-gray-600'>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
