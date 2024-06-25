"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const paymentConfirm = () => {
    const router = useRouter();
    return (
        <div className='h-[100vh]'>
            <div className='h-full flex flex-col items-center justify-center gap-10'>
                <Image src='/approval.png' alt='approval' width={200} height={200} />
                <Button onClick={()=>router.push('/')}>Go Home</Button>
            </div>

           
        </div>
    )
}

export default paymentConfirm