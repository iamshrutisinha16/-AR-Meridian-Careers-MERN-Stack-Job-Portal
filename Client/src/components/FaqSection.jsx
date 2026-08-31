import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        question: "Are there any charges for applying on jobs?",
        answer: "No, applying for jobs on Meridian is 100% free for all job seekers. We never charge candidates for job applications or registrations."
    },
    {
        question: "How can students and freshers apply?",
        answer: "Students can easily create an account by selecting the 'Candidate' role during signup, complete their profile details, upload their resume/profile image, and apply to entry-level or internship listings instantly."
    },
    {
        question: "How can we contact the recruiters?",
        answer: "Once you apply for a job or if your profile matches a recruiter's requirement, you can communicate through our built-in application tracking system and application status updates provided by recruiters."
    },
    {
        question: "What type of jobs do you have on Meridian?",
        answer: "Meridian features a wide variety of roles ranging from Frontend and Backend Developers, Full Stack Engineers, Data Scientists, to Graphic Designers, DevOps, and Cyber Security specialists."
    },
    {
        question: "How can I update my profile details or resume?",
        answer: "You can visit your Profile page at any time by clicking on your profile avatar in the Navbar, where you can edit your personal details, update your skills, and upload a new resume."
    }
];

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className='w-full py-16 px-4 bg-white my-6'>
            <div className='max-w-4xl mx-auto space-y-10'>
                
                {/* Heading */}
                <div className='text-center space-y-2'>
                    <div className='inline-flex p-3 bg-amber-500/10 text-amber-600 rounded-2xl mb-1'>
                        <HelpCircle className='w-6 h-6' />
                    </div>
                    <h2 className='text-2xl sm:text-3xl font-black text-gray-900 tracking-tight'>
                        Popular Questions
                    </h2>
                    <p className='text-gray-500 text-sm'>
                        Got questions? We've got answers about how Meridian works for you.
                    </p>
                </div>

                {/* FAQ List */}
                <div className='space-y-4'>
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className='border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white hover:border-amber-500/50 shadow-sm'
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className='w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 text-sm sm:text-base cursor-pointer focus:outline-none'
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-amber-600' : ''}`} 
                                    />
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className='px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3'>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    )
}

export default FaqSection;