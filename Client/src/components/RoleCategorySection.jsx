import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Factory, Truck, PackageOpen } from 'lucide-react';

// AR Meridian Production, B2B & Supply Chain Roles
const baseRoles = [
    { 
        title: "B2B Sales & Distribution", 
        keywords: ["sales", "b2b", "dealer", "distribution", "executive"], 
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=600&q=80",
        badge: "Commercial"
    },
    { 
        title: "Quality Control Chemist", 
        keywords: ["chemist", "quality", "qc", "lab", "testing"], 
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
        badge: "R&D Lab"
    },
    { 
        title: "Factory Operations", 
        keywords: ["factory", "manufacturing", "production", "operator", "plant"], 
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
        badge: "Plant Floor"
    },
    { 
        title: "Supply Chain & Logistics", 
        keywords: ["supply", "chain", "logistics", "dispatch", "warehouse"], 
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80",
        badge: "Operations"
    },
    { 
        title: "Bulk Fleet Driver", 
        keywords: ["driver", "transport", "chauffeur", "delivery", "fleet"], 
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
        badge: "Transport"
    },
    { 
        title: "Packaging Specialist", 
        keywords: ["packer", "packaging", "bottling", "labeling", "filling"], 
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
        badge: "Production"
    },
    { 
        title: "Facility Safety & Security", 
        keywords: ["security", "guard", "safety", "watchman", "officer"], 
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
        badge: "Plant Security"
    },
    { 
        title: "Maintenance Technician", 
        keywords: ["maintenance", "technician", "electrician", "plumber", "mechanic"], 
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        badge: "Engineering"
    }
];

function RoleCategorySection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { allJobs } = useSelector(store => store.job); 

    const dynamicRoles = useMemo(() => {
        if (!allJobs || allJobs.length === 0) {
            return baseRoles.map(role => ({ ...role, count: 0 }));
        }

        return baseRoles.map(role => {
            const count = allJobs.filter(job => {
                const jobTitle = job?.title?.toLowerCase() || "";
                return role.keywords.some(keyword => jobTitle.includes(keyword.toLowerCase()));
            }).length;

            return { ...role, count };
        });
    }, [allJobs]);

    const handleRoleClick = (roleTitle) => {
        dispatch(setSearchedQuery(roleTitle));
        navigate("/browse");
    };

    return (
        <div className="py-20 px-4 bg-gray-50/50 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-3">
                <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0284C7] text-xs font-extrabold tracking-wide'>
                    <Sparkles className='w-4 h-4' />
                    <span>AR MERIDIAN CAREERS & MANUFACTURING DIVISIONS</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Powering Excellence. <span className='text-[#0284C7]'>Build Your Career.</span>
                </h2>
                <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                    Explore active manufacturing, quality assurance, and B2B commercial openings across our domestic and international networks.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dynamicRoles.map((role, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleRoleClick(role.title)}
                        className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all flex flex-col group relative"
                    >
                        {/* Top Badge */}
                        <div className='absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-800 shadow-sm'>
                            {role.badge}
                        </div>

                        <div className="h-44 overflow-hidden bg-gray-100 relative">
                            <img 
                                src={role.image} 
                                alt={role.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                            <div>
                                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg group-hover:text-[#0284C7] transition-colors line-clamp-1">
                                    {role.title}
                                </h3>
                                <p className="text-xs text-gray-400 font-medium mt-1">
                                    AR Meridian Industrial & Commercial
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${role.count > 0 ? 'bg-blue-50 text-[#0284C7]' : 'bg-gray-100 text-gray-500'}`}>
                                    {role.count > 0 ? `${role.count} Openings` : "No Openings"}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#0284C7] group-hover:text-white text-gray-600 flex items-center justify-center transition-all">
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default RoleCategorySection;