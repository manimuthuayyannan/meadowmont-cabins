import React from 'react';

const Hero = () => {
  return (
    <header className="hero">
      <img src="/assets/hero.png" alt="Meadowmont Cabin" className="hero-bg" />
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Elevated Mountain Living in Arnold, CA</h1>
          <p className="hero-subtitle">Experience the perfect blend of rustic charm and modern luxury in our curated selection of family-friendly cabins.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#properties" className="btn btn-primary">View Cabins</a>
            <a href="#why-us" className="btn btn-accent">Our Story</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
