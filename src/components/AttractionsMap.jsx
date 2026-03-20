import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { attractions } from '../data/attractions';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Cabin Icon
const cabinIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when selected attraction changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const AttractionsMap = ({ activeCategory, selectedAttractionId }) => {
  // Center roughly between Arnold and Bear Valley
  const MAP_CENTER = [38.35, -120.15]; 
  const CABIN_COORDS = [38.2560, -120.3540]; // Approximate Arnold coordinates

  const filteredAttractions = activeCategory === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === activeCategory);

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '500px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <MapContainer center={MAP_CENTER} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* The Cabin Marker */}
        <Marker position={CABIN_COORDS} icon={cabinIcon}>
          <Popup>
            <strong>Meadowmont Cabins</strong><br />Your Basecamp
          </Popup>
        </Marker>

        {/* Attraction Markers */}
        {filteredAttractions.map(attraction => (
          <Marker 
            key={attraction.id} 
            position={attraction.coordinates}
          >
            <Popup>
              <div style={{ width: '200px' }}>
                <img src={attraction.image} alt={attraction.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }} />
                <h4 style={{ margin: '8px 0 4px 0', fontSize: '14px' }}>{attraction.title}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{attraction.distance} from cabin</p>
                <a href={attraction.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', color: '#bd6a43' }}>View Details &rarr;</a>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedAttractionId && (
          <ChangeView 
            center={attractions.find(a => a.id === selectedAttractionId)?.coordinates || MAP_CENTER} 
            zoom={13} 
          />
        )}
      </MapContainer>
    </div>
  );
};

export default AttractionsMap;
