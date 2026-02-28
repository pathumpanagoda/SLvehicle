import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BarChart3, Star, Fuel, Zap, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

const fuelIcon = (type) => {
  if (type === 'Electric') return <Zap size={13} />;
  return <Fuel size={13} />;
};

const CarCard = ({ car }) => {
  const { isCarSaved, toggleSaveCar, currentUser } = useAuth();
  const { addToCompare, isInCompare } = useCompare();
  const [toast, setToast] = useState('');
  const saved = isCarSaved(car.id);
  const inCompare = isInCompare(car.id);

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentUser) { setToast('Sign in to save cars'); setTimeout(() => setToast(''), 2000); return; }
    toggleSaveCar(car.id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    const result = addToCompare(car);
    if (result?.error) { setToast(result.error); setTimeout(() => setToast(''), 2000); }
    else { setToast('Added to comparison!'); setTimeout(() => setToast(''), 2000); }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      {toast && (
        <div style={{
          position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
          padding: '4px 12px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap',
          color: 'var(--text-secondary)', zIndex: 10,
        }}>{toast}</div>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
          <img
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Overlays */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            {car.trending && <span className="badge badge-orange">🔥 Trending</span>}
            {car.featured && <span className="badge badge-blue">Featured</span>}
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
            <button
              onClick={handleSave}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Heart size={16} fill={saved ? 'var(--accent-red)' : 'none'} color={saved ? 'var(--accent-red)' : 'white'} />
            </button>
            <button
              onClick={handleCompare}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: inCompare ? 'rgba(139,92,246,0.7)' : 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <BarChart3 size={16} color="white" />
            </button>
          </div>
          {/* Fuel type chip */}
          <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <span className={`badge badge-${car.fuelType === 'Electric' ? 'green' : car.fuelType === 'Hybrid' ? 'cyan' : 'blue'}`}
              style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.5)' }}>
              {fuelIcon(car.fuelType)} {car.fuelType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{car.year} • {car.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={13} fill="var(--accent-orange)" color="var(--accent-orange)" />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{car.reliabilityRating}</span>
              </div>
            </div>
            <h3 style={{ fontSize: 17, fontFamily: 'Outfit', fontWeight: 700, marginBottom: 2 }}>
              {car.make} {car.model}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{car.specs.engine}</p>
          </div>

          {/* Specs strip */}
          <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 12 }}>
            {[
              { label: 'HP', value: car.specs.horsepower.replace(' hp', '') },
              { label: car.fuelType === 'Electric' ? 'Range' : 'MPG', value: car.fuelType === 'Electric' ? car.specs.fuelEconomy.range?.split(' ')[0] : car.specs.fuelEconomy.combined },
              { label: '0-60', value: car.specs.acceleration.split(' ')[0] + 's' },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Est. price</span>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-blue-light)' }}>
                ${car.price.estimated.toLocaleString()}
              </div>
            </div>
            <Link to={`/cars/${car.id}`} className="btn btn-primary btn-sm">View Details</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
