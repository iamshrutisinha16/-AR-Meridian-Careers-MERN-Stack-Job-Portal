import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { 
    Check, Briefcase, Home, Users, FileText, Settings, HelpCircle, PhoneCall, 
    Filter, ArrowLeft, Share2, Building2, Database, Zap, MapPin, GraduationCap, 
    Banknote, MessageSquare, Phone, Trash2, ChevronDown, LayoutGrid, List,
    Lock, Download
} from 'lucide-react'

const JobApplicants = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const jobId = params.id;

    const { allApplicants } = useSelector(store => store.application);
    const [activeTab, setActiveTab] = useState('new'); 
    const [bulkDropdownOpen, setBulkDropdownOpen] = useState(false);

    // Filter States
    const [sortBy, setSortBy] = useState('relevancy');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('any');
    const [genderFilter, setGenderFilter] = useState('any');
    const [minExperience, setMinExperience] = useState('');
    const [maxExperience, setMaxExperience] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICANT_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllApplicants(response.data.job));
                }
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        }
        if (jobId) {
            fetchAllApplicants();
        }
    }, [jobId, dispatch]);

    // Real applications from backend state
    const applicationsList = allApplicants?.applications || [];
    const applicantCount = applicationsList.length;

    const handleClearFilters = () => {
        setSortBy('relevancy');
        setSourceFilter('all');
        setLocationFilter('any');
        setGenderFilter('any');
        setMinExperience('');
        setMaxExperience('');
        setMinSalary('');
        setMaxSalary('');
    };

    // Real WhatsApp Direct DM Handler using candidate's actual phone number
    const handleWhatsAppChat = (phoneNumber, candidateName) => {
        if (!phoneNumber) {
            alert("Phone number not available for this candidate.");
            return;
        }
        const cleanNumber = phoneNumber.toString().replace(/\D/g, '');
        const formattedNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
        const message = encodeURIComponent(`Hi ${candidateName}, regarding your job application at AR Meridian Careers...`);
        
        const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Direct Call Handler
    const handleViewNumber = (phoneNumber) => {
        if (!phoneNumber) {
            alert("Phone number not available.");
            return;
        }
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            
            {/* 1. Left Fixed Sidebar with Fully Functional Navigation */}
            <aside className="w-16 bg-slate-900 flex flex-col items-center py-4 justify-between h-screen sticky top-0 z-45 shrink-0 shadow-lg">
                <div className="flex flex-col items-center gap-6">
                    <button 
                        onClick={() => navigate('/admin/dashboard')} 
                        className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-blue-700 transition"
                        title="Dashboard"
                    >
                        <Check className="w-5 h-5 stroke-[3]" />
                    </button>
                    
                    <div 
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-10 h-10 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider cursor-pointer hover:bg-blue-500/30 transition"
                        title="AR Meridian"
                    >
                        AR
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <button 
                            onClick={() => navigate('/admin/dashboard')} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            title="Home / Dashboard"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                        
                        <button 
                            onClick={() => navigate('/admin/jobs')} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-blue-600 shadow-md transition cursor-pointer"
                            title="Jobs"
                        >
                            <Briefcase className="w-5 h-5" />
                        </button>
                        <button 
                onClick={() => navigate('/admin/companies')} 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                title="Companies"
            >
                <Building2 className="w-5 h-5" />
            </button>
                        <button 
                            onClick={() => navigate('/admin/candidates')} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            title="Candidates"
                        >
                            <Users className="w-5 h-5" />
                        </button>
                        
                        <button 
                            onClick={() => navigate('/admin/reports')} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            title="Reports & Files"
                        >
                            <FileText className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={() => navigate('/admin/help')} 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                        title="Help & Support"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={() => navigate('/admin/settings')} 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={() => navigate('/admin/support-call')} 
                        className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-emerald-700 transition cursor-pointer"
                        title="Quick Call Support"
                    >
                        <PhoneCall className="w-5 h-5" />
                    </button>
                </div>
            </aside>

            {/* Main Page Area */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition cursor-pointer">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-900 truncate">
                            {allApplicants?.title || "Job Listing"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition hidden sm:flex cursor-pointer">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate('/admin/database')} className="flex items-center gap-2 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition cursor-pointer">
                            <Database className="w-4 h-4 text-blue-600" />
                            <span className="hidden sm:inline">View Database</span>
                        </button>
                        <button className="flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 shadow-sm transition cursor-pointer">
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            Upgrade
                        </button>
                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-sm font-bold text-amber-700">
                            <span>🪙</span> 200 +
                        </div>
                    </div>
                </header>

                {/* Tabs & Bulk Actions Bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex flex-wrap items-center justify-between sticky top-[57px] z-20 gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {['new', 'viewed', 'hired', 'removed'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition shrink-0 capitalize cursor-pointer ${activeTab === tab ? 'bg-blue-50 text-blue-600 border border-blue-200 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {tab} {tab === 'new' ? `(${applicantCount})` : tab === 'viewed' ? '(1)' : ''}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative">
                        <div className="relative">
                            <button 
                                onClick={() => setBulkDropdownOpen(!bulkDropdownOpen)}
                                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 bg-white cursor-pointer hover:bg-gray-50 transition shadow-sm"
                            >
                                <span>Bulk actions</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            {bulkDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5">
                                    <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk unlock triggered"); }} className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                                        <Lock className="w-3.5 h-3.5 text-gray-500" /> Bulk unlock
                                    </button>
                                    <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk download triggered"); }} className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                                        <Download className="w-3.5 h-3.5 text-gray-500" /> Bulk download
                                    </button>
                                    <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk WhatsApp triggered"); }} className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100 cursor-pointer">
                                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Bulk WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button className="p-1.5 bg-gray-100 text-gray-800 border-r border-gray-300 cursor-pointer"><List className="w-4 h-4" /></button>
                            <button className="p-1.5 text-gray-500 hover:bg-gray-50 cursor-pointer"><LayoutGrid className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                {/* Main Body Section */}
                <div className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* 2. Filter Section with Scrollbar Hidden */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm lg:sticky lg:top-28 max-h-[calc(100vh-140px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4 sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                                <Filter className="w-4 h-4 text-blue-600" />
                                <span>Filters</span>
                            </div>
                            <button onClick={handleClearFilters} className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
                                Reset all
                            </button>
                        </div>

                        {/* Sort By */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sort By</label>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="sort" checked={sortBy === 'relevancy'} onChange={() => setSortBy('relevancy')} className="text-blue-600" />
                                    Relevancy
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="sort" checked={sortBy === 'distance'} onChange={() => setSortBy('distance')} className="text-blue-600" />
                                    Distance
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="sort" checked={sortBy === 'lastActive'} onChange={() => setSortBy('lastActive')} className="text-blue-600" />
                                    Last Active
                                </label>
                            </div>
                        </div>

                        {/* Sources */}
                        <div className="mb-4 border-t border-gray-100 pt-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sources</label>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="source" checked={sourceFilter === 'all'} onChange={() => setSourceFilter('all')} className="text-blue-600" />
                                    All
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="source" checked={sourceFilter === 'applies'} onChange={() => setSourceFilter('applies')} className="text-blue-600" />
                                    Applies
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="source" checked={sourceFilter === 'recommendations'} onChange={() => setSourceFilter('recommendations')} className="text-blue-600" />
                                    Recommendations
                                </label>
                            </div>
                        </div>

                        {/* Available Nearby */}
                        <div className="mb-4 border-t border-gray-100 pt-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Available Nearby</label>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="location" checked={locationFilter === 'any'} onChange={() => setLocationFilter('any')} className="text-blue-600" />
                                    Any
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="location" checked={locationFilter === '5km'} onChange={() => setLocationFilter('5km')} className="text-blue-600" />
                                    Within 5 km
                                </label>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="mb-4 border-t border-gray-100 pt-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Gender</label>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="gender" checked={genderFilter === 'any'} onChange={() => setGenderFilter('any')} className="text-blue-600" />
                                    Any
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="gender" checked={genderFilter === 'male'} onChange={() => setGenderFilter('male')} className="text-blue-600" />
                                    Male
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input type="radio" name="gender" checked={genderFilter === 'female'} onChange={() => setGenderFilter('female')} className="text-blue-600" />
                                    Female
                                </label>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="mb-4 border-t border-gray-100 pt-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Experience (Years)</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="number" placeholder="Min" value={minExperience} onChange={(e) => setMinExperience(e.target.value)} className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500" />
                                <input type="number" placeholder="Max" value={maxExperience} onChange={(e) => setMaxExperience(e.target.value)} className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500" />
                            </div>
                        </div>

                        {/* Salary */}
                        <div className="mb-4 border-t border-gray-100 pt-3">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Monthly Salary (₹)</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="number" placeholder="Min ₹" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500" />
                                <input type="number" placeholder="Max ₹" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                            <button onClick={handleClearFilters} className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">Clear</button>
                            <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer">Apply</button>
                        </div>
                    </div>

                    {/* 3. Real Candidates List from Database */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="text-sm text-gray-500 font-medium px-1">
                            Showing {applicantCount} candidate{applicantCount !== 1 && 's'}
                        </div>

                        {/* Banner */}
                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Need more applies?</h3>
                                <p className="text-xs text-gray-600 mt-0.5">Upgrade to Premium to get more job visibility</p>
                            </div>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700 shadow-sm transition cursor-pointer">
                                ✨ Upgrade to Premium
                            </button>
                        </div>

                        {/* Render Real Applicants */}
                        {applicationsList.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">
                                No real applicants found for this job listing yet.
                            </div>
                        ) : (
                            applicationsList.map((item, index) => {
                                const applicant = item?.applicant;
                                const candidateName = applicant?.fullname || 'Candidate';
                                const candidatePhone = applicant?.phoneNumber || applicant?.profile?.phoneNumber || '';
                                const profilePhoto = applicant?.profile?.profilePhoto;
                                const location = applicant?.profile?.location || 'Delhi';
                                const qualification = applicant?.profile?.qualification || 'Graduate';

                                return (
                                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full overflow-hidden flex items-center justify-center font-bold text-base shrink-0">
                                                    {profilePhoto ? (
                                                        <img src={profilePhoto} alt={candidateName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{candidateName.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900">{candidateName}</h3>
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                                                        <span className="flex items-center gap-1 font-medium text-emerald-600">● Active recently</span>
                                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {location}</span>
                                                        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-gray-400" /> {qualification}</span>
                                                        <span className="flex items-center gap-1"><Banknote className="w-3.5 h-3.5 text-gray-400" /> ₹20,000 / month</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                ✓ Applied
                                            </span>
                                        </div>

                                        {/* Skills/Tags */}
                                        <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-100 flex flex-wrap gap-2 items-center text-xs">
                                            <span className="text-purple-700 font-bold flex items-center gap-1 bg-purple-100/60 px-2 py-1 rounded">
                                                ⭐ Top Match
                                            </span>
                                            <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-gray-700 font-medium">✓ Computer Knowledge</span>
                                            <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-gray-700 font-medium">✓ Handling Calls</span>
                                            <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-gray-700 font-medium">✓ Organizing & Scheduling</span>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <button className="text-red-500 hover:text-red-600 font-semibold text-xs flex items-center gap-1 transition cursor-pointer">
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                            <div className="flex items-center gap-3">
                                                {/* Direct Real WhatsApp Click */}
                                                <button 
                                                    onClick={() => handleWhatsAppChat(candidatePhone, candidateName)}
                                                    className="flex items-center gap-1.5 border border-emerald-300 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 transition shadow-sm cursor-pointer"
                                                >
                                                    <MessageSquare className="w-4 h-4 text-emerald-600" /> Whatsapp
                                                </button>
                                                
                                                {/* Direct Phone Call / View Number */}
                                                <button 
                                                    onClick={() => handleViewNumber(candidatePhone)}
                                                    className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition cursor-pointer"
                                                >
                                                    <Phone className="w-4 h-4" /> View Number
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobApplicants;