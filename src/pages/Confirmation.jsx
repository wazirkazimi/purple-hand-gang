import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();
  const { reportId } = useParams();

  return (
    <div className="confirmation-page">
      <div className="checkmark-circle">✅</div>
      <h2>Report {reportId} Submitted Successfully!</h2>
      <p className="conf-sub">Thank you for making Bangalore safer.</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Your report has been logged and will be reviewed by the relevant authorities.
      </p>

      <div className="confirmation-buttons">
        <button className="btn-secondary" onClick={() => navigate('/my-reports')}>
          View My Reports
        </button>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
}
