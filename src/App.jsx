import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Report from './pages/Report';
import Confirmation from './pages/Confirmation';
import Heatmap from './pages/Heatmap';
import MyReports from './pages/MyReports';
import Profile from './pages/Profile';

function ToastContainer() {
  const { toast } = useApp();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}

function AppContent() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/report" element={<Report />} />
          <Route path="/confirmation/:reportId" element={<Confirmation />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <BottomNav />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
