"use client"
import React from 'react'
import { CarFront, PackageOpen } from 'lucide-react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const Header = () => {


    const { user, isSignedIn, isLoaded } = useUser();

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
                    width={100}
                    height={70}
                    className='cursor-pointerr w-[80px] h-[50px]'
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
            {isSignedIn ? <UserButton /> :
                <Link href={'sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header