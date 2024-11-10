import React, { useState, useEffect } from 'react';

// Import background images
import backgroundImage1 from '../assets/slider1.png';
import backgroundImage2 from '../assets/slider2.png';
import backgroundImage3 from '../assets/slider3.png';
import backgroundImage4 from '../assets/slider4.png';
import backgroundImage5 from '../assets/slider5.png';

const Header = () => {
    // State to manage the current background image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of background images for the slideshow
    const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5]; // Add more images to this array

    // Change background image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [backgroundImages.length]);

    return (
        <div
            className='flex items-center justify-center h-[75vh] text-white px-6 md:px-10 lg:px-20 transition-all duration-1000'
            style={{
                backgroundImage: `url(${backgroundImages[currentIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 1s ease-in-out',
            }}
        >
            {/* ---------Text Content --------- */}
            <div className='text-center'>
                <div className='text-sm font-light mt-4'>
                    {/* Text content can go here */}
                </div>
                <a
                    href='#speciality'
                    className='inline-block mt-6 bg-white px-8 py-3 rounded-full text-blue-400 text-sm hover:scale-105 transition-all duration-300'
                >
                    Book appointment Now
                </a>
            </div>
        </div>
    );
};

export default Header;
