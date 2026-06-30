import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LetterSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.innerText.split('');
    textRef.current.innerText = '';
    
    letters.forEach(letter => {
      const span = document.createElement('span');
      span.innerText = letter;
      span.style.opacity = 0;
      textRef.current.appendChild(span);
    });

    gsap.to(textRef.current.children, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
      opacity: 1,
      stagger: 0.05,
      duration: 0.1,
      ease: "none"
    });
  }, []);

  return (
    <section className="py-32 bg-luxury-dark relative overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="glass-card max-w-3xl mx-4 p-8 md:p-16 relative z-10">
        <div className="absolute -top-6 -left-6 text-6xl text-luxury-gold/20 font-serif">"</div>
        
        <p ref={textRef} className="text-lg md:text-2xl font-serif leading-relaxed text-white/90 mb-12 whitespace-pre-line">
          {`Dear Badi Didi,

          Sometimes I wonder how I got so lucky to have you as my elder sister. You've always been my protector, my confidante, and my biggest cheerleader. 

          Even when I annoy you, you never stop caring. Thank you for all the sacrifices you've made for me, and for always being the pillar of our family.

          May this birthday bring you as much happiness as you bring to everyone around you.

          I love you more than words can say.`}
        </p>

        <div className="text-right">
          <p className="text-xl md:text-3xl font-display text-luxury-gold text-glow">Your Little Brother</p>
          <p className="text-2xl md:text-4xl font-serif text-white mt-2">Jai ❤️</p>
        </div>
        
        <div className="absolute -bottom-10 -right-6 text-6xl text-luxury-gold/20 font-serif">"</div>
      </div>
    </section>
  );
};

export default LetterSection;
