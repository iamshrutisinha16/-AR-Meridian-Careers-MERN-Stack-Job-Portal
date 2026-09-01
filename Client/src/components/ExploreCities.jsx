import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

// Real cities with valid image links
const cities = [
    {
        name: "Delhi",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80", 
        query: "Delhi"
    },
    {
        name: "Mumbai",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80", 
        query: "Mumbai"
    },
    {
        name: "Bangalore",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80", 
        query: "Bangalore"
    },
    {
        name: "Gurgaon",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80", 
        query: "Gurgaon"
    },
    {
        name: "Hyderabad",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1650630129759-992a543f45a0?auto=format&fit=crop&w=600&q=80", 
        query: "Hyderabad"
    },
    {
        name: "Kolkata",
        tag: "Explore Jobs",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80", 
        query: "Kolkata"
    }
];

const ExploreCities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCityClick = (cityName) => {
        dispatch(setSearchedQuery(cityName));
        navigate('/jobs');
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Explore jobs by top cities
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Find verified career opportunities across major hubs
                </p>
            </div>

            {/* Clean Grid Layout (No Scrollbar) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {cities.map((city, index) => (
                    <div 
                        key={index}
                        onClick={() => handleCityClick(city.query)}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
                    >
                        {/* City Landmark Image */}
                        <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                            <img 
                                src={city.image} 
                                alt={city.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* City Details */}
                        <div className="p-3 flex flex-col items-center text-center">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                                {city.name}
                            </h3>
                            <span className="text-[11px] sm:text-xs font-semibold text-[#0284C7] mt-0.5">
                                {city.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExploreCities;