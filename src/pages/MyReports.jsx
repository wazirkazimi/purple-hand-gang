import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';

export default function MyReports() {
  const navigate = useNavigate();
  const { user, reports } = useApp();

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { redirect: '/my-reports' } });
    }
  }, [user, navigate]);

  if (!user) return null;

  const getCategoryData = (catId) => {
    return CATEGORIES.find(c => c.id === catId) || { icon: '📋', label: 'Report' };
  };

  return (
    <div className="my-reports-page">
      <h2>📁 My Reports</h2>

      {reports.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No reports yet</h3>
          <p>Be the first to make Bangalore safer! 💪</p>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '12px 32px', marginTop: '12px' }}
            onClick={() => navigate('/report')}
          >
            Submit a Report
          </button>
        </div>
      ) : (
        reports.map((report) => {
          const cat = getCategoryData(report.category);
          return (
            <div key={report.id} className="report-card">
              <img
                src={report.photo}
                alt={cat.label}
                className="report-thumb"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%231A2035" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2364748B" font-size="30">' + cat.icon + '</text></svg>';
                }}
              />
              <div className="report-info">
                <div className="report-category">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                <p className="report-location">📍 {report.location}</p>
                <p className="report-date">📅 {report.date}</p>
                <span className="status-badge submitted">Submitted</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
