import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { year: "The Early Days", title: "Childhood ❤️", desc: "Playing together, fighting for toys, but always ending up smiling." },
  { year: "Teenage", title: "Crazy Selfies 😂", desc: "The era of weird filters, pouts, and capturing every silly moment." },
  { year: "Celebrations", title: "Birthday Moments 🎂", desc: "Cake smashed on faces and unforgettable surprise parties." },
  { year: "Adventures", title: "Travel Memories ✈️", desc: "Exploring new places and getting lost together." },
  { year: "Forever", title: "Always Together ❤️", desc: "No matter where life takes us, we are always just a call away." },
];

const MemoryTimeline = () => {
  return (
    <section className="py-24 bg-luxury-dark relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-display text-center text-luxury-gold mb-20 text-glow">
          Journey So Far
        </h2>

        <div className="relative border-l border-white/20 ml-4 md:ml-1/2 space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-luxury-gold left-[-8.5px] top-1.5 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              
              <div className="md:ml-12 glass-card p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300">
                <span className="text-luxury-gold text-sm tracking-widest uppercase font-bold mb-2 block">{event.year}</span>
                <h3 className="text-2xl font-serif text-white mb-3">{event.title}</h3>
                <p className="text-white/70 font-sans">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryTimeline;
