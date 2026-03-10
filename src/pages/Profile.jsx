import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  UserIcon, AlertTriangleIcon, PhoneIcon, XIcon, PlusIcon,
  LogOutIcon, SaveIcon, ClipboardIcon, FolderIcon, ChevronRightIcon
} from '../components/Icons';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, reports, emergencyContacts, addEmergencyContact, removeEmergencyContact, showToast } = useApp();

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  useEffect(() => {
    if (!user) navigate('/auth', { state: { redirect: '/profile' } });
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
      showToast('Contact added');
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };
  const handleSave = () => showToast('Profile saved');

  return (
    <div className="profile-page animate-fade-in">
      <div className="page-header">
        <UserIcon size={22} color="var(--accent-red)" />
        <h2>Profile</h2>
      </div>

      {/* User Info */}
      <div className="profile-section">
        <h3 className="section-heading">
          <ClipboardIcon size={18} color="var(--accent-blue)" />
          <span>Personal Info</span>
        </h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={user.name} readOnly className="profile-readonly-input" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} readOnly className="profile-readonly-input" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" value={user.phone} readOnly className="profile-readonly-input" />
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="profile-section">
        <h3 className="section-heading">
          <AlertTriangleIcon size={18} color="var(--accent-red)" />
          <span>Emergency Contacts</span>
          <span className="section-count">({emergencyContacts.length}/3)</span>
        </h3>

        {emergencyContacts.map(contact => (
          <div key={contact.id} className="emergency-contact-item">
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <span className="contact-phone">
                <PhoneIcon size={11} color="var(--text-muted)" />
                <span>{contact.phone}</span>
              </span>
            </div>
            <button className="btn-remove" onClick={() => removeEmergencyContact(contact.id)}>
              <XIcon size={14} color="var(--accent-red)" />
              <span>Remove</span>
            </button>
          </div>
        ))}

        {emergencyContacts.length < 3 && (
          <div className="add-contact-form">
            <input type="text" placeholder="Name" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} />
            <input type="tel" placeholder="Phone" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} />
            <button className="btn-add" onClick={handleAddContact}>
              <PlusIcon size={14} color="white" />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>

      {/* My Reports — Link to separate page */}
      <div className="profile-link-card" onClick={() => navigate('/my-reports')}>
        <div className="profile-link-left">
          <div className="profile-link-icon">
            <FolderIcon size={20} color="var(--accent-orange)" />
          </div>
          <div className="profile-link-text">
            <span className="profile-link-title">My Reports</span>
            <span className="profile-link-sub">
              {reports.length === 0 ? 'No reports submitted yet' : `${reports.length} report${reports.length > 1 ? 's' : ''} submitted`}
            </span>
          </div>
        </div>
        <ChevronRightIcon size={20} color="var(--text-muted)" />
      </div>

      <button className="btn-save" onClick={handleSave}>
        <SaveIcon size={16} color="white" />
        <span>Save Profile</span>
      </button>

      <button className="btn-danger" onClick={handleLogout}>
        <LogOutIcon size={16} color="var(--accent-red)" />
        <span>Logout</span>
      </button>
    </div>
  );
}
