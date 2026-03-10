import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, showToast } = useApp();
  const redirect = location.state?.redirect || '/';

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!isLogin && !form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!isLogin && !form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.password.trim()) errs.password = 'Password is required';
    else if (form.password.length < 4) errs.password = 'Min 4 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isLogin) {
      const result = login(form.email, form.password);
      if (result.success) {
        showToast('Welcome back! 🎉');
        navigate(redirect);
      } else {
        setErrors({ email: result.error });
      }
    } else {
      const result = signup(form.name, form.email, form.phone, form.password);
      if (result.success) {
        showToast('Account created! Welcome! 🎉');
        navigate(redirect);
      } else {
        setErrors({ email: result.error });
      }
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🛡️ Namma Suraksha</h2>
        <p className="auth-subtitle">Our Safety, Our City</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setErrors({}); }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setErrors({}); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-phone">Phone Number</label>
              <input
                id="auth-phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
