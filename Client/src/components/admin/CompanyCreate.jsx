import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { Building2, ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company))
                const companyId = response?.data?.company?._id;
                toast.success(response.data.message);
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50/50'>
            <Navbar />

            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-12'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 relative overflow-hidden'
                >
                    {/* Decorative Top Accent */}
                    <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0284C7] to-[#FFB703]'></div>

                    {/* Back Button */}
                    <button 
                        onClick={() => navigate("/admin/companies")}
                        className='inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0284C7] transition-colors mb-6 cursor-pointer'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        <span>Back to Companies</span>
                    </button>

                    {/* Header Info */}
                    <div className='space-y-2 mb-8'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0284C7] text-xs font-bold tracking-wide'>
                            <Sparkles className='w-3.5 h-3.5' />
                            <span>STEP 1 OF 2</span>
                        </div>
                        <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
                            What is your <span className='text-[#0284C7]'>Company Name</span>?
                        </h1>
                        <p className='text-gray-500 text-sm sm:text-base'>
                            Give your company a unique identity. Don't worry, you can always change this later in your company settings.
                        </p>
                    </div>

                    {/* Form Field */}
                    <div className='space-y-4 py-4'>
                        <div className='space-y-2'>
                            <Label className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                                <Building2 className='w-4 h-4 text-[#0284C7]' />
                                <span>Company Name</span>
                            </Label>
                            <Input
                                type="text"
                                className="h-12 px-4 rounded-xl border-gray-200 focus:border-[#0284C7] focus:ring-[#0284C7] text-base font-medium shadow-sm"
                                placeholder="e.g. Meridian Corp, Microsoft, Google"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && registerNewCompany()}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6'>
                        <Button 
                            variant="outline" 
                            onClick={() => navigate("/admin/companies")}
                            className="h-11 px-6 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={registerNewCompany} 
                            disabled={loading}
                            className="h-11 px-8 rounded-xl bg-[#0284C7] hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                        >
                            {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                            <span>Continue</span>
                        </Button>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate;