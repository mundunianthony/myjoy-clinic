import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

            {/* ------- Left Side ------- */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                    <p>Book an Appointment</p>
                    <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl font-medium text-blue-100">Choose from our doctors</p>
                </div>
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0); }}
                    className="bg-white text-sm sm:text-base text-blue-600 font-semibold px-10 py-3 rounded-full mt-8 shadow-lg hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    Create Account
                </button>
            </div>


            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner