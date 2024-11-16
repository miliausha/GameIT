'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface NFTCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, imageUrl, name, price }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardBaseClasses = "absolute w-full h-full backface-hidden rounded-lg shadow-xl p-4 text-center";
  
  return (
    <div 
      className="w-64 h-64 perspective-1000 cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative w-full h-full 
        transition-all duration-500 transform-style-3d 
        ${isFlipped ? 'rotate-y-180' : ''}
        hover:shadow-2xl
      `}>
        {/* Front of the card */}
        <div className={`
          ${cardBaseClasses}
          bg-gradient-to-tr from-[var(--nft-card-primary)] to-[var(--nft-card-secondary)]
          before:content-[''] before:absolute before:inset-0
          before:bg-gradient-to-tr before:from-white/80 before:to-transparent
          before:rounded-lg before:transition-transform before:duration-300 before:ease-in-out
          before:translate-x-[-100%]
          hover:before:translate-x-[100%]
          border border-transparent hover:border-2 hover:border-white hover:border-opacity-80
          transition-colors duration-300 ease-in-out
          overflow-hidden
        `}>
          <div>
            <div className="relative w-full h-48 mb-4">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className={`
                  object-cover rounded-lg 
                  transition-transform duration-300
                  ${isHovered ? 'scale-105' : ''}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            </div>
            <div className="relative">
              <p className="text-white text-xl font-bold mb-2">{price} ETH</p>  
              <div className="flex items-center justify-center space-x-2">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div className={`
          ${cardBaseClasses}
          bg-[var(--nft-card-back)]
          rotate-y-180
        `}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Purchase NFT</h3>
              <p className="text-white/80">Price: {price} ETH</p>
            </div>
            
            <button 
              className="
                w-full bg-white text-purple-600 py-3 px-4 
                rounded-lg font-bold
                transition-all duration-300 
                transform hover:-translate-y-1 
                hover:shadow-lg hover:shadow-white/20
                active:scale-95
                group
              "
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Purchasing NFT ${id}`);
              }}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">Buy Now</span>
                <span className="inline-block transition-transform group-hover:animate-bounce">
                  ↗
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard; 