import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaSmile, FaPrayingHands, FaMagic } from 'react-icons/fa';

const wishes = [
  { icon: <FaHeart className="text-4xl text-red-500" />, title: "Stay Happy Forever", desc: "May your life be filled with endless joy and laughter." },
  { icon: <FaSmile className="text-4xl text-yellow-400" />, title: "Stay Healthy", desc: "Wishing you a lifetime of good health and vitality." },
  { icon: <FaMagic className="text-4xl text-purple-400" />, title: "Dreams Come True", desc: "May all your beautiful dreams turn into reality." },
  { icon: <FaStar className="text-4xl text-luxury-gold" />, title: "Always Keep Smiling", desc: "Your smile brightens up my world every single day." },
  { icon: <FaPrayingHands className="text-4xl text-blue-400" />, title: "God Bless You", desc: "May God's choicest blessings be with you forever." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const WishesSection = () => {
  return (
    <section className="py-24 bg-luxury-black relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-display text-center text-white mb-16">My 5 Wishes for You</h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {wishes.map((wish, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`glass-card p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 ${index === 3 ? 'lg:col-start-2 lg:-ml-1/2' : ''} ${index === 4 ? 'lg:col-start-3 lg:-ml-full' : ''}`}
              style={{
                gridColumn: index === 3 ? '1 / -1' : 'auto' // Hacky way to center the last row, adjust with flex if needed
              }}
            >
              <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 shadow-inner">
                {wish.icon}
              </div>
              <h3 className="text-2xl font-serif text-luxury-gold-light mb-3">{wish.title}</h3>
              <p className="text-white/70 font-sans">{wish.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WishesSection;
