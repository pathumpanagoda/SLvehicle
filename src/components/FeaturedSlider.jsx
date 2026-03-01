import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedSlider = ({ ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-play
  useEffect(() => {
    if (!ads || ads.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % ads.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', width: '100%', paddingTop: '45%', cursor: 'pointer' }}
          onClick={() => navigate(ads[currentIndex].link || '/')}
        >
          <img 
            src={ads[currentIndex].image} 
            alt={ads[currentIndex].title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '40px 30px 20px' }}>
            <div className="badge badge-blue" style={{ marginBottom: '8px', display: 'inline-flex', backdropFilter: 'blur(10px)', background: 'rgba(59,130,246,0.3)', border: '1px solid rgba(59,130,246,0.5)', color: 'white' }}>
              {ads[currentIndex].badge || 'Sponsored'}
            </div>
            <h3 style={{ color: 'white', margin: 0, fontSize: '28px', fontWeight: '800', fontFamily: 'Outfit' }}>
              {ads[currentIndex].title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '16px', fontWeight: '500' }}>
              {ads[currentIndex].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}>
        <ChevronLeft size={24} />
      </button>
      
      <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}>
        <ChevronRight size={24} />
      </button>
      
      {/* Pagination Indicators */}
      <div style={{ position: 'absolute', bottom: '20px', right: '24px', display: 'flex', gap: '6px' }}>
        {ads.map((_, i) => (
          <div key={i} style={{ width: i === currentIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === currentIndex ? 'var(--accent-blue)' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;
