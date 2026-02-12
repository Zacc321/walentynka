import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CaptchaPuzzleProps {
  onSolve: () => void;
}

const GRID_SIZE = 3;
// Placeholder image - replace this URL with your photo!
// Advice: Use a square image for best results.
const IMAGE_URL = "https://i.postimg.cc/Hxb2Wc1F/OLA.png";

export function CaptchaPuzzle({ onSolve }: CaptchaPuzzleProps) {
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create array [0, 1, ... 8]
    const initialTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    
    // Shuffle
    let shuffled = [...initialTiles];
    do {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    } while (isSolvedCheck(shuffled)); // Ensure it's not already solved

    setTiles(shuffled);
  };

  const isSolvedCheck = (currentTiles: number[]) => {
    for (let i = 0; i < currentTiles.length; i++) {
      if (currentTiles[i] !== i) return false;
    }
    return true;
  };

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else {
      // Swap
      const newTiles = [...tiles];
      const temp = newTiles[index];
      newTiles[index] = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = temp;

      setTiles(newTiles);
      setSelectedTileIndex(null);

      if (isSolvedCheck(newTiles)) {
        setIsSolved(true);
        setTimeout(onSolve, 1000); // Wait a bit before proceeding
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm max-w-md w-full">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        Potwierdź, że to Ty! ❤️
      </h2>
      <p className="text-gray-600 mb-4 text-center text-sm">
        Kliknij dwa kawałki, aby je zamienić miejscami i ułożyć nasze zdjęcie.
      </p>

      <div 
        className="grid gap-1 bg-pink-200 p-1 rounded-lg overflow-hidden relative"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '300px',
          height: '300px'
        }}
      >
        {tiles.map((tileNumber, index) => {
          // Calculate original position for background
          const row = Math.floor(tileNumber / GRID_SIZE);
          const col = tileNumber % GRID_SIZE;
          
          const bgX = (col * 100) / (GRID_SIZE - 1);
          const bgY = (row * 100) / (GRID_SIZE - 1);

          return (
            <motion.div
              key={index}
              layout
              onClick={() => handleTileClick(index)}
              className={`
                relative cursor-pointer overflow-hidden rounded-sm
                ${selectedTileIndex === index ? 'ring-4 ring-pink-500 z-10' : ''}
                ${isSolved ? 'ring-0' : ''}
              `}
              style={{
                backgroundImage: `url(${IMAGE_URL})`,
                backgroundSize: `${GRID_SIZE * 100}%`,
                backgroundPosition: `${bgX}% ${bgY}%`,
                height: '100%',
              }}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            />
          );
        })}
        
        {isSolved && (
          <div className="absolute inset-0 flex items-center justify-center bg-pink-500/50 z-20">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-4xl font-bold drop-shadow-lg"
            >
              Sukces! 🎉
            </motion.div>
          </div>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        (Wskazówka: aby zmienić zdjęcie, podmień URL w kodzie)
      </div>
    </div>
  );
}
