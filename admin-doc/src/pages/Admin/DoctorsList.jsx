import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            className="border border-[#C9D8FF] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105"
            key={index}
          >
            <img
              className="w-full h-48 object-cover bg-[#EAEFFF] transition-all duration-500"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-semibold">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm mb-2">{item.speciality}</p>
              <div className="flex items-center gap-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
