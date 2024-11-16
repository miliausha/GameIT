'use client';
import UserTokens from '@/components/UserTokens';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { redirect } from 'next/navigation';

export default function MainPage() {

    const { authenticated, ready } = usePrivy();
    const { wallets } = useWallets();

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
        authenticated && wallets.length > 0 &&  <UserTokens accountAddress={wallets[0].address} />
    );
}