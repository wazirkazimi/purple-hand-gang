import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { user } = useApp();
  const location = useLocation();

  // Hide navbar on auth page
  if (location.pathname === '/auth') return null;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo-icon">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#E63946" strokeWidth="2" fill="rgba(230,57,70,0.1)"/>
            <path d="M16 6 L18.5 12.5 L25 13 L20 17.5 L21.5 24 L16 20.5 L10.5 24 L12 17.5 L7 13 L13.5 12.5 Z" fill="#E63946"/>
          </svg>
        </div>
        <div className="logo-text">
          <h1>Namma Suraksha</h1>
          <span className="logo-tagline">Civic Sentinel</span>
        </div>
      </Link>
      <div className="navbar-actions">
        {user ? (
          <Link to="/profile" className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <div className="auth-buttons">
            <Link to="/auth" className="btn-nav-login">Login</Link>
            <Link to="/auth" className="btn-nav-signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
