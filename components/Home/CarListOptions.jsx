import { CarListData } from '@/utils/CarListData'
import React, { useState } from 'react'
import CarListItem from './CarListItem'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const CarListOptions = ({ distance }) => {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState([]);

    const router = useRouter();

    return (
        <div className='mt-5 p-5 overflow-auto h-[250px]'>
            <h2 className='text-[22px] font-bold'>Recommended</h2>
            {CarListData.map((item, index) => (
                <div className={`cursor-pointer p-2 rounded-md mt-4
                    px-4 border-black
                 ${activeIndex == index ? 'border-[2px]' : null}`}
                    onClick={() => {
                        setActiveIndex(index);
                        setSelectedCar(item)
                    }}
                >
                    <CarListItem car={item} key={index} dist={distance} />
                </div>
            ))}

            {selectedCar?.name ?
                <div className='flex justify-between fixed bottom-10 
              bg-white  p-3 shadow-xl w-full md:w-[25%] sm:w-[80%]
                border-[1px] items-center rounded-lg'
                >
                    <h2>Make Payment For</h2>
                    <Button
                        onClick={() => router.push('/payment?amount=' + (selectedCar.amount * distance).toFixed(2))}
                        className='p-3 rounded-lg'
                    >
                        Request {selectedCar?.name}
                    </Button>
                </div>
                : null
            }

        </div>
    )
}

export default CarListOptions