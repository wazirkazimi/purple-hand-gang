import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { FolderIcon, MapPinIcon, CalendarIcon, ClipboardIcon } from '../components/Icons';
import { CarIcon, AngryIcon, ConstructionIcon, TrashIcon, PawIcon, LandmarkIcon, ScaleIcon } from '../components/Icons';

const CATEGORY_ICONS = {
  traffic: CarIcon,
  road_rage: AngryIcon,
  road_block: ConstructionIcon,
  civic: TrashIcon,
  animals: PawIcon,
  corruption: LandmarkIcon,
  other: ScaleIcon,
};

export default function MyReports() {
  const navigate = useNavigate();
  const { user, reports } = useApp();

  useEffect(() => {
    if (!user) navigate('/auth', { state: { redirect: '/my-reports' } });
  }, [user, navigate]);

  if (!user) return null;

  const getCategoryData = (catId) => CATEGORIES.find(c => c.id === catId) || { label: 'Report' };

  return (
    <div className="my-reports-page animate-fade-in">
      <div className="page-header">
        <FolderIcon size={22} color="var(--accent-red)" />
        <h2>My Reports</h2>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state animate-fade-in">
          <ClipboardIcon size={48} color="var(--text-muted)" />
          <h3>No reports yet</h3>
          <p>Be the first to make Bangalore safer!</p>
          <button className="btn-primary" style={{ width: 'auto', padding: '12px 32px', marginTop: '12px' }} onClick={() => navigate('/report')}>
            Submit a Report
          </button>
        </div>
      ) : (
        reports.map((report, idx) => {
          const cat = getCategoryData(report.category);
          const IconComp = CATEGORY_ICONS[report.category] || ClipboardIcon;
          return (
            <div key={report.id} className="report-card animate-slide-up" style={{ animationDelay: `${idx * 0.08}s` }}>
              <img src={report.photo} alt={cat.label} className="report-thumb"
                onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="report-info">
                <div className="report-category">
                  <IconComp size={16} color="var(--accent-red)" />
                  <span>{cat.label}</span>
                </div>
                <p className="report-location">
                  <MapPinIcon size={12} color="var(--text-muted)" />
                  <span>{report.location}</span>
                </p>
                <p className="report-date">
                  <CalendarIcon size={12} color="var(--text-muted)" />
                  <span>{report.date}</span>
                </p>
                <span className="status-badge submitted">Submitted</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
