import Image from 'next/image';
import Logo from '@/images/Logo.svg';
import MetaMask from '@/images/metamask.svg';

export default function Header() {
    return (
        <header className="flex p-4 text-white w-full">
            <nav className='w-full'>
                <ul className="flex w-full justify-between items-center">
                    <li>
                        <a href="#" className="hover:underline">
                        Games
                        </a>
                    </li>
                    <li>
                        <Image src={Logo} alt="GameBIT" height={80} /> 
                    </li>
                    <li>
                        <Image src={MetaMask} alt="MetaMask" height={40} />
                    </li>
                </ul>
            </nav>
        </header>
    );
    }