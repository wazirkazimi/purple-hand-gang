import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_REPORTS } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  user: 'namma_suraksha_user',
  reports: 'namma_suraksha_reports',
  contacts: 'namma_suraksha_contacts',
  users: 'namma_suraksha_users',
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.user);
    return saved ? JSON.parse(saved) : null;
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.reports);
    return saved ? JSON.parse(saved) : MOCK_REPORTS;
  });

  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.contacts);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Mom', phone: '+91 98765 43210' },
      { id: 2, name: 'Dad', phone: '+91 87654 32109' },
    ];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.contacts, JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const userData = { name: found.name, email: found.email, phone: found.phone };
      setUser(userData);
      return { success: true };
    }
    // Demo fallback
    if (email && password) {
      const userData = { name: 'Demo User', email, phone: '+91 99999 00000' };
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (name, email, phone, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    users.push({ name, email, phone, password });
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    const userData = { name, email, phone };
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: `RPT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'submitted',
    };
    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const addEmergencyContact = (name, phone) => {
    if (emergencyContacts.length >= 3) {
      showToast('Maximum 3 emergency contacts allowed');
      return false;
    }
    setEmergencyContacts(prev => [
      ...prev,
      { id: Date.now(), name, phone }
    ]);
    return true;
  };

  const removeEmergencyContact = (id) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const value = {
    user,
    reports,
    emergencyContacts,
    toast,
    login,
    signup,
    logout,
    addReport,
    addEmergencyContact,
    removeEmergencyContact,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
