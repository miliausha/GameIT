'use client';

import dynamic from 'next/dynamic';
import { usePrivy } from '@privy-io/react-auth';
import { redirect, useRouter } from 'next/navigation';

// Dynamically import the GameComponent with SSR disabled
const GameComponent = dynamic(() => import('../../../components/GameComponent'), {
  ssr: false,
});

export default function GamePage() {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    redirect('/');
  }

  return (
<<<<<<< HEAD
    <div className="mx-auto px-4 py-8">
      <div className="w-full h-[768px]">
        <GameComponent />
=======
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center gap-6 mb-8">
        <button 
          onClick={() => router.push('/game/rock-paper-scissors')} 
          className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 text-white shadow-lg"
        >
          Rock Paper Scissors
        </button>
        <button
          onClick={() => {}}
          className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500/10 to-slate-500/10 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:from-gray-500/20 hover:to-slate-500/20 transition-all duration-300 text-white/50 shadow-lg"
        >
          Tic Tac Toe
        </button>
        <button
          onClick={() => {}}
          className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500/10 to-slate-500/10 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:from-gray-500/20 hover:to-slate-500/20 transition-all duration-300 text-white/50 shadow-lg"
        >
          Battleship
        </button>
>>>>>>> origin/main
      </div>
    </div>
  );
}
