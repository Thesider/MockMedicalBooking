import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Layout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { patient } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Book Appointment', href: '/appointment' },
    { name: 'Check In', href: '/check-in' },
    { name: 'Doctors', href: '/doctors' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <Heart className={styles.logoIcon} />
            <span className={styles.logoText}>MediCare</span>
          </Link>

          <nav className={styles.nav}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Links */}
            {patient ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none"
                >
                  <User className="w-4 h-4" />
                  <span>{patient.firstName || 'Profile'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-50">
                  <Link
                    to="/patient/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to sign out?')) {
                        if (typeof window !== 'undefined') {
                          localStorage.removeItem('auth');
                          window.location.href = '/';
                        }
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              {patient ? (
                <div className="space-y-1">
                  <Link
                    to="/patient/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to sign out?')) {
                        if (typeof window !== 'undefined') {
                          localStorage.removeItem('auth');
                          window.location.href = '/';
                        }
                      }
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div>
              <h3>MediCare</h3>
              <p className="text-gray-300">
                Providing quality healthcare services with modern technology.
              </p>
            </div>
            <div className="space-y-2">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Online Appointments</a></li>
                <li><a href="#">Emergency Care</a></li>
                <li><a href="#">Specialist Consultations</a></li>
                <li><a href="#">Health Checkups</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3>Contact</h3>
              <ul>
                <li>📞 +1 (555) 123-4567</li>
                <li>📧 info@medicare.com</li>
                <li>📍 123 Test</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3>Hours</h3>
              <ul>
                <li>Monday - Friday: 8AM - 8PM</li>
                <li>Saturday: 9AM - 5PM</li>
                <li>Sunday: 10AM - 4PM</li>
                <li>Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 MediCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
