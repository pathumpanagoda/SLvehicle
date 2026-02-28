import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Heart, ShoppingBag, MessageSquare, Edit3, Save, LogOut, Star, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import { listings } from '../data/listings';
import CarCard from '../components/CarCard';

const DashboardPage = () => {
  const { currentUser, logout, updateProfile, savedCars } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
  });

  if (!currentUser) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit', marginBottom: 12 }}>Sign in to view your Dashboard</h2>
          <Link to="/login" className="btn btn-primary btn-lg">Sign In</Link>
        </div>
      </div>
    );
  }

  const savedCarData = cars.filter(c => savedCars.includes(c.id));
  const myListings = listings.filter(l => Math.random() > 0.6).slice(0, 2); // demo

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'saved', label: `Saved (${savedCarData.length})`, icon: Heart },
    { id: 'listings', label: 'My Listings', icon: ShoppingBag },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Profile Banner */}
        <div style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-card-hover))', border: '1px solid var(--border)', borderRadius: 20, padding: '32px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'white', flexShrink: 0, border: '3px solid rgba(139,92,246,0.4)' }}>
            {currentUser.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26 }}>{currentUser.name}</h1>
              <span className={`badge badge-${currentUser.role === 'seller' ? 'orange' : currentUser.role === 'admin' ? 'violet' : 'blue'}`}>
                {currentUser.role}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={13} /> {currentUser.email}</span>
              {currentUser.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> {currentUser.location}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13} /> Joined {currentUser.joinedDate}</span>
            </p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-secondary" style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,68,68,0.3)' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content' }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'var(--transition-fast)', background: activeTab === id ? 'var(--accent-blue)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-secondary)', border: 'none' }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, maxWidth: 560 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20 }}>Account Information</h2>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="btn btn-secondary btn-sm">
                    <Edit3 size={14} /> Edit
                  </button>
                ) : (
                  <button onClick={handleSave} className="btn btn-primary btn-sm">
                    <Save size={14} /> Save
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { label: 'Full Name', key: 'name', icon: User },
                  { label: 'Email', key: 'email', icon: Mail, disabled: true, value: currentUser.email },
                  { label: 'Phone', key: 'phone', icon: Phone },
                  { label: 'Location', key: 'location', icon: MapPin },
                ].map(({ label, key, icon: Icon, disabled, value }) => (
                  <div key={key}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <Icon size={13} /> {label}
                    </label>
                    <input
                      className="input-field"
                      value={value !== undefined ? value : formData[key] || ''}
                      disabled={!editing || disabled}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      style={{ opacity: disabled ? 0.6 : 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Saved Cars */}
        {activeTab === 'saved' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {savedCarData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <Heart size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'Outfit', marginBottom: 8 }}>No saved cars yet</h3>
                <p style={{ marginBottom: 20 }}>Start saving cars you love to find them later</p>
                <Link to="/" className="btn btn-primary">Browse Cars</Link>
              </div>
            ) : (
              <div className="grid-3">
                {savedCarData.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab: My Listings */}
        {activeTab === 'listings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {currentUser.role !== 'seller' ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'Outfit', marginBottom: 8 }}>Seller Account Required</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Register as a seller or use email containing "seller" to post listings</p>
                <Link to="/register" className="btn btn-primary">Register as Seller</Link>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                  <Link to="/marketplace" className="btn btn-primary"><ShoppingBag size={15} /> New Listing</Link>
                </div>
                {myListings.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                    <p>You have no active listings.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {myListings.map(l => (
                      <div key={l.id} style={{ display: 'flex', gap: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        <img src={l.images[0]} alt="" style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8 }} />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: 4 }}>{l.year} {l.make} {l.model}</h3>
                          <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
                            <span>${l.price.toLocaleString()}</span>
                            <span>{l.mileage.toLocaleString()} mi</span>
                            <span>{l.location}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-secondary btn-sm">Edit</button>
                          <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab: Messages */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
              {[
                { from: 'Premium Auto LA', msg: 'Thank you for your interest in the BMW M3! Are you still interested?', time: '2h ago', avatar: '🏢' },
                { from: 'EV Motors SF', msg: 'The Tesla Model 3 you inquired about is still available. Contact us anytime!', time: '1d ago', avatar: '⚡' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: i === 0 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{m.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{m.from}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
