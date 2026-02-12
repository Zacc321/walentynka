import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingLoveProps {
  onComplete: () => void;
}

export function LoadingLove({ onComplete }: LoadingLoveProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 5 + 1; 
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 800); // Slight delay after 100%
    }
  }, [progress, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm max-w-md w-full text-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-6xl mb-6"
      >
        ❤️
      </motion.div>
      
      <h2 className="text-2xl font-bold text-pink-600 mb-2">
        Ładowanie miłości...
      </h2>
      
      <div className="w-full bg-pink-100 rounded-full h-6 mb-4 overflow-hidden relative border border-pink-200">
        <motion.div 
          className="bg-gradient-to-r from-pink-400 to-red-500 h-full rounded-full flex items-center justify-end pr-2"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        >
          <span className="text-xs text-white font-bold">{Math.floor(progress)}%</span>
        </motion.div>
      </div>

      <p className="text-gray-600 italic">
        {progress < 30 && "Analizowanie uczuć..."}
        {progress >= 30 && progress < 70 && "Zbieranie wspólnych wspomnień..."}
        {progress >= 70 && progress < 100 && "Przygotowywanie serduszka..."}
        {progress === 100 && "Kocham Cię w 100%!"}
      </p>
    </div>
  );
}
