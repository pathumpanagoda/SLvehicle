import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, X, Plus, Star, CheckCircle, XCircle } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { cars } from '../data/cars';

const getValue = (car, key) => {
  switch(key) {
    case 'price': return `$${car.price.estimated.toLocaleString()}`;
    case 'engine': return car.specs.engine;
    case 'horsepower': return car.specs.horsepower;
    case 'torque': return car.specs.torque;
    case 'acceleration': return car.specs.acceleration;
    case 'topSpeed': return car.specs.topSpeed;
    case 'mpg': return car.fuelType === 'Electric' ? car.specs.fuelEconomy.range || 'N/A' : `${car.specs.fuelEconomy.combined} mpg`;
    case 'transmission': return car.specs.transmission;
    case 'drivetrain': return car.specs.drivetrain;
    case 'length': return car.specs.dimensions.length;
    case 'weight': return car.specs.weight;
    case 'cargo': return car.specs.cargo;
    case 'safety': return `${car.safetyRating}/5 ⭐`;
    case 'reliability': return `${car.reliabilityRating}/5 ⭐`;
    case 'fuelType': return car.fuelType;
    default: return '—';
  }
};

const rows = [
  { label: 'Est. Price', key: 'price' },
  { label: 'Engine', key: 'engine' },
  { label: 'Horsepower', key: 'horsepower' },
  { label: 'Torque', key: 'torque' },
  { label: '0-60 mph', key: 'acceleration' },
  { label: 'Top Speed', key: 'topSpeed' },
  { label: 'Fuel Economy / Range', key: 'mpg' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Drivetrain', key: 'drivetrain' },
  { label: 'Fuel Type', key: 'fuelType' },
  { label: 'Length', key: 'length' },
  { label: 'Curb Weight', key: 'weight' },
  { label: 'Cargo', key: 'cargo' },
  { label: 'Safety Rating', key: 'safety' },
  { label: 'Reliability', key: 'reliability' },
];

const EMPTY_SLOT_COUNT = 3;

const ComparisonPage = () => {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const emptySlots = EMPTY_SLOT_COUNT - compareList.length;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36 }}>
              Vehicle <span className="gradient-text">Comparison</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>Compare up to 3 vehicles side by side</p>
          </div>
          {compareList.length > 0 && (
            <button onClick={clearCompare} className="btn btn-secondary" style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,68,68,0.3)' }}>
              <X size={15} /> Clear All
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          /* Empty state */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}>
            <BarChart3 size={64} color="var(--text-muted)" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: 12 }}>No Cars to Compare</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>Browse cars and click the compare icon to add them here.</p>
            <Link to="/" className="btn btn-primary btn-lg">Browse Cars</Link>
          </motion.div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              {/* Car headers */}
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '12px 0 0 12px', width: 160, fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                    Specification
                  </th>
                  {compareList.map(car => (
                    <th key={car.id} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', textAlign: 'center', verticalAlign: 'top' }}>
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ position: 'relative', marginBottom: 10 }}>
                          <img src={car.image} alt={car.model} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, maxWidth: 220 }} />
                          <button onClick={() => removeFromCompare(car.id)}
                            style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 6, background: 'rgba(239,68,68,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={12} color="white" />
                          </button>
                        </div>
                        <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15 }}>{car.make} {car.model}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{car.year}</div>
                        <Link to={`/cars/${car.id}`} style={{ fontSize: 12, color: 'var(--accent-blue-light)' }}>View Details →</Link>
                      </motion.div>
                    </th>
                  ))}
                  {/* Empty slots */}
                  {Array.from({ length: emptySlots }).map((_, i) => (
                    <th key={`empty-${i}`} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                      <button onClick={() => navigate('/')}
                        style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: '40px 20px', width: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--text-muted)', background: 'transparent', minWidth: 150 }}>
                        <Plus size={24} />
                        <span style={{ fontSize: 13 }}>Add Car</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.key} style={{ background: ri % 2 === 0 ? 'var(--bg-card)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                      {row.label}
                    </td>
                    {compareList.map(car => (
                      <td key={car.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 14, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                        {getValue(car, row.key)}
                      </td>
                    ))}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <td key={`empty-${i}`} style={{ borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }} />
                    ))}
                  </tr>
                ))}
                {/* Pros/Cons rows */}
                <tr style={{ background: 'var(--bg-card)' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: 'var(--accent-green)', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>✓ Pros</td>
                  {compareList.map(car => (
                    <td key={car.id} style={{ padding: '14px 16px', verticalAlign: 'top', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                      {car.pros.slice(0, 2).map(p => (
                        <div key={p} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 6 }}>
                          <CheckCircle size={12} color="var(--accent-green)" style={{ marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                  {Array.from({ length: emptySlots }).map((_, i) => <td key={i} style={{ borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }} />)}
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: 'var(--accent-red)', borderBottom: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>✗ Cons</td>
                  {compareList.map(car => (
                    <td key={car.id} style={{ padding: '14px 16px', verticalAlign: 'top', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                      {car.cons.slice(0, 2).map(c => (
                        <div key={c} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 6 }}>
                          <XCircle size={12} color="var(--accent-red)" style={{ marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                  {Array.from({ length: emptySlots }).map((_, i) => <td key={i} style={{ borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }} />)}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Add Cars from Catalog */}
        {compareList.length > 0 && compareList.length < 3 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, marginBottom: 20 }}>
              Add another car to compare
            </h2>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {cars.filter(c => !compareList.some(cl => cl.id === c.id)).slice(0, 5).map(car => (
                <button key={car.id} onClick={() => addToCompare(car)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', color: 'var(--text-primary)' }}>
                  <img src={car.image} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{car.make} {car.model}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{car.year}</div>
                  </div>
                  <Plus size={14} color="var(--accent-blue-light)" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
