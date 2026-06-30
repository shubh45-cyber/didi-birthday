import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const SurpriseButton = ({ setCelebrationMode }) => {
  const handleClick = () => {
    setCelebrationMode(true);
    
    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#ffffff', '#ff4b4b']
    });

    // Scroll to top to see everything fall
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-4 rounded-full overflow-hidden group border border-luxury-gold/50 bg-luxury-gold/10 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-shadow duration-300"
    >
      <span className="relative z-10 flex items-center gap-3 text-white font-display text-xl md:text-2xl tracking-wide">
        <span className="text-2xl">🎁</span> Open My Surprise
      </span>
      
      {/* Button hover effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.button>
  );
};

export default SurpriseButton;
