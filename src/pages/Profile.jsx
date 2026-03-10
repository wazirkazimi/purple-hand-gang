import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, emergencyContacts, addEmergencyContact, removeEmergencyContact, showToast } = useApp();

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { redirect: '/profile' } });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      showToast('Please fill both name and phone');
      return;
    }
    const success = addEmergencyContact(newContactName.trim(), newContactPhone.trim());
    if (success) {
      setNewContactName('');
      setNewContactPhone('');
      showToast('Contact added ✓');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    showToast('Profile saved ✓');
  };

  return (
    <div className="profile-page">
      <h2>👤 Profile</h2>

      {/* User Info */}
      <div className="profile-section">
        <h3>📋 Personal Info</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={user.name} readOnly style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            width: '100%',
            fontSize: '0.9rem',
          }} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} readOnly style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            width: '100%',
            fontSize: '0.9rem',
          }} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" value={user.phone} readOnly style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            width: '100%',
            fontSize: '0.9rem',
          }} />
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="profile-section">
        <h3>🚨 Emergency Contacts <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>({emergencyContacts.length}/3)</span></h3>

        {emergencyContacts.map(contact => (
          <div key={contact.id} className="emergency-contact-item">
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <span className="contact-phone">{contact.phone}</span>
            </div>
            <button className="btn-remove" onClick={() => removeEmergencyContact(contact.id)}>
              ✕ Remove
            </button>
          </div>
        ))}

        {emergencyContacts.length < 3 && (
          <div className="add-contact-form">
            <input
              type="text"
              placeholder="Name"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
            />
            <button className="btn-add" onClick={handleAddContact}>
              + Add
            </button>
          </div>
        )}
      </div>

      <button className="btn-save" onClick={handleSave}>
        Save Profile
      </button>

      <button className="btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
