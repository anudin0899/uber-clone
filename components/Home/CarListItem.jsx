import { User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CarListItem = ({ car, dist }) => {
    return (
        <div>
            <div className='flex items-center justify-between '>
                <div className='flex items-center gap-4'>
                    <Image src="/uber1.jpg" width={100} height={100} alt='image' className='w-[100px] h-[100px] object-contain' />
                    <div>
                        <h2 className='font-semibold text-[16px] flex gap-3'>
                            {car.name}
                            <span className='flex gap-2 items-center font-normal text-[12px]'>
                                <User />{car.seat}
                            </span>
                        </h2>
                        <p className='text-[12px]'>{car.desc}</p>
                    </div>
                </div>
                <h2 className='font-semibold text-[16px]'>
                    ${(car.amount * dist).toFixed(2)}
                </h2>

            </div>
        </div>
    )
}

export default CarListItem
