import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
            setAppointments(data.appointments.reverse());
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const rescheduleAppointment = async () => {
        try {
            console.log('Rescheduling appointment with ID:', selectedAppointment._id);
            console.log('New Date:', newDate);
            console.log('New Time:', newTime);

            // Validate the new date and time before sending
            if (!newDate || !newTime) {
                toast.error('Please provide both a new date and time.');
                return;
            }

            const { data } = await axios.post(`${backendUrl}/api/user/reschedule-appointment`, 
                { appointmentId: selectedAppointment._id, newDate, newTime }, 
                { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                setSelectedAppointment(null); // Close reschedule modal
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Error in rescheduleAppointment:', error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}
                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
                            {!item.cancelled && !item.isCompleted && (
                                <>
                                    <button onClick={() => { setSelectedAppointment(item); }} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-300'>Reschedule</button>
                                    <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                                </>
                            )}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Reschedule Modal */}
            {selectedAppointment && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded shadow-lg'>
                        <h2 className='text-xl font-semibold'>Reschedule Appointment</h2>
                        <p>Current Appointment: {slotDateFormat(selectedAppointment.slotDate)} at {selectedAppointment.slotTime}</p>
                        <label className='block mt-4'>New Date:</label>
                        <input 
                            type="date" 
                            onChange={(e) => setNewDate(e.target.value)} 
                            className='border rounded p-2 w-full'
                        />
                        <label className='block mt-4'>New Time:</label>
                        <input 
                            type="time" 
                            onChange={(e) => setNewTime(e.target.value)} 
                            className='border rounded p-2 w-full'
                        />
                        <div className='mt-4'>
                            <button 
                                onClick={() => {
                                    console.log('Attempting to reschedule appointment with ID:', selectedAppointment._id);
                                    console.log('New Date:', newDate);
                                    console.log('New Time:', newTime);
                                    rescheduleAppointment();
                                }} 
                                className='bg-primary text-white rounded-full py-2 px-5 mr-2'
                            >
                                Confirm Reschedule
                            </button>
                            <button 
                                onClick={() => setSelectedAppointment(null)} 
                                className='bg-gray-500 text-white rounded-full py-2 px-5'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyAppointments;
