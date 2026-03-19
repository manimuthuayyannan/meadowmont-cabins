import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ id, name, tagline, image, description, amenities, guests, bedrooms }) => {
  // amenities here is just a few highlights for the card
  const highlights = ["Large Cabin", `${guests} Guests`, `${bedrooms} Bedrooms`];

  return (
    <div className="property-card">
      <Link to={`/cabin/${id}`} className="property-img-wrapper">
        <img src={image} alt={name} className="property-img" />
      </Link>
      <div className="property-content">
        <div className="property-tagline">{tagline}</div>
        <h3 className="property-name">{name}</h3>
        <p className="property-description">{description.substring(0, 150)}...</p>
        <div className="property-amenities">
          {highlights.map((highlight, index) => (
            <span key={index} className="amenity-tag">{highlight}</span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
          <Link to={`/cabin/${id}`} className="btn btn-primary" style={{ flex: 1 }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
