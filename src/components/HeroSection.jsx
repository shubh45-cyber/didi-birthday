import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Aurora / Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1a2340]/50 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div style={{ y: y1, opacity }}>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4 }} // Wait for loading screen
            className="text-2xl md:text-4xl font-serif text-luxury-gold-light mb-6 tracking-widest uppercase"
          >
            Happy Birthday
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 4.5, type: "spring" }}
            className="text-7xl md:text-[150px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-none mb-8 text-glow"
          >
            Badi Didi <span className="text-luxury-gold inline-block animate-bounce">❤️</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 5.5 }}
            className="glass-card p-6 md:p-8 inline-block mt-8 hover:scale-105 transition-transform duration-500"
          >
            <p className="text-lg md:text-xl font-sans text-white/80 max-w-xl mx-auto">
              A celebration of the most amazing sister in the world. Dive into a universe crafted just for you.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
        style={{ opacity }}
      >
        <span className="text-white/50 text-sm tracking-widest uppercase mb-2 font-sans">Scroll Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
