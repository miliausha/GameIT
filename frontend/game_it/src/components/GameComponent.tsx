import { useEffect, useRef } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';

interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

const GameComponent = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !gameRef.current) {
      try {
        console.log('Initializing game...');
        gameRef.current = StartGame("game-container");

        // Add event listener for scene changes
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
          console.log('Scene ready:', scene.scene.key);
        });

      } catch (error) {
        console.error('Error initializing game:', error);
      }
    }

    return () => {
      if (gameRef.current) {
        console.log('Cleaning up game...');
        EventBus.removeAllListeners();
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div 
        id="game-container" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default GameComponent;
