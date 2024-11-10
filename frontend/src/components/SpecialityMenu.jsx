import React, { useCallback } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    const handleScrollToTop = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id='speciality' className='flex flex-col items-center gap-8 py-16 text-[#262626] bg-gradient-to-b from-primary to-secondary'>
            <h1 className='text-4xl font-bold mb-6 text-center text-white shadow-md'>Doctors by Speciality</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-xl mx-auto'>
                {specialityData.map((item) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={handleScrollToTop} 
                        className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:shadow-xl hover:scale-105'
                        key={item.id} 
                    >
                        <img 
                            className='w-20 mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110' 
                            src={item.image} 
                            alt={`${item.speciality} service`} 
                            loading="lazy" 
                        />
                        <p className='text-center font-semibold text-md text-gray-800 transition-colors duration-300 ease-in-out hover:text-blue-600'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
