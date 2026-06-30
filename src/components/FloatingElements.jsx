import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

const FloatingElements = ({ celebrationMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const audioRef = useRef(null);

  // Initialize balloons
  useEffect(() => {
    const initialBalloons = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      color: ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 5)]
    }));
    setBalloons(initialBalloons);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Create audio element lazily (Assuming music is at /music/bgm.mp3)
      audioRef.current = new Audio('/music/bgm.mp3');
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Catch potential play errors (browser autoplay policy)
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const popBalloon = (id) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    // Could add confetti here for balloon pop
  };

  return (
    <>
      {/* Background Music Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-luxury-gold shadow-lg"
      >
        {isPlaying ? <FaPause /> : <FaMusic />}
        
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.div 
              className="absolute inset-0 rounded-full border border-luxury-gold"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border border-luxury-gold"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
            />
          </>
        )}
      </motion.button>

      {/* Galaxy Background for Celebration Mode */}
      <AnimatePresence>
        {celebrationMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, #1a0b2e 0%, #000000 100%)'
            }}
          >
            {/* Stars */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 'px',
                  height: Math.random() * 3 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random(),
                  animation: `pulse-glow ${Math.random() * 3 + 2}s infinite`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Balloons */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {balloons.map(balloon => (
            <motion.div
              key={balloon.id}
              className="absolute bottom-0 pointer-events-auto cursor-pointer"
              style={{ left: `${balloon.x}%` }}
              initial={{ y: '100vh', x: 0 }}
              animate={{ 
                y: '-120vh', 
                x: [0, 30, -30, 0],
              }}
              transition={{ 
                y: { duration: balloon.duration, repeat: Infinity, ease: 'linear', delay: balloon.delay },
                x: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              onClick={() => popBalloon(balloon.id)}
            >
              {/* Balloon shape */}
              <div className={`w-12 h-16 rounded-[50%] ${balloon.color} relative shadow-inner opacity-80 backdrop-blur-sm`}>
                <div className="absolute top-2 left-2 w-3 h-5 bg-white/30 rounded-full rotate-[-45deg]" />
                {/* String */}
                <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-white/30 -translate-x-1/2" />
                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white/20 -translate-x-1/2 rounded-full" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingElements;
