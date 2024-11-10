import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div className='my-10 px-5 text-gray-700'>
            <p className='text-2xl font-bold mb-6 text-center'>Browse Our Specialists</p>
            <div className='flex flex-col sm:flex-row items-start gap-6'>
                <button 
                    onClick={() => setShowFilter(!showFilter)} 
                    className={`py-2 px-4 border rounded text-sm font-medium transition-colors sm:hidden ${showFilter ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    Filters
                </button>

                <div className={`flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialty, idx) => (
                        <p 
                            key={idx}
                            onClick={() => speciality === specialty ? navigate('/doctors') : navigate(`/doctors/${specialty}`)} 
                            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer 
                                        ${speciality === specialty ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {specialty}
                        </p>
                    ))}
                </div>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                    {filterDoc.map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} 
                            className='border border-gray-200 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' 
                            key={index}
                        >
                            <img 
                                className='w-full h-48 object-cover bg-gray-100' 
                                src={item.image} 
                                alt={`${item.name}`} 
                            />
                            <div className='p-4 bg-white'>
                                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                    <span>{item.available ? 'Available' : 'Not Available'}</span>
                                </div>
                                <p className='mt-2 text-lg font-semibold text-gray-800'>{item.name}</p>
                                <p className='text-sm text-gray-500'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Doctors
