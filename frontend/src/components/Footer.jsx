import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-gray-100 w-full">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm p-5 md:p-10">
        
      <div>
          <img className="mb-5 w-40" src={assets.logo} alt="MyJoy Clinic Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            At MyJoy Medical Clinic, we are committed to providing you with the highest quality healthcare services. Our dedicated{' '}
            <a href="http://localhost:5174/login" target="_blank" rel="noopener noreferrer" className="text-black-600 hover:text-blue-800 no-underline">
              staff
            </a>{' '}
            are here to support you and your family's health needs, ensuring you receive comprehensive and personalized care.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">NAVIGATE</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-primary cursor-pointer">Home</li>
            <li className="hover:text-primary cursor-pointer">About Us</li>
            <li className="hover:text-primary cursor-pointer">Services</li>
            <li className="hover:text-primary cursor-pointer">Contact Us</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CONTACT US</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-primary cursor-pointer">+256 785550132</li>
            <li className="hover:text-primary cursor-pointer">info@myjoyclinic.com</li>
            <li className="hover:text-primary cursor-pointer">123 MyJoy Lane, Health City, Kampala</li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-gray-200">
        <hr />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright © 2024 MyJoy Clinic - All Rights Reserved.
        </p>

        
      </div>
    </div>
  );
};

export default Footer;
