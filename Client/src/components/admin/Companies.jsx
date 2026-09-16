import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate, useLocation } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Building2, PlusCircle, Briefcase, Home, Database, Coins, MoreHorizontal, Bell, Settings, LogOut } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies()

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.auth)
    const [input, setInput] = useState("")

    const realCredits = user?.credits ?? user?.profile?.credits ?? 0;

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
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            
            {/* 1. LEFT SIDEBAR (Matched exact with Dashboard & Jobs) */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden lg:flex">
                <div>
                    {/* Brand / Logo */}
                    <div className="p-4 border-b flex items-center gap-2">
                        <div className="bg-blue-600 text-white font-bold p-2 rounded-lg text-xs">JOB</div>
                        <div>
                            <span className="font-extrabold text-blue-600 text-base">
                                {user?.fullname || "neha SINHA"}
                            </span>
                            <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Admin Dashboard</span>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="p-4 border-b flex items-start justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm mb-2">
                                {getInitials(user?.fullname)}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{user?.fullname || "neha SINHA"}</h3>
                            <p className="text-xs text-gray-500">{user?.phoneNumber || user?.email || "9693855983"}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-3 space-y-1">
                        <button 
                            onClick={() => navigate("/admin/dashboard")} 
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                                location.pathname === '/admin/dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Home className="w-4 h-4" /> Dashboard
                        </button>
                        
                        <button 
                            onClick={() => navigate("/admin/jobs")} 
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                                location.pathname.startsWith('/admin/jobs') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Manage Jobs</div>
                            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                        </button>

                        <button 
                            onClick={() => navigate('/admin/companies')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                                location.pathname === '/admin/companies' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Building2 className="w-4 h-4" /> Companies
                        </button>

                        <button 
                            onClick={() => navigate("/admin/database")} 
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                                location.pathname === '/admin/database' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Database className="w-4 h-4" /> Database
                        </button>

                        <button 
                            onClick={() => navigate("/admin/credits")} 
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                                location.pathname === '/admin/credits' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3"><Coins className="w-4 h-4" /> Credits</div>
                            <span className="text-xs font-bold text-amber-600">{realCredits}</span>
                        </button>
                    </nav>
                </div>

                {/* Sidebar Footer Promo & Actions */}
                <div className="p-4 border-t space-y-3">
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-purple-900 mb-1">Hire faster with Premium Jobs</h4>
                        <p className="text-[11px] text-purple-700">Contact us for pricing</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1 text-xs text-gray-500 font-medium">
                        <button onClick={() => navigate("/admin/profile")} className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer">
                            <Settings className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                        <button onClick={() => navigate("/login")} className="flex items-center gap-1.5 text-red-500 hover:text-red-700 cursor-pointer">
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50/50 overflow-x-hidden">
                
                {/* --- PROFESSIONAL TOP NAVBAR (Matched EXACT order: Dashboard | Companies | Manage Jobs | Database) --- */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-2xs">
                    
                    {/* Left: Company Logo & Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center text-white justify-center font-black text-xs shadow-sm">
                            AR
                        </div>
                        <div>
                            <span className="font-black text-gray-900 text-sm tracking-tight block">
                                AR Jobs
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold tracking-wider">Enterprise & Careers</span>
                        </div>
                    </div>

                    {/* Center: Navigation Tabs */}
                    <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button 
                            onClick={() => navigate("/admin/dashboard")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate("/admin/companies")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs cursor-pointer transition-all"
                        >
                            Companies
                        </button>
                        <button 
                            onClick={() => navigate("/admin/jobs")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
                        >
                            Manage Jobs
                        </button>
                        <button 
                            onClick={() => navigate("/admin/database")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
                        >
                            Database
                        </button>
                    </div>

                    {/* Right: Credits Badge & Profile Initial */}
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                            <span>🪙</span> {realCredits}
                        </div>

                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs border border-blue-200 shadow-2xs">
                            {getInitials(user?.fullname)}
                        </div>
                    </div>
                </header>

                <div className='max-w-7xl w-full mx-auto px-6 py-8 space-y-6'>
                    
                    {/* Header Banner */}
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div>
                            <h1 className='text-2xl font-extrabold text-gray-900'>Manage Enterprises</h1>
                            <p className='text-xs text-gray-500 mt-0.5'>View, search, and manage all registered companies on your portal.</p>
                        </div>

                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                        >
                            <PlusCircle className='w-4 h-4' /> New Company
                        </Button>
                    </div>

                    {/* Search and Table Container */}
                    <div className='bg-white border border-gray-200 shadow-xs rounded-xl p-6 space-y-6'>
                        
                        {/* Search Bar filter */}
                        <div className='flex items-center justify-between gap-4'>
                            <div className='relative w-full md:w-96'>
                                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                                <Input
                                    className="w-full pl-10 h-10 border-gray-200 rounded-lg text-xs font-medium focus-visible:ring-blue-600"
                                    placeholder="Filter by company name..."
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Table Component */}
                        <div className='overflow-x-auto rounded-lg border border-gray-100'>
                            <CompaniesTable />
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}

export default Companies