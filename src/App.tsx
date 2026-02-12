import { useState } from 'react';
import { CaptchaPuzzle } from './components/CaptchaPuzzle';
import { LoadingLove } from './components/LoadingLove';
import { ValentineQuestion } from './components/ValentineQuestion';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'puzzle' | 'loading' | 'question';

export function App() {
  const [step, setStep] = useState<Step>('puzzle');

  return (
    <div className="min-h-screen w-full bg-pink-300 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-6xl text-pink-600 animate-pulse">❤️</div>
        <div className="absolute bottom-20 right-20 text-8xl text-pink-600 animate-bounce">💖</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-white">💕</div>
        <div className="absolute top-20 right-1/4 text-5xl text-white">💞</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'puzzle' && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full flex justify-center"
          >
            <CaptchaPuzzle onSolve={() => setStep('loading')} />
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full flex justify-center"
          >
            <LoadingLove onComplete={() => setStep('question')} />
          </motion.div>
        )}

        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="z-10 w-full flex justify-center"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg text-center font-serif"
              >
                KOCHAM CIĘ!
              </motion.h1>
              <ValentineQuestion />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
