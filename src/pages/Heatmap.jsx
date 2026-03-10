import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BANGALORE_LOCATIONS, SEVERITY_COLORS, SEVERITY_LABELS } from '../data/mockData';
import { MapIcon } from '../components/Icons';

let MapContainer = null;
let TileLayer = null;
let CircleMarker = null;
let Popup = null;

function LeafletMap({ locations }) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([, reactLeafletModule]) => {
      MapContainer = reactLeafletModule.MapContainer;
      TileLayer = reactLeafletModule.TileLayer;
      CircleMarker = reactLeafletModule.CircleMarker;
      Popup = reactLeafletModule.Popup;
      setMapReady(true);
    });
  }, []);

  if (!mapReady) {
    return (
      <div className="map-loading">
        <MapIcon size={20} color="var(--text-muted)" />
        <span>Loading map...</span>
      </div>
    );
  }

  const severityRadius = { safe: 12, moderate: 16, concerning: 20, danger: 24 };

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {locations.map((loc, idx) => (
        <CircleMarker
          key={idx}
          center={[loc.lat, loc.lng]}
          radius={severityRadius[loc.severity]}
          pathOptions={{
            color: SEVERITY_COLORS[loc.severity],
            fillColor: SEVERITY_COLORS[loc.severity],
            fillOpacity: 0.35,
            weight: 2,
            opacity: 0.8,
          }}
        >
          <Popup className="custom-popup">
            <div className="popup-content">
              <p className="popup-title">{loc.name}</p>
              <p className="popup-count">{loc.incidents} incidents in last 7 days</p>
              <span className="popup-severity" style={{ background: `${SEVERITY_COLORS[loc.severity]}20`, color: SEVERITY_COLORS[loc.severity], border: `1px solid ${SEVERITY_COLORS[loc.severity]}40` }}>
                {SEVERITY_LABELS[loc.severity]}
              </span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'road_rage', label: 'Road Rage' },
  { id: 'civic', label: 'Civic' },
  { id: 'road_block', label: 'Road Block' },
  { id: 'animals', label: 'Animals' },
];

export default function Heatmap() {
  const [filter, setFilter] = useState('all');

  const filteredLocations = filter === 'all'
    ? BANGALORE_LOCATIONS
    : BANGALORE_LOCATIONS.filter(loc => loc.category === filter);

  return (
    <div className="heatmap-page animate-fade-in">
      <div className="page-header">
        <MapIcon size={22} color="var(--accent-red)" />
        <h2>Safety Heatmap</h2>
      </div>

      <div className="filter-chips">
        {FILTERS.map((f) => (
          <button key={f.id} className={`filter-chip ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="map-container">
        <LeafletMap locations={filteredLocations} />
      </div>

      <div className="heatmap-legend">
        {Object.entries(SEVERITY_COLORS).map(([key, color]) => (
          <div key={key} className="legend-item">
            <div className="legend-dot" style={{ background: color }}></div>
            <span>{SEVERITY_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
