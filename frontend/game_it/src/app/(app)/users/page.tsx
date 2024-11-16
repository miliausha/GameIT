'use client';

import Image from "next/image";
import GamePad from '@/images/gamepad.svg';
import Dollar from '@/images/dollar.svg';
import Link from "next/link";

export default function MainPage() {
    return (
        <div className='flex w-full h-full justify-center gap-20'>
            <Link href='/' className='w-1/3 flex flex-col justify-center items-center gap-2'>
                <Image src={GamePad} alt='GamePad' width={300} height={300} className='mx-[-30px]' />
                <span className='text-4xl text-center font-bold text-text-highlighted'>Game It</span>
            </Link>
            <Link href='/sell' className='w-1/3 flex flex-col justify-center items-center gap-2'>
                <Image src={Dollar} alt='Dollar' width={300} height={300} className='mx-[-30px]' />
                <span className='text-4xl text-center font-bold text-text-blue-highlighted'>Sell It</span>   
            </Link>    
        </div>
    );
}