import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, emergencyContacts } = useApp();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const holdTimer = useRef(null);

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

  return (
    <>
      {/* SOS Overlay */}
      {showOverlay && (
        <div className="sos-overlay">
          <div className="alert-icon">🚨</div>
          <h2>Alert Sent!</h2>
          <p>Help is on the way. Stay safe.</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
            📍 Location shared with nearest authorities
          </p>

          {emergencyContacts.length > 0 && (
            <div className="emergency-contacts-list">
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
                Emergency contacts notified:
              </p>
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="emergency-contact-card">
                  {contact.name} — {contact.phone}
                </div>
              ))}
            </div>
          )}

          <button
            className="btn-close-overlay"
            onClick={() => setShowOverlay(false)}
          >
            I'm Safe — Close
          </button>
        </div>
      )}

      {/* Hero — Kannada Title */}
      <section className="hero-section">
        <h2 className="hero-kannada">ನಮ್ಮ ಸುರಕ್ಷಾ</h2>
        <p className="hero-tagline">Our Safety, Our City</p>
      </section>

      {/* SOS Button Section */}
      <section className="sos-section">
        <div className="sos-wrapper">
          {/* Pulsing rings */}
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
            aria-label="SOS Emergency Button - Press and hold for 2 seconds"
          >
            {/* Progress ring */}
            <svg className={`sos-progress-ring ${progress ? 'active' : ''}`} viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" />
            </svg>

            {/* Star/Asterisk icon */}
            <div className="sos-star">
              <svg viewBox="0 0 48 48" fill="white" width="48" height="48">
                <path d="M24 2 L27 17.5 L42 10 L32 22 L46 24 L32 26 L42 38 L27 30.5 L24 46 L21 30.5 L6 38 L16 26 L2 24 L16 22 L6 10 L21 17.5 Z"/>
              </svg>
            </div>
            <span className="sos-main-text">TAP & HOLD FOR</span>
            <span className="sos-sub-text">EMERGENCY</span>
          </button>
        </div>

        <div className="sos-hint-row">
          <span className="sos-hint-icon">ℹ️</span>
          <span className="sos-hint">Hold for 2 seconds to alert authorities</span>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="cta-section">
        <div className="cta-card" onClick={handleReportClick}>
          <div className="cta-left">
            <div className="cta-icon-box cta-icon-red">📋</div>
            <div className="cta-text">
              <span className="cta-label">Report an Issue</span>
              <span className="cta-sub">Harassment, lighting, or safety concerns</span>
            </div>
          </div>
          <span className="cta-arrow">›</span>
        </div>
        <div className="cta-card" onClick={() => navigate('/heatmap')}>
          <div className="cta-left">
            <div className="cta-icon-box cta-icon-blue">🗺️</div>
            <div className="cta-text">
              <span className="cta-label">Safety Heatmap</span>
              <span className="cta-sub">View real-time safety zones in Bangalore</span>
            </div>
          </div>
          <span className="cta-arrow">›</span>
        </div>
      </section>
    </>
  );
}
