import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const MemoryGallery = () => {
  // Place your photos in the public/images folder and name them 1.jpg, 2.jpg, etc.
  const images = [
    { id: 1, src: '/images/1.jpg', caption: 'Childhood' },
    { id: 2, src: '/images/2.jpg', caption: 'Selfies' },
    { id: 3, src: '/images/3.jpg', caption: 'Travels' },
    { id: 4, src: '/images/4.jpg', caption: 'Birthdays' },
    { id: 5, src: '/images/5.jpg', caption: 'Laughs' },
  ];

  return (
    <section className="py-32 bg-luxury-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-4">Our Beautiful Memories</h2>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <div className="w-full md:w-1/2 max-w-sm">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="w-full h-[400px]"
            >
              {images.map((img) => (
                <SwiperSlide key={img.id} className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <div className={`w-full h-full flex items-end justify-center relative`}>
                    <img src={img.src} alt={img.caption} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600?text=Photo+Missing' }} />
                    <div className="relative z-10 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                      <p className="text-white text-2xl font-serif drop-shadow-md">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-display text-luxury-gold-light mb-6">A Lifetime of Joy</h3>
            <p className="text-white/80 font-sans text-lg mb-6 leading-relaxed">
              Every picture tells a story of our laughter, our fights over silly things, and our unbreakable bond. 
              You are not just my elder sister; you are my first friend and my forever guide.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl text-luxury-gold mb-2 font-display">1000+</div>
                <div className="text-sm uppercase tracking-widest text-white/50">Memories</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl text-luxury-gold mb-2 font-display">∞</div>
                <div className="text-sm uppercase tracking-widest text-white/50">Love</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;
