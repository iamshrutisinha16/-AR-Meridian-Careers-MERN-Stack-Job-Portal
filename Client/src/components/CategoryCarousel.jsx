import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"
import { Factory, FlaskConical, Truck, Briefcase, ShieldAlert, Sparkles, Building2, Wrench, Code2, Laptop, Headphones, UserCheck } from 'lucide-react'

// AR Meridian IT & Non-IT Categories
const categories = [
    // IT Sectors
    { title: "Software Development", icon: <Code2 className="w-4 h-4 text-indigo-600" /> },
    { title: "Frontend / React Tech", icon: <Laptop className="w-4 h-4 text-indigo-600" /> },
    // Non-IT Sectors
    { title: "B2B Sales & Distribution", icon: <Briefcase className="w-4 h-4 text-[#0284C7]" /> },
    { title: "Quality Control Chemist", icon: <FlaskConical className="w-4 h-4 text-[#0284C7]" /> },
    { title: "Factory Operations", icon: <Factory className="w-4 h-4 text-[#0284C7]" /> },
    { title: "Supply Chain & Logistics", icon: <Truck className="w-4 h-4 text-[#0284C7]" /> },
    { title: "Customer Support & HR", icon: <Headphones className="w-4 h-4 text-amber-600" /> },
    { title: "Facility Safety", icon: <ShieldAlert className="w-4 h-4 text-[#0284C7]" /> },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, setApi] = useState(null);

    // Auto-scroll effect
    useEffect(() => {
        if (!api) {
            return;
        }

        const intervalId = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [api]);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full py-12 px-4 bg-white border-y border-gray-100 my-6"
        >
            <div className="max-w-4xl mx-auto text-center mb-8">
                <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0284C7] text-xs font-bold mb-3'>
                    <Sparkles className='w-3.5 h-3.5' />
                    <span>AR MERIDIAN DIVISIONS</span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                        <span>Explore IT & Non-IT Career Streams</span>
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl mx-auto">
                        Filter active openings seamlessly: <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">IT Domain</span> strictly for Software Engineering, Tech Stacks & Development — and <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">Non-IT Domain</span> for Operations, Sales, Marketing, HR & B2B networks.
                    </p>
                </div>
            </div>

            <Carousel setApi={setApi} className="w-full max-w-xl sm:max-w-3xl mx-auto relative px-8">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[70%] sm:basis-1/2 md:basis-1/3">
                                <div className="p-1">
                                    <Button 
                                        onClick={() => searchJobHandler(cat.title)} 
                                        variant="outline" 
                                        className="w-full flex items-center justify-center gap-2.5 rounded-full py-6 px-5 border-gray-200 bg-gray-50/50 hover:bg-[#0284C7]/10 hover:border-[#0284C7] hover:text-[#0284C7] text-gray-700 font-semibold shadow-sm cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                                    >
                                        {cat.icon}
                                        <span className="truncate">{cat.title}</span>
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute -left-2 border-gray-200 bg-white shadow-md hover:bg-gray-100 cursor-pointer" />
                <CarouselNext className="absolute -right-2 border-gray-200 bg-white shadow-md hover:bg-gray-100 cursor-pointer" />
            </Carousel>
        </motion.div>
    )
}

export default CategoryCarousel;