import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const CakeSection = ({ setCelebrationMode }) => {
  const [clicks, setClicks] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleCakeClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    // Minor confetti on each click
    confetti({
      particleCount: 20,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (newClicks === 5) {
      triggerEasterEgg();
    }
  };

  const triggerEasterEgg = () => {
    setCelebrationMode(true);
    
    // Massive Fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <section className="py-32 bg-luxury-black relative flex flex-col items-center justify-center">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Make a Wish</h2>
        <p className="text-white/60 font-sans">Blow the candles and claim your slice!</p>
      </div>

      <div 
        className="relative cursor-pointer group"
        onClick={handleCakeClick}
      >
        {/* Placeholder for a CSS/Canvas 3D Cake */}
        <div className="w-64 h-48 md:w-80 md:h-64 relative z-10 transition-transform duration-300 group-hover:scale-105">
          {/* Cake Layers */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-r from-pink-900 to-pink-800 rounded-xl shadow-2xl border-t border-white/20"></div>
          <div className="absolute bottom-1/4 left-[5%] w-[90%] h-1/2 bg-gradient-to-r from-luxury-gold to-yellow-600 rounded-xl shadow-2xl border-t border-white/40"></div>
          <div className="absolute bottom-1/2 left-[10%] w-[80%] h-1/2 bg-gradient-to-r from-white to-gray-200 rounded-xl shadow-xl flex items-end justify-center pb-2">
            
            {/* Candles */}
            {!candlesBlown ? (
              <div 
                className="flex gap-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setCandlesBlown(true);
                  confetti({ particleCount: 100, spread: 100 });
                }}
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-3 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm relative">
                    <motion.div 
                      className="absolute -top-6 -left-1 w-5 h-8 bg-orange-400 rounded-full blur-[2px]"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                    <motion.div 
                      className="absolute -top-5 left-0 w-3 h-5 bg-yellow-300 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-luxury-dark font-display text-xl px-4 text-center">
                Yay! <br/>Happy Birthday!
              </div>
            )}
          </div>
        </div>

        {/* Easter egg helper hint */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Click the cake... {clicks > 0 ? `(${clicks}/5)` : ''}
        </div>
      </div>
    </section>
  );
};

export default CakeSection;
