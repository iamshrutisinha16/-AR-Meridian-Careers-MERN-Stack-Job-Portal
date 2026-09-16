import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { Search, Briefcase, PlusCircle, Bell, Home, Database, Building2, Coins, MoreHorizontal, Download, Moon, MapPin, Users, DollarSign, Calendar, Sparkles, ArrowRight, Trash2, LogOut, Settings } from 'lucide-react';

const AdminJobs = () => {
    useGetAllAdminJobs();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const { user } = useSelector((store) => store.auth);
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState('live');
    const [openDropdownId, setOpenDropdownId] = useState(null);

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
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    const adminJobs = Array.isArray(allAdminJobs) ? allAdminJobs : [];

    const filteredJobs = adminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
               job?.location?.toLowerCase().includes(searchJobByText.toLowerCase());
    });

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden" onClick={() => setOpenDropdownId(null)}>
            
            {/* 1. LEFT SIDEBAR (Matched exact with Dashboard) */}
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
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
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
                
                {/* --- PROFESSIONAL TOP NAVBAR (Matched EXACT with Dashboard) --- */}
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

                    {/* Center: Navigation Tabs (Exact same order as Dashboard) */}
                    <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button 
                            onClick={() => navigate("/admin/dashboard")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
                        >
                            Dashboard
                        </button>
                        <button 
                            onClick={() => navigate("/admin/companies")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer transition-all"
                        >
                            Companies
                        </button>
                        <button 
                            onClick={() => navigate("/admin/jobs")} 
                            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs cursor-pointer transition-all"
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

                {/* Page Body Content */}
                <div className='max-w-7xl w-full mx-auto px-6 py-8 space-y-6'>
                    
                    {/* Header Top & Post Job Button */}
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div>
                            <h1 className='text-2xl font-extrabold text-gray-900'>Manage Jobs</h1>
                            <p className='text-xs text-gray-500 mt-0.5'>Create, filter, and track all job listings published by your enterprise.</p>
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/jobs/create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
                        >
                            <PlusCircle className='w-4 h-4' /> Post a Job
                        </Button>
                    </div>

                    {/* Job Status Tabs */}
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab('live')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'live' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Live ({adminJobs.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('review')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'review' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Under Review (0)
                        </button>
                        <button 
                            onClick={() => setActiveTab('drafts')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'drafts' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Drafts (0)
                        </button>
                        <button 
                            onClick={() => setActiveTab('closed')}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'closed' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            Closed (0)
                        </button>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                        <div className="relative w-full md:w-96">
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input
                                className="w-full pl-10 h-10 border-gray-200 rounded-lg text-xs font-medium focus-visible:ring-blue-600"
                                placeholder="Filter by name, role..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                            Showing <span className="font-bold text-gray-900">{filteredJobs.length}</span> of {adminJobs.length} jobs
                        </div>
                    </div>

                    {/* Jobs List / Cards Container */}
                    {filteredJobs.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center space-y-3 shadow-xs">
                            <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
                            <h3 className="font-bold text-gray-800 text-base">No jobs found</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Get started by creating your first job posting to receive applicants directly.</p>
                            <Button 
                                onClick={() => navigate("/admin/jobs/create")}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                                Post a New Job
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredJobs.map((job) => {
                                const applicationsCount = job?.applications?.length || 0;
                                const isDropdownOpen = openDropdownId === job._id;

                                return (
                                    <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all space-y-4 relative">
                                        
                                        {/* Card Top Title & 3-Dot Dropdown Menu */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                                    Live
                                                </span>
                                                <h3 className="font-extrabold text-gray-900 text-base">{job.title}</h3>
                                            </div>

                                            <div className="relative self-end sm:self-auto">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenDropdownId(isDropdownOpen ? null : job._id);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                                                >
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>

                                                {isDropdownOpen && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                        <button 
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 cursor-pointer transition-colors"
                                                        >
                                                            <Users className="w-4 h-4 text-emerald-600" /> View Applicants ({applicationsCount})
                                                        </button>
                                                        <div className="border-t border-gray-100 my-1"></div>
                                                        <button 
                                                            onClick={() => alert(`Delete action for job: ${job.title}`)} 
                                                            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500" /> Delete Job
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Job Meta Info Details */}
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location || "Office / Remote"}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-gray-400" /> {job.position || 1} openings
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <DollarSign className="w-3.5 h-3.5 text-gray-400" /> {job.salary ? `${job.salary} LPA` : "Competitive"}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" /> Posted: {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recent"}
                                            </span>
                                        </div>

                                        {/* Upgrade Banner Card */}
                                        <div className="bg-purple-50/60 border border-purple-100 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                                                <p className="text-xs text-purple-900 font-medium">
                                                    <span className="font-bold">Upgrade to Premium job</span> — Get more applies, higher visibility and database matches.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => alert("Redirecting to premium packages...")}
                                                className="bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                                            >
                                                Upgrade to Premium
                                            </button>
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs">
                                                    <span className="text-blue-600 font-bold">{applicationsCount}</span> <span className="text-gray-500 font-medium">To Review</span>
                                                </div>
                                                <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700">
                                                    Database
                                                </div>
                                            </div>

                                            <Button 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer h-9"
                                            >
                                                All Candidates - {applicationsCount} <ArrowRight className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default AdminJobs;