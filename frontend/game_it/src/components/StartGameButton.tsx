// TODO: Implement the StartGameButton component
'use client';

import React from 'react';

interface StartGameButtonProps {
  onClick?: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ onClick }) => {
  return (
    <button
      className="
        px-24 py-4 
        bg-gradient-to-tr from-[var(--nft-card-primary)] to-[var(--nft-card-secondary)]
        text-[var(--text-secondary)]
        rounded-lg font-bold text-lg
        transition-all duration-300
        transform
				hover:scale-105
        hover:shadow-lg hover:shadow-[var(--text-highlighted)]/20
        group
      "
      onClick={onClick}
    >
      <span className="flex items-center justify-center">
        <span className="mr-2">Start Game</span>
        {/* <span className="inline-block transition-transform group-hover:animate-bounce">
          ▶
        </span> */}
      </span>
    </button>
  );
};

export default StartGameButton;
