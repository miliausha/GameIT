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
    <div className="mx-auto px-4 py-8">
      <div className="w-full h-[768px]">
        <GameComponent />
      </div>
    </div>
  );
}
