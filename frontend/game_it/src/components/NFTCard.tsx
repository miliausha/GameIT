'use client';

import { useState } from 'react';
import Image from 'next/image';

interface NFTCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function NFTCard({ id, imageUrl, name, price }: NFTCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-64 h-64 perspective-1000 cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} hover:shadow-2xl`}>
        {/* Front of the card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-lg shadow-xl p-4 text-center transition-all duration-300 hover:shadow-glow"
          style={{
            background: `linear-gradient(to bottom right, var(--nft-card-primary), var(--nft-card-secondary))`
          }}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          {/* <h3 className="mt-4 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {name}
          </h3> */}
          <p className="text-white">{price} ETH</p>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-xl p-4 rotate-y-180 text-center transition-all duration-300 hover:shadow-glow">
          <h3 className="text-xl font-bold mb-4">Purchase NFT</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Price: {price} ETH</p>
            <button 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                // Add purchase logic here
                console.log(`Purchasing NFT ${id}`);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 