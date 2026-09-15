import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { 
    Database as DatabaseIcon, Building2, Briefcase, Home, 
    Coins, Bell, Search, ChevronRight, MapPin, Calendar, X 
} from 'lucide-react'

const Database = () => {
    useGetAllAdminJobs()
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useSelector((store) => store.auth)
    const { allAdminJobs } = useSelector((store) => store.job) || { allAdminJobs: [] }
    
    const [searchTerm, setSearchTerm] = useState("")

    const filteredJobs = allAdminJobs?.filter((job) => 
        job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            
            {/* 1. LEFT SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden lg:flex">
                <div>
                    <div className="p-4 border-b flex items-center gap-2">
                        <div className="bg-blue-600 text-white font-bold p-2 rounded-lg text-xs">JOB</div>
                        <div>
                            <span className="font-extrabold text-blue-600 text-base">
                                {user?.profile?.company?.name || user?.fullname || "Recruiter Portal"}
                            </span>
                            <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Recruiter</span>
                        </div>
                    </div>

                    <div className="p-4 border-b flex items-start justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm mb-2">
                                {getInitials(user?.fullname)}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{user?.fullname || "User Name"}</h3>
                            <p className="text-xs text-gray-500">{user?.phoneNumber || "No Phone Number"}</p>
                        </div>
                    </div>

                    <nav className="p-3 space-y-1">
                        <button onClick={() => navigate("/admin/dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Home className="w-4 h-4" /> Home
                        </button>
                        <button onClick={() => navigate("/admin/jobs")} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Jobs</div>
                        </button>
                        <button onClick={() => navigate("/admin/companies")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Building2 className="w-4 h-4" /> Companies
                        </button>
                        
                        <button onClick={() => navigate("/admin/database")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm cursor-pointer">
                            <DatabaseIcon className="w-4 h-4" /> Database
                        </button>

                        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <div className="flex items-center gap-3"><Coins className="w-4 h-4" /> Credits</div>
                            <span className="text-xs font-bold text-amber-600">{user?.credits ?? 0}</span>
                        </div>
                    </nav>
                </div>

                <div className="p-4 border-t">
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-purple-900 mb-1">Hire faster with Premium</h4>
                        <p className="text-[11px] text-purple-700">Contact us for pricing</p>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-100 relative">
                
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center text-xs">
                            AR
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">AR MERIDIAN</h2>
                            <p className="text-[10px] text-gray-500 font-medium">INDUSTRIAL & CAREERS</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                            <span>🪙</span> {user?.credits ?? 0} +
                        </div>
                        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Background Dashboard view or overlay backdrop */}
                <div className='flex-1 flex items-center justify-center p-4 md:p-6'>
                    
                    {/* Centered Modal Box matching Job Hai reference */}
                    <div className='bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]'>
                        
                        {/* Modal Header */}
                        <div className='p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20'>
                            <div>
                                <h2 className='text-xl font-extrabold text-gray-900'>Select a job</h2>
                                <p className='text-xs text-gray-500 mt-0.5'>Choose a job posting to view its profile details.</p>
                            </div>
                            <button 
                                onClick={() => navigate("/admin/jobs")} 
                                className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition cursor-pointer'
                            >
                                <X className='w-4 h-4' />
                            </button>
                        </div>

                        {/* Search Bar inside Modal */}
                        <div className='px-6 py-4 bg-gray-50/50 border-b border-gray-100'>
                            <div className='relative'>
                                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <input
                                    type='text'
                                    placeholder='Search job by title or location...'
                                    className='w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition shadow-2xs'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Scrollable Job Cards List with Hidden Scrollbar Tailwind Utility Classes */}
                        <div className='p-6 overflow-y-auto space-y-3 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                            {filteredJobs && filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div 
                                        key={job._id}
                                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                        className='bg-white border border-gray-200 hover:border-blue-500 shadow-2xs hover:shadow-md transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer group'
                                    >
                                        <div className='space-y-1'>
                                            <h3 className='font-bold text-gray-900 group-hover:text-blue-600 transition text-sm md:text-base'>
                                                {job?.title}
                                            </h3>
                                            <div className='flex items-center gap-3 text-xs text-gray-500 font-medium'>
                                                <span className='flex items-center gap-1'>
                                                    <MapPin className='w-3.5 h-3.5 text-gray-400' /> {job?.location || "Remote / Office"}
                                                </span>
                                                <span className='text-gray-300'>•</span>
                                                <span className='flex items-center gap-1'>
                                                    <Calendar className='w-3.5 h-3.5 text-gray-400' /> Made active {job?.createdAt?.split("T")[0] || "recently"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition shrink-0'>
                                            <ChevronRight className='w-4 h-4' />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center py-12 space-y-2'>
                                    <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400'>
                                        <Briefcase className='w-5 h-5' />
                                    </div>
                                    <h3 className='text-sm font-bold text-gray-800'>No jobs found</h3>
                                    <p className='text-xs text-gray-500'>Try searching with a different keyword.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Database