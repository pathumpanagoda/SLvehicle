import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Eye, EyeOff, Mail, Lock, User, ArrowRight, ShoppingBag, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill all fields'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    register(form);
    navigate('/dashboard');
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px' }}>
      {/* Blobs */}
      <div style={{ position: 'fixed', top: '15%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 460 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={24} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24 }}>
              <span className="gradient-text">SL</span>Vehicle
            </span>
          </Link>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, margin: '16px 0 6px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Join thousands of car enthusiasts</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
          {/* Role Selector */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>I want to</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { id: 'buyer', label: 'Buy / Discover', desc: 'Find my dream car', icon: Search },
                { id: 'seller', label: 'Sell My Car', desc: 'Post listings', icon: ShoppingBag },
              ].map(({ id, label, desc, icon: Icon }) => (
                <button key={id} type="button" onClick={() => setForm(p => ({ ...p, role: id }))}
                  style={{ padding: '14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left', transition: 'var(--transition-fast)', background: form.role === id ? 'rgba(59,130,246,0.12)' : 'var(--bg-secondary)', border: form.role === id ? '2px solid var(--accent-blue)' : '2px solid var(--border)' }}>
                  <Icon size={20} color={form.role === id ? 'var(--accent-blue-light)' : 'var(--text-muted)'} style={{ marginBottom: 6 }} />
                  <div style={{ fontWeight: 600, fontSize: 14, color: form.role === id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Full Name', key: 'name', type: 'text', icon: User, placeholder: 'John Doe' },
              { label: 'Email Address', key: 'email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
            ].map(({ label, key, type, icon: Icon, placeholder }) => (
              <div key={key}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Icon size={12} /> {label}
                </label>
                <input className="input-field" type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Lock size={12} /> Password
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--accent-red)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>{error}</div>}

            <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center', marginTop: 4 }} disabled={loading}>
              {loading ? 'Creating account...' : <><ArrowRight size={16} /> Create Account</>}
            </button>
          </form>

          <div className="divider" style={{ margin: '20px 0' }} />
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent-blue-light)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
