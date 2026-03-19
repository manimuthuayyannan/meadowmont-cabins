import React from 'react';

const LogoIcon = ({ color }) => (
  <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 160 L100 20 L180 160 Z" stroke={color} strokeWidth="10" strokeLinejoin="round" />
    <path d="M70 160 L100 100 L130 160 Z" fill={color} />
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" id="contact">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <LogoIcon color="white" />
              <h2 className="footer-logo" style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px' }}>MEADOWMONT CABINS</h2>
            </div>
            <p style={{ opacity: 0.7, maxWidth: '300px' }}>
              Your premier choice for luxury cabin rentals in Arnold, California. Experience the beauty of the Sierras in comfort and style.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#properties">Our Cabins</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="https://meadowmontcabins.houfy.com/">Houfy Listing</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <p style={{ opacity: 0.7 }}>Email: stay@meadowmontcabins.com</p>
            <p style={{ opacity: 0.7 }}>Location: Arnold, California</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              {/* Social icons placeholder */}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Meadowmont Cabins. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
