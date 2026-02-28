import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronDown, TrendingUp, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { cars, brands, trendingSearches } from '../data/cars';
import CarCard from '../components/CarCard';

const MAKES = ['Any Make', 'BMW', 'Toyota', 'Tesla', 'Ford', 'Mercedes', 'Honda', 'Audi', 'Porsche'];
const YEARS = ['Any Year', '2024', '2023', '2022', '2021', '2020', '2019'];
const BODY_TYPES = ['Any Type', 'Sedan', 'SUV', 'Coupe', 'Hatchback', 'Truck'];

const stats = [
  { value: '850K+', label: 'Cars Listed' },
  { value: '2.1M+', label: 'Happy Buyers' },
  { value: '140K+', label: 'Verified Sellers' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const features = [
  { icon: Search, title: 'Smart Discovery', desc: 'AI-powered search across 850,000+ vehicles with rich specs, videos, and reviews.' },
  { icon: Shield, title: 'Trusted Listings', desc: 'Every listing verified. History reports included. Buy with confidence.' },
  { icon: Zap, title: 'Instant Comparisons', desc: 'Side-by-side spec comparisons with best-value detection in seconds.' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({ make: '', model: '', year: '', minPrice: '', maxPrice: '' });
  const [activeFilter, setActiveFilter] = useState('All');

  const featuredCars = cars.filter(c => c.featured);
  const trendingCars = cars.filter(c => c.trending);
  const displayCars = activeFilter === 'All' ? featuredCars : featuredCars.filter(c => c.fuelType === activeFilter || c.bodyType === activeFilter);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.make) params.set('make', searchForm.make);
    if (searchForm.model) params.set('model', searchForm.model);
    if (searchForm.year) params.set('year', searchForm.year);
    navigate(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="page-wrapper">
      {/* ── Hero Section ───────────────────────────────── */}
      <section className="hero-bg" style={{ padding: '80px 0 100px', overflow: 'hidden', position: 'relative' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 48px' }}>
            <div className="badge badge-blue" style={{ marginBottom: 20, display: 'inline-flex' }}>
              🚀 The #1 Car Discovery Platform
            </div>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontFamily: 'Outfit', fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
              Find Your Perfect{' '}
              <span className="gradient-text">Dream Car</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Search 850,000+ vehicles. Compare specs, watch reviews, and buy directly — all in one premium platform.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <form onSubmit={handleSearch}>
              <div style={{
                background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-strong)',
                borderRadius: 20, padding: '24px 28px',
                maxWidth: 860, margin: '0 auto',
                boxShadow: '0 20px 80px rgba(0,0,0,0.4)',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 14 }}>
                  {[
                    { key: 'make', label: 'Make', options: MAKES },
                    { key: 'year', label: 'Year', options: YEARS },
                    { key: 'bodyType', label: 'Body Type', options: BODY_TYPES },
                  ].map(({ key, label, options }) => (
                    <div key={key} style={{ position: 'relative' }}>
                      <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 6, textTransform: 'uppercase' }}>{label}</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          className="input-field"
                          value={searchForm[key] || ''}
                          onChange={e => setSearchForm(p => ({ ...p, [key]: e.target.value }))}
                          style={{ appearance: 'none', paddingRight: 32 }}
                        >
                          {options.map(o => <option key={o} value={o === options[0] ? '' : o}>{o}</option>)}
                        </select>
                        <ChevronDown size={14} color="var(--text-muted)" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 6, textTransform: 'uppercase' }}>Model / Keyword</label>
                    <input
                      className="input-field"
                      placeholder="e.g. M3, Civic..."
                      value={searchForm.model}
                      onChange={e => setSearchForm(p => ({ ...p, model: e.target.value }))}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                    <input className="input-field" placeholder="Min Price" type="number" style={{ maxWidth: 140 }}
                      value={searchForm.minPrice} onChange={e => setSearchForm(p => ({ ...p, minPrice: e.target.value }))} />
                    <input className="input-field" placeholder="Max Price" type="number" style={{ maxWidth: 140 }}
                      value={searchForm.maxPrice} onChange={e => setSearchForm(p => ({ ...p, maxPrice: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ gap: 10 }}>
                    <Search size={18} /> Search Cars
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Trending tags */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={14} /> Trending:
            </span>
            {trendingSearches.slice(0, 6).map(t => (
              <button key={t} onClick={() => navigate(`/marketplace?model=${t}`)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 99, padding: '4px 12px', fontSize: 12, cursor: 'pointer', transition: 'var(--transition-fast)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {stats.map(({ value, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: 32, fontFamily: 'Outfit', fontWeight: 800, marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Brands ───────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="section-header">
            <h2>Browse by <span className="gradient-text">Brand</span></h2>
            <p>Explore our comprehensive database of top automotive brands</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            {brands.map(({ name, count }, i) => (
              <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => navigate(`/marketplace?make=${name}`)}
                  className="card"
                  style={{ width: '100%', padding: '20px 12px', textAlign: 'center', cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>
                    {['🚗', '🚘', '⚡', '🔵', '⭐', '🍀', '💎', '🏆'][i]}
                  </div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{count} models</div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Cars ────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2>Featured <span className="gradient-text">Vehicles</span></h2>
              <p>Handpicked selections from our expert editorial team</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Electric', 'Gasoline', 'Hybrid'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`chip ${activeFilter === f ? 'active' : ''}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="grid-3">
            {displayCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={() => navigate('/marketplace')} className="btn btn-secondary btn-lg">
              Browse All Vehicles <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Features / Why Choose Us ─────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2>Why <span className="gradient-text">SLVehicle</span>?</h2>
            <p style={{ margin: '0 auto' }}>Everything you need to make the smartest vehicle purchase of your life.</p>
          </div>
          <div className="grid-3">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 20px rgba(59,130,246,0.15)' }}>
                  <Icon size={26} color="var(--accent-blue-light)" />
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 19, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Searches ─────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))', border: '1px solid var(--border)', borderRadius: 20, padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, marginBottom: 10 }}>
                <span className="gradient-text">Trending</span> Searches
              </h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {trendingSearches.map(t => (
                  <button key={t} onClick={() => navigate(`/marketplace?model=${t}`)} className="chip">
                    <Star size={12} /> {t}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => navigate('/marketplace')} className="btn btn-primary btn-lg">
              Explore All <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
