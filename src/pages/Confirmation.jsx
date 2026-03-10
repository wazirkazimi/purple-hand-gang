import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon, HomeIcon, FolderIcon } from '../components/Icons';

export default function Confirmation() {
  const navigate = useNavigate();
  const { reportId } = useParams();

  return (
    <div className="confirmation-page animate-fade-in">
      <div className="checkmark-circle">
        <CheckCircleIcon size={48} color="var(--accent-green)" />
      </div>
      <h2>Report {reportId} Submitted!</h2>
      <p className="conf-sub">Thank you for making Bangalore safer.</p>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        Your report has been logged and will be reviewed by the relevant authorities.
      </p>

      <div className="confirmation-buttons">
        <button className="btn-secondary" onClick={() => navigate('/profile')}>
          <FolderIcon size={16} color="currentColor" />
          <span>View My Reports</span>
        </button>
        <button className="btn-primary" onClick={() => navigate('/')}>
          <HomeIcon size={16} color="white" />
          <span>Go Home</span>
        </button>
      </div>
    </div>
  );
}
