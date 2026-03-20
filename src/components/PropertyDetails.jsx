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

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div 
      className="slideshow-container" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', height: '550px', borderRadius: '16px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex}`} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease-in-out' }} 
      />
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, zIndex: 10, backdropFilter: 'blur(4px)' }}>
        {currentIndex + 1} / {images.length}
      </div>
      <button onClick={prevSlide} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button onClick={nextSlide} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
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
        <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))', zIndex: 1, position: 'absolute', inset: 0 }}></div>
        <div className="container" style={{ position: 'absolute', bottom: '3rem', left: '0', right: '0', color: 'white', zIndex: 10 }}>
          <Link to="/" style={{ color: 'white', opacity: 0.9, marginBottom: '1rem', display: 'inline-block', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>&larr; BACK TO EXPLORE</Link>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{property.name}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, letterSpacing: '1px' }}>{property.tagline}</p>
        </div>
      </div>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Main Content Column */}
          <div>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              <div><strong>{property.guests}</strong> Guests</div>
              <div><strong>{property.bedrooms}</strong> Bedrooms</div>
              <div><strong>{property.bathrooms}</strong> Baths</div>
              <div><strong>{property.sqft}</strong></div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.8rem' }}>About this space</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{property.description}</p>
              {property.communityAccess && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f5f7fa', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                  <strong>Community Access:</strong> {property.communityAccess}
                </div>
              )}
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.8rem' }}>Property Gallery</h2>
            <Slideshow images={property.images} />

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Sleeping Arrangements</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {property.sleepingArrangements.map((item, index) => (
                  <div key={index} style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)', fontSize: '1.1rem' }}>{item.room}</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.beds}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expansive Amenities Section */}
            <div style={{ marginBottom: '4rem', borderTop: '1px solid #eee', paddingTop: '3rem' }}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>What this place offers</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                {Object.entries(property.amenities).map(([category, list]) => (
                  <div key={category}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {category}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, margin: 0, listStyle: 'none' }}>
                      {list.map((item, idx) => (
                        <li key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ color: 'var(--accent)' }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Accessibility */}
            <div style={{ marginBottom: '4rem', borderTop: '1px solid #eee', paddingTop: '3rem' }}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Safety & Accessibility</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                <div>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Safety Features</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {property.safetyFeatures.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Accessibility</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {property.accessibility.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar Column */}
          <aside>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', position: 'sticky', top: '100px', border: '1px solid #ddd', background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.5rem' }}>Secure Booking</h3>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Book directly on Houfy to save on platform fees. Secure payment and 100% response rate guaranteed.
              </p>
              <a href={property.bookingLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem', fontSize: '1.1rem', textAlign: 'center', display: 'block' }}>
                Book on Houfy
              </a>
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>
                ★ 4.82+ Superhost Rated Property
              </div>
              
              <hr style={{ margin: '2.5rem 0', opacity: 0.15 }} />
              
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--primary)' }}>House Policies</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {Object.entries(property.policies).map(([category, list]) => (
                    <div key={category}>
                      <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{category}</strong>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {list.map((rule, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{rule}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
