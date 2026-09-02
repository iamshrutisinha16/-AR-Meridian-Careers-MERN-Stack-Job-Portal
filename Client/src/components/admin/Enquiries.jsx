import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Trash2, CheckCircle2, Clock, Mail, Phone, User, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/v1/inquiry/get`, { 
                withCredentials: true 
            });

            if (res.data.success) {
                setEnquiries(res.data.enquiries);
            }
        } catch (error) {
            console.error("Error fetching enquiries:", error);
            toast.error(error.response?.data?.message || "Failed to load enquiries from server.");
            setEnquiries([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    // Real status update handler in database (URL fixed to /api/v1/inquiry/)
    const markAsResolvedHandler = async (id) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/v1/inquiry/resolve/${id}`, {}, { 
                withCredentials: true 
            });

            if (res.data.success) {
                toast.success(res.data.message || "Enquiry marked as resolved");
                setEnquiries(enquiries.map(item => item._id === id ? { ...item, status: "Resolved" } : item));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    // Real delete handler from database (URL fixed to /api/v1/inquiry/)
    const deleteHandler = async (id) => {
        try {
            const res = await axios.delete(`${BACKEND_URL}/api/v1/inquiry/delete/${id}`, { 
                withCredentials: true 
            });

            if (res.data.success) {
                toast.success(res.data.message || "Enquiry deleted successfully");
                setEnquiries(enquiries.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            toast.error(error.response?.data?.message || "Failed to delete enquiry");
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-950 pb-12'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
                
                {/* Header Section */}
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2'>
                            <MessageSquare className='w-7 h-7 text-[#0284C7]' />
                            Real User Enquiries
                        </h1>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Live messages and support requests fetched from your database.
                        </p>
                    </div>
                    <span className='bg-blue-100 dark:bg-blue-950 text-[#0284C7] dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full'>
                        Total: {enquiries.length}
                    </span>
                </div>

                {/* Enquiries List */}
                {loading ? (
                    <div className='text-center py-20 text-gray-500 font-medium'>Loading real data from database...</div>
                ) : enquiries.length === 0 ? (
                    <div className='bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm'>
                        <p className='text-gray-500 font-medium'>No enquiries found in the database.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-4'>
                        {enquiries.map((enquiry) => (
                            <div 
                                key={enquiry._id} 
                                className='bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
                            >
                                <div className='space-y-2 flex-1'>
                                    <div className='files flex items-center gap-3 flex-wrap'>
                                        <h3 className='font-bold text-lg text-gray-900 dark:text-white flex items-center gap-1.5'>
                                            <User className='w-4 h-4 text-[#0284C7]' />
                                            {enquiry.sender?.fullname || enquiry.name || 'Anonymous User'}
                                        </h3>
                                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                            enquiry.status === 'Resolved' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' 
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                        }`}>
                                            {enquiry.status || 'Pending'}
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap'>
                                        <span className='flex items-center gap-1'>
                                            <Mail className='w-3.5 h-3.5' /> {enquiry.sender?.email || enquiry.email || 'N/A'}
                                        </span>
                                        <span className='flex items-center gap-1'>
                                            <Phone className='w-3.5 h-3.5' /> {enquiry.sender?.phoneNumber || enquiry.phone || 'N/A'}
                                        </span>
                                        <span className='flex items-center gap-1'>
                                            <Clock className='w-3.5 h-3.5' /> {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>

                                    <p className='text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800'>
                                        "{enquiry.message}"
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className='flex items-center gap-2 self-end md:self-center'>
                                    {enquiry.status !== 'Resolved' && (
                                        <button 
                                            onClick={() => markAsResolvedHandler(enquiry._id)}
                                            className='flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer'
                                        >
                                            <CheckCircle2 className='w-4 h-4' />
                                            <span>Resolve</span>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteHandler(enquiry._id)}
                                        className='flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-300 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer'
                                    >
                                        <Trash2 className='w-4 h-4' />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Enquiries;