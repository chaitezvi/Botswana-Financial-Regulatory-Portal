import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DocumentPage } from './pages/DocumentPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { FAQPage } from './pages/FAQPage';
import { ChecklistGenerator } from './pages/ChecklistGenerator';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { AIComplianceAssistant } from './pages/AIComplianceAssistant';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/document/:id" element={<DocumentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/checklist" element={<ChecklistGenerator />} />
          <Route path="/ai-assistant" element={<AIComplianceAssistant />} />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/*" 
            element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/audit" 
            element={user?.role === 'admin' ? <AuditTrailPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
      <NotificationToast />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;