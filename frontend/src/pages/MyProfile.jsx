import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            image && formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData ? (
        <div className='max-w-lg mx-auto flex flex-col gap-4 text-sm pt-5 bg-white shadow-md rounded-lg p-6'>
            {isEdit ? (
                <label htmlFor='image'>
                    <div className='relative cursor-pointer'>
                        <img className='w-36 h-36 rounded-full border-4 border-blue-500' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                        <img className='w-10 absolute bottom-2 right-2' src={assets.upload_icon} alt="Upload Icon" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
            ) : (
                <img className='w-36 h-36 rounded-full border-4 border-blue-500' src={userData.image} alt="Profile" />
            )}

            {isEdit ? (
                <input className='bg-gray-50 text-2xl font-medium max-w-full p-2 rounded-md border border-gray-300' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
            ) : (
                <p className='font-medium text-2xl text-[#262626] mt-4'>{userData.name}</p>
            )}

            <hr className='bg-blue-500 h-[2px] border-none' />

            <div>
                <p className='text-gray-600 font-semibold mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit ? (
                        <input className='bg-gray-50 max-w-52 p-2 rounded-md border border-gray-300' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                    ) : (
                        <p className='text-blue-500'>{userData.phone}</p>
                    )}

                    <p className='font-medium'>Address:</p>

                    {isEdit ? (
                        <div>
                            <input className='bg-gray-50 p-2 rounded-md border border-gray-300' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50 p-2 rounded-md border border-gray-300' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                        </div>
                    ) : (
                        <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    )}
                </div>
            </div>
            <div>
                <p className='text-[#797979] font-semibold mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {isEdit ? (
                        <select className='max-w-20 bg-gray-50 p-2 rounded-md border border-gray-300' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-gray-500'>{userData.gender}</p>
                    )}

                    <p className='font-medium'>Birthday:</p>

                    {isEdit ? (
                        <input className='max-w-28 bg-gray-50 p-2 rounded-md border border-gray-300' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                    ) : (
                        <p className='text-gray-500'>{userData.dob}</p>
                    )}
                </div>
            </div>
            <div className='mt-10'>
                {isEdit ? (
                    <button onClick={updateUserProfileData} className='bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-all'>Save information</button>
                ) : (
                    <button onClick={() => setIsEdit(true)} className='border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all'>Edit</button>
                )}
            </div>
        </div>
    ) : null;
};

export default MyProfile;
