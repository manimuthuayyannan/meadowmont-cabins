import React, { useState } from 'react';
import AttractionsMap from './AttractionsMap';
import { attractions } from '../data/attractions';

const LocalGuide = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAttractionId, setSelectedAttractionId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Attractions' },
    { id: 'summer', label: 'Summer Fun' },
    { id: 'winter', label: 'Winter Sports' },
    { id: 'dining', label: 'Dining & Drinks' }
  ];

  const filteredAttractions = activeCategory === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === activeCategory);

  return (
    <section id="area" style={{ backgroundColor: '#f9fafb', padding: '6rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">Explore Arnold & Bear Valley</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            From majestic giant sequoias and world-class skiing to cozy local dining, everything you need for the perfect mountain getaway is right here.
          </p>
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backgroundColor: activeCategory === cat.id ? 'var(--primary)' : '#e5e7eb',
                  color: activeCategory === cat.id ? 'white' : 'var(--text-primary)',
                  transition: 'all 0.2s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Scrollable List */}
          <div style={{ 
            height: '600px', 
            overflowY: 'auto', 
            paddingRight: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {filteredAttractions.map((site) => (
              <div 
                key={site.id} 
                onMouseEnter={() => setSelectedAttractionId(site.id)}
                onMouseLeave={() => setSelectedAttractionId(null)}
                style={{ 
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'white',
                  border: selectedAttractionId === site.id ? '2px solid var(--accent)' : '1px solid #eaeaea',
                  boxShadow: selectedAttractionId === site.id ? '0 8px 20px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {/* Image Thumbnail */}
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img src={site.image} alt={site.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                {/* Content */}
                <div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{site.title}</h3>
                  <div style={{ marginBottom: '0.5rem', color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    {site.distance} FROM CABINS
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {site.description}
                  </p>
                  <a 
                    href={site.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View Details <span style={{ fontSize: '1.1em' }}>&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
            
            {filteredAttractions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                No attractions found for this category.
              </div>
            )}
          </div>

          {/* Right Column: Sticky Map */}
          <div style={{ position: 'sticky', top: '2rem', height: '600px' }}>
             <AttractionsMap activeCategory={activeCategory} selectedAttractionId={selectedAttractionId} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocalGuide;
