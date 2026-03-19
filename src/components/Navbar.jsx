import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LogoIcon = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 160 L100 20 L180 160 Z" stroke={color} strokeWidth="10" strokeLinejoin="round" />
    <path d="M70 160 L100 100 L130 160 Z" fill={color} />
    <circle cx="100" cy="170" r="5" fill={color} />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if text should be white or primary color
  // Transparent/White on Home (hero), always primary/white bg on other pages
  const navClass = `navbar ${scrolled || !isHome ? 'scrolled' : ''}`;
  const textColor = scrolled || !isHome ? 'var(--text-primary)' : 'white';

  return (
    <nav className={navClass}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <LogoIcon color={scrolled || !isHome ? 'var(--primary)' : 'white'} />
          <span style={{ color: scrolled || !isHome ? 'var(--primary)' : 'white', fontWeight: '800', letterSpacing: '2px', fontSize: '1.2rem' }}>
            MEADOWMONT CABINS
          </span>
        </Link>
        <div className="nav-links" style={{ color: textColor }}>
          <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/">Home</Link>
            <a href="/#properties">Cabins</a>
            <a href="/#area">Explore</a>
            <a href="#contact">Contact</a>
            <a href="/#properties" className="btn btn-accent" style={{ marginLeft: '1rem', textDecoration: 'none' }}>Book Direct</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
