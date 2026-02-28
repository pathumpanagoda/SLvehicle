import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, MapPin, Calendar, Gauge, Tag, Plus } from 'lucide-react';
import { listings } from '../data/listings';
import { useAuth } from '../context/AuthContext';

const FUEL_TYPES = ['All', 'Gasoline', 'Electric', 'Hybrid'];
const CONDITIONS = ['All', 'New', 'Used', 'Certified'];
const LOCATIONS = ['All', 'California', 'Texas', 'New York', 'Florida', 'Washington', 'Illinois'];

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => navigate(`/cars/${listing.carId}`)}>
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={listing.images[0]} alt={listing.model} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <span className={`badge badge-${listing.condition === 'Used' ? 'orange' : 'green'}`}>{listing.condition}</span>
          <span className={`badge badge-${listing.seller.type === 'Dealer' ? 'blue' : 'violet'}`}>{listing.seller.type}</span>
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(p => !p); }}
          style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" fill={saved ? 'red' : 'none'} stroke={saved ? 'red' : 'white'} strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{listing.year} {listing.make} {listing.model}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Gauge size={13} /> {listing.mileage.toLocaleString()} mi</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> {listing.location}</span>
          <span>{listing.color}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          <span className="badge badge-blue">{listing.fuelType}</span>
          <span className="badge badge-violet">{listing.transmission}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Asking Price</span>
            <div style={{ fontSize: 22, fontFamily: 'Outfit', fontWeight: 800, color: 'var(--accent-blue-light)' }}>${listing.price.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{listing.seller.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>⭐ {listing.seller.rating}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MarketplacePage = () => {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get('make') || searchParams.get('model') || '');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [condFilter, setCondFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  const [priceMax, setPriceMax] = useState(200000);
  const [sortBy, setSortBy] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filtered = useMemo(() => {
    let result = listings.filter(l => {
      const q = search.toLowerCase();
      const matchSearch = !q || `${l.make} ${l.model} ${l.year} ${l.location}`.toLowerCase().includes(q);
      const matchFuel = fuelFilter === 'All' || l.fuelType === fuelFilter;
      const matchCond = condFilter === 'All' || l.condition === condFilter;
      const matchLoc = locFilter === 'All' || l.location.includes(locFilter);
      const matchPrice = l.price <= priceMax;
      return matchSearch && matchFuel && matchCond && matchLoc && matchPrice;
    });
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'year') result = [...result].sort((a, b) => b.year - a.year);
    if (sortBy === 'mileage') result = [...result].sort((a, b) => a.mileage - b.mileage);
    return result;
  }, [search, fuelFilter, condFilter, locFilter, priceMax, sortBy]);

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36, marginBottom: 6 }}>
              Car <span className="gradient-text">Marketplace</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {filtered.length} listings found
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto' }}>
              <option value="default">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year">Newest First</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
            {currentUser?.role === 'seller' && (
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={16} /> Post Listing
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="input-field"
            placeholder="Search by make, model, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 44, fontSize: 15 }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>
          {/* Filter Sidebar */}
          <div style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SlidersHorizontal size={16} /> Filters
                </h3>
                <button style={{ fontSize: 12, color: 'var(--accent-blue-light)', cursor: 'pointer', background: 'none' }}
                  onClick={() => { setFuelFilter('All'); setCondFilter('All'); setLocFilter('All'); setPriceMax(200000); setSearch(''); }}>
                  Reset All
                </button>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Max Price</span>
                  <span style={{ fontSize: 13, color: 'var(--accent-blue-light)', fontWeight: 700 }}>${(priceMax / 1000).toFixed(0)}K</span>
                </div>
                <input type="range" min={5000} max={200000} step={5000} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  <span>$5K</span><span>$200K</span>
                </div>
              </div>

              {/* Fuel Type */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Fuel Type</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {FUEL_TYPES.map(f => (
                    <button key={f} onClick={() => setFuelFilter(f)}
                      style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', background: fuelFilter === f ? 'rgba(59,130,246,0.15)' : 'transparent', color: fuelFilter === f ? 'var(--accent-blue-light)' : 'var(--text-secondary)', border: fuelFilter === f ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent', transition: 'var(--transition-fast)' }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Condition</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {CONDITIONS.map(c => (
                    <button key={c} onClick={() => setCondFilter(c)}
                      style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', background: condFilter === c ? 'rgba(59,130,246,0.15)' : 'transparent', color: condFilter === c ? 'var(--accent-blue-light)' : 'var(--text-secondary)', border: condFilter === c ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent', transition: 'var(--transition-fast)' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Location</p>
                <select className="input-field" value={locFilter} onChange={e => setLocFilter(e.target.value)}>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
                <Search size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'Outfit', marginBottom: 8 }}>No listings found</h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            ) : (
              <AnimatePresence>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                  {filtered.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Post Listing Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div className="modal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22 }}>Post a Listing</h2>
                <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Make', placeholder: 'e.g. BMW' },
                  { label: 'Model', placeholder: 'e.g. M3' },
                  { label: 'Year', placeholder: 'e.g. 2022', type: 'number' },
                  { label: 'Price ($)', placeholder: 'e.g. 45000', type: 'number' },
                  { label: 'Mileage', placeholder: 'e.g. 15000', type: 'number' },
                  { label: 'Location', placeholder: 'City, State' },
                ].map(({ label, placeholder, type = 'text' }) => (
                  <div key={label}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
                    <input className="input-field" type={type} placeholder={placeholder} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                  <textarea className="input-field" rows={3} placeholder="Describe your vehicle..." style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>Cancel</button>
                  <button onClick={() => { alert('Listing submitted! (demo)'); setShowModal(false); }} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>Post Listing</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;
