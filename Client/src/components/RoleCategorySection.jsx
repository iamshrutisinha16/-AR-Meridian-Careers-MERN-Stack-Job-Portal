import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

const baseRoles = [
    { 
        title: "B2B Sales & Distribution", 
        keywords: ["sales", "b2b", "dealer", "distribution", "executive"], 
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Quality Control Chemist", 
        keywords: ["chemist", "quality", "qc", "lab", "testing"], 
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Factory Operations", 
        keywords: ["factory", "manufacturing", "production", "operator", "plant"], 
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Supply Chain & Logistics", 
        keywords: ["supply", "chain", "logistics", "dispatch", "warehouse"], 
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Bulk Fleet Driver", 
        keywords: ["driver", "transport", "chauffeur", "delivery", "fleet"], 
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Packaging Specialist", 
        keywords: ["packer", "packaging", "bottling", "labeling", "filling"], 
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Facility Safety & Security", 
        keywords: ["security", "guard", "safety", "watchman", "officer"], 
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    },
    { 
        title: "Maintenance Technician", 
        keywords: ["maintenance", "technician", "electrician", "plumber", "mechanic"], 
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
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
        <section className="py-12 px-4 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 space-y-2">
                <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0284C7] text-xs font-bold'>
                    <Sparkles className='w-3.5 h-3.5' />
                    <span>AR MERIDIAN DIVISIONS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    What kind of a role do you want?
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                    Explore active openings matching your skill set and expertise.
                </p>
            </div>

            {/* Grid - 4 Columns layout like reference */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {dynamicRoles.map((role, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleRoleClick(role.title)}
                        className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer transition-all flex flex-col group"
                    >
                        {/* Proper Image Height matching reference proportion */}
                        <div className="h-36 sm:h-40 overflow-hidden bg-gray-100">
                            <img 
                                src={role.image} 
                                alt={role.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Card Footer info */}
                        <div className="p-3.5 flex flex-col justify-between flex-grow bg-white">
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#0284C7] transition-colors line-clamp-1">
                                {role.title}
                            </h3>
                            <div className="mt-2 flex items-center text-xs font-semibold text-gray-500 group-hover:text-[#0284C7] transition-colors">
                                <span>{role.count > 0 ? `View ${role.count.toLocaleString()}+ Vacancies` : "View Open Vacancies"}</span>
                                <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default RoleCategorySection;