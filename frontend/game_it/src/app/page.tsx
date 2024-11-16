import Monkey from '@/images/monkey.png';
import Image from 'next/image';
import Kaban from '@/images/Kaban.png';

export default function Home() {
  return (
    <div className='md:flex w-full h-full mx-10'>
      <div className='w-1/2 flex justify-between items-center'>
        <div className="rounded-lg shadow-xl p-4 text-center bg-gradient-primary">
          <Image src={Monkey} alt='monkey' />
        </div>
        <div>
          <Image src={Kaban} alt='Kaban' />
        </div>
      </div>
      <div className='w-1/2 flex flex-col justify-center'>
        <p className='text-text-highlighted text-2xl'>
          Step into a world where fun meets rewards!
        </p>
        <p>
          GameBIT is a Game Arena that lets you play exciting mini-games and win exclusive NFTs. Compete with other players in thrilling games like "Rock-Paper-Scissors," where your skills can earn you valuable digital collectibles.
        </p>
        <p className='text-text-highlighted'>
          Here is how it works:
        </p>
        <ul className='text-text-highlighted list-disc list-inside'>
          <li>Join the Game: Enter a match by staking a small entry fee.</li>
          <li>Compete and Win: Play against other players for a chance to win NFTs and reclaim your stake.</li>
          <li>Fair and Transparent: Powered by blockchain, our platform ensures secure transactions and fair gameplay.</li>
        </ul>
        <p className='text-text-highlighted'>
          Ready to play and collect? Dive into the NFT Game Arena and turn your skills into rewards!
        </p>
      </div>
    </div>
  );
}
