import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AntiGravitySection from './components/AntiGravitySection';
import MemoryGallery from './components/MemoryGallery';
import MemoryTimeline from './components/MemoryTimeline';
import WishesSection from './components/WishesSection';
import LetterSection from './components/LetterSection';
import CakeSection from './components/CakeSection';
import FloatingElements from './components/FloatingElements';
import SurpriseButton from './components/SurpriseButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [celebrationMode, setCelebrationMode] = useState(false);

  useEffect(() => {
    // Cinematic loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root>
      <div className={`relative min-h-screen bg-luxury-black text-white ${celebrationMode ? 'overflow-hidden' : ''}`}>
        {isLoading && <LoadingScreen />}
        
        {!isLoading && (
          <div className="relative z-10 w-full overflow-hidden">
            <FloatingElements celebrationMode={celebrationMode} />
            <HeroSection />
            <AntiGravitySection celebrationMode={celebrationMode} />
            <MemoryGallery />
            <MemoryTimeline />
            <WishesSection />
            <LetterSection />
            <CakeSection setCelebrationMode={setCelebrationMode} />
            <div className="pb-32 flex justify-center w-full">
              <SurpriseButton setCelebrationMode={setCelebrationMode} />
            </div>

            {/* Footer / Ending */}
            <footer className="py-24 text-center px-4 relative z-10 bg-luxury-black">
              <div className="max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6">
                <h3 className="text-3xl md:text-5xl font-display text-luxury-gold text-glow">
                  "No matter how old we become...<br />
                  You'll always be my Badi Didi.<br />
                  Happy Birthday ❤️"
                </h3>
                <div className="mt-12 text-xl md:text-2xl font-serif italic text-white/80">
                  — Your Little Brother Jai
                </div>
              </div>
            </footer>
          </div>
        )}
      </div>
    </ReactLenis>
  );
}

export default App;
