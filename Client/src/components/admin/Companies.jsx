import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate, useLocation } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Building2, PlusCircle, Briefcase, Home, Database, Coins, MoreHorizontal, Bell } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies()

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.auth)
    const [input, setInput] = useState("")

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            
            {/* 1. LEFT SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden lg:flex">
                <div>
                    {/* Brand / Logo */}
                    <div className="p-4 border-b flex items-center gap-2">
                        <div className="bg-blue-600 text-white font-bold p-2 rounded-lg text-xs">JOB</div>
                        <div>
                            <span className="font-extrabold text-blue-600 text-base">
                                {user?.profile?.company?.name || user?.fullname || "Recruiter Portal"}
                            </span>
                            <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Recruiter</span>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="p-4 border-b flex items-start justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm mb-2">
                                {getInitials(user?.fullname)}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{user?.fullname || "User Name"}</h3>
                            <p className="text-xs text-gray-500">{user?.phoneNumber || "No Phone Number"}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-3 space-y-1">
                        <button onClick={() => navigate("/admin/dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Home className="w-4 h-4" /> Home
                        </button>
                        <button onClick={() => navigate("/admin/jobs")} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Jobs</div>
                            <PlusCircle className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        
                        {/* Companies link right above Database */}
                        <button onClick={() => navigate("/admin/companies")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${location.pathname === '/admin/companies' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <Building2 className="w-4 h-4" /> Companies
                        </button>

                        <button onClick={() => navigate("/admin/database")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Database className="w-4 h-4" /> Database
                        </button>
                        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <div className="flex items-center gap-3"><Coins className="w-4 h-4" /> Credits</div>
                            <span className="text-xs font-bold text-amber-600">{user?.credits ?? 0}</span>
                        </div>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t">
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-purple-900 mb-1">Hire faster with Premium</h4>
                        <p className="text-[11px] text-purple-700">Contact us for pricing</p>
                    </div>
                    <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                        <span className="font-bold text-gray-700 uppercase">{user?.profile?.company?.name || "AR MERIDIAN"}</span>
                        <span className="text-emerald-600 font-semibold">Active</span>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                
                {/* Fixed Top Header with Correct Nav Tabs */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center text-xs">
                            AR
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">AR Jobs</h2>
                            <p className="text-[10px] text-gray-500 font-medium">Enterprise & careers</p>
                        </div>
                    </div>

                    {/* Center Navigation Tabs */}
                    <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button 
                            onClick={() => navigate('/admin/companies')}
                            className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${location.pathname === '/admin/companies' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Companies
                        </button>
                        <button 
                            onClick={() => navigate('/admin/jobs')}
                            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition ${location.pathname.includes('/admin/jobs') ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Manage Jobs
                        </button>
                        <button 
                            onClick={() => navigate('/admin/dashboard')}
                            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition ${location.pathname === '/admin/dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* Right side Real Credits & Notifications */}
                    <div className="flex items-center gap-4">
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                            <span>🪙</span> {user?.credits ?? 0} +
                        </div>
                        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className='max-w-7xl w-full mx-auto px-4 md:px-8 py-8'>
                    
                    {/* Header Banner */}
                    <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-center gap-3.5'>
                            <div className='p-3 bg-blue-50 border border-blue-100 rounded-2xl shadow-xs'>
                                <Building2 className='w-7 h-7 text-blue-600' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900'>Manage Enterprises</h1>
                                <p className='text-gray-500 text-sm mt-0.5'>View, search, and manage all registered companies on your portal.</p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 px-5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <PlusCircle className='w-5 h-5' /> New Company
                        </Button>
                    </div>

                    {/* Search and Table Container */}
                    <div className='bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden p-6 space-y-6'>
                        
                        {/* Search Bar filter */}
                        <div className='flex items-center justify-between gap-4'>
                            <div className='relative w-full md:w-80'>
                                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <Input
                                    className="w-full pl-10 h-11 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1 rounded-xl text-sm bg-gray-50/50"
                                    placeholder="Filter by company name..."
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Table Component */}
                        <div className='overflow-x-auto rounded-xl border border-gray-100'>
                            <CompaniesTable />
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}

export default Companies