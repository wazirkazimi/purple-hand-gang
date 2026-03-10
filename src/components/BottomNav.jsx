import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PUBLIC_NAV = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/heatmap', icon: '🗺️', label: 'Heatmap' },
  { path: '/report', icon: '📋', label: 'Report', requiresAuth: true },
];

const LOGGED_IN_NAV = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/heatmap', icon: '🗺️', label: 'Heatmap' },
  { path: '/report', icon: '📋', label: 'Report' },
  { path: '/my-reports', icon: '📁', label: 'My Reports' },
  { path: '/profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const { user } = useApp();

  // Hide on auth and confirmation pages
  if (location.pathname === '/auth' || location.pathname.startsWith('/confirmation')) return null;

  const items = user ? LOGGED_IN_NAV : PUBLIC_NAV;

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        const targetPath = item.requiresAuth && !user ? '/auth' : item.path;

        return (
          <Link
            key={item.path}
            to={targetPath}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
