'use client';

import Image from "next/image";
import GamePad from '@/images/gamepad.svg';
import Dollar from '@/images/dollar.svg';
import Link from "next/link";

export default function MainPage() {
    return (
        <div className='flex w-full h-full'>
            <Link href='/' className='w-1/2 flex flex-col justify-center items-center'>
                <Image src={GamePad} alt='GamePad' width={300} height={300} />
                <span className='text-4xl text-center font-bold text-text-highlighted mt-5'>Game It</span>
            </Link>
            <Link href='/sell' className='w-1/2 flex flex-col justify-center items-center'>
                <Image src={Dollar} alt='Dollar' width={300} height={300} />
                <span className='text-4xl text-center font-bold text-text-blue-highlighted mt-5'>Sell It</span>   
            </Link>    
        </div>
    );
}