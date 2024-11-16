import NFTCard from '@/components/NFTCard';

// Mock data - replace with your actual NFT data
const nfts = [
  { id: 1, imageUrl: '/nft1.svg', name: 'Cool NFT #1', price: 0.1 },
  { id: 2, imageUrl: '/nft2.svg', name: 'Cool NFT #2', price: 0.2 },
  { id: 3, imageUrl: '/nft3.svg', name: 'Cool NFT #3', price: 0.15 },
  { id: 4, imageUrl: '/nft4.svg', name: 'Cool NFT #3', price: 0.33 },
  // Add more NFTs as needed
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-7xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12">GAMEBIT</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              imageUrl={nft.imageUrl}
              name={nft.name}
              price={nft.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
