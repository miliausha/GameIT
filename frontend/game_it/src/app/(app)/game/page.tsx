'use client';

import dynamic from 'next/dynamic';
import { usePrivy } from '@privy-io/react-auth';
import { redirect } from 'next/navigation';

// Dynamically import the GameComponent with SSR disabled
const GameComponent = dynamic(() => import('../../../components/GameComponent'), {
  ssr: false,
});

export default function GamePage() {
  const { authenticated, ready } = usePrivy();

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-yellow-300 mb-6 flex justify-center items-center">
        {/* Rock Paper Scissors Game */}
      </h1>
      <div className="w-full h-[768px]">
        <GameComponent />
      </div>
    </div>
  );
}
