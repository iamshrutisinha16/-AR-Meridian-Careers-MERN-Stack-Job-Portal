import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const filterData = [
    {
        filterType: "Location",
        array: ["Bangalore / Remote", "Delhi NCR", "Noida Plant", "Gurugram", "Mumbai", "Hyderabad", "Patna", "International / Export"]
    },
    {
        filterType: "Industry",
        array: ["Production & Manufacturing", "Quality Control (QC)", "Supply Chain & Logistics", "B2B Sales & Marketing", "Chemical Formulation", "Packaging & Dispatch", "Senior Manager"]
    },
    {
        filterType: "Salary",
        array: ["3-6 LPA", "6-10 LPA", "10-20 LPA", "20-35 LPA", "35+ LPA"]
    }
]

const FilterCard = () => {
    useGetAllJobs()

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
        dispatch(setSearchedQuery(value)); // Yahan direct dispatch karein jab user select kare
    }

    return (
        <div className='w-full bg-white p-4 shadow-sm rounded-xl border border-gray-100'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg text-gray-900'>Filter Jobs</h1>
                {selectedValue && (
                    <button 
                        onClick={() => {
                            setSelectedValue("");
                            dispatch(setSearchedQuery("")); // Yahan clear karne par dispatch karein
                        }} 
                        className='text-xs text-[#0284C7] hover:underline font-semibold cursor-pointer'
                    >
                        Clear Filter
                    </button>
                )}
            </div>
            <hr className='my-3 border-gray-100' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-4'>
                            <h1 className='font-bold text-base text-gray-800 mb-2'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `filter-${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 gap-2 my-1.5' key={idx}>
                                            <RadioGroupItem value={item} id={itemId} className="cursor-pointer" />
                                            <Label className="text-sm font-medium text-gray-600 cursor-pointer" htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}
 
export default FilterCard