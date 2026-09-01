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

function Jobs() {

    const dispatch = useDispatch();

    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(state => state.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    useEffect(() => {
        if (!allJobs || allJobs.length === 0) return;

        if (searchedQuery && searchedQuery.trim() !== "") {
            const query = searchedQuery.toLowerCase().trim();
            
            const filteredJob = allJobs.filter((job) => {
                const jobLocation = job?.location?.toLowerCase() || "";
                const jobTitle = job?.title?.toLowerCase() || "";
                const jobDesc = job?.description?.toLowerCase() || "";
                
                // Agar query location ya title mein match karti hai, toh job dikhao
                return jobLocation.includes(query) || jobTitle.includes(query) || jobDesc.includes(query);
            });

            setFilterJobs(filteredJob);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className='sm:px-[5%] max-sm:px-5 lg:px-[8%] my-6'>
                <div className='sm:flex gap-6 mx-0 px-0 items-start'>
                    
                    {/* Desktop Filter Sidebar */}
                    <div className='sm:w-[240px] shrink-0 max-sm:hidden sticky top-20'>
                        <FilterCard />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className='sm:hidden w-full mb-4'>
                        <div className='text-right' onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}>
                            <Button className='bg-[#0284C7] text-white'>Filter</Button>
                        </div>
                        {
                            isFilterBoxOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className='my-3'
                                >
                                    <FilterCard />
                                </motion.div>
                            )
                        }
                    </div>

                    {/* Jobs Display Section */}
                    <div className="flex-1 w-full">
                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex justify-center items-center h-60 text-gray-500 font-semibold text-lg'>
                                    No Jobs Found
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                key={job._id}
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
        </>
    )
}

export default Jobs