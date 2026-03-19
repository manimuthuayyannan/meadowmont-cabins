import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../data';

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!images || images.length === 0) return null;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="slideshow-container" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', height: '550px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex}`} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease-in-out' }} 
      />
      
      {/* Counter Tag */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, zIndex: 10, backdropFilter: 'blur(4px)' }}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Controls */}
      <button onClick={prevSlide} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button onClick={nextSlide} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', bottom: '0', left: '0', height: '4px', background: 'var(--accent)', width: `${((currentIndex + 1) / images.length) * 100}%`, transition: 'width 0.3s ease', zIndex: 11 }}></div>
    </div>
  );
};

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) return <div className="container" style={{ padding: '10rem 0' }}>Property not found.</div>;

  return (
    <div className="property-details-page">
      <div className="property-hero" style={{ height: '50vh', position: 'relative' }}>
        <img src={property.image} alt={property.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', color: 'white', zIndex: 10 }}>
          <Link to="/" style={{ color: 'white', opacity: 0.9, marginBottom: '0.8rem', display: 'inline-block', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>← BACK TO EXPLORE</Link>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.3rem' }}>{property.name}</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, letterSpacing: '1px' }}>{property.tagline}</p>
        </div>
      </div>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem', color: 'var(--text-secondary)' }}>
              <div><strong>{property.guests}</strong> Guests</div>
              <div><strong>{property.bedrooms}</strong> Bedrooms</div>
              <div><strong>{property.bathrooms}</strong> Bathrooms</div>
              <div><strong>{property.sqft}</strong></div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>About this space</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{property.description}</p>
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Property Gallery</h2>
            <Slideshow images={property.images} />

            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Sleeping Arrangements</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {property.sleepingArrangements.map((item, index) => (
                  <div key={index} style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #eee' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.room}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.beds}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {Object.entries(property.amenities).map(([category, list]) => (
                  <div key={category}>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{category}</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {list.map((item, idx) => <li key={idx} style={{ color: 'var(--text-secondary)' }}>• {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="glass" style={{ padding: '2rem', borderRadius: '12px', position: 'sticky', top: '100px', border: '1px solid #ddd', background: 'white' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Secure Booking</h3>
              <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Book directly on Houfy to save on platform fees. Secure payment and 100% response rate guaranteed.
              </p>
              <a href={property.bookingLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                Book on Houfy
              </a>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
                4.82+ Star Rated Property
              </div>
              <hr style={{ margin: '2rem 0', opacity: 0.1 }} />
              <div style={{ fontSize: '0.9rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>House Rules</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {property.houseRules.map((rule, idx) => <li key={idx} style={{ opacity: 0.8 }}>• {rule}</li>)}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
