"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
// import shortenAddress from './utils/index';
// import Image from 'next/image';
import Button from '@/components/Button';

const metadata: Metadata = {
  title: "Game BIT | NFT Game Arena",
  description: "Generated by 42BKK Cadets",
};

export default function Home() {
  const { logout, authenticated, ready, user, createWallet } = usePrivy();

  const { login } = useLogin({
    onComplete: async (user) => {
      console.log("login complete", user);
      if (!user.wallet) {
        const userWallet = await createWallet();
        console.log("new user wallet", userWallet);
      }
      // redirect('/users');
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
    <div className='md:flex w-full h-full mx-auto'>
      <div className='flex-1 flex justify-center items-center space-x-4 px-5 rounded-full'>
        <div className="rounded-3xl shadow-xl p-4 text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
          {/* <Image src={Monkey} alt='monkey' /> */}
        </div>
        <div className="rounded-3xl shadow-xl p-4 text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
          {/* <Image src={Kaban} alt='Kaban' /> */}
        </div>
      </div>
      <div className='w-1/2 flex flex-col justify-center text-wrap px-5 p-8'>
        <h1 className='text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text'>
          Step into a world where fun meets rewards!
        </h1>

        <div className="space-y-4 mb-8">
          <p className="text-xl text-blue-highlighted font-semibold">
            GameBIT: Play mini-games. Win & trade NFTs!
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            Battle in games like "Rock-Paper-Scissors" to win digital collectibles.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-highlighted">
            How to Play:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-highlighted mr-2">•</span>
              <span className="text-gray-200">
                <strong className="text-gray-200 ">Stake to enter game</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-highlighted mr-2">•</span>
              <span className="text-gray-200">
                <strong className="text-gray-200 ">Win NFTs & reclaim stakes</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-highlighted mr-2">•</span>
              <span className="text-gray-200">
                <strong className="text-gray-200 ">Put your NFTs back in play ( set your own price )</strong>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-highlighted mr-2">•</span>
              <span className="text-gray-200">
                <strong className="text-gray-200 ">Fair gameplay backed by blockchain</strong>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <p className='text-yellow-400 text-xl font-semibold'>
            Ready? Jump in and start winning, trading, or both!
          </p>
          {!authenticated && (
            <Button onClick={() => login()}>
              Connect
            </Button>
          )}
        </div>

        {authenticated && user && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => logout()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
