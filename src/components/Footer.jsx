import React from 'react';

const LogoIcon = ({ color }) => (
  <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Twin Peaks 'M' outline */}
    <path d="M20 160 L65 40 L100 110 L135 40 L180 160 Z" stroke={color} strokeWidth="14" strokeLinejoin="round" />
    {/* Center Pine Tree */}
    <path d="M80 160 L100 120 L120 160 Z" fill={color} />
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
            <p style={{ opacity: 0.7 }}>Email: <a href="mailto:meadowmontcabins@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>meadowmontcabins@gmail.com</a></p>
            <p style={{ opacity: 0.7 }}>Location: Arnold, California</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com/meadowmontcabins" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                @meadowmontcabins
              </a>
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
