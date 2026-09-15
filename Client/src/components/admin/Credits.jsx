import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Database, Building2, Briefcase, Home, 
    Coins, Bell, Check, ChevronDown, ChevronUp, Sparkles, HelpCircle 
} from 'lucide-react'

const CreditsPricing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.auth)
    
    // State for local credit simulation if redux action isn't strictly bound
    const [userCredits, setUserCredits] = useState(user?.credits || 200)
    const [openFaq, setOpenFaq] = useState(0) // First FAQ open by default

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };

    const handleBuyPlan = (planName, creditAmount, price) => {
        // Real action simulation
        const updatedCredits = userCredits + creditAmount;
        setUserCredits(updatedCredits);
        alert(`🎉 Success! You have successfully purchased the "${planName}" plan for ₹${price}. Added ${creditAmount} credits to your account!`);
    };

    const faqData = [
        {
            q: "What are Job Portal Credits?",
            a: "Job Portal Credits can be purchased on our platform and are used to post Premium Jobs, which enable you to hire faster and reach top candidates."
        },
        {
            q: "What are the types of job postings available?",
            a: "We offer Basic Job postings for standard reach and Premium Jobs with high visibility, urgent hiring tags, and database match unlocks."
        },
        {
            q: "I need to purchase Credits in bulk. What should I do?",
            a: "For bulk purchases exceeding 50,000 credits, you can click on 'Contact Sales' above to get a customized enterprise quotation tailored to your hiring volume."
        },
        {
            q: "What is the validity of my Credits?",
            a: "Purchased credits are valid for 1 year from the date of purchase, giving you complete flexibility to use them as your hiring needs grow."
        },
        {
            q: "For how long will my Premium Job be active?",
            a: "Each Premium Job posting remains active and boosted on the search results page for 30 days or until you close the position."
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            
            {/* 1. LEFT SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden lg:flex shrink-0">
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
                        
                        <button onClick={() => navigate("/admin/database")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer">
                            <Database className="w-4 h-4" /> Database
                        </button>

                        <button onClick={() => navigate("/admin/pricing")} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm cursor-pointer">
                            <div className="flex items-center gap-3"><Coins className="w-4 h-4" /> Credits</div>
                            <span className="text-xs font-bold bg-blue-100 px-2 py-0.5 rounded-full text-blue-700">{userCredits}</span>
                        </button>
                    </nav>
                </div>

                <div className="p-4 border-t">
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-purple-900 mb-1">Hire faster with Premium</h4>
                        <p className="text-[11px] text-purple-700">Contact us for pricing</p>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA (SCROLLABLE PRICING PAGE) */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-50 relative">
                
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-xs">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer">
                            ←
                        </button>
                        <h2 className="text-base font-bold text-gray-900">Pricing & Plans</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xs">
                            <span className="text-amber-500">🪙</span> {userCredits} Credits +
                        </div>
                        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-10 space-y-16">
                    
                    {/* Hero Section */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Buy more <span className="text-blue-600">credits</span> from bundles below
                        </h1>
                        <p className="text-sm md:text-base text-gray-500">
                            Select a plan that fits your hiring requirements and speed up recruitment.
                        </p>
                    </div>

                    {/* Pricing Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-400 transition">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-gray-900">₹ 700</div>
                                    <p className="text-xs text-gray-500 mt-1">Suitable for 1 premium job</p>
                                </div>
                                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 flex items-center gap-2.5">
                                    <span className="text-lg">🪙</span>
                                    <div>
                                        <span className="font-bold text-gray-900 text-sm">700 credits</span>
                                    </div>
                                </div>
                                <div className="space-y-2.5 pt-2">
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">What you can do</p>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>Post up to 1 premium job + Job Boost</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>To be used within 30 days</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleBuyPlan("Single Premium Plan", 700, 700)}
                                className="mt-6 w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-sm"
                            >
                                Buy now
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-400 transition">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl md:text-3xl font-black text-gray-900">₹ 2,375</span>
                                            <span className="text-sm text-gray-400 line-through">₹ 2,500</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Suitable for 5 premium jobs</p>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">Save 5%</span>
                                </div>
                                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 flex items-center gap-2.5">
                                    <span className="text-lg">🪙</span>
                                    <div>
                                        <span className="font-bold text-gray-900 text-sm">2,500 credits</span>
                                    </div>
                                </div>
                                <div className="space-y-2.5 pt-2">
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Things to do with 2500 credits</p>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>Post up to 5 premium jobs</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>To be used within 30 days</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleBuyPlan("Growth Plan (5 Jobs)", 2500, 2375)}
                                className="mt-6 w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-sm"
                            >
                                Buy now
                            </button>
                        </div>

                        {/* Card 3 (Recommended) */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-blue-600 shadow-md flex flex-col justify-between relative">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-xs">
                                Recommended
                            </div>
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl md:text-3xl font-black text-gray-900">₹ 4,500</span>
                                            <span className="text-sm text-gray-400 line-through">₹ 5,000</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Suitable for 10 premium jobs</p>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">Save 10%</span>
                                </div>
                                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 flex items-center gap-2.5">
                                    <span className="text-lg">🪙</span>
                                    <div>
                                        <span className="font-bold text-gray-900 text-sm">5,000 credits</span>
                                    </div>
                                </div>
                                <div className="space-y-2.5 pt-2">
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Things to do with 5000 credits</p>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>Post up to 10 premium jobs</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-gray-600">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span>To be used within 30 days</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleBuyPlan("Enterprise Pro Plan (10 Jobs)", 5000, 4500)}
                                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-md"
                            >
                                Buy now
                            </button>
                        </div>

                    </div>

                    {/* Contact Sales Banner */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                                💬
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Looking for something else?</h3>
                                <p className="text-xs text-gray-500">Get a custom quote based on your exact hiring volume and enterprise needs.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => alert("Our sales representative will reach out to you shortly!")}
                            className="px-5 py-2.5 border border-gray-300 hover:border-gray-400 font-bold text-gray-700 rounded-xl text-xs transition cursor-pointer whitespace-nowrap"
                        >
                            Contact sales
                        </button>
                    </div>

                    {/* Feature Comparison Section */}
                    <div className="space-y-6 pt-4">
                        <div>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Benefits</span>
                            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" /> Why choose premium job?
                            </h3>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                            <div className="grid grid-cols-3 bg-gray-50/80 border-b border-gray-200 p-4 text-xs font-bold text-gray-600 uppercase">
                                <div>Features</div>
                                <div className="text-center">Basic Job</div>
                                <div className="text-center text-blue-600">Premium Job</div>
                            </div>

                            <div className="divide-y divide-gray-100 text-xs md:text-sm">
                                <div className="grid grid-cols-3 p-4 items-center">
                                    <div>
                                        <p className="font-bold text-gray-900">Boost on job search page</p>
                                        <p className="text-[11px] text-gray-400 hidden md:block">Increased visibility over standard listings</p>
                                    </div>
                                    <div className="text-center text-gray-400">—</div>
                                    <div className="text-center font-bold text-emerald-600 flex justify-center"><Check className="w-5 h-5" /></div>
                                </div>

                                <div className="grid grid-cols-3 p-4 items-center">
                                    <div>
                                        <p className="font-bold text-gray-900">Number of direct applies</p>
                                        <p className="text-[11px] text-gray-400 hidden md:block">Chances of getting candidate responses</p>
                                    </div>
                                    <div className="text-center text-gray-500 font-semibold">Low</div>
                                    <div className="text-center font-bold text-blue-600">High 🚀</div>
                                </div>

                                <div className="grid grid-cols-3 p-4 items-center">
                                    <div>
                                        <p className="font-bold text-gray-900">Database matches unlocks</p>
                                        <p className="text-[11px] text-gray-400 hidden md:block">Instant candidate leads from database</p>
                                    </div>
                                    <div className="text-center text-gray-400">—</div>
                                    <div className="text-center font-bold text-blue-600">High ⚡</div>
                                </div>

                                <div className="grid grid-cols-3 p-4 items-center">
                                    <div>
                                        <p className="font-bold text-gray-900">Urgent hiring tag</p>
                                        <p className="text-[11px] text-gray-400 hidden md:block">Special highlighted badge on listing</p>
                                    </div>
                                    <div className="text-center text-gray-400">—</div>
                                    <div className="text-center font-bold text-emerald-600 flex justify-center"><Check className="w-5 h-5" /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Frequently Asked Questions */}
                    <div className="space-y-6 pt-4 pb-12">
                        <div className="text-center">
                            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h3>
                        </div>

                        <div className="space-y-3 max-w-3xl mx-auto">
                            {faqData.map((item, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 cursor-pointer shadow-2xs transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.q}</h4>
                                            {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                        </div>
                                        {isOpen && (
                                            <p className="text-xs md:text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                                                {item.a}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default CreditsPricing