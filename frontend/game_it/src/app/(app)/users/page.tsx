'use client';

import Image from "next/image";
import GamePad from '@/images/gamepad.svg';
import Dollar from '@/images/dollar.svg';
import UserTokens from '@/components/UserTokens';

export default function MainPage() {
    return (
        <div className='flex w-full h-full mx-10'>
            <div className='w-1/2 flex flex-col justify-center '>
                <Image src={GamePad} alt='GamePad' width={500} height={500} />
            </div>
            <div className='w-1/2 flex flex-col justify-center '>
                <Image src={Dollar} alt='Dollar' width={500} height={500} />
            </div>
            <UserTokens accountAddress="0x6bC21d4260033D462a0CCdD8bdDB8fE423805a4a" />
        </div>
    );
}