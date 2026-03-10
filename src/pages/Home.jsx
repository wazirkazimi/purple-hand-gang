import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BANGALORE_LOCATIONS, SEVERITY_COLORS, SEVERITY_LABELS } from '../data/mockData';
import { ClipboardIcon, MapIcon, ChevronRightIcon, InfoIcon, ShieldIcon, AlertTriangleIcon, MapPinIcon, PhoneIcon } from '../components/Icons';

export default function Home() {
  const navigate = useNavigate();
  const { user, emergencyContacts } = useApp();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [leafletModules, setLeafletModules] = useState(null);

  const [currentPos, setCurrentPos] = useState([12.9352, 77.6245]);
  const [locationName, setLocationName] = useState('Koramangala, Bangalore');
  const [locationLoading, setLocationLoading] = useState(false);

  const holdTimer = useRef(null);

  // Lazy load leaflet for the home map
  useEffect(() => {
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([, reactLeaflet]) => {
      setLeafletModules({
        L: window.L, // Leaflet is available globally when imported this way typically, but we can also use require
        MapContainer: reactLeaflet.MapContainer,
        TileLayer: reactLeaflet.TileLayer,
        CircleMarker: reactLeaflet.CircleMarker,
        Marker: reactLeaflet.Marker,
        Popup: reactLeaflet.Popup
      });
      setMapReady(true);
    });

    // Request actual user location
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentPos([lat, lng]);

          try {
            // Reverse geocode to get a readable place name using free Nominatim API
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await res.json();
            if (data && data.address) {
              const locality = data.address.suburb || data.address.neighbourhood || data.address.city_district || data.address.village || data.address.town || 'Unknown Area';
              const city = data.address.city || data.address.state_district || data.address.state || 'Bangalore';
              setLocationName(`${locality}, ${city}`);
            }
          } catch (e) {
            console.error("Geocoding failed", e);
            setLocationName("Current Location");
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error("Geolocation error", error);
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  const startHold = useCallback(() => {
    setHolding(true);
    setProgress(true);
    holdTimer.current = setTimeout(() => {
      setHolding(false);
      setProgress(false);
      setShowOverlay(true);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }, 2000);
  }, []);

  const endHold = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setHolding(false);
    setProgress(false);
  }, []);

  const handleReportClick = () => {
    if (user) {
      navigate('/report');
    } else {
      navigate('/auth', { state: { redirect: '/report' } });
    }
  };

  const severityRadius = { safe: 12, moderate: 16, concerning: 20, danger: 24 };

  return (
    <>
      {/* SOS Overlay */}
      {showOverlay && (
        <div className="sos-overlay">
          <div className="overlay-pulse-bg"></div>
          <div className="alert-icon-wrap">
            <AlertTriangleIcon size={48} color="#E63946" />
          </div>
          <h2>Alert Sent!</h2>
          <p>Help is on the way. Stay safe.</p>
          <p className="overlay-location-text">
            <MapPinIcon size={14} color="currentColor" />
            Location shared with nearest authorities
          </p>

          {user && emergencyContacts.length > 0 && (
            <div className="emergency-contacts-list">
              <p className="ec-label">Emergency contacts notified:</p>
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="emergency-contact-card">
                  <PhoneIcon size={14} color="currentColor" />
                  <span>{contact.name}: {contact.phone}</span>
                </div>
              ))}
            </div>
          )}

          <button
            className="btn-close-overlay"
            onClick={() => setShowOverlay(false)}
          >
            <ShieldIcon size={18} color="white" />
            <span>I'm Safe, Close</span>
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        <h2 className="hero-kannada animate-fade-up">ನಮ್ಮ ಸುರಕ್ಷಾ</h2>
        <p className="hero-tagline animate-fade-up-delay">Our Safety, Our City</p>
      </section>

      {/* SOS Button */}
      <section className="sos-section">
        <div className="sos-wrapper">
          <div className="sos-ring"></div>
          <div className="sos-ring"></div>
          <div className="sos-ring"></div>

          <button
            className={`sos-button ${holding ? 'holding' : ''}`}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={(e) => { e.preventDefault(); startHold(); }}
            onTouchEnd={endHold}
            onTouchCancel={endHold}
            aria-label="SOS Emergency Button"
          >
            <svg className={`sos-progress-ring ${progress ? 'active' : ''}`} viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" />
            </svg>
            <div className="sos-inner-glow"></div>
            <span className="sos-main-label">TAP & HOLD FOR</span>
            <span className="sos-emergency-text">SOS</span>
          </button>
        </div>

        <div className="sos-hint-row">
          <InfoIcon size={14} color="var(--accent-red)" />
          <span className="sos-hint">Hold for 2 seconds to alert authorities</span>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="cta-section animate-slide-up">
        <div className="cta-card" onClick={handleReportClick}>
          <div className="cta-left">
            <div className="cta-icon-box cta-icon-red">
              <ClipboardIcon size={20} color="var(--accent-red)" />
            </div>
            <div className="cta-text">
              <span className="cta-label">Report an Issue</span>
              <span className="cta-sub">Harassment, lighting, or safety concerns</span>
            </div>
          </div>
          <ChevronRightIcon size={20} color="var(--text-muted)" className="cta-arrow-icon" />
        </div>
        <div className="cta-card" onClick={() => navigate('/heatmap')}>
          <div className="cta-left">
            <div className="cta-icon-box cta-icon-blue">
              <MapIcon size={20} color="var(--accent-blue)" />
            </div>
            <div className="cta-text">
              <span className="cta-label">Safety Heatmap</span>
              <span className="cta-sub">View real-time safety zones in Bangalore</span>
            </div>
          </div>
          <ChevronRightIcon size={20} color="var(--text-muted)" className="cta-arrow-icon" />
        </div>
      </section>

      {/* Location Map Section */}
      <section className="home-map-section">
        <div className="home-map-container">
          {mapReady && leafletModules ? (
            <leafletModules.MapContainer
              key={`map-${currentPos[0]}-${currentPos[1]}`}
              center={currentPos}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              touchZoom={false}
              attributionControl={false}
            >
              <leafletModules.TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* User Live Location Pin */}
              {leafletModules.L && (
                <leafletModules.Marker
                  position={currentPos}
                  icon={
                    new leafletModules.L.divIcon({
                      className: 'user-live-pin',
                      html: '<div class="pin-bounce"><div class="pin-pulse"></div></div>',
                      iconSize: [24, 24],
                      iconAnchor: [12, 12]
                    })
                  }
                >
                  <leafletModules.Popup className="custom-popup">
                    <div className="popup-content">
                      <p className="popup-title">You are here</p>
                    </div>
                  </leafletModules.Popup>
                </leafletModules.Marker>
              )}

              {BANGALORE_LOCATIONS.map((loc, idx) => (
                <leafletModules.CircleMarker
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
                  <leafletModules.Popup className="custom-popup">
                    <div className="popup-content">
                      <p className="popup-title">{loc.name}</p>
                      <p className="popup-count">{loc.incidents} incidents in last 7 days</p>
                      <span className="popup-severity" style={{ background: `${SEVERITY_COLORS[loc.severity]}20`, color: SEVERITY_COLORS[loc.severity], border: `1px solid ${SEVERITY_COLORS[loc.severity]}40` }}>
                        {SEVERITY_LABELS[loc.severity]}
                      </span>
                    </div>
                  </leafletModules.Popup>
                </leafletModules.CircleMarker>
              ))}
            </leafletModules.MapContainer>
          ) : (
            <div className="map-loading">
              <MapIcon size={20} color="var(--text-muted)" />
              <span>Loading map...</span>
            </div>
          )}
        </div>
        <div className="home-map-info">
          <div className="home-map-location">
            <span className="home-map-label">
              {locationLoading ? 'LOCATING...' : 'CURRENT LOCATION'}
            </span>
            <span className="home-map-place">
              {locationLoading ? 'Finding your area...' : locationName}
            </span>
          </div>
          <div className="home-map-badge">
            <span className="secure-dot"></span>
            <span>SECURE ZONE</span>
          </div>
        </div>
      </section>
    </>
  );
}
