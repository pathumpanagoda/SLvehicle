import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BarChart3, ExternalLink, Star, ChevronLeft, ChevronRight, CheckCircle, XCircle, Fuel, Gauge, Zap, Shield } from 'lucide-react';
import { cars } from '../data/cars';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import YouTubeEmbed from '../components/YouTubeEmbed';
import CarCard from '../components/CarCard';

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={15} fill={i <= Math.floor(rating) ? 'var(--accent-orange)' : 'none'} color="var(--accent-orange)" />
    ))}
    <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 4 }}>{rating}/5</span>
  </div>
);

const SpecRow = ({ label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right', maxWidth: '55%' }}>{value}</span>
  </div>
);

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));
  const { isCarSaved, toggleSaveCar, currentUser } = useAuth();
  const { addToCompare, isInCompare } = useCompare();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [compareMsg, setCompareMsg] = useState('');

  if (!car) return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit', marginBottom: 16 }}>Car not found</h2>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );

  const saved = isCarSaved(car.id);
  const inCompare = isInCompare(car.id);
  const similarCars = cars.filter(c => c.id !== car.id && (c.bodyType === car.bodyType || c.make === car.make)).slice(0, 3);

  const handleCompare = () => {
    const result = addToCompare(car);
    setCompareMsg(result?.error || 'Added to comparison! See bar below.');
    setTimeout(() => setCompareMsg(''), 2500);
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 24, paddingBottom: 80 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, color: 'var(--text-muted)', fontSize: 13 }}>
          <Link to="/" style={{ color: 'var(--accent-blue-light)' }}>Home</Link>
          <span>/</span>
          <Link to="/marketplace" style={{ color: 'var(--accent-blue-light)' }}>Cars</Link>
          <span>/</span>
          <span>{car.year} {car.make} {car.model}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
          {/* LEFT column */}
          <div>
            {/* Image Gallery */}
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 12, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <img src={car.images[activeImg]} alt={car.model} style={{ width: '100%', height: 420, objectFit: 'cover' }} />
              {car.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(p => (p - 1 + car.images.length) % car.images.length)}
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <ChevronLeft size={18} color="white" />
                  </button>
                  <button onClick={() => setActiveImg(p => (p + 1) % car.images.length)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <ChevronRight size={18} color="white" />
                  </button>
                </>
              )}
            </div>
            {car.images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                {car.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ flex: 1, height: 70, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === activeImg ? 'var(--accent-blue)' : 'var(--border)'}`, cursor: 'pointer' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 28 }}>
              {[
                { id: 'specs', label: 'Specifications' },
                { id: 'economy', label: 'Fuel Economy' },
                { id: 'pros', label: 'Pros & Cons' },
                { id: 'videos', label: 'Videos' },
              ].map(tab => (
                <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ paddingRight: 24 }}>
                    <h3 style={{ fontFamily: 'Outfit', fontSize: 16, marginBottom: 4, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.06em' }}>Engine & Performance</h3>
                    <SpecRow label="Engine" value={car.specs.engine} />
                    <SpecRow label="Horsepower" value={car.specs.horsepower} />
                    <SpecRow label="Torque" value={car.specs.torque} />
                    <SpecRow label="Transmission" value={car.specs.transmission} />
                    <SpecRow label="Drivetrain" value={car.specs.drivetrain} />
                    <SpecRow label="0-60 mph" value={car.specs.acceleration} />
                    <SpecRow label="Top Speed" value={car.specs.topSpeed} />
                  </div>
                  <div style={{ paddingLeft: 24, borderLeft: '1px solid var(--border)' }}>
                    <h3 style={{ fontFamily: 'Outfit', fontSize: 16, marginBottom: 4, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.06em' }}>Dimensions & Weight</h3>
                    <SpecRow label="Length" value={car.specs.dimensions.length} />
                    <SpecRow label="Width" value={car.specs.dimensions.width} />
                    <SpecRow label="Height" value={car.specs.dimensions.height} />
                    <SpecRow label="Wheelbase" value={car.specs.dimensions.wheelbase} />
                    <SpecRow label="Curb Weight" value={car.specs.weight} />
                    <SpecRow label="Cargo Space" value={car.specs.cargo} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Economy */}
            {activeTab === 'economy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  {[
                    { label: 'City', value: car.specs.fuelEconomy.city, unit: car.specs.fuelEconomy.unit || 'MPG', icon: Gauge },
                    { label: 'Highway', value: car.specs.fuelEconomy.highway, unit: car.specs.fuelEconomy.unit || 'MPG', icon: Fuel },
                    { label: 'Combined', value: car.specs.fuelEconomy.combined, unit: car.specs.fuelEconomy.unit || 'MPG', icon: Zap },
                  ].map(({ label, value, unit, icon: Icon }) => (
                    <div key={label} style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 16px', textAlign: 'center' }}>
                      <Icon size={24} color="var(--accent-blue-light)" style={{ marginBottom: 10, display: 'block', margin: '0 auto 10px' }} />
                      <div style={{ fontSize: 36, fontFamily: 'Outfit', fontWeight: 800, color: 'var(--text-primary)' }}>{value}</div>
                      <div style={{ fontSize: 12, color: 'var(--accent-blue-light)', fontWeight: 600, marginBottom: 4 }}>{unit}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</div>
                    </div>
                  ))}
                </div>
                {car.specs.fuelEconomy.range && (
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Electric Range</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: 'var(--accent-green)' }}>{car.specs.fuelEconomy.range}</span>
                  </div>
                )}
                <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12 }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Fuel Type:</strong> {car.fuelType} &nbsp;|&nbsp; <strong style={{ color: 'var(--text-primary)' }}>Body Type:</strong> {car.bodyType}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab: Pros & Cons */}
            {activeTab === 'pros' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 20 }}>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: 16, color: '#34d399', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={18} /> Pros
                  </h3>
                  {car.pros.map(pro => (
                    <div key={pro} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                      <CheckCircle size={15} color="#34d399" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{pro}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 20 }}>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: 16, color: '#f87171', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <XCircle size={18} /> Cons
                  </h3>
                  {car.cons.map(con => (
                    <div key={con} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                      <XCircle size={15} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{con}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab: Videos */}
            {activeTab === 'videos' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {car.youtubeVideos.map(v => (
                  <div key={v.id}>
                    <h4 style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>{v.title}</h4>
                    <YouTubeEmbed videoId={v.id} title={v.title} />
                  </div>
                ))}
              </motion.div>
            )}

            {/* External Links */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Where to Buy</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {car.externalLinks.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer"
                    className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ExternalLink size={14} /> {link.name}
                    <span className={`badge badge-${link.type === 'official' ? 'blue' : 'orange'}`} style={{ fontSize: 10 }}>{link.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky sidebar */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: 24, marginBottom: 16 }}>
              <div style={{ marginBottom: 4, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {car.featured && <span className="badge badge-blue">Featured</span>}
                {car.trending && <span className="badge badge-orange">🔥 Trending</span>}
                <span className="badge badge-violet">{car.category}</span>
              </div>
              <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, margin: '12px 0 4px' }}>
                {car.year} {car.make} {car.model}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>{car.specs.engine}</p>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Estimated Market Price</div>
                <div style={{ fontSize: 32, fontFamily: 'Outfit', fontWeight: 800, color: 'var(--accent-blue-light)' }}>
                  ${car.price.estimated.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Range: ${car.price.min.toLocaleString()} – ${car.price.max.toLocaleString()}
                </div>
              </div>

              <div className="divider" style={{ margin: '16px 0' }} />

              {/* Ratings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={14} /> Safety</span>
                  <StarRating rating={car.safetyRating} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Star size={14} /> Reliability</span>
                  <StarRating rating={car.reliabilityRating} />
                </div>
              </div>

              {/* Action Buttons */}
              {compareMsg && (
                <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 10, color: 'var(--accent-blue-light)' }}>
                  {compareMsg}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => { if (!currentUser) navigate('/login'); else toggleSaveCar(car.id); }}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'center', display: 'flex' }}>
                  <Heart size={16} fill={saved ? 'var(--accent-red)' : 'none'} color={saved ? 'var(--accent-red)' : 'currentColor'} />
                  {saved ? 'Saved' : 'Save Car'}
                </button>
                <button onClick={handleCompare} className="btn btn-secondary"
                  style={{ justifyContent: 'center', display: 'flex', borderColor: inCompare ? 'var(--accent-violet)' : undefined, color: inCompare ? 'var(--accent-violet)' : undefined }}>
                  <BarChart3 size={16} />
                  {inCompare ? 'In Comparison' : 'Add to Compare'}
                </button>
                <Link to="/marketplace" className="btn btn-primary" style={{ justifyContent: 'center', display: 'flex' }}>
                  View Marketplace Listings
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
              <h4 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Stats</h4>
              {[
                { label: '0-60 mph', value: car.specs.acceleration.split(' ')[0] + 's' },
                { label: 'HP', value: car.specs.horsepower },
                { label: car.fuelType === 'Electric' ? 'Range' : 'MPG (City)', value: car.fuelType === 'Electric' ? car.specs.fuelEconomy.range : `${car.specs.fuelEconomy.city} mpg` },
                { label: 'Drive', value: car.specs.drivetrain },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, marginBottom: 24 }}>
              Similar <span className="gradient-text">Vehicles</span>
            </h2>
            <div className="grid-3">
              {similarCars.map(c => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
