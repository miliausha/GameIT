import Image from 'next/image';
import Logo from '@/images/Logo.svg';
import MetaMask from '@/images/metamask.svg';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useState } from 'react';

export default function Header() {
    const { logout, authenticated } = usePrivy();
    const { wallets } = useWallets();
    const [isHovering, setIsHovering] = useState(false)

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    return (
        <header className="flex p-4 text-white w-full">
            <nav className='w-full'>
                <ul className="flex w-full justify-between items-center">
                    <li>
                        <Image src={Logo} alt="GameBIT" height={80} /> 
                    </li>
                    <li className="flex items-center space-x-4">
                        {authenticated && wallets.length > 0 && (
                            <>
                                <span className="text-sm">
                                    {shortenAddress(wallets[0].address)}
                                </span>
                                <div 
                                    className="relative"
                                    onClick={() => setIsHovering(!isHovering)}
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <Image 
                                            src={MetaMask} 
                                            alt="User Avatar" 
                                            width={40} 
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    {isHovering && (
                                        <button
                                            onClick={() => logout()}
                                            className="absolute top-full right-0 mt-2 bg-gradient-primary text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-200 ease-in-out"
                                        >
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
    }