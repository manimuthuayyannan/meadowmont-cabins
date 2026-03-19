import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import PropertyCard from './PropertyCard';
import { properties, areaHighlights } from '../data';

const Home = () => {
  return (
    <main>
      <Hero />
      
      <section id="properties">
        <div className="container">
          <h2 className="section-title">Explore Our Cabins</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem'
          }}>
            {properties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" style={{ backgroundColor: '#2d4a3e', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>The Meadowmont Standard</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              Meadowmont Cabins is more than just a place to stay—we provide "Cozy, Modern Mountain Stays" that combine the rustic charm of Arnold with high-end modern amenities and hospitality.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>✅ <strong>Spacious Retreats:</strong> Designed for large families and meaningful gatherings.</li>
              <li>✅ <strong>Modern Luxury:</strong> High-end finishes, fast Wi-Fi, and fully stocked kitchens.</li>
              <li>✅ <strong>Local Hospitality:</strong> Superhost attention to detail with 100% response rates.</li>
            </ul>
          </div>
          <div style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
             <img src="/assets/hero.png" alt="Cabin Lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section id="area">
        <div className="container">
          <h2 className="section-title">Explore Arnold & Beyond</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {areaHighlights.map((site, index) => (
              <div key={index} className="glass" style={{ padding: '2rem', borderRadius: '12px', color: 'var(--primary)', border: '1px solid #ddd' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{site.title}</h3>
                <div style={{ marginBottom: '1rem', color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem' }}>{site.distance} FROM CABINS</div>
                <p style={{ color: 'var(--text-secondary)' }}>{site.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
