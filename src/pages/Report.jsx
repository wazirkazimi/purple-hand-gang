import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES, MOCK_LOCATIONS_FOR_REPORTS } from '../data/mockData';

export default function Report() {
  const navigate = useNavigate();
  const { user, addReport, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [mockLocation, setMockLocation] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { redirect: '/report' } });
    }
  }, [user, navigate]);

  useEffect(() => {
    // Assign a random mock location
    const locs = MOCK_LOCATIONS_FOR_REPORTS;
    setMockLocation(locs[Math.floor(Math.random() * locs.length)]);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  const validateStep = () => {
    const errs = {};
    if (step === 1 && !category) {
      errs.category = 'Please select a category';
      showToast('Please select a category first');
    }
    if (step === 2 && !photo) {
      errs.photo = 'Please upload a photo';
      showToast('Please upload a photo');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    const catData = CATEGORIES.find(c => c.id === category);
    const report = addReport({
      category,
      location: mockLocation,
      description,
      photo: photoPreview || 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
    });
    navigate(`/confirmation/${report.id}`);
  };

  if (!user) return null;

  return (
    <div className="report-page">
      <h2>📋 Report an Issue</h2>
      <p className="report-subtitle">Help make Bangalore safer</p>

      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          {step > 1 ? '✓' : '1'}
        </div>
        <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          {step > 2 ? '✓' : '2'}
        </div>
        <div className={`step-line ${step > 2 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Select Category
          </h3>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`category-card ${category === cat.id ? 'selected' : ''}`}
                onClick={() => {
                  setCategory(cat.id);
                  setErrors(prev => ({ ...prev, category: '' }));
                }}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </div>
            ))}
          </div>
          {errors.category && <p className="form-error" style={{ textAlign: 'center', marginBottom: '12px' }}>{errors.category}</p>}
          <button className="btn-primary" onClick={nextStep}>
            Continue →
          </button>
        </>
      )}

      {/* Step 2: Photo Upload */}
      {step === 2 && (
        <>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Upload Photo Evidence
          </h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />

          <div
            className={`upload-area ${photoPreview ? 'has-image' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Upload preview" className="upload-preview" />
            ) : (
              <>
                <div className="upload-icon">📸</div>
                <p className="upload-text">Tap to upload a photo</p>
                <p className="upload-hint">Photo will be geo-tagged automatically</p>
              </>
            )}
          </div>

          {errors.photo && <p className="form-error" style={{ textAlign: 'center', marginBottom: '12px' }}>{errors.photo}</p>}

          <div className="location-badge">
            📍 Location detected: {mockLocation}
          </div>

          <div className="step-buttons">
            <button className="btn-secondary" onClick={prevStep}>← Back</button>
            <button className="btn-primary" onClick={nextStep}>Continue →</button>
          </div>
        </>
      )}

      {/* Step 3: Description */}
      {step === 3 && (
        <>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Add Description (Optional)
          </h3>

          <textarea
            className="description-input"
            placeholder="Describe the issue briefly..."
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="char-count">{description.length}/200</p>

          {/* Summary */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Report Summary</p>
            <p style={{ fontSize: '0.85rem' }}>
              {CATEGORIES.find(c => c.id === category)?.icon} {CATEGORIES.find(c => c.id === category)?.label}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              📍 {mockLocation}
            </p>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Evidence"
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '8px'
                }}
              />
            )}
          </div>

          <div className="step-buttons">
            <button className="btn-secondary" onClick={prevStep}>← Back</button>
            <button className="btn-primary" onClick={handleSubmit}>Submit Report ✓</button>
          </div>
        </>
      )}
    </div>
  );
}
