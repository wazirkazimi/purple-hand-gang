import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES, MOCK_LOCATIONS_FOR_REPORTS } from '../data/mockData';
import {
  ClipboardIcon, MapPinIcon, ArrowRightIcon, CheckCircleIcon, UploadIcon,
  CarIcon, AngryIcon, ConstructionIcon, TrashIcon, PawIcon, LandmarkIcon, ScaleIcon
} from '../components/Icons';

const CATEGORY_ICONS = {
  traffic: CarIcon,
  road_rage: AngryIcon,
  road_block: ConstructionIcon,
  civic: TrashIcon,
  animals: PawIcon,
  corruption: LandmarkIcon,
  other: ScaleIcon,
};

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
    if (!user) navigate('/auth', { state: { redirect: '/report' } });
  }, [user, navigate]);

  useEffect(() => {
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

  const nextStep = () => { if (validateStep()) setStep(prev => prev + 1); };
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const handleSubmit = () => {
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
    <div className="report-page animate-fade-in">
      <div className="page-header">
        <ClipboardIcon size={22} color="var(--accent-red)" />
        <h2>Report an Issue</h2>
      </div>
      <p className="report-subtitle">Help make Bangalore safer</p>

      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          {step > 1 ? <CheckCircleIcon size={14} color="white" /> : '1'}
        </div>
        <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          {step > 2 ? <CheckCircleIcon size={14} color="white" /> : '2'}
        </div>
        <div className={`step-line ${step > 2 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="animate-slide-up">
          <h3 className="step-title">Select Category</h3>
          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.id];
              return (
                <div key={cat.id} className={`category-card ${category === cat.id ? 'selected' : ''}`}
                  onClick={() => { setCategory(cat.id); setErrors({}); }}>
                  <span className="cat-icon-wrap">
                    <IconComp size={28} color={category === cat.id ? 'var(--accent-red)' : 'var(--text-secondary)'} />
                  </span>
                  <span className="cat-label">{cat.label}</span>
                </div>
              );
            })}
          </div>
          {errors.category && <p className="form-error" style={{ textAlign: 'center', marginBottom: '12px' }}>{errors.category}</p>}
          <button className="btn-primary" onClick={nextStep}>
            <span>Continue</span>
            <ArrowRightIcon size={16} color="white" />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="animate-slide-up">
          <h3 className="step-title">Upload Photo Evidence</h3>
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          <div className={`upload-area ${photoPreview ? 'has-image' : ''}`} onClick={() => fileInputRef.current?.click()}>
            {photoPreview ? (
              <img src={photoPreview} alt="Upload preview" className="upload-preview" />
            ) : (
              <>
                <UploadIcon size={36} color="var(--text-muted)" />
                <p className="upload-text">Tap to upload a photo</p>
                <p className="upload-hint">Photo will be geo-tagged automatically</p>
              </>
            )}
          </div>
          {errors.photo && <p className="form-error" style={{ textAlign: 'center', marginBottom: '12px' }}>{errors.photo}</p>}
          <div className="location-badge">
            <MapPinIcon size={16} color="var(--accent-green)" />
            <span>Location detected: {mockLocation}</span>
          </div>
          <div className="step-buttons">
            <button className="btn-secondary" onClick={prevStep}>Back</button>
            <button className="btn-primary" onClick={nextStep}>
              <span>Continue</span>
              <ArrowRightIcon size={14} color="white" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="animate-slide-up">
          <h3 className="step-title">Add Description (Optional)</h3>
          <textarea className="description-input" placeholder="Describe the issue briefly..." maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} />
          <p className="char-count">{description.length}/200</p>
          <div className="report-summary-card">
            <p className="summary-label">Report Summary</p>
            <div className="summary-row">
              {(() => { const IC = CATEGORY_ICONS[category]; return <IC size={16} color="var(--accent-red)" />; })()}
              <span>{CATEGORIES.find(c => c.id === category)?.label}</span>
            </div>
            <div className="summary-row summary-loc">
              <MapPinIcon size={14} color="var(--text-secondary)" />
              <span>{mockLocation}</span>
            </div>
            {photoPreview && (
              <img src={photoPreview} alt="Evidence" style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
            )}
          </div>
          <div className="step-buttons">
            <button className="btn-secondary" onClick={prevStep}>Back</button>
            <button className="btn-primary" onClick={handleSubmit}>
              <span>Submit Report</span>
              <CheckCircleIcon size={16} color="white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
