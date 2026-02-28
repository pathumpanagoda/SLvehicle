import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 150, background: 'var(--bg-secondary)',
            border: '1px solid var(--border-strong)',
            borderRadius: 16, padding: '12px 20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.2)',
            display: 'flex', alignItems: 'center', gap: 16,
            backdropFilter: 'blur(20px)',
            maxWidth: '90vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-blue-light)', fontWeight: 600, fontSize: 14 }}>
            <BarChart3 size={18} />
            <span>Compare ({compareList.length}/3)</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {compareList.map(car => (
              <div key={car.id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--bg-card)', borderRadius: 8,
                padding: '4px 10px', border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{car.make} {car.model.split(' ')[0]}</span>
                <button onClick={() => removeFromCompare(car.id)} style={{ color: 'var(--text-muted)', display: 'flex', cursor: 'pointer', background: 'none' }}>
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={clearCompare} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
              <Trash2 size={13} /> Clear
            </button>
            {compareList.length >= 2 && (
              <Link to="/compare" className="btn btn-primary btn-sm">
                Compare <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
