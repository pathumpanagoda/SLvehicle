import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, BarChart3, ShoppingBag, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { compareList } = useCompare();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Discover', icon: Search },
    { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { to: '/compare', label: 'Compare', icon: BarChart3, badge: compareList.length },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Car size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20 }}>
            <span className="gradient-text">SL</span>
            <span style={{ color: 'var(--text-primary)' }}>Vehicle</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(({ to, label, icon: Icon, badge }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: location.pathname === to ? 'var(--accent-blue-light)' : 'var(--text-secondary)',
                background: location.pathname === to ? 'rgba(59,130,246,0.1)' : 'transparent',
                transition: 'var(--transition-fast)',
                position: 'relative',
              }}
            >
              <Icon size={16} />
              {label}
              {badge > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--accent-violet)',
                  color: 'white', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{badge}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', borderRadius: 99,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'white',
                }}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className={`badge badge-${currentUser.role === 'seller' ? 'orange' : currentUser.role === 'admin' ? 'violet' : 'blue'}`} style={{ fontSize: 10 }}>
                  {currentUser.role}
                </span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute', top: '100%', right: 0, marginTop: 8,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      borderRadius: 12, overflow: 'hidden', minWidth: 180,
                      boxShadow: 'var(--shadow-md)', zIndex: 101,
                    }}
                  >
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 14 }}
                    >
                      <Settings size={15} /> Dashboard
                    </Link>
                    <button onClick={handleLogout}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', color: 'var(--accent-red)', fontSize: 14, width: '100%', background: 'none', borderTop: '1px solid var(--border)' }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Join Free</Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="btn-icon"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
              padding: '16px 24px',
            }}
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', color: 'var(--text-secondary)', fontSize: 15 }}
              >
                <Icon size={18} /> {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
