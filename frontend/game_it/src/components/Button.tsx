// TODO: Implement the StartGameButton component
'use client';

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: string;

}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="
        px-6 py-2 
        bg-gradient-to-tr from-[var(--nft-card-primary)] to-[var(--nft-card-secondary)]
        text-[var(--text-secondary)]
        rounded-3xl font-bold text-lg
        transition-all duration-300
        transform
				hover:scale-105
        hover:shadow-lg hover:shadow-[var(--text-highlighted)]/20
        group
      "
      onClick={onClick}
    >
      <span className="flex items-center justify-center">
        <span className="mr-2">{children}</span>
      </span>
    </button>
  );
};

export default Button;
