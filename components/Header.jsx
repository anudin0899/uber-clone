
import React from 'react'
import { CarFront, PackageOpen } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const Header = () => {

    const headerMenu = [
        {
            id: 1,
            name: 'Car',
            icon: <CarFront />
        },
        {
            id: 2,
            name: 'Package',
            icon: <PackageOpen />
        }
    ]


    return (
        <div className='p-5 pb-3 pl-10  border-b-[2px] border-gray-200 flex items-center justify-between'>
            <div className='flex gap-24 items-center'>
                <Image
                    src='/Uber-Logo.png'
                    alt='logo'
                    width={70}
                    height={70}
                />

                <div className='flex gap-6 items-center'>
                    {headerMenu.map((item, index) => (
                        <div className='flex gap-2 items-center cursor-pointer' key={index}>
                            <span>{item?.icon}</span>
                            <h2 className='text-[14px] font-medium'>{item?.name}</h2>

                        </div>
                    ))}
                </div>
            </div>
            <UserButton />
        </div>
    )
}

export default Header