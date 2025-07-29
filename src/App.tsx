import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import CheckInPage from './pages/CheckInPage';
import DoctorsPage from './pages/DoctorsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
const PatientDashboard = React.lazy(() => import('./pages/patient/PatientDashboard'));
import PatientAppointments from './pages/patient/PatientAppointments';
import DashboardPage from './pages/admin/DashboardPage';
import DoctorsAdminPage from './pages/admin/DoctorsAdminPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/check-in" element={<CheckInPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Patient Routes */}
          <Route path="/patient/dashboard" element={
            <ProtectedRoute>
              <React.Suspense fallback={<div>Loading...</div>}>
                <PatientDashboard />
              </React.Suspense>
            </ProtectedRoute>
          } />
          <Route path="/patient/appointments" element={
            <ProtectedRoute>
              <PatientAppointments />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/doctors" element={<DoctorsAdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
