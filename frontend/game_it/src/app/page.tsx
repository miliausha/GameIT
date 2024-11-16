"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import shortenAddress from './utils/index';
import Monkey from '@/images/monkey.png';
import Image from 'next/image';
import Kaban from '@/images/Kaban.png';

export default function Home() {
  const { logout, authenticated, ready, user, createWallet } = usePrivy();
  const { login } = useLogin({
    onComplete: async (user) => {
      console.log("login complete", user);
      if (!user.wallet) {
        const userWallet = await createWallet();
        console.log("new user wallet", userWallet);
      }
    },
  });

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className='md:flex w-full h-full mx-10'>
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="font-bold">Authentication</h1>
        {authenticated && user && (
          <button
            onClick={() => logout()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            {/* {shortenAddress(user?.wallet!.address)} */}
            User Address
          </button>
        )}
        {!authenticated && (
          <button
            onClick={() => login()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        )}
      </div>
      <div className='w-1/2 flex justify-center items-center space-x-4'>
        <div className="rounded-lg shadow-xl p-4 text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
          <Image src={Monkey} alt='monkey' />
        </div>
        <div className="rounded-lg shadow-xl p-4 text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
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
