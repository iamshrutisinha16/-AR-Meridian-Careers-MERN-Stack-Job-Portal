import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Briefcase, PlusCircle, Bell, Home, Database, Building2, Coins, 
    MoreHorizontal, MapPin, ChevronRight, PhoneCall, CheckCircle2, 
    LogOut, User, Settings, ChevronDown 
} from 'lucide-react';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const AdminDashboard = () => {
    try {
        useGetAllAdminJobs();
    } catch (e) {
        console.log("Hook error handled:", e);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const authStore = useSelector((store) => store?.auth) || {};
    const jobStore = useSelector((store) => store?.job) || {};
    
    const user = authStore?.user;
    const allAdminJobs = jobStore?.allAdminJobs;

    const adminJobs = Array.isArray(allAdminJobs) ? allAdminJobs : [];

    const totalLiveJobs = adminJobs.length;
    
    let totalCandidates = 0;
    let totalShortlisted = 0;
    let totalInterviewed = 0;
    let totalRejected = 0;
    let totalHired = 0;

    adminJobs.forEach(job => {
        const apps = job?.applications || [];
        totalCandidates += apps.length;
        
        apps.forEach(app => {
            const status = (app?.status || "").toLowerCase();
            if (status === 'shortlisted') {
                totalShortlisted++;
            } else if (status === 'interviewed' || status === 'accepted') {
                totalInterviewed++;
            } else if (status === 'rejected') {
                totalRejected++;
            } else if (status === 'hired') {
                totalHired++;
            }
        });
    });

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

    const logoutHandler = async () => {
        try {
            await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        } catch (error) {
            console.log("Logout API error:", error);
        } finally {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            
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
                            <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Admin Dashboard</span>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="p-4 border-b flex items-start justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm mb-2">
                                {getInitials(user?.fullname)}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{user?.fullname || "Admin User"}</h3>
                            <p className="text-xs text-gray-500">{user?.phoneNumber || user?.email || "No Details"}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-3 space-y-1">
                        <button onClick={() => navigate("/admin/dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm cursor-pointer">
                            <Home className="w-4 h-4" /> Dashboard
                        </button>
                        <button onClick={() => navigate("/admin/jobs")} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Manage Jobs</div>
                            <PlusCircle className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button 
                            onClick={() => navigate('/admin/companies')}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                            <Building2 className="w-4 h-4" /> Companies
                        </button>
                        <button onClick={() => navigate("/admin/database")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Database className="w-4 h-4" /> Database
                        </button>
                        
                        {/* Updated Credits Navigation Path */}
                        <button 
                            onClick={() => navigate("/admin/credits")} 
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer"
                        >
                            <div className="flex items-center gap-3"><Coins className="w-4 h-4" /> Credits</div>
                            <span className="text-xs font-bold text-amber-600">{realCredits}</span>
                        </button>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t space-y-3">
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                        <h4 className="text-xs font-bold text-purple-900 mb-1">Hire faster with Premium Jobs</h4>
                        <p className="text-[11px] text-purple-700">Contact us for pricing</p>
                    </div>
                    
                    <div className="pt-2 flex items-center justify-between">
                        <button 
                            onClick={() => navigate("/admin/profile")}
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium cursor-pointer"
                        >
                            <Settings className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                        <button 
                            onClick={logoutHandler}
                            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium cursor-pointer font-bold"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50/50 overflow-x-hidden">
                
                {/* --- PROFESSIONAL ADMIN NAVBAR --- */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center text-white justify-center font-black text-xs">
                            AR
                        </div>
                        <div>
                            <span className="font-black text-gray-900 text-sm block">
                                {user?.profile?.company?.name || "AR Jobs"}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">Enterprise & Careers</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button onClick={() => navigate("/admin/dashboard")} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white cursor-pointer">Dashboard</button>
                        <button onClick={() => navigate("/admin/companies")} className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer">Companies</button>
                        <button onClick={() => navigate("/admin/jobs")} className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer">Manage Jobs</button>
                        <button onClick={() => navigate("/admin/database")} className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer">Database</button>
                    </div>

                    <div className="flex items-center gap-3 relative">
                        <div 
                            onClick={() => navigate("/admin/credits")}
                            className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-100 transition-all"
                        >
                            <span>🪙</span> {realCredits}
                        </div>

                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="relative">
                            <div 
                                onClick={() => setDropdownOpen(!dropdownOpen)} 
                                className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full border border-gray-200"
                            >
                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                                    {getInitials(user?.fullname)}
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                            </div>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs font-bold text-gray-800">{user?.fullname || "Admin"}</p>
                                        <p className="text-[11px] text-gray-400 truncate">{user?.email || "admin@domain.com"}</p>
                                    </div>
                                    <button onClick={() => { setDropdownOpen(false); navigate("/admin/jobs/create"); }} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                                        <PlusCircle className="w-3.5 h-3.5 text-gray-400" /> Post New Job
                                    </button>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button onClick={() => { setDropdownOpen(false); logoutHandler(); }} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-bold">
                                        <LogOut className="w-3.5 h-3.5 text-red-600" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Body Content */}
                <div className='max-w-7xl w-full mx-auto px-6 py-8 space-y-6'>
                    
                    <h2 className="text-2xl font-extrabold text-gray-900">
                        Welcome back, {user?.fullname ? user.fullname.split(" ")[0] : "Admin"}!
                    </h2>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Post a new job to keep your hiring momentum!</h3>
                                <p className="text-sm text-gray-500">Connect with millions of job seekers instantly.</p>
                            </div>
                        </div>
                        <button onClick={() => navigate("/admin/jobs/create")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer">
                            <PlusCircle className="w-4 h-4" /> Post a Job
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                            <p className="text-gray-500 text-sm font-medium">Live Jobs</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalLiveJobs}</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                            <p className="text-gray-500 text-sm font-medium">Under Review Jobs</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs cursor-pointer hover:border-amber-400 transition-all" onClick={() => navigate("/admin/credits")}>
                            <p className="text-gray-500 text-sm font-medium">Credits Available</p>
                            <p className="text-3xl font-bold text-amber-600 mt-1">{realCredits}</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                            <p className="text-gray-500 text-sm font-medium">Total Candidates</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalCandidates}</p>
                        </div>
                    </div>

                    {/* LIVE JOBS SECTION */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Live Jobs ({totalLiveJobs})</h3>
                            </div>
                            <button onClick={() => navigate("/admin/jobs")} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {adminJobs.length === 0 ? (
                            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                                <p className="text-gray-500 text-sm">No live jobs found.</p>
                                <button onClick={() => navigate("/admin/jobs/create")} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer">
                                    Post a Job
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                                {adminJobs.slice(0, 3).map((job) => (
                                    <div key={job?._id || Math.random()} className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide border border-green-200">
                                                    Live
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-base line-clamp-1">{job?.title || "Untitled Job"}</h4>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job?.location || "Office / Remote"}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                            <div>
                                                <span className="block text-[10px] text-gray-400 font-semibold uppercase">Applicants</span>
                                                <span className="font-bold text-gray-800 text-sm">{job?.applications?.length || 0}</span>
                                            </div>
                                            <button onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md font-medium cursor-pointer">
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Analytics Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between cursor-pointer" onClick={() => navigate("/admin/credits")}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">Credits Balance</h3>
                                <Coins className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="text-center py-6">
                                <span className="text-4xl font-extrabold text-gray-900">{realCredits}</span>
                                <p className="text-xs text-gray-500 mt-1">Your Available Credits</p>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2.5 rounded-lg text-center font-medium">
                                Active recruiter subscription plan (Click to manage)
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs lg:col-span-2 flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-800">Total candidates received on live jobs</h3>
                                    <p className="text-xs text-gray-500">Applicant status distribution</p>
                                </div>
                                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Real-time</span>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4 items-end h-36 pt-4 border-b border-gray-100 pb-4">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-blue-600">{totalCandidates}</span>
                                    <div className="w-full bg-blue-600 rounded-t-lg transition-all" style={{ height: totalCandidates > 0 ? '100px' : '10px' }}></div>
                                    <span className="text-[11px] text-gray-500">Total</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-gray-600">{totalShortlisted}</span>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-12"></div>
                                    <span className="text-[11px] text-gray-500">Shortlisted</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-gray-600">{totalInterviewed}</span>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-8"></div>
                                    <span className="text-[11px] text-gray-500">Interviewed</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-gray-600">{totalRejected}</span>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-6"></div>
                                    <span className="text-[11px] text-gray-500">Rejected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hiring Status & Support */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-gray-800">Hiring Status</h3>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Active</span>
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900 mt-2">
                                    {totalHired}/50 candidates hired
                                </p>
                                <p className="text-xs text-gray-500 mt-1">When you hire a candidate, mark it as hired to track progress.</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-medium">
                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Goal tracking enabled</span>
                                <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => navigate("/admin/jobs")}>View Candidates</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                            <div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Support</span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">Contact Us</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-xs">Get Dedicated Support from our expert recruiter support team anytime.</p>
                                <button onClick={() => alert("Connecting to support team...")} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm cursor-pointer flex items-center gap-2">
                                    <PhoneCall className="w-3.5 h-3.5" /> Contact Us
                                </button>
                            </div>
                            <div className="hidden sm:flex p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                                <PhoneCall className="w-10 h-10" />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;