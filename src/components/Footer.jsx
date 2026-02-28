import { Link } from 'react-router-dom';
import { Car, Twitter, Github, Youtube, Mail } from 'lucide-react';

const Footer = () => (
  <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', padding: '60px 0 30px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20 }}>
              <span className="gradient-text">SL</span>Vehicle
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            Your ultimate car discovery platform. Find, compare, and buy your perfect vehicle — all in one place.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Twitter, Github, Youtube, Mail].map((Icon, i) => (
              <button key={i} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', fontSize: 15, marginBottom: 16, color: 'var(--text-primary)' }}>Discover</h4>
          {['New Cars', 'Used Cars', 'Electric Vehicles', 'Luxury Cars', 'Sports Cars', 'SUVs & Trucks'].map(link => (
            <div key={link} style={{ marginBottom: 10 }}>
              <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, transition: 'color 0.15s' }}>{link}</Link>
            </div>
          ))}
        </div>

        {/* Marketplace */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', fontSize: 15, marginBottom: 16, color: 'var(--text-primary)' }}>Marketplace</h4>
          {['Browse Listings', 'Sell Your Car', 'Price Guide', 'Financing', 'Car History Report', 'Certified Pre-Owned'].map(link => (
            <div key={link} style={{ marginBottom: 10 }}>
              <Link to="/marketplace" style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{link}</Link>
            </div>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: 'Outfit', fontSize: 15, marginBottom: 16, color: 'var(--text-primary)' }}>Company</h4>
          {['About Us', 'Blog', 'Press', 'Careers', 'Privacy Policy', 'Terms of Service'].map(link => (
            <div key={link} style={{ marginBottom: 10 }}>
              <a href="#" style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{link}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2024 SLVehicle. All rights reserved.</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Made with ❤️ for car lovers</p>
      </div>
    </div>
  </footer>
);

export default Footer;
