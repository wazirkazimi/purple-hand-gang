import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HomeIcon, MapIcon, ClipboardIcon } from './Icons';

const NAV_ITEMS = [
  { path: '/', icon: HomeIcon, label: 'Home' },
  { path: '/heatmap', icon: MapIcon, label: 'Heatmap' },
  { path: '/report', icon: ClipboardIcon, label: 'Report', requiresAuth: true },
];

export default function BottomNav() {
  const location = useLocation();
  const { user } = useApp();

  if (location.pathname === '/auth' || location.pathname.startsWith('/confirmation')) return null;

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        const targetPath = item.requiresAuth && !user ? '/auth' : item.path;
        const IconComp = item.icon;

        return (
          <Link
            key={item.path}
            to={targetPath}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">
              <IconComp size={20} />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
