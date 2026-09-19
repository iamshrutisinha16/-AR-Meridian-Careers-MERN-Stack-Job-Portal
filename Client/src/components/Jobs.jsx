import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { Search, SlidersHorizontal, Briefcase } from 'lucide-react'
import { Input } from './ui/input'

function Jobs() {
    const dispatch = useDispatch();

    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(state => state.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    useEffect(() => {
        if (!allJobs || allJobs.length === 0) {
            setFilterJobs([]);
            return;
        }

        let result = allJobs;

        if (searchedQuery && searchedQuery.trim() !== "") {
            const query = searchedQuery.toLowerCase().trim();
            
            result = result.filter((job) => {
                const jobLocation = job?.location?.toLowerCase() || "";
                const jobTitle = job?.title?.toLowerCase() || "";
                const jobDesc = job?.description?.toLowerCase() || "";
                const jobSalary = String(job?.salary || job?.package || "").toLowerCase();
                const jobExperience = String(job?.experienceLevel || job?.position || "").toLowerCase();

                // Smart matching for compound filters like "Bangalore / Remote"
                const matchesLocation = jobLocation.includes(query) || 
                    (query.includes("remote") && jobLocation.includes("remote")) ||
                    (query.includes("bangalore") && jobLocation.includes("bangalore"));

                // General text match across fields
                return (
                    matchesLocation ||
                    jobTitle.includes(query) ||
                    jobDesc.includes(query) ||
                    jobSalary.includes(query) ||
                    jobExperience.includes(query)
                );
            });
        }

        setFilterJobs(result);
    }, [allJobs, searchedQuery]);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            
            <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-6 flex-1'>
                
                {/* Top Main Search Header */}
                <div className='bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='flex items-center gap-3 w-full md:w-auto'>
                        <div className='p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold'>
                            <Briefcase className='w-5 h-5' />
                        </div>
                        <div>
                            <h1 className='text-base sm:text-lg font-extrabold text-gray-900'>
                                {filterJobs.length} jobs near you
                            </h1>
                            <p className='text-xs text-gray-500'>Explore verified job opportunities</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 w-full md:w-[450px]'>
                        <div className='relative w-full'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input 
                                placeholder="Search jobs by title, role or city..." 
                                className="pl-10 h-11 rounded-xl bg-gray-50/50 border-gray-200 text-xs focus-visible:ring-emerald-600"
                                onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                            />
                        </div>
                        
                        {/* Mobile Filter Toggle */}
                        <Button 
                            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)} 
                            variant="outline" 
                            className="md:hidden h-11 px-4 rounded-xl border-gray-200 text-xs font-bold flex items-center gap-2 shrink-0"
                        >
                            <SlidersHorizontal className='w-4 h-4' /> Filter
                        </Button>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-start'>
                    
                    {/* 1. Left Filter Sidebar */}
                    <div className='hidden md:block md:col-span-1 lg:col-span-3 sticky top-20 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs'>
                        <FilterCard />
                    </div>

                    {/* Mobile Filter Drawer */}
                    {
                        isFilterBoxOpen && (
                            <div className='md:hidden fixed inset-0 z-50 bg-black/40 flex justify-end'>
                                <motion.div 
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    className='w-80 bg-white h-full p-5 overflow-y-auto shadow-xl'
                                >
                                    <div className='flex justify-between items-center mb-4 pb-2 border-b'>
                                        <h2 className='font-bold text-gray-800 text-sm'>Filter Jobs</h2>
                                        <button onClick={() => setIsFilterBoxOpen(false)} className='text-sm text-gray-500 font-bold'>✕ Close</button>
                                    </div>
                                    <FilterCard />
                                </motion.div>
                            </div>
                        )
                    }

                    {/* 2. Jobs List Section */}
                    <div className="md:col-span-3 lg:col-span-9 w-full flex flex-col gap-4">
                        <h2 className='text-sm font-bold text-gray-700 mb-1'>Recommended jobs for you</h2>
                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex flex-col justify-center items-center h-80 bg-white rounded-2xl border border-gray-200 text-gray-500 gap-2'>
                                    <Briefcase className='w-10 h-10 text-gray-300' />
                                    <p className='font-bold text-base text-gray-700'>No Jobs Found</p>
                                    <p className='text-xs text-gray-400'>Try changing your filters or search keywords.</p>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-4 w-full'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                key={job._id}
                                                className='w-full'
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs