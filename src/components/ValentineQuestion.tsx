import { useState } from 'react';
import { motion } from 'framer-motion';

export function ValentineQuestion() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = () => {
    // Generate random position within a reasonable range
    // We want it to stay somewhat visible but jump away
    const x = (Math.random() - 0.5) * 300; 
    const y = (Math.random() - 0.5) * 300;
    setNoBtnPosition({ x, y });
  };

  if (accepted) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-2xl shadow-2xl text-center max-w-lg"
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600 mb-6">
          JESTEŚ NAJLEPSZA! 💖
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Wiedziałem, że się zgodzisz! Kocham Cię najmocniej na świecie!
        </p>
        <div className="flex gap-4 text-6xl">
          😻 💘 👩‍❤️‍💋‍👨
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm max-w-md w-full text-center relative">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">
        Czy będziesz moją Walentynką? 🌹
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full min-h-[150px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg text-xl hover:bg-green-600 transition-colors z-10"
          onClick={() => setAccepted(true)}
        >
          TAK! 😍
        </motion.button>

        <motion.button
          animate={noBtnPosition}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg text-xl hover:bg-red-600 transition-colors cursor-pointer"
        >
          NIE 😢
        </motion.button>
      </div>
    </div>
  );
}
