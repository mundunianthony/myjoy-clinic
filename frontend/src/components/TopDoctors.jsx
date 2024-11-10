import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl font-semibold text-gray-800'>Available Doctors</h1>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { 
                            navigate(`/appointment/${item._id}`); 
                            window.scrollTo(0, 0); 
                        }}
                        className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-2'
                        key={index}
                    >
                        <img 
                            className='bg-[#EAEFFF] w-full h-48 object-cover' 
                            src={item.image} 
                            alt={`${item.name}`} 
                            loading="lazy"
                        />
                        <div className='p-5 bg-white'>
                            <div className={`flex items-center gap-2 text-sm font-semibold ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                                <span>{item.available ? 'Available' : 'Not Available'}</span>
                            </div>
                            <p className='mt-2 text-lg font-semibold text-gray-900'>{item.name}</p>
                            <p className='text-sm text-gray-500'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                onClick={() => { 
                    navigate('/doctors'); 
                    window.scrollTo(0, 0); 
                }} 
                className='bg-[#EAEFFF] text-gray-700 font-medium px-8 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors duration-200'
            >
                View More Doctors
            </button>
        </div>
    );
};

export default TopDoctors;
