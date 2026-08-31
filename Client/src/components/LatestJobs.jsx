import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

function LatestJobs() {
    const { allJobs } = useSelector(state => state.job);
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16'
        >
            {/* Section Header with Title and View All Button */}
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-5'>
                <div>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] font-semibold text-xs tracking-wide mb-3'>
                        <Briefcase className='w-3.5 h-3.5' /> Opportunity Hub
                    </div>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight'>
                        Latest & Top <span className='text-[#0284C7]'>Job Openings</span>
                    </h1>
                </div>
                <Button 
                    onClick={() => navigate("/jobs")}
                    variant="ghost" 
                    className='text-[#0284C7] hover:text-[#0270a8] hover:bg-sky-50 font-semibold gap-2 w-fit cursor-pointer p-0 sm:px-4 sm:py-2'
                >
                    View All Jobs <ArrowRight className='w-4 h-4' />
                </Button>
            </div>

            {/* Jobs Grid or Empty State */}
            {
                !allJobs || allJobs.length === 0 ? (
                    <div className='text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200'>
                        <Briefcase className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                        <h3 className='font-bold text-gray-700 text-lg'>No Job Openings Available</h3>
                        <p className='text-gray-500 text-sm mt-1'>Check back later or explore other categories to find your dream role.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            allJobs.slice(0, 6).map((job) => (
                                <LatestJobCards key={job._id} job={job} />
                            ))
                        }
                    </div>
                )
            }
        </motion.div>
    )
}

export default LatestJobs