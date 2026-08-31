import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Briefcase, PlusCircle } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState("")

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input, dispatch])

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-4 md:px-8 py-10'>
                
                {/* Header Banner */}
                <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2.5 bg-blue-600/10 rounded-xl'>
                            <Briefcase className='w-6 h-6 text-blue-600' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Manage Job Postings</h1>
                            <p className='text-gray-500 text-sm mt-0.5'>Create, filter, and track all job listings published by your enterprise.</p>
                        </div>
                    </div>

                    <Button 
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 px-5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <PlusCircle className='w-5 h-5' /> Post New Jobs
                    </Button>
                </div>

                {/* Search & Table Card Container */}
                <div className='bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden p-6 space-y-6'>
                    
                    {/* Search Filter Bar */}
                    <div className='flex items-center justify-between gap-4'>
                        <div className='relative w-full md:w-80'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input
                                className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1 rounded-xl text-sm"
                                placeholder="Filter by name, role..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Component */}
                    <div className='overflow-x-auto'>
                        <AdminJobsTable />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminJobs