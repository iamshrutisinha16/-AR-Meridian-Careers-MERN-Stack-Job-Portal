import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Building, Globe, MapPin, FileImage, FileText, Sparkles } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from 'framer-motion';

const CompanySetup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const params = useParams();
    const companyId = params.id;

    useGetCompanyById(companyId);

    const { singleCompany } = useSelector(store => store.company);

    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('companyName', input.companyName);
            formData.append('description', input.description);
            formData.append('website', input.website);
            formData.append('location', input.location);
            if (input.file) {
                formData.append('file', input.file);
            }

            const response = await axios.post(`${COMPANY_API_END_POINT}/update/${companyId}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data.success) {
                navigate("/admin/companies");
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update company");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            companyName: singleCompany?.companyName || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null,
        });
    }, [singleCompany, companyId]);

    return (
        <div className='min-h-screen bg-gray-50/50 pb-16'>
            <Navbar />

            <div className='max-w-4xl mx-auto px-4 sm:px-6 py-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 relative overflow-hidden'
                >
                    {/* Decorative Top Accent */}
                    <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0284C7] to-[#FFB703]'></div>

                    {/* Top Header / Back Button */}
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                type="button" 
                                variant="outline" 
                                className="h-10 px-4 rounded-xl border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                            >
                                <ArrowLeft className='w-4 h-4' />
                                <span>Back</span>
                            </Button>
                            <div>
                                <h1 className='font-extrabold text-2xl text-gray-900'>Company Setup</h1>
                                <p className='text-xs text-gray-500'>Update your company information and branding</p>
                            </div>
                        </div>

                        {singleCompany?.logo && (
                            <div className='flex items-center gap-3 bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-2xl'>
                                <img 
                                    src={singleCompany.logo} 
                                    alt="Logo" 
                                    className='w-10 h-10 rounded-xl object-cover shadow-sm bg-white' 
                                />
                                <div className='text-xs'>
                                    <p className='font-bold text-gray-900'>Current Logo</p>
                                    <p className='text-blue-600 font-medium'>Active branding</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Setup Form */}
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            
                            {/* Company Name */}
                            <div className='space-y-2'>
                                <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                    <Building className='w-4 h-4 text-[#0284C7]' />
                                    <span>Company Name</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={input.companyName}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Meridian Corp"
                                    className="h-12 px-4 rounded-xl border-gray-200 focus:border-[#0284C7] focus:ring-[#0284C7] text-base font-medium shadow-sm"
                                />
                            </div>

                            {/* Location */}
                            <div className='space-y-2'>
                                <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                    <MapPin className='w-4 h-4 text-[#0284C7]' />
                                    <span>Location</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. San Francisco, CA / Remote"
                                    className="h-12 px-4 rounded-xl border-gray-200 focus:border-[#0284C7] focus:ring-[#0284C7] text-base font-medium shadow-sm"
                                />
                            </div>

                            {/* Website */}
                            <div className='space-y-2'>
                                <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                    <Globe className='w-4 h-4 text-[#0284C7]' />
                                    <span>Website URL</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. https://www.meridian.com"
                                    className="h-12 px-4 rounded-xl border-gray-200 focus:border-[#0284C7] focus:ring-[#0284C7] text-base font-medium shadow-sm"
                                />
                            </div>

                            {/* Company Logo Upload */}
                            <div className='space-y-2'>
                                <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                    <FileImage className='w-4 h-4 text-[#0284C7]' />
                                    <span>Company Logo</span>
                                </Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="h-12 px-3 py-2 rounded-xl border-gray-200 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#0284C7] hover:file:bg-blue-100 cursor-pointer shadow-sm text-sm"
                                />
                            </div>
                        </div>

                        {/* Description - Full Width */}
                        <div className='space-y-2'>
                            <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                <FileText className='w-4 h-4 text-[#0284C7]' />
                                <span>Description</span>
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Short overview about what your company does..."
                                className="h-12 px-4 rounded-xl border-gray-200 focus:border-[#0284C7] focus:ring-[#0284C7] text-base font-medium shadow-sm"
                            />
                        </div>

                        {/* Submit Action Button */}
                        <div className='flex items-center justify-end pt-6 border-t border-gray-100 mt-8'>
                            {
                                loading ? (
                                    <Button disabled className="h-12 w-full sm:w-48 rounded-xl bg-[#0284C7] text-white font-bold shadow-md cursor-not-allowed">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> 
                                        <span>Saving...</span>
                                    </Button>
                                ) : (
                                    <Button type="submit" className="h-12 w-full sm:w-48 rounded-xl bg-[#0284C7] hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
                                        Update Details
                                    </Button>
                                )
                            }
                        </div>

                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CompanySetup;